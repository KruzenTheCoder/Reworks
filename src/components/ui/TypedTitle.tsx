"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

type TypedTitleProps = {
  text: string | string[];
  className?: string;
  typeSpeed?: number; // ms per character
  backSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
};

export default function TypedTitle({
  text,
  className = "text-3xl font-bold text-text-base",
  typeSpeed = 32,
  backSpeed = 18,
  loop = false,
  showCursor = true,
}: TypedTitleProps) {
  const elRef = useRef<HTMLSpanElement | null>(null);
  const typedRef = useRef<Typed | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!isClient || prefersReduced) return;
    const strings = Array.isArray(text) ? text : [text];

    if (elRef.current) {
      typedRef.current = new Typed(elRef.current, {
        strings,
        typeSpeed,
        backSpeed,
        loop,
        showCursor,
        cursorChar: "|",
        smartBackspace: true,
      });
    }

    return () => {
      typedRef.current?.destroy();
      typedRef.current = null;
    };
  }, [text, typeSpeed, backSpeed, loop, showCursor, isClient, prefersReduced]);

  if (prefersReduced) {
    const staticText = Array.isArray(text) ? text[0] : text;
    return <span className={className}>{staticText}</span>;
  }

  return <span ref={elRef} className={className} />;
}

