"use client";

import { useMemo } from "react";
import "./ParticleField.css";

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
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const x = (i * 61) % 100;
      const y = (i * 37) % 100;
      const d = durationBase + ((i * 7) % 10);
      const delay = (i * 13) % 10;
      const s = size * (0.8 + (((i * 13) % 10) / 50));
      return { id: i, x, y, d, delay, s };
    });
  }, [count, durationBase, size]);

  return (
    <div className={`fixed inset-0 pointer-events-none -z-10 ${className}`} aria-hidden>
      {particles.map(p => (
        <div
          key={p.id}
          className={`absolute rounded-full ${twinkle ? 'particle-twinkle' : 'particle-float'}`}
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            backgroundColor: color,
            width: `${p.s}px`,
            height: `${p.s}px`,
            filter: `blur(${blur}px)`,
            '--amplitude': `${amplitude}px`,
            '--min-opacity': opacity[0],
            '--max-opacity': opacity[1],
            animationDuration: `${p.d}s`,
            animationDelay: `-${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
