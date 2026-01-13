"use client";
import TextType from './TextType';
import { ElementType } from 'react';
import ShinyText from './ShinyText';

type TypewriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  caretHeightClass?: string; // e.g. "h-6", "h-8", "h-10"
  onComplete?: () => void;
  shimmerOnComplete?: boolean;
  as?: ElementType;
  preserveLayout?: boolean;
  enabled?: boolean;
};

// Wrapper that maps existing TypewriterText API to the new TextType logic
export default function TypewriterText({
  text,
  delay = 0,
  speed = 40,
  className = "title-gradient",
  caretHeightClass = "h-6",
  onComplete,
  shimmerOnComplete = true,
  preserveLayout = false,
  enabled = false,
}: TypewriterProps) {
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hardwareConcurrency =
    typeof navigator !== 'undefined' && 'hardwareConcurrency' in navigator ? navigator.hardwareConcurrency : 8;
  const deviceMemory =
    typeof navigator !== 'undefined' && 'deviceMemory' in navigator ? (navigator as any).deviceMemory : 8;
  const connection =
    typeof navigator !== 'undefined' && 'connection' in navigator ? (navigator as any).connection : undefined;

  const isLowEnd =
    prefersReduced ||
    (typeof deviceMemory === 'number' && deviceMemory > 0 && deviceMemory <= 4) ||
    (typeof hardwareConcurrency === 'number' && hardwareConcurrency > 0 && hardwareConcurrency <= 4) ||
    Boolean(connection?.saveData) ||
    ['slow-2g', '2g'].includes(connection?.effectiveType);

  if (!enabled || isLowEnd) {
    return <ShinyText text={text} disabled className={className} as="span" />;
  }

  return (
    <TextType
      text={text}
      typingSpeed={speed}
      initialDelay={delay}
      loop={false}
      startOnVisible={true}
      showCursor={true}
      hideCursorWhileTyping={false}
      cursorCharacter="|"
      cursorBlinkDuration={0.5}
      cursorClassName={caretHeightClass}
      className={className}
      as={"span"}
      shimmerOnComplete={shimmerOnComplete}
      preserveLayout={preserveLayout}
      onSentenceComplete={() => {
        if (onComplete) onComplete();
      }}
    />
  );
}
