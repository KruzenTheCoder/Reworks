"use client";
import Button from "@/components/common/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import TypewriterText from "../ui/TypewriterText";

export default function Hero() {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Begin fading earlier so content below appears sooner
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.6], [1, 0.92, 0]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section 
      id="home"
      ref={ref}
      className="relative min-h-[85vh] sm:min-h-screen overflow-hidden bg-transparent"
    >
      {/* Sleek animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(120deg, rgba(59,130,246,0.08), rgba(99,102,241,0.06))",
              "linear-gradient(120deg, rgba(99,102,241,0.08), rgba(59,130,246,0.06))",
              "linear-gradient(120deg, rgba(59,130,246,0.08), rgba(99,102,241,0.06))",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ willChange: "background" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0.6), transparent 70%)" }}
          animate={{ opacity: [0.9, 0.95, 0.9] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -top-32 -left-24 w-[60vw] h-[60vw] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.28), transparent 55%)" }}
          animate={{ scale: [1, 1.03, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-20vh] right-[-20vw] w-[55vw] h-[55vw] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.26), transparent 55%)" }}
          animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Smaller blurred orbs */}
        {[
          { w: 180, h: 180, top: '20%', left: '15%', bg: 'radial-gradient(circle, rgba(255,255,255,0.9), transparent 65%)', dur: 12 },
          { w: 140, h: 140, top: '60%', left: '80%', bg: 'radial-gradient(circle, rgba(147,197,253,0.85), transparent 65%)', dur: 14 },
          { w: 160, h: 160, top: '75%', left: '60%', bg: 'radial-gradient(circle, rgba(196,181,253,0.8), transparent 65%)', dur: 16 },
          { w: 120, h: 120, top: '10%', left: '70%', bg: 'radial-gradient(circle, rgba(255,255,255,0.85), transparent 65%)', dur: 10 },
          { w: 130, h: 130, top: '70%', left: '8%', bg: 'radial-gradient(circle, rgba(165,180,252,0.85), transparent 65%)', dur: 13 }
        ].map((o, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[60px]"
            style={{ width: o.w, height: o.h, top: o.top as any, left: o.left as any, background: o.bg }}
            animate={{ y: [0, -20, 0], scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}

        {/* Light rays */}
        {[10, 25, 45, 60, 75, 90].map((left, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${left}%`, width: 2, height: '150%', background: 'linear-gradient(to bottom, transparent 0%, rgba(147,197,253,0.3) 20%, rgba(196,181,253,0.5) 50%, rgba(147,197,253,0.3) 80%, transparent 100%)', opacity: 0.2 }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      {/* Parallax Content */}
      <motion.div 
        style={{ y: isMobile ? undefined : y, opacity: isMobile ? 1 : opacity }}
        className="relative z-10 flex min-h-[85vh] sm:min-h-screen items-center"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-16 sm:pt-20 pb-16 sm:pb-20">
          <div className="text-center">
            {/* Top badge removed per request to raise hero content */}

            {/* Main Heading with Enhanced Typewriter Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="mb-10"
            >
              <h1 className="mb-6 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-text-base font-display tracking-tight">
                <TypewriterText 
                  text="Premium Remote Staffing Without Compromise"
                  speed={25}
                  className="bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue bg-clip-text text-transparent gradient-animate"
                  caretHeightClass="h-12"
                  shimmerOnComplete={false}
                  onComplete={() => console.log("Hero title complete")}
                />
              </h1>

              {/* Subtle underline animation */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                className="h-1 bg-gradient-to-r from-primary-blue/30 via-accent-blue/50 to-primary-blue/30 rounded-full max-w-2xl mx-auto"
                style={{ transformOrigin: "center" }}
              />
            </motion.div>

            {/* Subtitle with Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="mb-14"
            >
              <p className="mb-12 mx-auto max-w-3xl text-base sm:text-xl text-text-muted leading-relaxed font-medium tracking-wide">
                Bringing you the top rigorously vetted, native English-speaking professionals,
                backed by white-glove management and powered by proactive support.
              </p>

              {/* CTA Buttons with Enhanced Spacing and Animations */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
                <Button href="contact" variant="luxury" size="lg" className="min-w-[340px]">
                  Schedule Your Free Consultation
                </Button>
                <Button href="solutions" variant="ghost" size="lg" className="min-w-[340px]">
                  Explore Solutions
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats: ReWorks By the Numbers with Enhanced Animations */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
            className="mt-14 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 max-w-5xl mx-auto px-2"
          >
              {[
                { number: "30% – 40%", label: "Increased Productivity" },
                { number: "Up to 70%", label: "Saving on Payroll" },
                { number: "98%", label: "Retention Rate" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.7, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.8 + index * 0.15,
                    type: "spring",
                    stiffness: 100,
                    damping: 10
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-3xl font-bold gradient-text font-display mb-2">
                    {stat.number}
                  </div>
                  <div className="text-text-muted font-medium text-sm tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-blue/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-blue rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
