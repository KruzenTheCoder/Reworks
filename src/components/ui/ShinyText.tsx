"use client";

import { ElementType } from "react";

type ShinyTextProps = {
  text?: string;
  disabled?: boolean;
  speed?: number; // seconds for one full shimmer cycle
  className?: string;
  as?: ElementType;
  children?: React.ReactNode;
  strength?: 'normal' | 'strong';
};

export default function ShinyText({
  text,
  disabled = false,
  speed = 2.2,
  className = "title-gradient",
  as: Component = "span",
  children,
  strength = 'strong',
}: ShinyTextProps) {
  const content = children ?? text ?? "";

  // When disabled, render without animation; keeps any provided gradient styles
  if (disabled) {
    return (
      <Component className={className}>
        {content}
      </Component>
    );
  }

  // Animated shiny gradient text
  return (
    <Component
      className={`${strength === 'strong' ? 'shiny-strong' : ''} ${className} gradient-animate bg-clip-text text-transparent`.trim()}
      style={{ animationDuration: `${speed}s` }}
    >
      {content}
    </Component>
  );
}
