"use client";
import Button from "@/components/common/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import { Rocket } from "lucide-react";
import TypewriterText from "../ui/TypewriterText";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Begin fading earlier so content below appears sooner
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.6], [1, 0.92, 0]);

  return (
    <section 
      id="home"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-400/25 to-blue-600/25 rounded-full blur-2xl"
          animate={{
            x: [0, 120, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Parallax Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex min-h-screen items-center"
      >
        <div className="mx-auto max-w-7xl px-6 pt-28 pb-20">
          <div className="text-center">
            {/* Animated Badge (Trusted-by pill) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 mb-8 inline-flex items-center rounded-full bg-white/80 backdrop-blur-sm px-6 py-2 text-sm font-medium text-primary-blue shadow-lg border border-white/20"
            >
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          Trusted by thousands of Companies Worldwide
            </motion.div>

            {/* Main Heading with Enhanced Typewriter Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="mb-10"
            >
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-text-base font-display tracking-tight">
                <TypewriterText 
                  text="Premium Remote Staffing Without Compromise"
                  speed={25}
                  className="bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue bg-clip-text text-transparent"
                  caretHeightClass="h-12"
                  shimmerOnComplete
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
              <p className="mb-12 mx-auto max-w-3xl text-lg sm:text-xl text-text-muted leading-relaxed font-medium tracking-wide">
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
                <Button href="#contact" variant="luxury" size="lg" className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Schedule Your Free Consultation
                </Button>
                <Button href="#solutions" variant="ghost" size="lg" className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Explore Solutions
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats: ReWorks By the Numbers with Enhanced Animations */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
              className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 max-w-5xl mx-auto"
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
