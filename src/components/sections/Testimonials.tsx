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
  const [clientReviews, setClientReviews] = useState<Testimonial[]>(clientsInitial);
  const [clientForm, setClientForm] = useState({ author: "", title: "", company: "", quote: "", rating: 5 });
  const [clientModalOpen, setClientModalOpen] = useState(false);
  const clientsLoop = useMemo(() => [...clientReviews, ...clientReviews], [clientReviews]);
  const businesses = useMemo(() => ([
    { name: 'American Physiatry', href: 'https://americanphysiatry.com/' },
    { name: 'Intellistars ABA', href: 'https://www.intellistarsaba.com/' },
    { name: 'The Rite Care', href: 'https://theritecare.com/' },
    { name: 'StaffLion', href: 'https://stafflion.com/' },
    { name: 'Apex ABA', href: 'https://www.apexaba.com/' },
    { name: 'United Supply Corp', href: 'https://www.unitedsupplycorp.com/?srsltid=AfmBOopzqNnhFl4XWb5Xn57wvRiddrvW9nqzn-CKFMVN-Q_RpydpJBjh' },
    { name: 'FAFHC', href: 'https://fafhc.com/' },
    { name: 'Autumn Lake Healthcare', href: 'https://autumnlakehealthcare.com/' },
    { name: 'Ruby ABA', href: 'https://www.rubyaba.com/' },
    { name: '4MD Medical', href: 'https://4mdmedical.com/' },
    { name: 'Woodmere Financial', href: 'https://woodmerefinancial.com/' },
    { name: 'Kennedy ABA', href: 'https://www.kennedyaba.com/' },
    { name: 'Fame on Central', href: 'https://fameoncentral.com/' },
    { name: 'RXD Co', href: 'https://rxdco.com/' },
  ]), []);
  const businessesLoop = useMemo(() => [...businesses, ...businesses], [businesses]);

  return (
    <MotionSection className="relative bg-transparent py-24 overflow-hidden" variant="fadeUp">
      <div className="relative z-10 section-wrap">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-text-base mb-4 font-display">
            <TypewriterText text="Trusted By" speed={28} caretHeightClass="h-12" className="title-gradient font-display" />
          </h2>
          <p className="text-xl text-text-muted">Partners that trust in us.</p>
        </motion.div>

        <div className="relative z-10 w-full overflow-hidden mb-10">
          <motion.div
            className="flex gap-6 px-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            style={{ width: "max-content" }}
          >
            {businessesLoop.map((b, idx) => (
              <a
                key={`biz-marquee-${idx}-${b.name}`}
                href={b.href}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[200px] aspect-square rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group bg-gradient-to-br from-white/80 via-white/40 to-white/20 backdrop-blur-xl border border-white/60 shadow-lg hover:shadow-2xl hover:from-white/90 hover:to-white/40"
              >
                {/* Animated shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <img
                  src={
                    b.name === 'United Supply Corp' 
                      ? 'https://i.ibb.co/tTKppSR5/Whats-App-Image-2026-01-01-at-18-07-23.jpg'
                      : b.name === 'Woodmere Financial'
                      ? 'https://i.ibb.co/9kc6v0Lk/1766421829009.jpg'
                      : `https://www.google.com/s2/favicons?domain=${encodeURIComponent(b.href)}&sz=128`
                  }
                  alt={`${b.name} logo`}
                  className="w-16 h-16 object-contain rounded-xl drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-bold text-lg text-text-base text-center leading-tight">{b.name}</span>
              </a>
            ))}
          </motion.div>
        </div>
        {/* Reviews action removed; replaced with business grid */}

        

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

        
      </div>
    </MotionSection>
  );
}
