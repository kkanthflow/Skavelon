/**
 * Skavelon Service Worker
 * ---------------------------------------------------------
 * Strategy:
 *   • Static assets (JS/CSS/fonts/images) → Cache-First with 1-year TTL
 *   • HTML pages                           → Network-First (always fresh)
 *   • /api/*  tRPC calls                   → Network-Only  (never cached)
 *   • Google Fonts stylesheets             → Stale-While-Revalidate
 *
 * On install  → pre-cache the shell HTML + known static files
 * On activate → remove stale caches from previous versions
 * On fetch    → route to the appropriate strategy
 */

const CACHE_VERSION = "v2";
const STATIC_CACHE   = `Skavelon-static-${CACHE_VERSION}`;
const FONT_CACHE     = `Skavelon-fonts-${CACHE_VERSION}`;
const IMAGE_CACHE    = `Skavelon-images-${CACHE_VERSION}`;

/** Assets to pre-cache during install */
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/logo.webp",
  "/robots.txt",
];

// ─────────────────────────────────────────────────────────────────────────────
// INSTALL — pre-cache shell assets
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()) // Activate immediately without waiting
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVATE — clean up old caches
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  const validCaches = new Set([STATIC_CACHE, FONT_CACHE, IMAGE_CACHE]);

  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => !validCaches.has(key))
            .map((key) => {
              console.log("[SW] Deleting old cache:", key);
              return caches.delete(key);
            })
        )
      )
      .then(() => self.clients.claim()) // Take control of all open tabs
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// FETCH — route requests to the appropriate caching strategy
// ─────────────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") return;

  // ── API calls → Network-Only (never cache tRPC/REST) ──────────────────────
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/oauth/")) {
    return; // fall through to browser default (network)
  }

  // ── Google Fonts CSS → Stale-While-Revalidate ────────────────────────────
  if (url.hostname === "fonts.googleapis.com") {
    event.respondWith(staleWhileRevalidate(FONT_CACHE, request));
    return;
  }

  // ── Google Fonts files → Cache-First ─────────────────────────────────────
  if (url.hostname === "fonts.gstatic.com") {
    event.respondWith(cacheFirst(FONT_CACHE, request));
    return;
  }

  // ── Images → Cache-First with a limit of 60 images ───────────────────────
  const isImage = /\.(png|jpe?g|gif|webp|svg|ico)(\?.*)?$/.test(url.pathname);
  if (isImage) {
    event.respondWith(cacheFirst(IMAGE_CACHE, request, 60));
    return;
  }

  // ── Versioned JS/CSS assets → Cache-First (Vite content-hashes them) ─────
  const isVersionedAsset = /\.(js|css|woff2?|ttf|eot)(\?.*)?$/.test(url.pathname);
  if (isVersionedAsset) {
    event.respondWith(cacheFirst(STATIC_CACHE, request));
    return;
  }

  // ── HTML (navigation) → Network-First to always serve fresh shell ─────────
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(networkFirst(STATIC_CACHE, request));
    return;
  }

  // ── Everything else → Network with cache fallback ────────────────────────
  event.respondWith(networkFirst(STATIC_CACHE, request));
});

// ─────────────────────────────────────────────────────────────────────────────
// STRATEGY HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Cache-First: serve from cache immediately; fetch from network only on miss.
 * @param {string}  cacheName
 * @param {Request} request
 * @param {number}  [maxEntries] optional limit on cached items (LRU eviction)
 */
async function cacheFirst(cacheName, request, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
      if (maxEntries) await trimCache(cache, maxEntries);
    }
    return response;
  } catch (err) {
    console.warn("[SW] Cache-First fetch failed:", err);
    return new Response("Offline – resource not cached", { status: 503 });
  }
}

/**
 * Network-First: always try network; fall back to cache on failure.
 * @param {string}  cacheName
 * @param {Request} request
 */
async function networkFirst(cacheName, request) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    // Last-resort offline page for navigation
    if (request.mode === "navigate") {
      const offlineFallback = await cache.match("/");
      if (offlineFallback) return offlineFallback;
    }
    return new Response("You are offline", { status: 503 });
  }
}

/**
 * Stale-While-Revalidate: serve cache instantly, then refresh in background.
 * @param {string}  cacheName
 * @param {Request} request
 */
async function staleWhileRevalidate(cacheName, request) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const networkPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  });

  return cached ?? networkPromise;
}

/**
 * Trim a cache to at most `maxEntries` entries (oldest evicted first).
 * @param {Cache}  cache
 * @param {number} maxEntries
 */
async function trimCache(cache, maxEntries) {
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map((k) => cache.delete(k)));
  }
}
