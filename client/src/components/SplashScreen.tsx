import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // The splash screen lasts for 1.0s, then fades out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out animation to finish before unmounting
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center border border-orange-500/30 mb-8 shadow-[0_0_60px_rgba(249,115,22,0.4)] overflow-hidden">
              <img src="/logo.webp" alt="LeakQoara Logo" className="h-full w-full object-cover" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
              LEAKQOARA
            </h1>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "150%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent mt-8"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
