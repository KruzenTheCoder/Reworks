"use client";
import MotionSection from "@/components/ui/MotionSection";
import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/common/Button";
import { motion } from "framer-motion";

export default function HirePage() {
  return (
    <div className="min-h-[70vh] bg-transparent">
      <MotionSection className="section-wrap" variant="fadeUp">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <TypewriterText
              text="Hire World-Class Remote Talent"
              speed={32}
              caretHeightClass="h-10"
              shimmerOnComplete
              enabled={true}
            />
          </h1>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Tell us your goals and we’ll build a vetted, high-performing team around your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Role Discovery", "Talent Vetting", "White-Glove Onboarding"].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="luxury-card glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{step}</h3>
              <p className="text-text-muted">Our process ensures quality, fit, and speed.</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <div className="luxury-card glass-card rounded-2xl p-4 md:p-6 overflow-hidden">
            <div className="w-full rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm">
              <iframe
                title="ReWorks Hiring Form"
                src="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU?zf_rszfm=1"
                className="w-full h-[85vh] md:h-[75vh] border-0 mix-blend-multiply opacity-95"
                loading="lazy"
                style={{ filter: 'contrast(105%) saturate(95%)' }}
              />
            </div>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
