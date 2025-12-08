"use client";
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import MotionSection from "../ui/MotionSection";
import { Star, X } from 'lucide-react';
import TypewriterText from "../ui/TypewriterText";

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
    quote: "ReWorks transformed our remote workforce. The quality and communication are unmatched. They truly feel like part of our team.",
    author: "Name",
    title: "Title",
    company: "Company",
    avatar: "NC",
    rating: 5,
  },
  {
    quote: "The continuous management and support make all the difference. We’ve saved millions without sacrificing service.",
    author: "Name",
    title: "Title",
    company: "Company",
    avatar: "NC",
    rating: 5,
  },
  {
    quote: "Exceptional candidates and seamless onboarding. Performance tracking keeps everyone aligned.",
    author: "Jane",
    title: "Ops Lead",
    company: "Healthcare Group",
    avatar: "JG",
    rating: 5,
  },
  {
    quote: "Communication is top-tier. Our clients notice the difference.",
    author: "Michael",
    title: "Director",
    company: "Pharma Co",
    avatar: "MC",
    rating: 4,
  },
  {
    quote: "Great value without compromising quality.",
    author: "Ava",
    title: "Founder",
    company: "MedTech",
    avatar: "AM",
    rating: 5,
  },
  {
    quote: "Reliable support and proactive coaching.",
    author: "Noah",
    title: "Manager",
    company: "E-Comm",
    avatar: "NM",
    rating: 4,
  },
];

export default function Testimonials() {
  const clientsInitial = useMemo(() => testimonials, []);
  const contractorsInitial = useMemo(() => testimonials.map(t => ({ ...t, title: "Contractor", company: "ReWorks" })), []);
  const [clientReviews, setClientReviews] = useState<Testimonial[]>(clientsInitial);
  const [contractorReviews, setContractorReviews] = useState<Testimonial[]>(contractorsInitial);
  const [clientForm, setClientForm] = useState({ author: "", title: "", company: "", quote: "", rating: 5 });
  const [contractorForm, setContractorForm] = useState({ author: "", title: "", company: "", quote: "", rating: 5 });
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const [contractorModalOpen, setContractorModalOpen] = useState(false);
  const clientsLoop = useMemo(() => [...clientReviews, ...clientReviews], [clientReviews]);
  const contractorsLoop = useMemo(() => [...contractorReviews, ...contractorReviews], [contractorReviews]);

  return (
    <MotionSection className="relative bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 py-24 overflow-hidden" variant="fadeUp">
      <div className="relative z-10 section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text-base mb-4 font-display">
            <TypewriterText text="Client Reviews" speed={28} caretHeightClass="h-12" className="title-gradient font-display" />
          </h2>
        </motion.div>

        <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mb-10">
          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {clientsLoop.map((t, idx) => (
              <div key={`client-marquee-${idx}-${t.author}`} className="min-w-[260px] sm:min-w-[320px] glass-card rounded-2xl p-5">
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
              </div>
            ))}
          </motion.div>
        </div>
        <div className="text-center mb-16">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setClientModalOpen(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue text-white font-semibold shadow"
          >
            Leave a Client Review
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text-base mb-4 font-display">
            <TypewriterText text="Contractor Reviews" speed={28} caretHeightClass="h-12" className="title-gradient font-display" />
          </h2>
        </motion.div>

        <div className="relative z-10 w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden mb-10">
          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {contractorsLoop.map((t, idx) => (
              <div key={`contractor-marquee-${idx}-${t.author}`} className="min-w-[260px] sm:min-w-[320px] glass-card rounded-2xl p-5">
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
              </div>
            ))}
          </motion.div>
        </div>
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setContractorModalOpen(true)}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue text-white font-semibold shadow"
          >
            Leave a Contractor Review
          </motion.button>
        </div>

        {clientModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold">Submit Client Review</h3>
                <button aria-label="Close" onClick={() => setClientModalOpen(false)} className="p-2 rounded hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!clientForm.author.trim() || !clientForm.quote.trim()) return;
                  setClientReviews(prev => [{
                    quote: clientForm.quote,
                    author: clientForm.author,
                    title: clientForm.title || "",
                    company: clientForm.company || "",
                    avatar: clientForm.author.slice(0,2).toUpperCase(),
                    rating: clientForm.rating
                  }, ...prev]);
                  setClientForm({ author: "", title: "", company: "", quote: "", rating: 5 });
                  setClientModalOpen(false);
                }}
                className="px-6 py-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input value={clientForm.author} onChange={e=>setClientForm({...clientForm, author:e.target.value})} placeholder="Your Name" className="px-4 py-3 rounded-xl border border-gray-200" />
                  <input value={clientForm.title} onChange={e=>setClientForm({...clientForm, title:e.target.value})} placeholder="Title" className="px-4 py-3 rounded-xl border border-gray-200" />
                  <input value={clientForm.company} onChange={e=>setClientForm({...clientForm, company:e.target.value})} placeholder="Company" className="px-4 py-3 rounded-xl border border-gray-200" />
                  <select value={clientForm.rating} onChange={e=>setClientForm({...clientForm, rating: Number(e.target.value)})} className="px-4 py-3 rounded-xl border border-gray-200">
                    {[5,4,3,2,1].map(r=> <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <textarea value={clientForm.quote} onChange={e=>setClientForm({...clientForm, quote:e.target.value})} placeholder="Your review" className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4" rows={4} />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setClientModalOpen(false)} className="px-5 py-2 rounded-full border border-gray-300">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue text-white font-semibold">Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {contractorModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-200"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <h3 className="font-semibold">Submit Contractor Review</h3>
                <button aria-label="Close" onClick={() => setContractorModalOpen(false)} className="p-2 rounded hover:bg-gray-100">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!contractorForm.author.trim() || !contractorForm.quote.trim()) return;
                  setContractorReviews(prev => [{
                    quote: contractorForm.quote,
                    author: contractorForm.author,
                    title: contractorForm.title || "",
                    company: contractorForm.company || "",
                    avatar: contractorForm.author.slice(0,2).toUpperCase(),
                    rating: contractorForm.rating
                  }, ...prev]);
                  setContractorForm({ author: "", title: "", company: "", quote: "", rating: 5 });
                  setContractorModalOpen(false);
                }}
                className="px-6 py-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <input value={contractorForm.author} onChange={e=>setContractorForm({...contractorForm, author:e.target.value})} placeholder="Your Name" className="px-4 py-3 rounded-xl border border-gray-200" />
                  <input value={contractorForm.title} onChange={e=>setContractorForm({...contractorForm, title:e.target.value})} placeholder="Role" className="px-4 py-3 rounded-xl border border-gray-200" />
                  <input value={contractorForm.company} onChange={e=>setContractorForm({...contractorForm, company:e.target.value})} placeholder="Company" className="px-4 py-3 rounded-xl border border-gray-200" />
                  <select value={contractorForm.rating} onChange={e=>setContractorForm({...contractorForm, rating: Number(e.target.value)})} className="px-4 py-3 rounded-xl border border-gray-200">
                    {[5,4,3,2,1].map(r=> <option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <textarea value={contractorForm.quote} onChange={e=>setContractorForm({...contractorForm, quote:e.target.value})} placeholder="Your review" className="w-full px-4 py-3 rounded-xl border border-gray-200 mb-4" rows={4} />
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setContractorModalOpen(false)} className="px-5 py-2 rounded-full border border-gray-300">Cancel</button>
                  <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-primary-blue to-accent-blue text-white font-semibold">Submit</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </MotionSection>
  );
}
