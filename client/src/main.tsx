import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import emailjs from "@emailjs/browser";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 60 seconds — no refetch on mount/focus within that window
      staleTime: 60 * 1000,
      // Keep unused query data in memory for 5 minutes (survives page navigation)
      gcTime: 5 * 60 * 1000,
      // Retry failed requests up to 2 times with exponential back-off
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10_000),
      // Don't refetch on window focus for a snappier feel (data is fresh anyway)
      refetchOnWindowFocus: false,
    },
    mutations: {
      // Retry mutations once on network errors only
      retry: 1,
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

// Inject Analytics Script
const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

if (analyticsEndpoint && websiteId) {
  const script = document.createElement("script");
  script.defer = true;
  script.src = `${analyticsEndpoint}/umami`;
  script.setAttribute("data-website-id", websiteId);
  document.head.appendChild(script);
}

// Global EmailJS Initialization with Security Rules
const emailJsKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
if (emailJsKey) {
  emailjs.init({
    publicKey: emailJsKey,
    blockHeadless: true,
    blockList: {
      list: ['foo@emailjs.com', 'bar@emailjs.com'], // Example blocked emails
      watchVariable: 'email', // Must match the key used in templateParams
    },
    limitRate: {
      id: 'app',
      throttle: 10000, // Allow 1 request per 10s
    },
  });
}

import { useState, useEffect } from "react";

function DeferredAnalytics() {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    // Defer loading until after main content paints (1000ms delay)
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
      <DeferredAnalytics />
    </QueryClientProvider>
  </trpc.Provider>
);

// ─────────────────────────────────────────────────────────────────────────────
// Service Worker Registration
// Registered AFTER render so it never blocks first paint.
// ─────────────────────────────────────────────────────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("[SW] Registered with scope:", registration.scope);

        // Listen for updates (new SW version installed)
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("[SW] New version available — reload to update.");
            }
          });
        });
      })
      .catch((err) => console.error("[SW] Registration failed:", err));
  });
}
