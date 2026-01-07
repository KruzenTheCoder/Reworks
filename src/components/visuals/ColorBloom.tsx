"use client";

import { useRef, useEffect } from "react";
import ParticleField from "./ParticleField";
import "./ColorBloom.css";

export default function ColorBloom() {
  const mouseRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let rafId: number;
    let targetX = -1000;
    let targetY = -1000;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      // Cancel previous frame if it hasn't run yet to prevent stacking
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        if (mouseRef.current) {
          mouseRef.current.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
      {/* Base gradient */}
      <div
        className="absolute inset-0 bloom-bg-shift"
        style={{
          background: "linear-gradient(120deg, rgba(59,130,246,0.06), rgba(99,102,241,0.05), rgba(59,130,246,0.06))",
          willChange: "background-position"
        }}
      />
      
      {/* Animated mesh gradient overlay */}
      <div
        className="absolute inset-0 bloom-float"
        style={{ 
          opacity: 0.75,
          background: "radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.18) 0%, transparent 55%)",
          animationDuration: "10s",
          willChange: "transform, opacity"
        }}
      />
      
      {/* Blobs */}
      <div
        className="absolute -top-24 -left-24 w-[55vw] h-[55vw] rounded-full blur-[80px] bloom-float"
        style={{ 
          background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 60%)",
          animationDuration: "14s",
          animationDelay: "0s"
        }}
      />
      <div
        className="absolute bottom-[-20vh] right-[-20vw] w-[50vw] h-[50vw] rounded-full blur-[90px] bloom-float"
        style={{ 
          background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 60%)",
          animationDuration: "16s",
          animationDelay: "-5s"
        }}
      />
      <div
        className="absolute top-[30vh] left-[60vw] w-[32vw] h-[32vw] rounded-full blur-[70px] bloom-float"
        style={{ 
          background: "radial-gradient(circle, rgba(17,94,160,0.16), transparent 60%)",
          animationDuration: "18s",
          animationDelay: "-10s"
        }}
      />

      {/* Particle layers */}
      <ParticleField count={70} color="rgba(59,130,246,0.25)" size={4} blur={1} amplitude={6} opacity={[0.2, 0.8]} durationBase={10} />
      <ParticleField count={24} color="rgba(139,92,246,0.35)" size={6} blur={2} amplitude={10} opacity={[0.3, 0.9]} durationBase={8} twinkle />

      {/* Noise and vignette overlays */}
      <div className="absolute inset-0" style={{ opacity: 0.03, mixBlendMode: 'overlay', pointerEvents: 'none', backgroundImage: "url(data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E)" }} />
      <div className="absolute inset-0" style={{ pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.06) 100%)' }} />

      {/* Mouse follower glow */}
      <div
        ref={mouseRef}
        className="fixed top-0 left-0"
        style={{
          width: 300,
          height: 300,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
          willChange: 'transform',
          transform: 'translate(-1000px, -1000px)' // Initial off-screen
        }}
      />
    </div>
  );
}
