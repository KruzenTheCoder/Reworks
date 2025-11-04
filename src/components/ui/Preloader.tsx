"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    delay: number;
    duration: number;
    x: number;
    y: number;
  }>>([]);

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
    );
  }, []);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 800); // Wait for exit animation
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
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
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
            animate={{
              background: [
                "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
                "linear-gradient(to bottom right, #dbeafe, #e0e7ff, #f8fafc)",
                "linear-gradient(to bottom right, #e0e7ff, #f8fafc, #dbeafe)",
                "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Floating Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-primary-blue/20 rounded-full"
              initial={{ 
                x: `${particle.x}vw`, 
                y: `${particle.y}vh`,
                scale: 0
              }}
              animate={{
                y: [`${particle.y}vh`, `${particle.y - 20}vh`, `${particle.y}vh`],
                x: [`${particle.x}vw`, `${particle.x + 10}vw`, `${particle.x}vw`],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Radial Glow Effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Main Logo Container */}
          <div className="relative flex items-center justify-center">
            {/* Rotating Outer Ring */}
            <motion.div
              className="absolute w-64 h-64"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-primary-blue/40 rounded-full blur-sm" />
              <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-accent-blue/40 rounded-full blur-sm" />
              <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 bg-primary-blue/40 rounded-full blur-sm" />
              <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 bg-accent-blue/40 rounded-full blur-sm" />
            </motion.div>

            {/* Outer Pulsing Frame with Gradient Border */}
            <motion.div
              className="absolute w-52 h-52 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3))",
                padding: "3px",
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-50/80 via-blue-50/80 to-indigo-100/80 rounded-2xl backdrop-blur-sm" />
            </motion.div>

            {/* Middle Pulsing Frame */}
            <motion.div
              className="absolute w-44 h-44 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(59, 130, 246, 0.4))",
                padding: "2px",
              }}
              animate={{
                scale: [1, 1.08, 1],
                rotate: [0, -5, 5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-white/60 via-blue-50/60 to-indigo-50/60 rounded-2xl backdrop-blur-sm" />
            </motion.div>

            {/* Inner Pulsing Frame */}
            <motion.div
              className="absolute w-36 h-36 rounded-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6))",
                padding: "2px",
              }}
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            >
              <div className="w-full h-full bg-white/80 rounded-2xl backdrop-blur-sm" />
            </motion.div>

            {/* Logo with Advanced Animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: 0,
                opacity: 1,
              }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1
              }}
              className="relative z-10"
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-28 h-28 rounded-xl bg-white backdrop-blur-sm ring-2 ring-white/80 shadow-2xl flex items-center justify-center relative overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }}
                />
                
                <Image
                  src="/logo.svg"
                  alt="ReWorks Solutions"
                  width={96}
                  height={96}
                  className="w-20 h-20 object-contain relative z-10"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Corner Accents */}
            {[0, 90, 180, 270].map((rotation, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3"
                style={{
                  transform: `rotate(${rotation}deg) translateY(-140px)`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              >
                <div className="w-full h-full bg-primary-blue/50 rounded-full blur-sm" />
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-1/4 w-64 text-center"
          >
            <motion.p
              className="text-primary-blue font-semibold text-base mb-3 tracking-wide"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Excellence...
            </motion.p>
            
            {/* Progress Bar Container */}
            <div className="relative h-1.5 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue rounded-full"
                initial={{ width: "0%" }}
                animate={{ 
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer on progress bar */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </div>
            
            {/* Percentage */}
            <motion.p
              className="text-xs text-primary-blue/60 font-medium mt-2"
              key={progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {progress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}