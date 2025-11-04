import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import HomeContent from "@/components/sections/HomeContent";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <HomeContent />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
