"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type ParticleFieldProps = {
  count?: number;
  color?: string;
  className?: string;
  size?: number;
  blur?: number;
  amplitude?: number;
  opacity?: [number, number];
  durationBase?: number;
  twinkle?: boolean;
};

export default function ParticleField({ count = 28, color = "rgba(59,130,246,0.18)", className = "", size = 6, blur = 1, amplitude = 6, opacity = [0.25, 0.8], durationBase = 10, twinkle = false }: ParticleFieldProps) {
  const reduce = useReducedMotion();
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = (i * 61) % 100;
      const y = (i * 37) % 100;
      const d = durationBase + ((i * 7) % 10);
      const a = amplitude * (0.6 + ((i % 5) * 0.1));
      const s = size * (0.8 + (((i * 13) % 10) / 50));
      return { id: i, x, y, d, a, s };
    });
  }, [count, durationBase, amplitude, size]);

  return (
    <div className={`fixed inset-0 pointer-events-none -z-10 ${className}`} aria-hidden>
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            backgroundColor: color,
            width: p.s,
            height: p.s,
            filter: `blur(${blur}px)`
          }}
          animate={reduce ? undefined : {
            x: [0, p.a, 0, -p.a, 0],
            y: [0, -p.a, 0, p.a, 0],
            opacity: [opacity[0], opacity[1], opacity[0]],
            scale: twinkle ? [1, 1.25, 1] : undefined
          }}
          transition={reduce ? undefined : { duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
