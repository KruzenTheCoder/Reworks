"use client";

import React, { CSSProperties, useMemo } from 'react';
import './GradualBlur.css';

type GradualBlurProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number; // Controls opacity/intensity
  height?: string;
  width?: string;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  opacity?: number;
  target?: 'parent' | 'page';
  disableOnRoutes?: string[]; 
  // Unused props kept for compatibility
  divCount?: number;
  exponential?: boolean;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  preset?: string;
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  onAnimationComplete?: () => void;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
};

const GradualBlur: React.FC<GradualBlurProps> = ({
  position = 'bottom',
  height = '6rem',
  width = '100%',
  zIndex = 50,
  className = '',
  style = {},
  opacity = 1,
  target = 'parent',
}) => {
  
  const containerStyle: CSSProperties = useMemo(() => {
    const isVertical = position === 'top' || position === 'bottom';
    
    // Non-linear gradient mask for "softer" fade
    // 0% -> 100% opacity with an eased curve
    const maskGradient = `
      linear-gradient(
        to ${position === 'bottom' ? 'top' : position === 'top' ? 'bottom' : position === 'right' ? 'left' : 'right'},
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.95) 10%,
        rgba(0,0,0,0.85) 20%,
        rgba(0,0,0,0.7) 30%,
        rgba(0,0,0,0.5) 45%,
        rgba(0,0,0,0.3) 60%,
        rgba(0,0,0,0.1) 80%,
        rgba(0,0,0,0) 100%
      )
    `;

    const baseStyle: CSSProperties = {
      position: target === 'page' ? 'fixed' : 'absolute',
      zIndex,
      pointerEvents: 'none',
      // Hybrid approach: 
      // 1. Heavy blur for the main body
      // 2. We could add a second layer if needed, but a quality mask usually suffices.
      backdropFilter: 'blur(16px)', 
      WebkitBackdropFilter: 'blur(16px)', 
      maskImage: maskGradient,
      WebkitMaskImage: maskGradient,
      opacity,
      ...style,
    };

    if (isVertical) {
      baseStyle.left = 0;
      baseStyle.right = 0;
      baseStyle.height = height;
      if (position === 'bottom') baseStyle.bottom = 0;
      if (position === 'top') baseStyle.top = 0;
    } else {
      baseStyle.top = 0;
      baseStyle.bottom = 0;
      baseStyle.width = width;
      if (position === 'left') baseStyle.left = 0;
      if (position === 'right') baseStyle.right = 0;
    }

    return baseStyle;
  }, [position, height, width, zIndex, style, opacity, target]);

  return (
    <>
      {/* Primary Blur Layer - The heavy lifter */}
      <div className={`gradual-blur ${className}`} style={containerStyle} />
      
      {/* Secondary "Feather" Layer - Optional for extra smoothness, 
          can be enabled if the edge still looks hard. 
          For now, the eased mask above should handle it. */}
    </>
  );
};

export default GradualBlur;
