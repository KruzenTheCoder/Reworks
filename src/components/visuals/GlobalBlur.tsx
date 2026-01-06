"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GradualBlur from './GradualBlur';

type GlobalBlurProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  divCount?: number;
  exponential?: boolean;
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  zIndex?: number;
  disableOnRoutes?: string[];
};

export default function GlobalBlur({
  position = 'bottom',
  strength = 2,
  height = '6rem',
  divCount = 3, // Reduced from 5 for performance
  exponential = true,
  duration = '0.3s',
  easing = 'ease-out',
  opacity = 1,
  curve = 'bezier',
  zIndex = 1000,
  disableOnRoutes = []
}: GlobalBlurProps) {
  const pathname = usePathname();
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footerEl = document.querySelector('footer');
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide the blur once any meaningful part of the footer is visible
        // Lower threshold helps shorter pages like Jobs avoid bottom blur.
        setFooterVisible(entry.intersectionRatio > 0.2);
      },
      { threshold: 0.2 }
    );
    observer.observe(footerEl);
    return () => observer.disconnect();
  }, [pathname]);

  if (disableOnRoutes.includes(pathname)) return null;

  return (
    <GradualBlur
      target="page"
      position={position}
      height={height}
      strength={strength}
      divCount={divCount}
      curve={curve}
      exponential={exponential}
      opacity={footerVisible ? 0 : opacity}
      duration={duration}
      easing={easing}
      zIndex={zIndex}
    />
  );
}
