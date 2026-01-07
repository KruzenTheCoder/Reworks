"use client";
import Button from '@/components/common/Button'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, memo } from 'react'
import Image from 'next/image'
import { User, Target, Users, Settings, Linkedin } from 'lucide-react'
import TypewriterText from "../ui/TypewriterText"

// Using shared TypewriterText to ensure text always renders

// External portrait images mapped by display name
const portraits: Record<string, string> = {
  "Moshe Sender": "https://i.ibb.co/hxrkbZcm/Moshe-Sender-Dark-2.png",
  "Faigy Weinstock": "https://i.ibb.co/6JY7hCMg/Faigy-Dark-2.png",
  // Leadership additions
  "Eli Schleifer": "https://i.ibb.co/60MQWNwH/Eli-Schleifer.webp",
  "Mindy Schiff": "https://i.ibb.co/S7KDWxNK/Mindy-Schiff.webp",
  // Sales Team
  "Meir Kaufman": "https://i.ibb.co/8Ddy1jxM/Meir-Kaufman.webp",
  "Isaac Conick": "https://i.ibb.co/p6zQZjqF/Isaac-Conick.png",
  "Shmuel Rabinowitz": "https://i.ibb.co/1Y5y3Hjn/Shmuel-Rabinowitz.png",
  "Daniel Rabson": "https://i.ibb.co/NdKYT3zR/Daniel-Rabson-1.png",
  "Sammy Piller": "https://i.ibb.co/dJfzvKjk/Sarah-Tauber-1.png",
  // Management Team
  "Travis Marshall": "https://i.ibb.co/Qjv7jXHc/Travis-Marshall.png",
  "Xandria Erasmus": "https://i.ibb.co/k6Vgv7hV/Xandria-Erasmus.png",
  "Ken Aquitan": "https://i.ibb.co/1fZxGVHT/Ken-Aquitan.png",
  "Sarah Tauber": "https://i.ibb.co/dJfzvKjk/Sarah-Tauber-1.png",
  "Chane du Toit": "https://i.ibb.co/NnZ1PSn3/Chane-1.png",
  "Subhaana Malek": "https://i.ibb.co/QFHCJrqK/Subhanna.png",
  // Recruiters
  "Janique Bruyns": "https://i.ibb.co/9mDdb4b7/Janique-Bruyns.png",
  "Kaylin Lavelot": "https://i.ibb.co/v4tr2tNx/Kaylin-Reworks.png",
  "Kayleigh Pontinhas": "https://i.ibb.co/ZzfH0LTz/Kayleigh-Pontin.png",
  "Kayleigh Pontin": "https://i.ibb.co/ZzfH0LTz/Kayleigh-Pontin.png",
  "Alicia Nadasen": "https://i.ibb.co/4ZHgjnLB/Alicia-Nadasen.png",
  "Alexandra May": "https://i.ibb.co/rG822sH0/Alexandra.png",
  "Rachelle Visser": "https://i.ibb.co/5hV3HHB4/Rachelle.png",
  "Nicole Erasmus": "https://i.ibb.co/8DRMxLfn/Nicole.png",
};

const getPortraitUrl = (name: string): string | undefined => portraits[name];

// Function to generate gradient based on name
const getGradientForName = (name: string): string => {
  const gradients = [
    'from-blue-400 to-indigo-600',
    'from-purple-400 to-pink-600',
    'from-green-400 to-teal-600',
    'from-orange-400 to-red-600',
    'from-cyan-400 to-blue-600',
    'from-violet-400 to-purple-600',
  ];
  const index = name.length % gradients.length;
  return gradients[index];
};

// Get initials from name
const getInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return parts[0][0] + parts[parts.length - 1][0];
  }
  return name.substring(0, 2).toUpperCase();
};

function AboutFull() {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const reduce = useReducedMotion();
  const placeholderSrc = "https://i.ibb.co/dJfzvKjk/Sarah-Tauber-1.png";
  const missionIcons = [Target, Users, Settings];
  const secondaryOrange = '#ff9442';

  return (
    <main className="overflow-hidden">
      {/* Intro */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl will-change-transform"
          whileInView={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 24,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut"
          }}
          viewport={{ amount: 0.3 }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-20">
          <motion.div 
            ref={introRef}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={introInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <TypewriterText 
                text="We know what winning teams are made of." 
                speed={40}
              />
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={introInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              We transform businesses by combining smart outsourcing with big-picture strategy to drive real results. We don't just fill positions – we handpick your team and streamline your operations, to truly optimize your processes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The people behind your success */}
      <section className="py-20 bg-transparent relative overflow-hidden">
        {/* Subtle background animation */}
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-600/5 rounded-full blur-3xl will-change-transform"
          whileInView={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: reduce ? 0 : Infinity,
            ease: "easeInOut"
          }}
          viewport={{ amount: 0.3 }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              <TypewriterText 
                text="The people behind your success" 
                speed={40}
              />
            </h2>
            <motion.p 
              className="mt-4 text-lg text-gray-700 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              ReWorks Solutions pairs specialized talent with efficient operations. Get the billing, logistics, and data teams you need at lower costs, while optimizing how work gets done. Scale on demand and drive sustainable growth.
            </motion.p>
          </motion.div>

          {/* Leadership - Big card styled with avatar initials and portrait */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Moshe Sender",
                role: "CEO",
                bio: "Moshe connects businesses with growth opportunities, leveraging strategic relationships and keen insight. He goes beyond hiring, recognizing how the right talent and ambitious goals drive transformation.",
                quote: "ReWorks is not just about providing employees – it's about building your crew, understanding where your company is going, and helping you grow bigger, faster. That's our mission.",
                linkedin: "https://www.linkedin.com/in/moshe-sender-70b11b267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              },
              {
                name: "Faigy Weinstock",
                role: "COO",
                bio: "Faigy brings hands-on experience in managing remote teams, with deep insight into seamless workflows. She perfects operations through strategic team building and process optimization.",
                quote: "I have hands-on experience leading remote operations. I know what drives and motivates people. This isn't about matching resumes – I invest deeply in every business I work with.",
                linkedin: "https://www.linkedin.com/in/faigy-weinstock-739a87318?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              }
            ].map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden group"
              >
                {/* Top accent line - Fixed positioning */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue z-10"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                />

                {/* Hover shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />

                {/* Header: Circle avatar with initials and name-initials line */}
                <motion.div
                  className="relative z-20 flex items-center gap-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-[#0077b5] flex items-center justify-center ring-1 ring-gray-200 shadow-lg text-white hover:scale-110 transition-transform"
                    aria-label={`${leader.name} LinkedIn`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-slate-600 font-semibold">
                      {leader.role}
                    </p>
                  </div>
                </motion.div>

                <div className="relative z-20">
                  {/* Portrait photo (portrait layout; never cropped) */}
                  <motion.div
                    className="mt-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {getPortraitUrl(leader.name) ? (
                      <Image
                        // IMPROVED: Use next/image for external portraits for optimization and accessibility
                        src={getPortraitUrl(leader.name)!}
                        alt={`${leader.name} portrait`}
                        width={800}
                        height={1200}
                        sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxNSc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzE1JyBmaWxsPScjZjNmNGY2Jy8+PC9zdmc+"
                        className="w-full aspect-[2/3] max-h-[50vh] object-contain bg-white rounded-xl border border-gray-200 shadow-md"
                      />
                    ) : (
                      <Image
                        src={placeholderSrc}
                        alt={`${leader.name} portrait placeholder`}
                        width={800}
                        height={1200}
                        sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxNSc+PHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzE1JyBmaWxsPScjZjNmNGY2Jy8+PC9zdmc+"
                        className="w-full aspect-[2/3] max-h-[50vh] object-contain bg-white rounded-xl border border-gray-200 shadow-md"
                      />
                    )}
                  </motion.div>

                  {/* Little saying directly below the image */}
                  <motion.blockquote 
                    className="mt-3 text-slate-800 italic border-l-4 border-primary-blue pl-4 bg-blue-50/50 py-2 rounded-r-lg text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.7 }}
                  >
                    "{leader.quote}"
                  </motion.blockquote>

                  {/* Bio below quote */}
                  <motion.p 
                    className="mt-3 text-gray-700 leading-relaxed text-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    {leader.bio}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sales Team */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TypewriterText 
                text="Meet The Sales Team" 
                speed={40}
                delay={300}
              />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Meir Kaufman', role: 'VP of Business Development' },
                { name: 'Isaac Conick', role: 'Director, Business Dev & Partnerships' },
                { name: 'Shmuel Rabinowitz', role: 'Regional Sales Director' },
                { name: 'Sammy Piller', role: 'Director of Sales' },
                { name: 'Daniel Rabson', role: 'Director of Strategic Operations' },
              ].map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-xl relative overflow-hidden group bg-white"
                >
                  {/* Top accent line - Fixed */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-blue z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Portrait image (portrait layout; never cropped) */}
                  <div className="relative z-20 mb-3">
                    {getPortraitUrl(person.name) ? (
                      <img
                        src={getPortraitUrl(person.name)!}
                        alt={`${person.name} portrait`}
                        width={600}
                        height={800}
                        className="w-full aspect-[3/4] object-contain bg-white rounded-xl border border-gray-200 shadow-md"
                      />
                    ) : (
                      <Image
                        src={placeholderSrc}
                        alt={`${person.name} portrait placeholder`}
                        width={600}
                        height={800}
                        className="w-full aspect-[3/4] object-contain bg-white rounded-xl border border-gray-200 shadow-md"
                      />
                    )}
                  </div>
                  <div className="relative z-20">
                    <div className="font-semibold text-gray-900 group-hover:gradient-text transition-all duration-300">
                      {person.name}
                    </div>
                    <div className="text-sm text-slate-700">
                      {person.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Management Team */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-text-base mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TypewriterText 
                text="Meet Our Management Team" 
                speed={40}
                delay={300}
              />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Travis Marshall', role: 'SA Team Lead' },
                { name: 'Sarah Tauber', role: 'Account Manager' },
                { name: 'Ken Aquitan', role: 'IT Operations Manager' },
                { name: 'Eli Schleifer', role: 'Director of Innovations' },
                { name: 'Mindy Schiff', role: 'Director – Medical Billing' },
                { name: 'Alicia Nadasen', role: 'HR Manager' },
                { name: 'Subhaana Malek', role: 'Contract Relations Supervisor' },
                { name: 'Chane du Toit', role: 'Bookkeeper' },
              ].map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="glass-card rounded-2xl p-5 transition-all duration-300 hover:shadow-xl relative overflow-hidden group bg-white"
                >
                  {/* Top accent line - Fixed */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-blue z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Portrait image (portrait layout; never cropped) */}
                  <div className="relative z-20 mb-3">
                    {getPortraitUrl(person.name) ? (
                      <img
                        src={getPortraitUrl(person.name)!}
                        alt={`${person.name} portrait`}
                        width={600}
                        height={800}
                        className="w-full aspect-[3/4] object-contain bg-white rounded-xl border border-slate-200 shadow-md"
                      />
                    ) : (
                      <Image
                        src={placeholderSrc}
                        alt={`${person.name} portrait placeholder`}
                        width={600}
                        height={800}
                        className="w-full aspect-[3/4] object-contain bg-white rounded-xl border border-slate-200 shadow-md"
                      />
                    )}
                  </div>
                  <div className="relative z-20">
                    <div className="font-semibold text-text-base group-hover:gradient-text transition-all duration-300">
                      {person.name}
                    </div>
                    <div className="text-sm text-text-muted">
                      {person.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recruiters */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-text-base mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TypewriterText 
                text="Meet Our Recruiters" 
                speed={40}
                delay={300}
              />
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Kayleigh Pontinhas', role: 'HR Assistant' },
                { name: 'Kaylin Lavelot', role: 'Strategic Talent Dev Manager' },
                { name: 'Alexandra May', role: 'Talent Acquisition Specialist' },
                { name: 'Rachelle Visser', role: 'Recruitment Administrator' },
                { name: 'Nicole Erasmus', role: 'Recruitment Administrator' },
              ].map((person, i) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  className="rounded-xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Top accent line - Fixed */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-blue to-accent-blue z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />
                  
                  {/* Portrait image (portrait layout; never cropped) */}
                  <div className="relative z-20 mb-3">
                    {getPortraitUrl(person.name) ? (
                      <img
                        src={getPortraitUrl(person.name)!}
                        alt={`${person.name} portrait`}
                        width={600}
                        height={800}
                        className="w-full aspect-[3/4] object-contain bg-white rounded-xl border border-gray-200 shadow-md"
                      />
                    ) : (
                      <Image
                        src={placeholderSrc}
                        alt={`${person.name} portrait placeholder`}
                        width={600}
                        height={800}
                        className="w-full aspect-[3/4] object-contain bg-white rounded-xl border border-gray-200 shadow-md"
                      />
                    )}
                  </div>
                  <div className="relative z-20">
                    <div className="font-semibold text-gray-900 group-hover:gradient-text transition-all duration-300">
                      {person.name}
                    </div>
                    <div className="text-sm text-slate-700">
                      {person.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission & Values */}
          <motion.div 
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <TypewriterText 
                text="Our mission and values" 
                speed={40}
                delay={300}
              />
            </motion.h3>
            <motion.p 
              className="mt-3 text-gray-700 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              We believe that outsourcing + robust strategy create a potent tool, and we're here to give it to you.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
              {[
                {
                  bg: "bg-blue-50",
                  border: "border-blue-100",
                  titleColor: "text-blue-900",
                  textColor: "text-blue-900/80",
                  title: "We see it through, from start to success.",
                  items: [
                    "We believe in our proven process – built to deliver results without cutting corners.",
                    "We're hands-on at every step, ensuring everything runs smoothly and efficiently."
                  ]
                },
                {
                  bg: "bg-slate-50",
                  border: "border-slate-200",
                  titleColor: "text-slate-900",
                  textColor: "text-slate-700",
                  title: "We work with people, not databases.",
                  items: [
                    "We believe teams are strongest when they interact seamlessly.",
                    "We lay a foundation of trust, loyalty, and productivity through open channels of communication."
                  ]
                },
                {
                  bg: "bg-white",
                  border: "border-gray-200",
                  titleColor: "text-gray-900",
                  textColor: "text-gray-700",
                  title: "We want you to feel the power of flow.",
                  items: [
                    "We believe in optimizing every aspect of your operations.",
                    "We help you perfect your systems – because you should never be bogged down by inefficiencies."
                  ]
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`rounded-2xl ${value.bg} border ${value.border} p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group text-center`}
                >
                  {(() => {
                    const Icon = missionIcons[index % missionIcons.length];
                    return (
                      <Icon size={28} className="mx-auto mb-2" style={{ color: secondaryOrange }} />
                    );
                  })()}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />

                  <h4 className={`relative z-20 text-lg font-bold ${value.titleColor} mb-3`}>
                    {value.title}
                  </h4>
                  <motion.p
                    className={`relative z-20 ${value.textColor} text-sm text-center`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    {value.items.join(" • ")}
                  </motion.p>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button href="/solutions" variant="ghost" size="lg">
                  VIEW OUR SERVICES
                </Button>
              </motion.div>
            </div>

  
        
        
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default memo(AboutFull)
