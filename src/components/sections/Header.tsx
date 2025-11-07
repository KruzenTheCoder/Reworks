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
  
  // Gradual padding transformations (keeping these for vertical spacing)
  const headerPaddingY = useTransform(scrollY, [0, 100], [16, 12]); // py-4 to py-3
  
  // MAIN CHANGE: Container starts at 90% width and gradually narrows to max-w-7xl
  const containerMaxWidth = useTransform(
    scrollY, 
    [0, 300], // Smooth transition over 300px of scroll
    ["90%", "80rem"] // Start at 90% width, end at max-w-7xl
  );
  
  // Horizontal padding adjusts with scroll - less padding when full width
  const containerPaddingX = useTransform(
    scrollY, 
    [0, 300],
    [24, 24] // Keep consistent padding (px-6)
  );
  
  // NAV SPACING: Links spread out more when header is wider
  const navGap = useTransform(
    scrollY,
    [0, 300],
    [16, 8] // Start with larger gap (gap-4), end with gap-2
  );
  
  // Individual nav item padding for better spacing
  const navItemPaddingX = useTransform(
    scrollY,
    [0, 300],
    [12, 8] // More horizontal padding when spread out
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
      {/* Container with gradual width transformation */}
      <motion.div
        className="mx-auto transition-all duration-300" // Always centered with smooth transition
        style={{
          maxWidth: containerMaxWidth,
          width: "100%", // Ensure it uses full available width up to maxWidth
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
          {/* Logo - no scaling */}
          <motion.div 
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

          {/* Desktop Navigation with dynamic spacing */}
          <motion.nav 
            className="hidden md:flex items-center"
            style={{
              gap: navGap, // Dynamic gap between nav items
            }}
          >
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="relative group"
                  >
                    <motion.div
                      className={`relative py-1.5 rounded-full font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-text-base hover:text-primary-blue'
                      }`}
                      style={{
                        paddingLeft: navItemPaddingX,
                        paddingRight: navItemPaddingX,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Glassmorphism background for active state */}
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
          </motion.nav>

          {/* CTA Buttons - no scaling */}
          <motion.div 
            className="hidden md:flex items-center gap-3"
          >
            <Button href="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU" target="_blank" rel="noopener noreferrer" variant="luxury" size="md">
              Start Hiring
            </Button>
            <Button href="/roles" variant="ghost" size="md">
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
                    {/* Glassmorphism background for active state */}
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
            <Button href="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU" target="_blank" rel="noopener noreferrer" variant="luxury" size="md" className="w-full">
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
