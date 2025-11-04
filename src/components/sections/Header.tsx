"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "@/components/common/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Solutions", href: "/solutions" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Hire", href: "/hire" },
  { label: "Jobs", href: "/jobs" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  
  // Smooth transformations based on scroll
  const headerBlur = useTransform(scrollY, [0, 100], [10, 20]);
  const headerBackgroundOpacity = useTransform(scrollY, [0, 100], [0.7, 0.85]);
  
  // Gradual size transformations (slimmer header)
  const headerPaddingY = useTransform(scrollY, [0, 100], [16, 12]); // py-4 to py-3
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.9]);
  const navItemPadding = useTransform(scrollY, [0, 100], [8, 6]);
  const buttonScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  
  // Container stays constrained and centered (avoid full-width feel)
  const containerMaxWidth = useTransform(
    scrollY, 
    [0, 200],
    ["80rem", "80rem"] // always max-w-7xl
  );
  
  // Keep horizontal padding steady for cleaner look
  const containerPaddingX = useTransform(
    scrollY, 
    [0, 200],
    [24, 24] // px-6 constant
  );
  
  // Always center the container
  const containerMarginX = useTransform(
    scrollY,
    [0, 200],
    ["auto", "auto"]
  );

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: useTransform(
          scrollY,
          [0, 100],
          ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.85)"]
        ),
        backdropFilter: useTransform(scrollY, [0, 100], ["blur(10px)", "blur(20px)"]),
        WebkitBackdropFilter: useTransform(scrollY, [0, 100], ["blur(10px)", "blur(20px)"]),
        borderBottom: useTransform(
          scrollY,
          [0, 50],
          ["0px solid rgba(255, 255, 255, 0)", "1px solid rgba(255, 255, 255, 0.2)"]
        ),
        boxShadow: useTransform(
          scrollY,
          [0, 100],
          ["0 0px 0px rgba(0, 0, 0, 0)", "0 4px 30px rgba(0, 0, 0, 0.1)"]
        ),
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Container with gradual width and centering transformation */}
      <motion.div
        style={{
          maxWidth: containerMaxWidth,
          marginLeft: containerMarginX,
          marginRight: containerMarginX,
        }}
      >
        <motion.div
          className="flex items-center justify-between"
          style={{
            paddingLeft: containerPaddingX,
            paddingRight: containerPaddingX,
            paddingTop: headerPaddingY,
            paddingBottom: headerPaddingY,
          }}
        >
          {/* Logo with smooth scale */}
          <motion.div 
            style={{ scale: logoScale }}
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
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
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden gap-2 md:flex items-center">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ padding: navItemPadding }}
                >
                  <Link
                    href={item.href}
                    className="relative group"
                  >
                    <motion.div
                      className={`relative px-3 py-1.5 rounded-full font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-text-base hover:text-primary-blue'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Glassmorphism background for active state - using original colors */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                          style={{
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          }}
                        />
                      )}
                      
                      {/* Hover effect for non-active items */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: 'rgba(59, 130, 246, 0.08)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            border: '1px solid rgba(59, 130, 246, 0.1)',
                          }}
                        />
                      )}
                      
                      <span className="relative z-10">{item.label}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* CTA Buttons with smooth scale */}
          <motion.div 
            className="hidden md:flex items-center gap-3"
            style={{ scale: buttonScale }}
          >
            <Button href="/contact" variant="luxury" size={isScrolled ? "sm" : "md"}>
              Start Hiring
            </Button>
            <Button href="/roles" variant="ghost" size={isScrolled ? "sm" : "md"}>
              Find a Job
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-text-base block absolute"
              animate={isMobileMenuOpen 
                ? { rotate: 45, y: 0 } 
                : { rotate: 0, y: -8 }
              }
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-base block absolute"
              animate={isMobileMenuOpen 
                ? { opacity: 0, scale: 0 } 
                : { opacity: 1, scale: 1 }
              }
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-text-base block absolute"
              animate={isMobileMenuOpen 
                ? { rotate: -45, y: 0 } 
                : { rotate: 0, y: 8 }
              }
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu with glassmorphism */}
      <motion.div
        className="md:hidden overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
        }}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-6 py-4 space-y-3">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0,
                  x: isMobileMenuOpen ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="block relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    className={`relative py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-text-base'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Glassmorphism background for active state - using original colors */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-blue to-accent-blue"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
          
          <motion.div 
            className="pt-4 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button href="/contact" variant="luxury" size="md" className="w-full">
              Start Hiring
            </Button>
            <Button href="/roles" variant="ghost" size="md" className="w-full">
              Find a Job
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
}
