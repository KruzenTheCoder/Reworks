"use client";
import dynamic from "next/dynamic";

// Client-only wrapper to safely lazy-load SplashCursor in Server Components
const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
  loading: () => null,
});

export default function ClientSplashCursor() {
  return <SplashCursor />;
}

