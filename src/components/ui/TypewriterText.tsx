"use client";
import TextType from './TextType';
import { ElementType } from 'react';

type TypewriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  caretHeightClass?: string; // e.g. "h-6", "h-8", "h-10"
  onComplete?: () => void;
  shimmerOnComplete?: boolean;
  as?: ElementType;
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
}: TypewriterProps) {
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
      onSentenceComplete={() => {
        if (onComplete) onComplete();
      }}
    />
  );
}
