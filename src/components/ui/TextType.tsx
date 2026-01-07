"use client";

import { ElementType, useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean; // Note: implemented via class toggling if needed
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[]; // Not heavily used in previous, but we can support if needed via style updates
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  shimmerOnComplete?: boolean;
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
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const textRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  // State for visibility and final "finished" state (to trigger React-controlled effects if any)
  // We avoid state for the actual typing content.
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isFinished, setIsFinished] = useState(false);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // Refs for animation loop state
  const stateRef = useRef({
    isDeleting: false,
    textIndex: 0,
    charIndex: 0,
    accumulator: 0,
    lastTime: 0,
    rafId: 0 as number | null,
    isFinished: false
  });

  // Cursor animation
  useEffect(() => {
    if (showCursor && cursorRef.current && !prefersReduced) {
      const ctx = gsap.context(() => {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: cursorBlinkDuration,
          repeat: -1,
          yoyo: true,
          ease: 'power2.inOut'
        });
      });
      return () => ctx.revert();
    }
  }, [showCursor, cursorBlinkDuration, prefersReduced]);

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

  // Typing Logic
  useEffect(() => {
    if (!isVisible) return;
    if (prefersReduced) {
      if (textRef.current) {
        textRef.current.textContent = textArray[0];
      }
      setIsFinished(true);
      return;
    }

    const state = stateRef.current;
    state.textIndex = 0;
    state.charIndex = 0;
    state.isDeleting = false;
    state.isFinished = false;
    state.lastTime = 0;
    state.accumulator = 0;

    // Reset text
    if (textRef.current) textRef.current.textContent = '';

    const getRandomSpeed = () => {
      if (!variableSpeed) return typingSpeed;
      const { min, max } = variableSpeed;
      return Math.random() * (max - min) + min;
    };

    const loopFn = (now: number) => {
      if (!state.lastTime) state.lastTime = now;
      const dt = now - state.lastTime;
      state.lastTime = now;
      state.accumulator += dt;

      const currentText = textArray[state.textIndex];
      const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;
      
      const speed = state.isDeleting ? deletingSpeed : getRandomSpeed();
      
      // If we have enough accumulated time, process characters
      if (state.accumulator >= speed) {
        state.accumulator = 0; // Reset accumulator or subtract speed? Resetting usually safer for variable frames, but subtracting keeps sync. Let's reset for simplicity in typing.

        if (!state.isDeleting) {
          // Typing
          if (state.charIndex < processedText.length) {
            state.charIndex++;
            if (textRef.current) {
              textRef.current.textContent = processedText.substring(0, state.charIndex);
            }
          } else {
            // Finished typing sentence
            if (onSentenceComplete) onSentenceComplete(currentText, state.textIndex);
            
            if (textArray.length > 1 && loop) {
              // Pause then delete
              state.isDeleting = true;
              state.accumulator = -pauseDuration; // Delay next action
            } else {
              // Finished completely
              state.isFinished = true;
              setIsFinished(true);
              
              // Add shimmer class if needed
              if (shimmerOnComplete && textRef.current) {
                // We can append the class directly
                textRef.current.classList.add('shiny-strong', 'gradient-animate', 'bg-clip-text', 'text-transparent');
              }
              
              state.rafId = null;
              return; // Stop loop
            }
          }
        } else {
          // Deleting
          if (state.charIndex > 0) {
            state.charIndex--;
            if (textRef.current) {
              textRef.current.textContent = processedText.substring(0, state.charIndex);
            }
          } else {
            // Finished deleting
            state.isDeleting = false;
            state.textIndex = (state.textIndex + 1) % textArray.length;
            state.charIndex = 0;
            
            // If we looped back to start and shouldn't loop forever? (props say loop=true implies infinite)
            // If !loop and we reached end, we wouldn't be here (handled in typing block)
          }
        }
      }

      state.rafId = requestAnimationFrame(loopFn);
    };

    // Initial delay
    const startTimeout = setTimeout(() => {
      state.rafId = requestAnimationFrame(loopFn);
    }, initialDelay);

    return () => {
      clearTimeout(startTimeout);
      if (state.rafId) cancelAnimationFrame(state.rafId);
    };
  }, [isVisible, prefersReduced, textArray, typingSpeed, deletingSpeed, pauseDuration, loop, variableSpeed, reverseMode, shimmerOnComplete, onSentenceComplete, initialDelay]);

  // Determine static classes for the text element
  // If shimmerOnComplete is false, we might want the gradient always? 
  // The original component had `className` passed to ShinyText.
  // We'll apply `className` to the span.
  
  return (
    <Component
      ref={containerRef}
      className={`text-type ${className}`} // Merge classNames on container if needed, or just keep them separate
      // If props.className is passed to Component, we should be careful. 
      // The original code passed `className` to ShinyText and `text-type ${className}` to container.
      // Let's replicate: Container gets `text-type` and maybe layout classes. Text gets visual classes.
      {...props}
    >
      <span 
        ref={textRef} 
        className={`${className} ${isFinished && shimmerOnComplete ? 'shiny-strong gradient-animate bg-clip-text text-transparent' : ''}`}
        // We apply the gradient classes initially if they are static, or wait for finish?
        // Original: ShinyText had `gradient-animate` always unless disabled.
        // But `disabled` was true until finished if `shimmerOnComplete` was set.
        // So: If `shimmerOnComplete` is true, we want PLAIN text until finish.
        // If `shimmerOnComplete` is false, we probably want the gradient always?
        // Let's assume if shimmerOnComplete is false, we just want the text with `className` styles.
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
