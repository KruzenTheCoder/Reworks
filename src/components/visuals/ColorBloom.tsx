"use client";

import { motion, useReducedMotion } from "framer-motion";
import ParticleField from "./ParticleField";
import { useEffect, useState } from "react";

export default function ColorBloom() {
  const reduce = useReducedMotion();
  const [mouse, setMouse] = useState<{x:number;y:number}>({ x: -9999, y: -9999 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(120deg, rgba(59,130,246,0.06), rgba(99,102,241,0.05))",
            "linear-gradient(120deg, rgba(99,102,241,0.06), rgba(59,130,246,0.05))",
            "linear-gradient(120deg, rgba(59,130,246,0.06), rgba(99,102,241,0.05))",
          ],
        }}
        transition={{ duration: reduce ? 0.1 : 12, repeat: Infinity, ease: "linear" }}
        style={{ willChange: "background" }}
      />
      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: 0.75 }}
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.18) 0%, transparent 55%)",
            "radial-gradient(ellipse at 40% 60%, rgba(59,130,246,0.18) 0%, transparent 55%), radial-gradient(ellipse at 60% 40%, rgba(168,85,247,0.18) 0%, transparent 55%)",
            "radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.18) 0%, transparent 55%)",
          ]
        }}
        transition={{ duration: reduce ? 0.1 : 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-24 -left-24 w-[55vw] h-[55vw] rounded-full blur-[80px]"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 60%)" }}
        animate={{ scale: reduce ? 1 : [1, 1.03, 1], opacity: reduce ? 0.6 : [0.6, 0.8, 0.6] }}
        transition={{ duration: reduce ? 0.1 : 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20vh] right-[-20vw] w-[50vw] h-[50vw] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 60%)" }}
        animate={{ scale: reduce ? 1 : [1, 1.02, 1], opacity: reduce ? 0.5 : [0.5, 0.7, 0.5] }}
        transition={{ duration: reduce ? 0.1 : 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[30vh] left-[60vw] w-[32vw] h-[32vw] rounded-full blur-[70px]"
        style={{ background: "radial-gradient(circle, rgba(17,94,160,0.16), transparent 60%)" }}
        animate={{ scale: reduce ? 1 : [1, 1.04, 1], opacity: reduce ? 0.5 : [0.5, 0.65, 0.5] }}
        transition={{ duration: reduce ? 0.1 : 13, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Particle layers */}
      <ParticleField count={70} color="rgba(59,130,246,0.25)" size={4} blur={1} amplitude={6} opacity={[0.2, 0.8]} durationBase={10} />
      <ParticleField count={24} color="rgba(139,92,246,0.35)" size={6} blur={2} amplitude={10} opacity={[0.3, 0.9]} durationBase={8} twinkle />
      {/* Noise and vignette overlays */}
      <div className="absolute inset-0" style={{ opacity: 0.03, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: "url(data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
      <div className="absolute inset-0" style={{ pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.06) 100%)' }} />
      {/* Mouse follower glow */}
      {!reduce && (
        <div
          className="fixed"
          style={{
            left: mouse.x,
            top: mouse.y,
            width: 300,
            height: 300,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'screen'
          }}
        />
      )}
    </div>
  );
}
