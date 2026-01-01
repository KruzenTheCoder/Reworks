"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Youtube, Facebook, Music2, Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from 'lucide-react';

const navigationLinks = [
  { label: "About", href: "/about" },
  { label: "Solutions", href: "/solutions" },
  { label: "Process", href: "/process" },
  { label: "FAQ", href: "/faq" },
  { label: "Hire", href: "/hire" },
  { label: "Jobs", href: "/jobs" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/reworks-solutions/posts/?feedView=all", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/moshe_sender/", icon: Instagram },
  { name: "YouTube", href: "https://youtube.com/shorts/svVgPdOrnHo?feature=share", icon: Youtube },
  { name: "TikTok", href: "https://www.tiktok.com/@reworkssolutions", icon: Music2 },
  { name: "Facebook", href: "https://www.facebook.com/61571562601988/", icon: Facebook },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-white border-t border-gray-800 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Gradient Orbs for Depth */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />

      {/* Animated Top Border Gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content - 20% taller */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-16">
            {/* Brand - 2 columns */}
            <motion.div 
              className="md:col-span-2 flex flex-col items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/" className="block mb-3 group">
                <Image 
                  src="/logo.svg" 
                  alt="ReWorks Solutions" 
                  width={140} 
                  height={40} 
                  className="h-10 w-auto opacity-95 group-hover:opacity-100 transition-opacity" 
                  priority 
                />
              </Link>
              <p className="text-gray-300 text-base font-medium leading-relaxed mt-2 mb-8 interactive-title">
                Premium remote staffing<br />
                without compromise.
              </p>
              
              {/* Social Links with Glow Effect */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="relative w-11 h-11 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 group"
                    aria-label={social.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
                    <social.icon className="relative w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>

              {/* Decorative Line */}
              <div className="mt-8 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
            </motion.div>

            {/* Navigation - 2 columns split into 2 sub-columns */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full" />
                Quick Links
              </h3>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
                {navigationLinks.map((link, index) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 relative group inline-flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="absolute left-0 -bottom-1 w-0 h-px bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact - 2 columns */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                <span className="w-1 h-4 bg-blue-600 rounded-full" />
                Contact
              </h3>
              <div className="space-y-4">
                <a 
                  href="mailto:info@reworkssolutions.com" 
                  className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <div className="relative w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Mail className="relative w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform">info@reworkssolutions.com</span>
                </a>
                <a 
                  href="tel:+18452106070" 
                  className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <div className="relative w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Phone className="relative w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform">+1 845-210-6070</span>
                </a>
                <a 
                  href="https://wa.me/19299229429" 
                  className="flex items-center gap-3 text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="relative w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <MessageCircle className="relative w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="group-hover:translate-x-0.5 transition-transform">+1 929-922-9429</span>
                </a>
                {/* Physical address removed per requirements */}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-800/50 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="text-xs font-medium text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              © {currentYear} ReWorks Solutions. All rights reserved.
            </motion.div>
            <motion.div 
              className="flex items-center gap-6 text-xs font-medium text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <span className="relative inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 border border-gray-700/50 rounded-full text-[10px] font-semibold uppercase tracking-wider text-gray-300 overflow-hidden group">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <img
                  src="https://i.ibb.co/jkpyJ3FB/hipaa-compliant-logo-png-seeklogo-488323-1.png"
                  alt="HIPAA Compliant"
                  className="relative h-4 w-auto object-contain brightness-125 contrast-110 saturate-150 drop-shadow"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <span className="relative">HIPAA Compliant</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
