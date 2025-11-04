import type { Metadata } from "next";
import MotionSection from "@/components/ui/MotionSection";
import ClientPageTitle from "@/components/ui/ClientPageTitle";

export const metadata: Metadata = {
  title: "Pricing — reworks",
  description: "Transparent pricing with significant savings on payroll.",
};

export default function PricingPage() {
  return (
    <section className="bg-white">
      <MotionSection className="section-wrap" variant="fadeUp">
        <ClientPageTitle text="Pricing" />
        <p className="mt-3 max-w-2xl text-text-base/80">
          Save up to <span className="font-extrabold text-primary-blue">80%</span> on payroll by hiring
          elite global talent. Flexible engagement models to fit your needs.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Starter</h2>
            <p className="mt-2 text-sm text-text-base/70">Best for first hires and trials.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Growth</h2>
            <p className="mt-2 text-sm text-text-base/70">Scale across functions rapidly.</p>
          </div>
          <div className="glass-card rounded-2xl p-6 fade-in-up">
            <div className="mb-4 border-t-4 border-primary-blue" />
            <h2 className="text-lg font-semibold text-text-base">Enterprise</h2>
            <p className="mt-2 text-sm text-text-base/70">Custom solutions and support SLAs.</p>
          </div>
        </div>
      </MotionSection>
    </section>
  );
}
