"use client";
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import MotionSection from "../ui/MotionSection";
import { Star } from 'lucide-react';

type Testimonial = {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote: "Reworks transformed our hiring velocity. We onboarded an exceptional EA in 10 days and saved 75% on costs. The quality of talent is simply unmatched.",
    author: "Alex Rivera",
    title: "COO",
    company: "FinTechCo",
    avatar: "AR",
    rating: 5,
  },
  {
    quote: "The talent quality is outstanding and support is truly ongoing—huge savings too. Our productivity increased by 200% after hiring through Reworks.",
    author: "Sofia Ahmed",
    title: "VP People",
    company: "GrowthLabs",
    avatar: "SA",
    rating: 5,
  },
  {
    quote: "We scaled our SDR team affordably without compromising performance. Best hiring decision we've made in years. ROI was immediate.",
    author: "Marcus Lee",
    title: "Head of Sales",
    company: "CloudWorks",
    avatar: "ML",
    rating: 5,
  },
  {
    quote: "Incredible experience from start to finish. The vetting process is thorough and the talent pool is world-class. Highly recommend!",
    author: "Emma Chen",
    title: "CTO",
    company: "TechFlow",
    avatar: "EC",
    rating: 5,
  },
  {
    quote: "Game-changer for our startup. We hired 3 developers in 2 weeks and they're all performing exceptionally. The cost savings are remarkable.",
    author: "David Park",
    title: "Founder",
    company: "InnovateLab",
    avatar: "DP",
    rating: 5,
  },
];

export default function Testimonials() {
  const duplicated = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <MotionSection className="relative bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 py-24 overflow-hidden" variant="fadeUp">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

        <div className="relative z-10 section-wrap">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text-base mb-4 font-display">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Join thousands of companies that have transformed their hiring with Reworks
          </p>
        </motion.div>

      </div>
      {/* Full-width, horizontally scrollable testimonials (edge-to-edge) */}
      <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth">
            <div className="flex gap-6 md:gap-8 px-6 md:px-8 lg:px-10 py-2">
              {duplicated.map((t, idx) => (
                <motion.div
                  key={`row1-${idx}-${t.author}`}
                  whileHover={{ y: -6 }}
                  className="snap-start min-w-[260px] sm:min-w-[320px] glass-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-muted text-sm mb-4">“{t.quote}”</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue flex items-center justify-center text-white font-bold mr-3">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-text-base">{t.author}</div>
                      <div className="text-text-muted text-sm">{t.title} · {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth">
            <div className="flex gap-6 md:gap-8 px-6 md:px-8 lg:px-10 py-2 flex-row-reverse">
              {duplicated.map((t, idx) => (
                <motion.div
                  key={`row2-${idx}-${t.author}`}
                  whileHover={{ y: -6 }}
                  className="snap-start min-w-[260px] sm:min-w-[320px] glass-card rounded-2xl p-5 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-text-muted text-sm mb-4">“{t.quote}”</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue flex items-center justify-center text-white font-bold mr-3">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-text-base">{t.author}</div>
                      <div className="text-text-muted text-sm">{t.title} · {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">4.9/5</div>
              <div className="text-sm text-text-muted">Average Rating</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">1000+</div>
              <div className="text-sm text-text-muted">Happy Clients</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">99%</div>
              <div className="text-sm text-text-muted">Success Rate</div>
            </div>
          </div>
        </motion.div>
    </MotionSection>
  );
}
