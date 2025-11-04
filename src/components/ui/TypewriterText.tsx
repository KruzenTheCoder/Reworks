"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  caretHeightClass?: string; // e.g. "h-6", "h-8", "h-10"
  onComplete?: () => void;
  shimmerOnComplete?: boolean;
};

// A reusable, robust typewriter text with smooth animations and optimized performance
export default function TypewriterText({
  text,
  delay = 0,
  speed = 40,
  className = "title-gradient",
  caretHeightClass = "h-6",
  onComplete,
  shimmerOnComplete = false,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(false);
    setCompleted(false);

    const startAnimation = () => {
      setIsTyping(true);
      startTimeRef.current = performance.now();
      
      const animate = (currentTime: number) => {
        if (!startTimeRef.current) return;
        
        const elapsed = currentTime - startTimeRef.current;
        const expectedChars = Math.floor(elapsed / speed);
        
        if (expectedChars <= text.length) {
          setDisplayedText(text.slice(0, expectedChars));
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayedText(text);
          setIsTyping(false);
          setCompleted(true);
          if (onComplete) onComplete();
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, delay, speed, onComplete]);

  return (
    <span className={`inline-block ${className} ${completed && shimmerOnComplete ? 'shimmer-text' : ''}`}>
      {displayedText || text /* Fallback render to avoid empty headings */}
      {isTyping && (
        <motion.span
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ 
            duration: 0.8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`inline-block w-0.5 ${caretHeightClass} bg-gradient-to-b from-primary-blue to-accent-blue ml-1 align-middle rounded-sm`}
        />
      )}
    </span>
  );
}
