"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ClientScrollTop() {
  const pathname = usePathname();
  const isFirstMount = useRef(true);
  
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // Prevent restoring previous scroll position
        if ("scrollRestoration" in history) {
          history.scrollRestoration = "manual";
        }
        
        // Only force scroll on initial mount
        if (isFirstMount.current) {
          isFirstMount.current = false;
          
          // Small delay to ensure DOM is ready and animations can initialize
          requestAnimationFrame(() => {
            // If arriving with a hash (e.g., #faq), strip it to avoid auto-anchor scroll
            if (window.location.hash) {
              const urlWithoutHash = window.location.pathname + window.location.search;
              history.replaceState(null, "", urlWithoutHash);
            }
            
            window.scrollTo({ top: 0, behavior: "instant" });
            
            // Trigger a small scroll to activate any intersection observers
            setTimeout(() => {
              window.scrollBy({ top: 1, behavior: "instant" });
              window.scrollBy({ top: -1, behavior: "instant" });
            }, 100);
          });
        }
      }
    } catch (error) {
      console.error("Scroll initialization error:", error);
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && !isFirstMount.current) {
        // Use requestAnimationFrame to ensure smooth transition
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: "instant" });
          
          // Re-trigger intersection observers after navigation
          setTimeout(() => {
            window.scrollBy({ top: 1, behavior: "instant" });
            window.scrollBy({ top: -1, behavior: "instant" });
          }, 50);
        });
      }
    } catch (error) {
      console.error("Route change scroll error:", error);
    }
  }, [pathname]);

  return null;
}