"use client";
import { motion } from "framer-motion";
import MotionSection from "../ui/MotionSection";
import { Zap, Shield, Globe, ArrowRight, PlayCircle } from "lucide-react";
import Button from "@/components/common/Button";
import PixelBlast from "@/components/PixelBlast";

export default function FinalCTA() {
  return (
    <MotionSection className="relative bg-gradient-to-br from-primary-blue via-blue-700 to-indigo-800 text-white py-24 overflow-hidden" variant="fadeUp">
      {/* PixelBlast Background (disabled on mobile to prevent black overlay issues) */}
      <div className="absolute inset-0 hidden md:block">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
          style={{ width: '100%', height: '100%', position: 'relative' }}
        />
      </div>

      <div className="relative z-10 section-wrap">
        <div className="text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 
              className="text-4xl lg:text-6xl font-bold mb-6 font-display"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to hire{" "}
              <motion.span 
                className="relative inline-block"
                whileHover={{ scale: 1.05 }}
              >
                <span style={{ color: '#ff9442' }}>
                  top global talent?
                </span>
                <motion.div
                  className="absolute -bottom-2 left-0 h-1 rounded-full"
                  style={{ backgroundColor: '#ff9442' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Book a call today. It's fast, flexible, and fully supported.
              <br />
        <span className="font-semibold" style={{ color: '#ff9442' }}>Trusted by thousands of Companies Worldwide</span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons - Enhanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            {/* Primary CTA - Orange gradient CTA to external Zoho form */}
            <motion.a
              href="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff9442] via-[#cc6f24] to-[#0a0a0a] rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2 bg-gradient-to-r from-[#ff9442] via-[#cc6f24] to-[#0a0a0a] text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 group-hover:shadow-orange-400/40 overflow-hidden btn-shimmer">
                <span className="text-lg">Start Hiring Now</span>
                {/* Static icon (no animation) */}
                <ArrowRight className="w-5 h-5" />
              </div>
            </motion.a>
            
            {/* Secondary CTA - Glass effect */}
            <motion.a
              href="#demo"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2 px-8 py-4 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-semibold shadow-xl transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/50 group-hover:shadow-white/20">
                <PlayCircle className="w-5 h-5" />
                <span className="text-lg">Watch Demo</span>
              </div>
              {/* Glass shine effect */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.5), transparent 70%)',
                }}
              />
            </motion.a>
          </motion.div>

          {/* Alternative styled buttons if you prefer using the Button component */}
          {/* <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />
              <Button
                href="/contact"
                className="relative !bg-gradient-to-r !from-yellow-400 !to-orange-400 !text-blue-900 !border-0 !font-bold !shadow-2xl hover:!shadow-yellow-400/50"
                size="lg"
              >
                Start Hiring Now →
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                href="#demo"
                className="!bg-white/10 !backdrop-blur-sm !text-white !border-2 !border-white/30 hover:!bg-white/20 hover:!border-white/50 !shadow-xl"
                size="lg"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div> */}

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, title: "48-Hour Setup", desc: "Get started in less than 2 days" },
              { icon: Shield, title: "Zero Risk", desc: "30-day money-back guarantee" },
              { icon: Globe, title: "Global Talent", desc: "Access to 50+ countries" }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30">
                  {/* Static icon (no hover animation) */}
                  <div className="mb-3" style={{ color: '#ff9442' }}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-white/60 text-sm">
              Trusted by startups to Fortune 500 companies worldwide
            </p>
          </motion.div>
        </div>
      </div>
    </MotionSection>
  );
}
