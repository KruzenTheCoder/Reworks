import type { Metadata } from "next";
import ClientBlogTitle from "@/components/ui/ClientBlogTitle";

export const metadata: Metadata = {
  title: "Blog — reworks",
  description: "Insights on hiring, remote work, and global teams.",
};

export default function BlogPage() {
  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <ClientBlogTitle />
        <p className="mt-3 max-w-2xl text-text-base/80">
          Articles and case studies are coming soon. Stay tuned for insights on building
          high‑performing global teams.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">How to Hire Elite EAs</h2>
            <p className="mt-2 text-sm text-text-base/70">A practical guide to hiring and onboarding.</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Scaling SDRs Globally</h2>
            <p className="mt-2 text-sm text-text-base/70">Playbooks for growth teams.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
