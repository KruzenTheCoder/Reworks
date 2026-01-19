import MotionSection from "@/components/ui/MotionSection";
import TypewriterText from "@/components/ui/TypewriterText";
import Button from "@/components/common/Button";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://reworkssolutions.com";

export const metadata: Metadata = {
  title: "Jobs — Remote Openings | ReWorks Solutions",
  description: "Browse our latest remote job openings on Workable.",
  alternates: { canonical: `${SITE_URL}/jobs` },
  openGraph: {
    type: "website",
    title: "Jobs — Remote Openings | ReWorks Solutions",
    description: "Browse our latest remote job openings on Workable.",
    url: `${SITE_URL}/jobs`,
  },
};

export default function JobsPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <MotionSection className="section-wrap" variant="fade">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
                <TypewriterText
                text="Join Our Remote Team"
                speed={32}
                caretHeightClass="h-10"
                shimmerOnComplete
                enabled={true}
                />
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto mb-8">
            Browse our current openings below and apply directly.
            </p>
            
            <div className="flex justify-center">
              <Button 
                  href="https://apply.workable.com/reworkssolutions/?lng=en" 
                  variant="primary" 
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                  Open Job Portal in New Tab
              </Button>
            </div>
        </div>
        
        <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <iframe 
            src="https://apply.workable.com/reworkssolutions/?lng=en" 
            title="ReWorks Solutions Jobs"
            className="w-full min-h-[800px] border-0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
      </MotionSection>
    </div>
  );
}
