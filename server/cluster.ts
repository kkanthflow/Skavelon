/**
 * Skavelon — Node.js Cluster Load Balancer + Crash Prevention
 * ─────────────────────────────────────────────────────────────────────────────
 * Primary process: forks N workers (one per CPU), round-robin load balancing.
 *
 * Crash-prevention mechanisms
 * ───────────────────────────
 * 1. Auto-respawn        — crashed workers are replaced automatically
 * 2. Exponential back-off— repeated crashes slow respawn (1s → 2s → 4s → max 30s)
 *                          to avoid tight crash loops consuming all resources
 * 3. Crash-loop breaker  — if a worker crashes 10× in < 60s the slot is
 *                          permanently retired and an alarm is logged
 * 4. Memory watchdog     — every 15s, primary polls each worker's RSS;
 *                          workers above MEM_LIMIT_MB are gracefully restarted
 *                          BEFORE they OOM-crash (default 512 MB)
 * 5. IPC health-ping     — primary pings workers every 30s; workers that
 *                          don't reply within 5s are killed and replaced
 * 6. Primary resilience  — uncaughtException / unhandledRejection in the
 *                          primary are caught and logged; cluster stays alive
 * 7. Graceful shutdown   — SIGTERM/SIGINT drains in-flight requests then exits
 *
 * Environment variables
 *   CLUSTER_WORKERS      Worker count (default: CPU count)
 *   WORKER_MEM_LIMIT_MB  RSS threshold before graceful restart (default: 512)
 *   NODE_ENV             production | development
 */

import cluster, { type Worker } from "node:cluster";
import os from "node:os";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ESM-compatible __dirname substitute
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

// ─── Config ──────────────────────────────────────────────────────────────────

const CPU_COUNT   = os.cpus().length;
const WORKER_COUNT = process.env.CLUSTER_WORKERS
  ? Math.max(1, parseInt(process.env.CLUSTER_WORKERS, 10))
  : CPU_COUNT;

/** RSS (MB) above which a worker is gracefully replaced before OOM */
const MEM_LIMIT_MB = process.env.WORKER_MEM_LIMIT_MB
  ? parseInt(process.env.WORKER_MEM_LIMIT_MB, 10)
  : 512;

/** Base respawn delay — doubles on each consecutive crash (exponential back-off) */
const BASE_RESPAWN_MS  = 1_000;
const MAX_RESPAWN_MS   = 30_000;

/** If a worker crashes this many times inside CRASH_WINDOW_MS it is retired */
const CRASH_LOOP_LIMIT  = 10;
const CRASH_WINDOW_MS   = 60_000;

/** Shutdown grace period before force-kill */
const SHUTDOWN_GRACE_MS = 10_000;

/** IPC ping interval and timeout */
const PING_INTERVAL_MS  = 30_000;
const PING_TIMEOUT_MS   = 5_000;

/** Memory watchdog poll interval */
const MEM_POLL_MS       = 15_000;

// ─── State ───────────────────────────────────────────────────────────────────

interface WorkerMeta {
  seq:          number;       // original slot number
  crashCount:   number;       // total crashes
  crashTimes:   number[];     // timestamps of recent crashes (for loop detection)
  respawnDelay: number;       // current back-off delay (ms)
  retired:      boolean;      // permanently retired due to crash loop
  pingTimer?:   ReturnType<typeof setTimeout>;
}

const workerMeta = new Map<number, WorkerMeta>(); // keyed by worker.id
let   nextSeq    = 1;
let   isShuttingDown = false;

// ─── Primary ─────────────────────────────────────────────────────────────────

function startPrimary() {
  console.log(
    `\n╔══════════════════════════════════════════════════╗\n` +
    `║    Skavelon Load Balancer  —  Starting          ║\n` +
    `╚══════════════════════════════════════════════════╝\n` +
    `  PID            : ${process.pid}\n` +
    `  CPU cores      : ${CPU_COUNT}\n` +
    `  Workers        : ${WORKER_COUNT}\n` +
    `  Strategy       : Round-Robin\n` +
    `  Mem limit/wkr  : ${MEM_LIMIT_MB} MB\n` +
    `  NODE_ENV       : ${process.env.NODE_ENV ?? "production"}\n`
  );

  // Round-robin scheduling (explicit for clarity on all platforms)
  cluster.schedulingPolicy = cluster.SCHED_RR;

  // Fork initial workers
  for (let i = 0; i < WORKER_COUNT; i++) forkWorker();

  // ── Worker lifecycle ──────────────────────────────────────────────────────

  cluster.on("online", (worker) => {
    console.log(`[LB] ✓ Worker ${worker.id} online   (PID ${worker.process.pid})`);
    schedulePing(worker);
  });

  cluster.on("message", (worker, msg) => {
    if (msg === "pong") {
      const meta = workerMeta.get(worker.id);
      if (meta?.pingTimer) {
        clearTimeout(meta.pingTimer);
        meta.pingTimer = undefined;
      }
    }
    if (msg === "oom-warning") {
      console.warn(`[LB] ⚠ Worker ${worker.id} (PID ${worker.process.pid}) reported high memory — restarting`);
      gracefullyReplaceWorker(worker, "oom-warning");
    }
  });

  cluster.on("exit", (worker, code, signal) => {
    const reason = signal ? `signal ${signal}` : `exit code ${code}`;
    const meta   = workerMeta.get(worker.id);

    // Clear any pending ping timer
    if (meta?.pingTimer) { clearTimeout(meta.pingTimer); }

    // Intentional disconnect (our own graceful restart / shutdown)
    if (worker.exitedAfterDisconnect || isShuttingDown) {
      console.log(`[LB] Worker ${worker.id} exited cleanly (${reason})`);
      workerMeta.delete(worker.id);
      return;
    }

    console.error(`[LB] ✗ Worker ${worker.id} (PID ${worker.process.pid}) crashed — ${reason}`);

    // ── Crash-loop breaker ───────────────────────────────────────────────────
    if (meta) {
      const now = Date.now();
      meta.crashCount++;
      meta.crashTimes = meta.crashTimes
        .filter(t => now - t < CRASH_WINDOW_MS)
        .concat(now);

      if (meta.crashTimes.length >= CRASH_LOOP_LIMIT) {
        console.error(
          `[LB] 🚨 CRASH LOOP: Worker slot ${meta.seq} crashed ` +
          `${meta.crashTimes.length}× in ${CRASH_WINDOW_MS / 1000}s — ` +
          `slot RETIRED. Remaining workers continue serving traffic.`
        );
        meta.retired = true;
        workerMeta.delete(worker.id);
        // Keep remaining workers running; don't respawn this slot
        return;
      }

      // ── Exponential back-off respawn ─────────────────────────────────────
      const delay = Math.min(meta.respawnDelay, MAX_RESPAWN_MS);
      meta.respawnDelay = Math.min(meta.respawnDelay * 2, MAX_RESPAWN_MS);

      console.log(
        `[LB] Respawning worker slot ${meta.seq} ` +
        `(crash #${meta.crashCount}, back-off ${delay}ms)…`
      );
      workerMeta.delete(worker.id);

      setTimeout(() => {
        if (!isShuttingDown) forkWorker(meta.seq, meta);
      }, delay);
    }
  });

  // ── Memory watchdog ───────────────────────────────────────────────────────
  setInterval(() => {
    const workers = liveWorkers();
    for (const worker of workers) {
      // Ask worker to report its memory via IPC
      try { worker.send("mem-check"); } catch { /* worker may have just died */ }
    }
  }, MEM_POLL_MS).unref();

  // ── Periodic health log (every 60 s) ─────────────────────────────────────
  setInterval(() => {
    const workers = liveWorkers();
    const pmem    = process.memoryUsage();
    console.log(
      `[LB] ♥ Health — workers: ${workers.length}/${WORKER_COUNT} | ` +
      `Primary RSS: ${mb(pmem.rss)} MB | ` +
      `Heap: ${mb(pmem.heapUsed)}/${mb(pmem.heapTotal)} MB | ` +
      `System free: ${mb(os.freemem())} MB`
    );
  }, 60_000).unref();

  // ── Primary resilience: never let an uncaught error kill the primary ──────
  process.on("uncaughtException", (err) => {
    console.error("[LB] 🚨 Uncaught exception in primary (cluster stays alive):", err);
  });
  process.on("unhandledRejection", (reason) => {
    console.error("[LB] 🚨 Unhandled rejection in primary (cluster stays alive):", reason);
  });

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  const gracefulShutdown = (signal: string) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    console.log(`\n[LB] Received ${signal} — graceful shutdown initiated…`);

    const workers  = liveWorkers();
    let   remaining = workers.length;

    if (remaining === 0) { process.exit(0); return; }

    workers.forEach((worker) => {
      try { worker.send("shutdown"); } catch { /* already dead */ }
      worker.disconnect();

      const killer = setTimeout(() => {
        if (!worker.isDead()) {
          console.warn(`[LB] Force-killing worker PID ${worker.process.pid}`);
          worker.kill("SIGKILL");
        }
      }, SHUTDOWN_GRACE_MS);
      killer.unref();

      worker.once("exit", () => {
        clearTimeout(killer);
        remaining--;
        if (remaining === 0) {
          console.log("[LB] All workers stopped — bye!");
          process.exit(0);
        }
      });
    });
  };

  process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.once("SIGINT",  () => gracefulShutdown("SIGINT"));
}

// ─── Worker ───────────────────────────────────────────────────────────────────

async function startWorker() {
  const pid = process.pid;

  // ── Process-level crash guards ────────────────────────────────────────────
  process.on("uncaughtException", (err) => {
    console.error(`[Worker ${pid}] 🚨 Uncaught exception — worker will exit:`, err);
    // Give Express a moment to send a 500 to any in-flight requests
    setTimeout(() => process.exit(1), 500);
  });

  process.on("unhandledRejection", (reason) => {
    console.error(`[Worker ${pid}] 🚨 Unhandled rejection:`, reason);
    // Don't exit on unhandled rejections — log and continue
  });

  // ── IPC messages from primary ─────────────────────────────────────────────
  process.on("message", (msg) => {
    if (msg === "shutdown") {
      console.log(`[Worker ${pid}] Graceful shutdown — draining connections`);
      // Disconnect IPC so primary knows we're done
      setTimeout(() => process.disconnect?.(), 100);
    }

    if (msg === "mem-check") {
      const rss = process.memoryUsage().rss / 1024 / 1024;
      // Report back to primary with memory stats
      try { process.send?.({ type: "mem-report", rss: rss.toFixed(1), pid }); } catch { /* ignore */ }
      // Self-report OOM risk if > 90% of limit
      if (rss > MEM_LIMIT_MB * 0.9) {
        console.warn(`[Worker ${pid}] ⚠ High memory: ${rss.toFixed(1)}/${MEM_LIMIT_MB} MB`);
        try { process.send?.("oom-warning"); } catch { /* ignore */ }
      }
    }

    if (msg === "ping") {
      try { process.send?.("pong"); } catch { /* ignore */ }
    }
  });

  // ── Load the HTTP server ──────────────────────────────────────────────────
  const workerPath = join(__dirname, "_core", "index.js");
  const { default: serverMain } = await import(workerPath) as { default?: () => Promise<void> };

  if (typeof serverMain === "function") {
    await serverMain();
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function forkWorker(seq?: number, previousMeta?: Partial<WorkerMeta>): Worker {
  const slotSeq = seq ?? nextSeq++;
  const worker  = cluster.fork({ WORKER_SEQ: String(slotSeq) });

  workerMeta.set(worker.id, {
    seq:          slotSeq,
    crashCount:   previousMeta?.crashCount  ?? 0,
    crashTimes:   previousMeta?.crashTimes  ?? [],
    respawnDelay: previousMeta?.respawnDelay ?? BASE_RESPAWN_MS,
    retired:      false,
  });

  return worker;
}

/** Gracefully replace a specific worker (for memory watchdog / ping timeout) */
function gracefullyReplaceWorker(worker: Worker, reason: string): void {
  console.log(`[LB] Replacing worker ${worker.id} (PID ${worker.process.pid}) — ${reason}`);
  const meta = workerMeta.get(worker.id);

  // Fork replacement first so there's no gap in capacity
  forkWorker(meta?.seq, meta);

  // Then ask old worker to drain and exit
  try { worker.send("shutdown"); } catch { /* ignore */ }
  worker.disconnect();

  // Force-kill if it doesn't exit in time
  const killer = setTimeout(() => {
    if (!worker.isDead()) worker.kill("SIGKILL");
  }, SHUTDOWN_GRACE_MS);
  killer.unref();
}

/** Schedule a ping to detect unresponsive workers */
function schedulePing(worker: Worker): void {
  const interval = setInterval(() => {
    if (worker.isDead() || isShuttingDown) { clearInterval(interval); return; }

    try { worker.send("ping"); } catch { clearInterval(interval); return; }

    const meta = workerMeta.get(worker.id);
    if (!meta) { clearInterval(interval); return; }

    // Set a timeout — if worker doesn't pong within PING_TIMEOUT_MS, replace it
    meta.pingTimer = setTimeout(() => {
      if (worker.isDead() || isShuttingDown) return;
      console.warn(
        `[LB] ⚠ Worker ${worker.id} (PID ${worker.process.pid}) ` +
        `did not respond to ping in ${PING_TIMEOUT_MS}ms — replacing`
      );
      clearInterval(interval);
      gracefullyReplaceWorker(worker, "ping-timeout");
    }, PING_TIMEOUT_MS);

  }, PING_INTERVAL_MS);

  interval.unref();
}

function liveWorkers(): Worker[] {
  return Object.values(cluster.workers ?? {})
    .filter((w): w is Worker => !!w && !w.isDead());
}

function mb(bytes: number): string {
  return (bytes / 1024 / 1024).toFixed(1);
}

// ─── Entry Point ─────────────────────────────────────────────────────────────

if (cluster.isPrimary) {
  startPrimary();
} else {
  startWorker().catch((err) => {
    console.error(`[Worker ${process.pid}] Fatal startup error:`, err);
    process.exit(1);
  });
}
