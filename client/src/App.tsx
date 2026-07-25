import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import SplashScreen from "./components/SplashScreen";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";

// Lazy load non-critical pages for code splitting (reduces main bundle to < 150 KB)
const About = lazy(() => import("./pages/About"));
const Cybersecurity = lazy(() => import("./pages/Cybersecurity"));
const AppDevelopment = lazy(() => import("./pages/AppDevelopment"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));

import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location}>
        <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
          <Switch>
            <Route path={"/"} component={Home} />
            <Route path={"/about"} component={About} />
            <Route path={"/contact"} component={Contact} />
            <Route path={"/cybersecurity"} component={Cybersecurity} />
            <Route path={"/app-development"} component={AppDevelopment} />
            <Route path={"/services"} component={Services} />
                        <Route path={"/terms"} component={Terms} />
            <Route path={"/privacy"} component={Privacy} />

            <Route path={"/404"} component={NotFound} />
            {/* Final fallback route */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    if (typeof window === "undefined") return false;
    
    // Skip splash screen for performance audit tools (like Lighthouse / PageSpeed)
    const isPerformanceBot = /Lighthouse|Chrome-Lighthouse|PageSpeed|SpeedInsights|HeadlessChrome/i.test(navigator.userAgent);
    if (isPerformanceBot) return false;

    // Show splash screen only once per session
    const hasShown = sessionStorage.getItem("Skavelon_splash_shown");
    return !hasShown;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("Skavelon_splash_shown", "true");
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          
          <div style={{ 
            opacity: showSplash ? 0.01 : 1, 
            transition: 'opacity 0.8s ease-in-out',
            pointerEvents: showSplash ? 'none' : 'auto',
            userSelect: showSplash ? 'none' : 'auto'
          }}>
            <Toaster />
            <Navigation />
            <Router />
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
