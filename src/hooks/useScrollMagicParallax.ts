"use client";

import { RefObject, useEffect } from "react";

type ParallaxOptions = {
  yRange?: number; // pixels of vertical parallax
  triggerHook?: number; // 0 (top) to 1 (bottom)
  duration?: number; // scroll duration in px
};

export function useScrollMagicParallax(ref: RefObject<HTMLElement | null>, opts: ParallaxOptions = {}) {
  const { yRange = 80, triggerHook = 0.8, duration = 400 } = opts;

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ref.current || prefersReduced) return;

    let controller: any = null;
    let scene: any = null;

    (async () => {
      const mod: any = await import("scrollmagic");
      const ScrollMagic = mod?.default ?? mod;
      // Controller
      // @ts-ignore
      controller = new ScrollMagic.Controller();
      // Scene
      // @ts-ignore
      scene = new ScrollMagic.Scene({
        triggerElement: ref.current,
        triggerHook,
        duration,
      })
        .addTo(controller)
        .on("progress", (evt: any) => {
          const p = Math.min(Math.max(evt.progress, 0), 1);
          const y = -yRange * p;
          if (ref.current) {
            ref.current.style.transform = `translate3d(0, ${y}px, 0)`;
          }
        });
    })();

    return () => {
      try {
        scene && scene.destroy(true);
        controller && controller.destroy(true);
      } catch {}
      if (ref.current) {
        ref.current.style.transform = "";
      }
    };
  }, [ref, yRange, triggerHook, duration]);
}
