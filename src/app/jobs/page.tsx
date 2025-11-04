"use client";
import MotionSection from "@/components/ui/MotionSection";
import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/common/Button";
import { motion } from "framer-motion";

export default function JobsPage() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 via-blue-50/40 to-indigo-50/60">
      <MotionSection className="section-wrap" variant="fadeUp">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            <TypewriterText
              text="Find Your Next Remote Role"
              speed={32}
              caretHeightClass="h-10"
              shimmerOnComplete
            />
          </h1>
          <p className="text-lg text-text-muted max-w-3xl mx-auto">
            Join the top 1% of talent. Native English speakers with elite professionalism and proactive support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Open Roles", "How We Hire", "Perks & Support"].map((section, i) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="luxury-card glass-card rounded-2xl p-6"
            >
              <h3 className="text-xl font-semibold mb-2">{section}</h3>
              <p className="text-text-muted">We vet for skills, communication, and reliability.</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button href="/contact" variant="luxury" size="lg">
            Apply or Refer a Friend
          </Button>
        </div>
      </MotionSection>
    </div>
  );
}
