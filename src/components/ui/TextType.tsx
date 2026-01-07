"use client";

import { ElementType, useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import './TextType.css';

// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean; // Kept for API compatibility, but cursor logic is now GSAP
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number; // Approximate speed factor
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number; // Approximate speed factor
  loop?: boolean;
  textColors?: string[]; 
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  shimmerOnComplete?: boolean;
  onComplete?: () => void; // Added to match Hero usage
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  shimmerOnComplete = false,
  onComplete,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const textRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isFinished, setIsFinished] = useState(false);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // Visibility Observer
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // GSAP Animation Logic
  useEffect(() => {
    if (!isVisible) return;
    if (prefersReduced) {
      if (textRef.current) textRef.current.textContent = textArray[0];
      setIsFinished(true);
      return;
    }

    const masterTl = gsap.timeline({
      repeat: loop ? -1 : 0,
      onComplete: () => {
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    });

    // Cursor Blink Animation
    if (showCursor && cursorRef.current) {
      // Hide cursor when typing starts
      gsap.set(cursorRef.current, { opacity: 1 });
      
      // We'll manage blink state manually during typing phases
    }

    // Initial Delay
    if (initialDelay > 0) {
      masterTl.to({}, { duration: initialDelay / 1000 });
    }

    textArray.forEach((phrase, index) => {
      // Typing Phase
      const typeDuration = phrase.length * (typingSpeed / 1000); // Rough duration calc
      
      // Stop blinking, keep visible during typing
      masterTl.to(cursorRef.current, { opacity: 1, duration: 0.1 }, "<");
      
      masterTl.to(textRef.current, {
        duration: typeDuration,
        text: {
          value: phrase,
          delimiter: "" 
        },
        ease: "none",
        onComplete: () => {
          if (onSentenceComplete) onSentenceComplete(phrase, index);
        }
      });
      
      // Start blinking after typing finishes
      masterTl.to(cursorRef.current, { 
        opacity: 0, 
        duration: cursorBlinkDuration, 
        repeat: 3, // Blink a few times before deleting
        yoyo: true, 
        ease: "power2.inOut" 
      });

      // Pause Phase
      if (textArray.length > 1 && (loop || index < textArray.length - 1)) {
        // masterTl.to({}, { duration: pauseDuration / 1000 }); // Pause duration is now handled by the blink loop above
        
        // Deleting Phase
        const deleteDuration = phrase.length * (deletingSpeed / 1000);
        
        // Stop blinking, keep visible during deleting
        masterTl.to(cursorRef.current, { opacity: 1, duration: 0.1, overwrite: true });

        masterTl.to(textRef.current, {
          duration: deleteDuration,
          text: {
            value: "",
            delimiter: ""
          },
          ease: "none"
        });
        
        // Short pause before next word
        masterTl.to({}, { duration: 0.2 });
      } else {
        // Final state: Infinite blink
        masterTl.to(cursorRef.current, {
            opacity: 0,
            duration: cursorBlinkDuration,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
        });
      }
    });

    return () => {
      masterTl.kill();
      gsap.killTweensOf(cursorRef.current);
    };
  }, [isVisible, prefersReduced, textArray, typingSpeed, deletingSpeed, pauseDuration, loop, onSentenceComplete, onComplete, initialDelay]);

  return (
    <Component
      ref={containerRef}
      className={`text-type ${className}`}
      {...props}
    >
      <span 
        ref={textRef} 
        className={`${className} ${isFinished && shimmerOnComplete ? 'shiny-strong gradient-animate bg-clip-text text-transparent' : ''}`}
      />
      {showCursor && (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
};

export default TextType;
