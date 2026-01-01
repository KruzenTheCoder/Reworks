"use client";
import FinalCTA from '@/components/sections/FinalCTA'
import MotionSection from '@/components/ui/MotionSection'
import Button from '@/components/common/Button'
import TypewriterText from '@/components/ui/TypewriterText'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
// FIX: Remove client-side metadata export (only allowed in server files)

export default function Page() {
  return (
    <main>
      {/* Hero */}
      <MotionSection className="relative overflow-hidden" variant="fadeUp">
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
              >
                <TypewriterText text="Book a call. Build a world-class team." speed={28} caretHeightClass="h-10" shimmerOnComplete />
              </motion.h1>
              <p className="mt-6 text-lg text-gray-700 max-w-xl">We’ll help you hire vetted, native English-speaking professionals, guided by hands-on account managers and proactive support.</p>
              <div className="mt-8 flex gap-4">
                <Button href="#contact-form" variant="luxury" size="lg">Start Hiring</Button>
                <Button href="/faq" variant="ghost" size="lg">Browse FAQs</Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-700">
                <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"/>Live productivity tracking</span>
                <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"/>White-glove management</span>
                <span className="inline-flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"/>HIPAA compliant</span>
              </div>
            </div>
            <div className="relative">
              <div className="glass-card rounded-2xl p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="rounded-xl p-5 bg-gradient-to-br from-blue-600 to-accent-blue text-white">
                    <h3 className="font-semibold">Email</h3>
                    <p className="mt-1 opacity-90">info@reworkssolutions.com</p>
                  </div>
                  <div className="rounded-xl p-5 bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                    <h3 className="font-semibold">Phone</h3>
                    <p className="mt-1 opacity-90">+1 845-210-6070</p>
                  </div>
                  {/* Hours removed per requirements */}
                  <div className="rounded-xl p-5 bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                    <h3 className="font-semibold">Coverage</h3>
                    <p className="mt-1 opacity-90">South Africa & Philippines</p>
                  </div>
                  <a
                    href="https://wa.me/19299229429"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl p-5 bg-gradient-to-br from-blue-600 to-accent-blue text-white"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="w-5 h-5" />
                      <h3 className="font-semibold">WhatsApp</h3>
                    </div>
                    <p className="opacity-90">+1 929-922-9429</p>
                  </a>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <Button href="#contact-form" variant="primary" size="md">Book a Call</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Contact Form */}
      <section id="contact-form" className="py-24 bg-transparent">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-200 shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your hiring needs</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-3" placeholder="Full name" />
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-3" placeholder="Company" />
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-3 md:col-span-2" placeholder="Email" />
                  <input className="w-full border border-gray-200 rounded-lg px-4 py-3 md:col-span-2" placeholder="Phone" />
                  <textarea className="w-full border border-gray-200 rounded-lg px-4 py-3 md:col-span-2" placeholder="What roles are you hiring for?" rows={5} />
                  <div className="md:col-span-2">
                    <Button variant="primary" size="lg">Send Request</Button>
                  </div>
                </form>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl bg-blue-50 border border-blue-100 p-6">
                <h3 className="font-bold text-blue-900">What happens next?</h3>
                <ul className="mt-4 space-y-2 text-blue-900/80 text-sm">
                  <li>• A specialist reaches out within 1 business day</li>
                  {/* Removed salaries and timelines bullet per requirements */}
                  <li>• You meet vetted candidates and interview quickly</li>
                </ul>
              </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900">Prefer to schedule?</h3>
                    <p className="mt-2 text-slate-700">Pick a time that works for you and we’ll take care of the rest.</p>
                    <Button href="#" variant="ghost" size="md" className="mt-4">Open Scheduler</Button>
                  </div>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  )
}
