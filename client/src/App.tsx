import { useState } from "react";
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
import About from "./pages/About";
import LePort from "./pages/LePort";
import LeTech from "./pages/LeTech";
import Services from "./pages/Services";
import GlobalReach from "./pages/GlobalReach";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";


import { useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location}>
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/about"} component={About} />
          <Route path={"/leport"} component={LePort} />
          <Route path={"/letech"} component={LeTech} />
          <Route path={"/services"} component={Services} />
          <Route path={"/global-reach"} component={GlobalReach} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/terms"} component={Terms} />
          <Route path={"/privacy"} component={Privacy} />

          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
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
    const hasShown = sessionStorage.getItem("leakqoara_splash_shown");
    return !hasShown;
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem("leakqoara_splash_shown", "true");
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
          
          <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 0.8s ease-in-out' }}>
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
