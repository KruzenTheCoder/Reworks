"use client";
import { motion, Variants, useInView, useReducedMotion } from "framer-motion";
import MotionSection from "../ui/MotionSection";
import Button from "../common/Button";
import { useRef, memo } from "react";
import TypewriterText from "../ui/TypewriterText";

// Using shared TypewriterText to ensure text always renders

const steps = [
  {
    number: 1,
    title: "Recruiting & Vetting",
    desc: [
      "We define your staffing needs.",
      "We source and test candidates.",
      "You interview your selected candidate, with our specialist present.",
    ],
  },
  {
    number: 2,
    title: "Onboarding & Training",
    desc: [
      "We provide expert guidance and best practices to integrate and optimize your outsourcing team.",
      "We clarify all expectations.",
      "We help streamline workflow.",
    ],
  },
  {
    number: 3,
    title: "Power Up!",
    desc: [
      "We bring your team together to fuel growth, efficiency, and momentum.",
      "We check in regularly to ensure any issues are promptly addressed.",
      "We provide screen monitoring to track productivity and performance.",
    ],
  },
];

function Process() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "0px" });
  const reduce = useReducedMotion();

  return (
    <MotionSection className="relative bg-transparent py-24 overflow-hidden" variant="fadeUp">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl will-change-transform"
          whileInView={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut"
          }}
          viewport={{ amount: 0.3 }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/15 to-indigo-600/15 rounded-full blur-2xl will-change-transform"
          whileInView={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 16,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut"
          }}
          viewport={{ amount: 0.3 }}
        />
        
        {/* Animated dots pattern */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.02 }}
          transition={{ duration: 2 }}
          viewport={{ amount: 0.3 }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </motion.div>
      </div>

      <div className="relative z-10 section-wrap">
        {/* Header with Typewriter */}
        <motion.div
          ref={headerRef}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-text-base mb-6 font-display"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TypewriterText 
              text="The ReWorks process: Thorough, logical, for extraordinary results" 
              speed={40}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-text-muted max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.5 }}
          >
            Transform your team's performance with our proven process for recruiting, onboarding, and optimizing remote talent
          </motion.p>
        </motion.div>

        {/* Process Steps - Centered 3 Column Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.1, margin: "0px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80
                }}
                whileHover={{ 
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-16 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-0.5"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  >
                    <div className="h-full bg-gradient-to-r from-primary-blue/40 via-primary-blue/20 to-transparent" />
                    <motion.div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary-blue rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 1.3 }}
                    />
                  </motion.div>
                )}

                {/* Card */}
                <div className="luxury-card glass-card rounded-3xl p-8 h-full group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl">
                  {/* Animated gradient background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 via-transparent to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  />
                  
                  {/* Top accent line */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Step number with animation */}
                  <motion.div 
                    className="relative z-10 mb-6 mx-auto flex h-20 w-20 items-center justify-center"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.8, type: "spring" }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-blue to-accent-blue rounded-2xl shadow-lg" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-2xl"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <span className="relative z-10 text-white text-2xl font-bold">
                      {step.number}
                    </span>
                  </motion.div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3 
                      className="mb-4 text-2xl font-bold text-text-base text-center group-hover:gradient-text transition-all duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <ul className="space-y-3">
                      {step.desc.map((d, i) => (
                        <motion.li 
                          key={i} 
                          className="flex items-start text-text-muted"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            duration: 0.4, 
                            delay: index * 0.2 + i * 0.1 + 0.4 
                          }}
                        >
                          <motion.span
                            className="inline-block w-1.5 h-1.5 bg-gradient-to-r from-primary-blue to-accent-blue rounded-full mr-3 mt-2 flex-shrink-0"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 0.3, 
                              delay: index * 0.2 + i * 0.1 + 0.5,
                              type: "spring",
                              stiffness: 200
                            }}
                          />
                          <span className="leading-relaxed">{d}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Hover shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['200% 0', '-200% 0'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Advantages Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "0px" }}
          transition={{ duration: 0.8 }}
          className="mt-24"
        >
          <motion.h3 
            className="text-3xl font-bold text-text-base text-center mb-12 font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TypewriterText 
              text="The ReWorks advantage – why choose us"
              speed={40}
              delay={500}
            />
          </motion.h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Momentum", desc: "We're agile and efficient, quickly setting up your team and ensuring smooth operations from the start." },
              { title: "Support", desc: "We're here to help, and we're proactive communicators – at every step." },
              { title: "Precision", desc: "We're detailed in our approach, delivering an extensive recruiting process with background checks." },
              { title: "Strategy", desc: "We're smart strategists, on a mission to maximize your workflows and boost efficiency." },
              { title: "Dedication", desc: "We're thoroughly committed to your goals, and we won't stop until we've got your perfect solution." },
              { title: "Reliability", desc: "We stay fully engaged and committed, ensuring consistent performance." },
            ].map((adv, i) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="luxury-card bg-white/70 backdrop-blur-xl rounded-2xl border border-white/30 p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-blue to-accent-blue"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                />
                
                <h4 className="font-bold text-lg text-text-base mb-3 group-hover:gradient-text transition-all duration-300">
                  {adv.title}
                </h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  {adv.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
          className="text-center mt-20"
        >
          <motion.p 
            className="text-lg text-text-muted mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're visionaries with high standards, and we'll set you up for peak performance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button href="/contact" variant="primary" size="lg" className="rounded-full shadow-xl hover:shadow-2xl">
              SCHEDULE A CONSULT
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </MotionSection>
  );
}

export default memo(Process)
