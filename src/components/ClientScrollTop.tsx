"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientScrollTop() {
  const pathname = usePathname();
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Prevent restoring previous scroll position
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "manual";
        }
        // If arriving with a hash (e.g., #faq), strip it to avoid auto-anchor scroll
        if (window.location.hash) {
          const urlWithoutHash = window.location.pathname + window.location.search;
          history.replaceState(null, "", urlWithoutHash);
        }
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    } catch {}
  }, []);

  // Also scroll to top on route change (excluding hash-only navigation)
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    } catch {}
  }, [pathname]);

  return null;
}
