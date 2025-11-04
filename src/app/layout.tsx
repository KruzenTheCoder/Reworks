import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ClientWrapper from "@/components/ui/ClientWrapper";
import ChatWidget from "@/components/ui/ChatWidget";
import ClientScrollTop from "@/components/ClientScrollTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ReWorks – Premium Remote Staffing & Outsourcing",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} antialiased font-sans`}
      >
        {/* Mount global scroll control immediately so it runs before content gating/preloader */}
        <ClientScrollTop />
        <ClientWrapper>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientWrapper>
        <ChatWidget />
      </body>
    </html>
  );
}
