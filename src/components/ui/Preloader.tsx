"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 800); // Wait for exit animation
    }, 3000); // Show for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 20,
            transition: { 
              duration: 0.8, 
              ease: "easeInOut" 
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
        >
          {/* Rectangular Pulsing Frame Container */}
          <div className="relative flex items-center justify-center p-6">
            {/* Outer Pulsing Frame */}
            <motion.div
              className="absolute w-48 h-48 border-4 border-primary-blue/30 rounded-2xl shadow-glow"
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Middle Pulsing Frame */}
            <motion.div
              className="absolute w-40 h-40 border-2 border-accent-blue/50 rounded-2xl"
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            />

            {/* Inner Pulsing Frame */}
            <motion.div
              className="absolute w-32 h-32 border border-primary-blue/70 rounded-2xl"
              animate={{
                scale: [1, 1.04, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            />

            {/* Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 },
                rotate: { 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
              className="relative z-10 w-24 h-24 rounded-xl bg-white/80 backdrop-blur-sm ring-1 ring-white/50 flex items-center justify-center shadow-card"
            >
              <Image
                src="/logo.svg"
                alt="ReWorks Solutions"
                width={96}
                height={96}
                className="w-20 h-20 object-contain"
              />
            </motion.div>
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-1/4 text-center"
          >
            <motion.p
              className="text-primary-blue font-medium text-lg"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading ReWorks Solutions...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
