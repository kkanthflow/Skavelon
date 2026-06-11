import { useEffect } from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Instantly reset scroll position to top when a new page mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.215, 0.610, 0.355, 1.000] // Deceleration curve for a premium, lightweight feel
      }}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}
