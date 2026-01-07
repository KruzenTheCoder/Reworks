"use client";
import React from 'react';
import './LiquidChrome.css';

interface LiquidChromeProps extends React.HTMLAttributes<HTMLDivElement> {
  baseColor?: [number, number, number]; // Kept for prop compatibility
  speed?: number;
  amplitude?: number;
  frequencyX?: number;
  frequencyY?: number;
  interactive?: boolean;
}

export const LiquidChrome: React.FC<LiquidChromeProps> = ({
  className = '',
  ...props
}) => {
  // CSS-based replacement for the heavy WebGL shader
  return (
    <div className={`liquidChrome-container ${className}`} {...props}>
      <div className="liquid-blob blob-1" />
      <div className="liquid-blob blob-2" />
      <div className="liquid-blob blob-3" />
    </div>
  );
};

export default LiquidChrome;
