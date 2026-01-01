import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ClientScrollTop from "@/components/ClientScrollTop";
import GlobalBlur from "@/components/visuals/GlobalBlur";
import { Suspense } from "react";
import ClientSplashCursor from "@/components/ui/ClientSplashCursor";
import ColorBloom from "@/components/visuals/ColorBloom";
//import ScrollStack from "@/components/visuals/ScrollStack";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReWorks Solution – Premium Remote Staffing & Outsourcing",
    template: "%s · ReWorks",
  },
  description:
    "ReWorks Solutions provides rigorously vetted, native English-speaking remote professionals backed by white-glove management and proactive support.",
  applicationName: "ReWorks",
  keywords: [
    "ReWorks",
    "remote staffing",
    "outsourcing",
    "BPO",
    "HIPAA",
    "healthcare staffing",
    "customer support",
    "virtual assistants",
    "back office",
    "HR outsourcing",
  ],
  authors: [{ name: "ReWorks Solutions" }],
  creator: "ReWorks Solutions",
  publisher: "ReWorks Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "ReWorks – Premium Remote Staffing & Outsourcing",
    description:
      "Rigorously vetted professionals, white-glove management, proactive support.",
    siteName: "ReWorks",
    images: [{ url: "/logo.svg", width: 1200, height: 630, alt: "ReWorks" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReWorks – Premium Remote Staffing",
    description: "Build your dream team with vetted remote professionals.",
    images: ["/logo.svg"],
  },
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  category: "Business",
  alternates: { canonical: "/" },
};

export const viewport = {
  themeColor: "#0f6abf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const enableSplashCursor = process.env.NEXT_PUBLIC_ENABLE_SPLASH_CURSOR === "true";
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} antialiased font-sans overflow-x-hidden min-w-[320px]`}
      >
        {/* Mount global scroll control immediately */}
        <ClientScrollTop />
        <ColorBloom />
        
        {/* Fixed header */}
        <Header />
        
        {/* Main content wrapper */}
        <div className="relative">
          {/* Invisible spacer for fixed header - prevents content from hiding behind it */}
          <div className="h-[72px] pointer-events-none" aria-hidden="true" />
          
          {/* Main content */}
          <main className="relative z-0">
            {children}
          </main>
        </div>
        
        <Footer />
        
        {/* Live chat removed; use email contact in footer and contact page */}

        {/* Global splash cursor effect across the site (feature-flagged) */}
        {/* IMPROVED: Wrap lazy component in Suspense to avoid blocking UI */}
        {enableSplashCursor && (
          <Suspense fallback={null}>
            <ClientSplashCursor />
          </Suspense>
        )}

        {/* Site-wide bottom blur overlay that hides when footer is visible */}
        <GlobalBlur
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          disableOnRoutes={["/"]}
        />
      </body>
    </html>
  );
}
