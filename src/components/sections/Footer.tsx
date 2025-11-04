"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Button from "@/components/common/Button";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="py-18">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
            {/* Brand Column */}
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/logo.svg"
                  alt="ReWorks Solutions"
                  width={160}
                  height={48}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-md">
                Premium Remote Staffing Without Compromise. Native English-speaking professionals, white-glove management, and proactive support.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Columns (spans two columns) */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-6">Navigation</h3>
              <ul className="grid grid-cols-2 gap-x-10 gap-y-4">
                {navigationLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <a href="mailto:info@reworkssolutions.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                    info@reworkssolutions.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <a href="tel:+18452106070" className="text-gray-300 hover:text-white transition-colors duration-300">
                    +1 845-210-6070
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span className="text-gray-300">
                    11C Monsey Blvd<br />
                    Monsey, NY 10952
                  </span>
                </div>
              </div>
              
              <div className="mt-8">
                <Button variant="primary" size="md" className="w-full">
                  SCHEDULE A CONSULT
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} ReWorks Solutions. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <span>HIPAA Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
