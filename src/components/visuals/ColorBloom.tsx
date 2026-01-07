"use client";

import { useRef, useEffect } from "react";
import ParticleField from "./ParticleField";
import "./ColorBloom.css";

export default function ColorBloom() {
  const mouseRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed inset-0 -z-10 pointer-events-none bloom-container" aria-hidden>
      {/* Deep, rich base background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
        }}
      />
      
      {/* Organic Blobs with CSS Keyframe Animation */}
      <div className="bloom-blob blob-1" />
      <div className="bloom-blob blob-2" />
      <div className="bloom-blob blob-3" />

      {/* Particle layers - Kept subtle */}
      <ParticleField count={60} color="rgba(96, 165, 250, 0.3)" size={3} blur={1} amplitude={8} opacity={[0.1, 0.6]} durationBase={12} />
      <ParticleField count={20} color="rgba(167, 139, 250, 0.4)" size={5} blur={2} amplitude={12} opacity={[0.2, 0.7]} durationBase={10} twinkle />

      {/* Noise overlay for texture */}
      <div className="bloom-noise" />

      {/* Mouse follower glow */}
      <div
        ref={mouseRef}
        className="fixed top-0 left-0"
        style={{
          width: 400,
          height: 400,
          borderRadius: 9999,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
          willChange: 'transform',
          transform: 'translate(-1000px, -1000px)' // Initial off-screen
        }}
      />
    </div>
  );
}
