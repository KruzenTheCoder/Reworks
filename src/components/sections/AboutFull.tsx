"use client";
import Button from '@/components/common/Button'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'
import TypewriterText from "../ui/TypewriterText"

// Using shared TypewriterText to ensure text always renders

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

export default function AboutFull() {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const placeholderSrc = "/images/team/placeholder.svg";

  return (
    <main className="overflow-hidden">
      {/* Intro */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-100" />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-20">
          <motion.div 
            ref={introRef}
            className="max-w-3xl"
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
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background animation */}
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-purple-400/5 to-pink-600/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <motion.div 
            className="max-w-3xl"
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

          {/* Leadership */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Moshe Sender",
                role: "CEO",
                bio: "Moshe connects businesses with growth opportunities, leveraging strategic relationships and keen insight. He goes beyond hiring, recognizing how the right talent and ambitious goals drive transformation.",
                quote: "ReWorks is not just about providing employees – it's about building your crew, understanding where your company is going, and helping you grow bigger, faster. That's our mission."
              },
              {
                name: "Faigy Weinstock",
                role: "COO",
                bio: "Faigy brings hands-on experience in managing remote teams, with deep insight into seamless workflows. She perfects operations through strategic team building and process optimization.",
                quote: "I have hands-on experience leading remote operations. I know what drives and motivates people. This isn't about matching resumes – I invest deeply in every business I work with."
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

                {/* Profile Image */}
                <motion.div
                  className="relative z-20 flex items-center gap-4 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  <Image
                    src={placeholderSrc}
                    alt={`${leader.name} placeholder`}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover ring-1 ring-gray-200 shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-slate-600 font-semibold">
                      {leader.role}
                    </p>
                  </div>
                </motion.div>

                <div className="relative z-20">
                  <motion.p 
                    className="text-gray-700 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.6 }}
                  >
                    {leader.bio}
                  </motion.p>
                  <motion.blockquote 
                    className="mt-4 text-slate-800 italic border-l-4 border-primary-blue pl-4 bg-blue-50/50 py-2 rounded-r-lg"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.8 }}
                  >
                    "{leader.quote}"
                  </motion.blockquote>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sales Team */}
          <motion.div 
            className="mt-16"
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
                  
                  {/* Profile Image */}
                  <div className="relative z-20 flex items-center gap-3 mb-2">
                    <Image
                      src={placeholderSrc}
                      alt={`${person.name} placeholder`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200 shadow-md"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover:gradient-text transition-all duration-300">
                        {person.name}
                      </div>
                      <div className="text-sm text-slate-700">
                        {person.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Management Team */}
          <motion.div 
            className="mt-16"
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
                { name: 'Travis Marshall', role: 'Employee relations supervisor' },
                { name: 'Xandria Erasmus', role: 'Office Manager & Bookkeeper' },
                { name: 'Sarah Tauber', role: 'Account Manager' },
                { name: 'Ken Aquitan', role: 'IT Operations Manager' },
                { name: 'Eli Schleifer', role: 'Director of Innovations' },
                { name: 'Mindy Schiff', role: 'Director – Medical Billing' },
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
                  
                  {/* Profile Image */}
                  <div className="relative z-20 flex items-center gap-3 mb-2">
                    <Image
                      src={placeholderSrc}
                      alt={`${person.name} placeholder`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200 shadow-md"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-text-base group-hover:gradient-text transition-all duration-300">
                        {person.name}
                      </div>
                      <div className="text-sm text-text-muted">
                        {person.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recruiters */}
          <motion.div 
            className="mt-16"
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
                { name: 'Alicia Nadasen', role: 'Head of Recruitment & HR' },
                { name: 'Kayleigh Pontinhas', role: 'HR Assistant' },
                { name: 'Kaylin Lavelot', role: 'Strategic Talent Development Manager' },
                { name: 'Janique Bruyns', role: 'Talent Acquisition Specialist' },
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
                  
                  {/* Profile Image */}
                  <div className="relative z-20 flex items-center gap-3 mb-2">
                    <Image
                      src={placeholderSrc}
                      alt={`${person.name} placeholder`}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-gray-200 shadow-md"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 group-hover:gradient-text transition-all duration-300">
                        {person.name}
                      </div>
                      <div className="text-sm text-slate-700">
                        {person.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission & Values */}
          <motion.div 
            className="mt-20"
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
              className="mt-3 text-gray-700 max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              We believe that outsourcing + robust strategy create a potent tool, and we're here to give it to you.
            </motion.p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  className={`rounded-2xl ${value.bg} border ${value.border} p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue z-10"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: "left" }}
                  />

                  <h4 className={`relative z-20 text-lg font-bold ${value.titleColor} mb-4`}>
                    {value.title}
                  </h4>
                  <ul className={`relative z-20 space-y-2 ${value.textColor} text-sm`}>
                    {value.items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 + i * 0.1 + 0.3 }}
                        className="flex items-start"
                      >
                        <motion.span
                          className="inline-block w-1.5 h-1.5 bg-primary-blue rounded-full mr-3 mt-1.5 flex-shrink-0"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: index * 0.15 + i * 0.1 + 0.4,
                            type: "spring",
                            stiffness: 200
                          }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button href="/solutions" variant="primary" size="lg">
                VIEW OUR SERVICES
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
