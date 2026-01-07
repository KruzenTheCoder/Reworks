import type { Metadata } from "next";
import ClientPageTitle from "@/components/ui/ClientPageTitle";

export const metadata: Metadata = {
  title: "Resources — reworks",
  description: "Guides, templates, and tools to help you hire globally.",
};

export default function ResourcesPage() {
  return (
    <section className="bg-gray-light">
      <div className="section-wrap fade-in-up">
        <ClientPageTitle text="Resources" />
        <p className="mt-3 max-w-2xl text-text-base/80">
          Explore practical resources for hiring and supporting global talent.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Hiring Checklist</h2>
            <p className="mt-2 text-sm text-text-base/70">Step‑by‑step guide to start hiring.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Interview Templates</h2>
            <p className="mt-2 text-sm text-text-base/70">Scorecards and question banks.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Onboarding Playbook</h2>
            <p className="mt-2 text-sm text-text-base/70">Make day‑one successful and beyond.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
