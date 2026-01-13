"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/Button";
import { useState, useEffect, useRef } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Solutions", href: "/solutions" },
  { label: "Contact", href: "/contact" },
  { label: "Hire", href: "/hire" },
  { label: "Jobs", href: "/jobs" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  // IMPROVED: Lock body scroll and add Escape close when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // Prevent background scroll
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEsc);

    // Focus trap within mobile menu
    const container = menuRef.current;
    if (!container) return; // Guard clause if ref is null
    
    const focusables = Array.from(container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )) as HTMLElement[];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", trap);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", trap);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        isScrolled ? 'bg-white/95 border-b border-black/5 shadow-sm' : 'bg-white/85'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="ReWorks Solutions"
            width={140}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'text-white bg-gradient-to-r from-primary-blue to-accent-blue' : 'text-text-base hover:text-primary-blue'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            href="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU"
            target="_blank"
            rel="noopener noreferrer"
            variant="luxury"
            size="md"
          >
            Start Hiring
          </Button>
          <Button href="/roles" variant="ghost" size="md">
            Find a Job
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          className="md:hidden relative w-11 h-11 flex flex-col justify-center items-center rounded-md focus-visible:ring-2 focus-visible:ring-blue-500"
          onClick={() => setIsMobileMenuOpen(v => !v)}
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`w-6 h-0.5 bg-text-base block absolute transition-transform duration-200 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-base block absolute transition-all duration-200 ${
              isMobileMenuOpen ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-text-base block absolute transition-transform duration-200 ${
              isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
            }`}
          />
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-white/95 border-t border-black/5 ${
          isMobileMenuOpen ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-4 space-y-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`block py-3 px-4 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'text-white bg-gradient-to-r from-primary-blue to-accent-blue' : 'text-text-base hover:bg-black/5'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 grid grid-cols-2 gap-3">
            <Button
              href="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU"
              target="_blank"
              rel="noopener noreferrer"
              variant="luxury"
              size="md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Start Hiring
            </Button>
            <Button href="/roles" variant="ghost" size="md" onClick={() => setIsMobileMenuOpen(false)}>
              Find a Job
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
