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

          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
          
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
