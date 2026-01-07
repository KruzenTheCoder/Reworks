"use client";

import React, { CSSProperties, useMemo } from 'react';
import './GradualBlur.css';

type GradualBlurProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number; // Kept for API compatibility, but effectively controls opacity/intensity
  height?: string;
  width?: string;
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
  // Deprecated/Unused props kept for compatibility to avoid breaking existing usage
  divCount?: number;
  exponential?: boolean;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  target?: 'parent' | 'page';
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
  disableOnRoutes?: string[]; // Added to match usage in layout
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
  // unused props ignored
}) => {
  
  const containerStyle: CSSProperties = useMemo(() => {
    const isVertical = position === 'top' || position === 'bottom';
    
    // Gradient direction for the mask
    // If position is 'bottom', we want the blur to be visible at the bottom and fade out going up.
    // mask-image: linear-gradient(to top, black, transparent)
    let maskImage = '';
    
    switch (position) {
      case 'bottom':
        maskImage = 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
        break;
      case 'top':
        maskImage = 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
        break;
      case 'left':
        maskImage = 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
        break;
      case 'right':
        maskImage = 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)';
        break;
    }

    const baseStyle: CSSProperties = {
      position: target === 'page' ? 'fixed' : 'absolute',
      zIndex,
      pointerEvents: 'none',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)', // Safari support
      maskImage,
      WebkitMaskImage: maskImage,
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

  return <div className={`gradual-blur ${className}`} style={containerStyle} />;
};

export default GradualBlur;
