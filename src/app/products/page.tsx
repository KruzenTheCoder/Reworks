import type { Metadata } from "next";
import ClientPageTitle from "@/components/ui/ClientPageTitle";

export const metadata: Metadata = {
  title: "Products — reworks",
  description: "Explore reworks solutions for hiring top global talent.",
};

export default function ProductsPage() {
  return (
    <section className="bg-white">
      <div className="section-wrap fade-in-up">
        <ClientPageTitle text="Products" />
        <p className="mt-3 max-w-2xl text-text-base/80">
          Reworks delivers fast, supported, and flexible hiring solutions. Discover our
          offerings tailored for teams that need elite global talent.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Managed Hiring</h2>
            <p className="mt-2 text-sm text-text-base/70">
              End‑to‑end support, from sourcing to onboarding, with ongoing success.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Talent Pipeline</h2>
            <p className="mt-2 text-sm text-text-base/70">
              Always‑ready shortlist of vetted candidates for common roles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
