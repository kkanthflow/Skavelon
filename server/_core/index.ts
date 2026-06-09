import "dotenv/config";
import crypto from "crypto";
import express from "express";
import { createServer, type IncomingMessage, type ServerResponse } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

// ---------------------------------------------------------------------------
// CORS origin allowlist — populated from SERVER_ORIGIN env var.
// SERVER_ORIGIN may be a comma-separated list of origins.
// ---------------------------------------------------------------------------
const ALLOWED_ORIGINS: Set<string> = new Set(
  (process.env.SERVER_ORIGIN ?? "")
    .split(",")
    .map(o => o.trim())
    .filter(Boolean)
);

// Always allow localhost variants in development
if (process.env.NODE_ENV !== "production") {
  ALLOWED_ORIGINS.add("http://localhost:3000");
  ALLOWED_ORIGINS.add("http://localhost:5173");
}

// ---------------------------------------------------------------------------
// Helmet CSP nonce helper — typed to match ContentSecurityPolicyDirectiveValueFunction
// (req: IncomingMessage, res: ServerResponse) => string
// ---------------------------------------------------------------------------
function getNonce(_req: IncomingMessage, res: ServerResponse & { locals?: Record<string, unknown> }): string {
  return `'nonce-${res.locals?.cspNonce ?? ""}'`;
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // ---------------------------------------------------------------------------
  // Nonce-based Content Security Policy
  // A fresh nonce is generated per request and attached to res.locals so that
  // the HTML template can reference it via <!--__CSP_NONCE__-->.
  // ---------------------------------------------------------------------------
  app.use((req, res, next) => {
    res.locals.cspNonce = crypto.randomBytes(16).toString("base64");
    next();
  });

  // Specific domains allowed in connectSrc
  const appOrigin = process.env.SERVER_ORIGIN?.split(",")[0]?.trim() ?? "";
  const connectSrcDomains = [
    "'self'",
    // WebSocket variants of own origin
    ...(appOrigin ? [appOrigin.replace(/^https/, "wss").replace(/^http/, "ws")] : ["ws://localhost:*", "wss://localhost:*"]),
    // Analytics & speed insights (Vercel)
    "https://vitals.vercel-insights.com",
    "https://va.vercel-scripts.com",
    // EmailJS
    "https://api.emailjs.com",
    // IndexNow
    "https://api.indexnow.org",
    // Google Fonts (needed for CSS @import)
    "https://fonts.googleapis.com",
  ];

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          ...(process.env.NODE_ENV === "development" 
              ? ["'unsafe-inline'", "'unsafe-eval'"] 
              : [getNonce]),
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https://leak-qoara.vercel.app", "https://fonts.gstatic.com"],
        connectSrc: connectSrcDomains,
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  // ---------------------------------------------------------------------------
  // CORS — explicit origin allowlist, never wildcard with credentials
  // ---------------------------------------------------------------------------
  app.use(cors({
    origin: (origin, callback) => {
      // Same-origin requests (e.g. SSR, curl) have no Origin header
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.has(origin)) return callback(null, true);
      callback(new Error(`CORS: origin '${origin}' not allowed`));
    },
    credentials: true,
  }));

  // Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api/', apiLimiter);
  app.use('/oauth/', authLimiter);

  // Global body parser — tight limit (100kb) to prevent payload-flooding.
  // Upload routes raise the limit individually via their own middleware.
  app.use(express.json({ limit: "100kb" }));
  app.use(express.urlencoded({ limit: "100kb", extended: true }));

  // Storage proxy needs a larger limit for file upload proxying only.
  app.use("/manus-storage", express.raw({ limit: "50mb", type: "*/*" }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // ---------------------------------------------------------------------------
  // IndexNow key in-memory cache (avoids a DB round-trip per crawler hit).
  // TTL: 60 seconds. On key rotation, cache naturally expires within one minute.
  // ---------------------------------------------------------------------------
  let indexNowKeyCache: { key: string; expiresAt: number } | null = null;

  async function getCachedIndexNowKey(): Promise<string | null> {
    const now = Date.now();
    if (indexNowKeyCache && indexNowKeyCache.expiresAt > now) {
      return indexNowKeyCache.key;
    }
    try {
      const { getIndexNowSettings } = await import("../db");
      const settings = await getIndexNowSettings();
      if (settings?.apiKey) {
        indexNowKeyCache = { key: settings.apiKey, expiresAt: now + 60_000 };
        return settings.apiKey;
      }
    } catch (error) {
      console.error("[IndexNow] Cache refresh failed:", error);
    }
    return null;
  }

  // Serve dynamic IndexNow verification file
  app.get("/:key.txt", async (req, res, next) => {
    const { key } = req.params;
    // Only process keys matching standard 32-character hex/alphanumeric format
    if (/^[a-zA-Z0-9]{32}$/.test(key)) {
      const cachedKey = await getCachedIndexNowKey();
      if (cachedKey && cachedKey === key) {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.send(key);
      }
    }
    next();
  });


  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
