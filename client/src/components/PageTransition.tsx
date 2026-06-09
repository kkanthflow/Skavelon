import { motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "100%", scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: "-20%", scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for a snappy, smooth "new tab" feel
      }}
      className="w-full min-h-screen flex flex-col"
    >
      {children}
    </motion.div>
  );
}
