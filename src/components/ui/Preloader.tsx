"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [startedAt] = useState<number>(() => performance.now());
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  // Memoized particle generation to avoid unnecessary re-renders
  const particles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => {
        const x = (i * 61) % 100;
        const y = (i * 37) % 100;
        const delay = ((i % 8) * 0.25) + (((i * 7) % 10) / 50);
        const duration = 2 + (((i * 13) % 50) / 25);
        return { id: i, x, y, delay, duration };
      }),
    []
  );

  // Resource-aware loading progress
  useEffect(() => {
    const imgs = Array.from(document.images);
    const totalImages = imgs.length;
    let loadedImages = imgs.filter(img => img.complete).length;

    const minDisplayMs = 1200; // keep loader visible at least this long

    const updateTarget = () => {
      const base = totalImages > 0 ? Math.round((loadedImages / totalImages) * 90) : 60;
      // Fonts readiness contributes to remaining percentage
      const fontsReady = (document as any).fonts?.status === 'loaded';
      const fontsPct = fontsReady ? 10 : 0;
      const newTarget = Math.min(99, base + fontsPct);
      setTargetProgress(prev => (newTarget > prev ? newTarget : prev));
    };

    const onImgEvent = () => {
      loadedImages += 1;
      updateTarget();
    };

    imgs.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', onImgEvent, { once: true });
        img.addEventListener('error', onImgEvent, { once: true });
      }
    });

    // Fonts readiness
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => updateTarget());
    }

    // Window load ensures 100%
    const onWindowLoad = () => {
      setTargetProgress(100);
    };
    window.addEventListener('load', onWindowLoad, { once: true });

    // Smooth progress towards target using rAF
    let rafId: number | null = null;
    const tick = () => {
      setProgress(prev => {
        const delta = Math.max(0.5, (targetProgress - prev) * 0.08);
        const next = Math.min(100, Math.round(prev + delta));
        return next;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('load', onWindowLoad);
      imgs.forEach(img => {
        img.removeEventListener('load', onImgEvent as any);
        img.removeEventListener('error', onImgEvent as any);
      });
    };
  }, [targetProgress]);

  useEffect(() => {
    const t = setTimeout(() => setMinDelayPassed(true), 3200);
    return () => clearTimeout(t);
  }, []);

  // Complete logic: hide only when progress hits 100 and minimum display time passed
  useEffect(() => {
    if (progress >= 100 && minDelayPassed) {
      setIsVisible(false);
      const t = setTimeout(() => {
        onComplete?.();
      }, 800);
      return () => clearTimeout(t);
    }
  }, [progress, minDelayPassed, onComplete]);

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
              ease: "easeInOut",
            },
          }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Animated Gradient Background - GPU offloaded by Tailwind & simple animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
            animate={{
              background: [
                "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
                "linear-gradient(to bottom right, #dbeafe, #e0e7ff, #f8fafc)",
                "linear-gradient(to bottom right, #e0e7ff, #f8fafc, #dbeafe)",
                "linear-gradient(to bottom right, #f8fafc, #dbeafe, #e0e7ff)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ willChange: "background" }}
            layout={false}
          />

          {/* Floating Particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-primary-blue/20 rounded-full"
              style={{ willChange: "transform, opacity" }}
              initial={{
                x: `${particle.x}vw`,
                y: `${particle.y}vh`,
                scale: 0,
              }}
              animate={{
                y: [
                  `${particle.y}vh`,
                  `${particle.y - 16}vh`,
                  `${particle.y}vh`,
                ],
                x: [
                  `${particle.x}vw`,
                  `${particle.x + 8}vw`,
                  `${particle.x}vw`,
                ],
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
              layout={false}
            />
          ))}

          {/* Radial Glow Effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ willChange: "opacity" }}
            layout={false}
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
                ease: "linear",
              }}
              style={{ willChange: "transform" }}
              layout={false}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 -ml-1 bg-primary-blue/40 rounded-full blur-sm" />
              <div className="absolute bottom-0 left-1/2 w-2 h-2 -ml-1 bg-accent-blue/40 rounded-full blur-sm" />
              <div className="absolute left-0 top-1/2 w-2 h-2 -mt-1 bg-primary-blue/40 rounded-full blur-sm" />
              <div className="absolute right-0 top-1/2 w-2 h-2 -mt-1 bg-accent-blue/40 rounded-full blur-sm" />
            </motion.div>

            {/* Outer Pulsing Frame */}
            <motion.div
              className="absolute w-52 h-52 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.3))",
                padding: "3px",
                willChange: "transform, opacity",
              }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
                opacity: [0.4, 0.9, 0.4],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              layout={false}
            >
              <div className="w-full h-full bg-gradient-to-br from-slate-50/80 via-blue-50/80 to-indigo-100/80 rounded-2xl backdrop-blur-sm" />
            </motion.div>

            {/* Middle Pulsing Frame */}
            <motion.div
              className="absolute w-44 h-44 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(59, 130, 246, 0.4))",
                padding: "2px",
                willChange: "transform, opacity",
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
                delay: 0.3,
              }}
              layout={false}
            >
              <div className="w-full h-full bg-gradient-to-br from-white/60 via-blue-50/60 to-indigo-50/60 rounded-2xl backdrop-blur-sm" />
            </motion.div>

            {/* Inner Pulsing Frame */}
            <motion.div
              className="absolute w-36 h-36 rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(99, 102, 241, 0.6))",
                padding: "2px",
                willChange: "transform, opacity",
              }}
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
              layout={false}
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
                duration: 1,
              }}
              className="relative z-10"
              style={{ willChange: "transform, opacity" }}
              layout={false}
            >
              <motion.div
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-28 h-28 rounded-xl bg-white backdrop-blur-sm ring-2 ring-white/80 shadow-2xl flex items-center justify-center relative overflow-hidden"
                style={{ willChange: "transform" }}
                layout={false}
              >
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                  style={{ willChange: "transform, opacity" }}
                  layout={false}
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
                  willChange: "transform, opacity",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                layout={false}
              >
                <div className="w-full h-full bg-primary-blue/50 rounded-full blur-sm" />
              </motion.div>
            ))}
          </div>


        </motion.div>
      )}
    </AnimatePresence>
  );
}
