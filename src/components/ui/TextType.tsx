"use client";

import { ElementType, useEffect, useRef, useState, createElement, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import './TextType.css';
import ShinyText from './ShinyText';

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
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
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  shimmerOnComplete?: boolean;
  preserveLayout?: boolean;
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
  preserveLayout = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [displayedText, setDisplayedText] = useState('');
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isFinished, setIsFinished] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // Smooth typing refs
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const accumulatorRef = useRef<number>(0);
  const charIntervalRef = useRef<number>(typingSpeed);
  const currentCharIndexRef = useRef<number>(0);
  const displayedTextRef = useRef<string>('');
  const isDeletingRef = useRef<boolean>(false);
  const currentTextIndexRef = useRef<number>(0);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  // If user prefers reduced motion, render static content without animations
  if (prefersReduced) {
    const content = textArray[0] ?? '';
    return createElement(
      Component,
      { className: `text-type ${className}`, ...props },
      <ShinyText text={content} disabled className={className} />
    );
  }

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return;
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, [showCursor, cursorBlinkDuration]);

  useEffect(() => {
    if (!isVisible) return;

    // Sync refs with current state
    currentCharIndexRef.current = currentCharIndex;
    displayedTextRef.current = displayedText;
    isDeletingRef.current = isDeleting;
    currentTextIndexRef.current = currentTextIndex;
    charIntervalRef.current = typingSpeed;

    const startLoop = () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      lastTimeRef.current = null;
      accumulatorRef.current = 0;

      const loopFn = (now: number) => {
        if (lastTimeRef.current == null) {
          lastTimeRef.current = now;
          rafIdRef.current = requestAnimationFrame(loopFn);
          return;
        }

        const dt = now - lastTimeRef.current;
        lastTimeRef.current = now;
        accumulatorRef.current += dt;

        const currentText = textArray[currentTextIndexRef.current];
        const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;

        // Determine interval; keep constant for smoothness, optionally vary slightly
        const interval = variableSpeed ? getRandomSpeed() : charIntervalRef.current;

        while (accumulatorRef.current >= interval) {
          accumulatorRef.current -= interval;

          if (!isDeletingRef.current) {
            if (currentCharIndexRef.current < processedText.length) {
              const nextChar = processedText[currentCharIndexRef.current];
              setDisplayedText(prev => {
                displayedTextRef.current = prev + nextChar;
                return displayedTextRef.current;
              });
              currentCharIndexRef.current += 1;
              setCurrentCharIndex(currentCharIndexRef.current);
            } else {
              // Finished typing current text
              setIsFinished(true);
              if (onSentenceComplete) {
                onSentenceComplete(textArray[currentTextIndexRef.current], currentTextIndexRef.current);
              }

              if (textArray.length > 1 && loop) {
                // Begin deletion after pause
                const pauseUntil = now + pauseDuration;
                const waitPause = () => {
                  if (performance.now() >= pauseUntil) {
                    isDeletingRef.current = true;
                    setIsDeleting(true);
                  } else {
                    requestAnimationFrame(waitPause);
                  }
                };
                requestAnimationFrame(waitPause);
              } else {
                // Stop loop
                if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
                return;
              }
            }
          } else {
            // Deleting path (for looping text arrays)
            if (displayedTextRef.current.length > 0) {
              setDisplayedText(prev => {
                displayedTextRef.current = prev.slice(0, -1);
                return displayedTextRef.current;
              });
            } else {
              isDeletingRef.current = false;
              setIsDeleting(false);
              // Advance to next text
              if (currentTextIndexRef.current === textArray.length - 1 && !loop) {
                if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
                rafIdRef.current = null;
                return;
              }
              setCurrentTextIndex(prev => {
                const nextIndex = (prev + 1) % textArray.length;
                currentTextIndexRef.current = nextIndex;
                return nextIndex;
              });
              setCurrentCharIndex(0);
              currentCharIndexRef.current = 0;
            }
          }
        }

        rafIdRef.current = requestAnimationFrame(loopFn);
      };

      rafIdRef.current = requestAnimationFrame(loopFn);
    };

    let startDelayTimeout: ReturnType<typeof setTimeout> | null = null;
    if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
      startDelayTimeout = setTimeout(startLoop, initialDelay);
    } else {
      startLoop();
    }

    return () => {
      if (startDelayTimeout) clearTimeout(startDelayTimeout);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
      lastTimeRef.current = null;
      accumulatorRef.current = 0;
    };
  }, [
    isVisible,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    textArray,
    currentTextIndex,
    loop,
    initialDelay,
    reverseMode,
    variableSpeed,
    onSentenceComplete
  ]);

  const shouldHideCursor =
    (hideCursorWhileTyping && (currentCharIndex < textArray[currentTextIndex].length || isDeleting)) || isFinished;

  if (preserveLayout) {
    return (
      <Component
        ref={containerRef}
        className={`text-type relative inline-block ${className}`}
        {...props}
      >
        {/* Invisible text to reserve space */}
        <span className="invisible" aria-hidden="true">
          {textArray[currentTextIndex]}
        </span>
        
        {/* Visible typing text overlay */}
        <span className="absolute inset-0 top-0 left-0">
          <ShinyText
            text={displayedText}
            disabled={!shimmerOnComplete || !isFinished}
            speed={3}
            className={className}
          />
          {showCursor && (
            <span
              ref={cursorRef}
              className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
            >
              {cursorCharacter}
            </span>
          )}
        </span>
      </Component>
    );
  }

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `text-type ${className}`,
      ...props
    },
    <ShinyText
      text={displayedText}
      disabled={!shimmerOnComplete || !isFinished}
      speed={3}
      className={className}
    />,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
