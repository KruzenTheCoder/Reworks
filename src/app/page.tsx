import Hero from "@/components/sections/Hero";
import Testimonials from "@/components/sections/Testimonials";
import HomeContent from "@/components/sections/HomeContent";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import GlobalBlur from "@/components/visuals/GlobalBlur";

export default function Home() {
  return (
    <div>
      <Hero />
      <HomeContent />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      {/* Home-specific stronger bottom blur overlay (hides at footer) */}
      <GlobalBlur
        position="bottom"
        height="10rem"
        strength={3}
        divCount={3} // Optimized from 8
        curve="bezier"
        exponential
        opacity={1}
        zIndex={1200}
      />
    </div>
  );
}
