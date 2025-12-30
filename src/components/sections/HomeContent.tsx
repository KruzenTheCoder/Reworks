"use client";
import Button from "@/components/common/Button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import MotionSection from "../ui/MotionSection";
import Image from "next/image";
import { Check } from "lucide-react";
import { useRef, useEffect, useState, memo } from "react";
import TypewriterText from "../ui/TypewriterText";

// Using shared TypewriterText to ensure text always renders

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "%" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(Math.floor(progress * value));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-bold text-4xl gradient-text">
      {count}{suffix}
    </span>
  );
};

function HomeContent() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });

  return (
    <MotionSection className="section-wrap space-y-24" variant="fadeUp">
      {/* Strategic outsourcing hero copy */}
      <motion.div
        ref={heroRef}
        className="text-center relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={heroInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
              <TypewriterText 
                text="Strategic outsourcing, built around your business" 
                speed={25}
                caretHeightClass="h-10"
                onComplete={() => console.log("Main heading complete")}
              />
            </h2>
          </motion.div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="mt-6 text-lg md:text-xl text-slate-600 leading-relaxed tracking-wide"
        >
          <TypewriterText 
            text="Your vision, our solutions. Exceptional results" 
            speed={30}
            caretHeightClass="h-6"
          />
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.5, type: "spring", stiffness: 80, damping: 12 }}
          className="mt-10"
        >
          <Button href="/contact" variant="primary" size="lg">BUILD MY TEAM</Button>
        </motion.div>
      </motion.div>

      {/* Two feature cards side by side */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Offshore Staffing, Reimagined. */}
          <div className="luxury-card glass-card rounded-3xl p-8 md:p-10 text-center bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl relative h-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue" />
            <h3 className="text-3xl md:text-4xl font-bold title-gradient font-display tracking-tight mb-4">
              <TypewriterText 
                text="Offshore Staffing, Reimagined."
                speed={28}
                caretHeightClass="h-10"
                className="title-gradient font-display"
              />
            </h3>
            <p className="text-text-muted mb-6">When you think offshore staffing, concerns rise about risking your brand or disrupting operations:</p>
            <ul className="space-y-2 text-text-muted text-left max-w-2xl mx-auto">
              <li>• Poor communication and heavy accents that frustrate clients and teams</li>
              <li>• Low-quality hires who lack commitment or professionalism</li>
              <li>• Lack of transparency and oversight, causing missed deadlines and errors</li>
              <li>• Minimal support or employee coaching</li>
              <li>• Risk of HIPAA non-compliance and data security issues</li>
            </ul>
            <p className="mt-6 text-text-muted">But what if offshore talent could be your company’s secret weapon, without the headaches?</p>
          </div>

          {/* Card 2: Elite Talent. Real Results. */}
          <div className="luxury-card glass-card rounded-3xl p-8 md:p-10 text-center bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl relative h-full">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue" />
            <h3 className="text-3xl md:text-4xl font-bold title-gradient font-display tracking-tight mb-4">
              <TypewriterText 
                text="Elite Talent. Real Results."
                speed={28}
                caretHeightClass="h-10"
                className="title-gradient font-display"
              />
            </h3>
            <div className="space-y-4 text-text-muted max-w-3xl mx-auto">
              <p>ReWorks delivers only the top 1% of South African talent, carefully chosen for skill, professionalism, and communication. We hire native English speakers with neutral accents to ensure seamless client-facing interactions.</p>
              <p>Hiring great people is only the start. Our commitment extends beyond recruitment. Through meticulous background checks, continuous performance monitoring, and dedicated coaching, we proactively manage your remote team to maximize engagement and productivity, with significant cost savings to your company.</p>
              <p>We’re not just a staffing agency. We’re your trusted partner. From onboarding to ongoing support, our impeccable service keeps your team aligned, motivated, and ready to scale.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Why ReWorks */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="text-center max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold title-gradient font-display tracking-tight mb-4">
            <TypewriterText 
              text="ReWorks Delivers More Than Staffing"
              speed={28}
              caretHeightClass="h-10"
              className="title-gradient font-display"
            />
          </h3>
          <p className="text-text-muted mb-6">Offshore staffing doesn’t have to mean compromise. We combine handpicked talent selection with hands-on management and employee care to deliver an elevated, cost-effective solution tailored to your needs.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Carefully Selected Talent Pool", text: "We hire fewer than 1% of applicants, focusing on native English speakers with neutral accents and the highest professionalism." },
            { title: "Proactive Team Management", text: "Live productivity tracking, continuous communication, and dedicated business coaches help us resolve issues before they impact your business." },
            { title: "Ongoing Client Support", text: "From onboarding through scaling, our account managers ensure seamless integration, personalized service, and a genuine partnership." }
          ].map((item) => (
            <div key={item.title} className="luxury-card glass-card rounded-3xl p-8 bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl">
              <h4 className="font-semibold title-gradient font-display mb-2">{item.title}</h4>
              <p className="text-text-muted text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Key features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative text-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold title-gradient font-display tracking-tight mb-4">
          <TypewriterText 
            text="Built to Elevate Your Remote Workforce"
            speed={28}
            caretHeightClass="h-10"
            className="title-gradient font-display"
          />
        </h3>
        <div className="max-w-3xl mx-auto"></div>
      </motion.div>

      {/* Client types */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <h3 className="text-3xl md:text-4xl font-bold title-gradient font-display tracking-tight mb-4 text-center">
          <TypewriterText 
            text="Trusted by Healthcare Leaders and Teams Across the US"
            speed={28}
            caretHeightClass="h-10"
            className="title-gradient font-display"
          />
        </h3>
        <p className="text-text-muted mb-6">ReWorks currently specializes in healthcare, serving nursing homes, small practices, and home care agencies with HIPAA-compliant, client-facing, and backend remote staffing that saves millions on payroll without compromising quality. Our flexible model adapts to a wide range of industries and roles, delivering the same elite talent and personalized service wherever you operate.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-gray-200 shadow-sm p-6">
            <h4 className="font-semibold text-slate-900 mb-3">Key Use Cases</h4>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• Healthcare administration and customer service</li>
              <li>• Medical billing, data migration, and analytics</li>
              <li>• Nursing homes, home care agencies, and ABA therapy providers</li>
              <li>• Small businesses reducing overhead with handpicked remote workers</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 shadow-sm p-6">
            <h4 className="font-semibold title-gradient font-display mb-4 text-center">
              <TypewriterText 
                text="ReWorks By the Numbers"
                speed={30}
                caretHeightClass="h-8"
                className="title-gradient font-display"
              />
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl">
                <div className="text-3xl font-bold gradient-text">70%</div>
                <div className="text-text-muted text-sm">Cost Reduction</div>
              </div>
              <div className="text-center p-3 rounded-xl">
                <div className="text-3xl font-bold gradient-text">95%</div>
                <div className="text-text-muted text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center p-3 rounded-xl">
                <div className="text-3xl font-bold gradient-text">100+</div>
                <div className="text-text-muted text-sm">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Home Care Support Operations Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="luxury-card glass-card rounded-3xl p-8 md:p-10 max-w-4xl mx-auto text-center bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue" />
          <h3 className="text-3xl md:text-4xl font-bold title-gradient font-display tracking-tight mb-6">
            <TypewriterText 
              text="HOME CARE SUPPORT OPERATIONS"
              speed={28}
              caretHeightClass="h-10"
              className="title-gradient font-display"
            />
          </h3>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-semibold title-gradient font-display mb-2">The problem</h4>
              <p className="text-text-muted text-sm">Your home care agency is buried in scheduling conflicts, missed authorizations, and billing backlogs while your clinical staff struggles to keep up.</p>
            </div>
            <div>
              <h4 className="font-semibold title-gradient font-display mb-2">The solution</h4>
              <p className="text-text-muted text-sm">ReWorks provides your dedicated support team for scheduling, authorization reviews, documentation, and comprehensive billing operations.</p>
            </div>
            <div>
              <h4 className="font-semibold title-gradient font-display mb-2">The outcome</h4>
              <p className="text-text-muted text-sm">Run your agency smoothly, increase patient visits, and grow your service area.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ReWorks Solutions – Your Outsourcing HR Partner (removed) */}

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary-blue/5 to-accent-blue/5 rounded-3xl p-8 md:p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div>
            <AnimatedCounter value={80} />
            <p className="mt-2 text-slate-700">Cost Reduction</p>
          </div>
          <div>
            <AnimatedCounter value={95} />
            <p className="mt-2 text-slate-700">Client Satisfaction</p>
          </div>
          <div>
            <AnimatedCounter value={12} suffix="hrs" />
            <p className="mt-2 text-slate-700">Support Available</p>
          </div>
          <div>
            <AnimatedCounter value={100} suffix="+" />
            <p className="mt-2 text-slate-700">Happy Clients</p>
          </div>
        </div>
      </motion.div>

      {/* Operational solutions across industries (removed) */}

      {/* Home Care Support Operations — duplicate block removed to prevent repetition */}

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          <TypewriterText 
            text="You can envision your dream team." 
            speed={40}
          />
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-gray-600 mb-8"
        >
          Or you can make it happen with ReWorks Solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.6,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button href="/contact" variant="primary" size="lg">OUTSOURCE WITH THE EXPERTS!</Button>
        </motion.div>
      </motion.div>
    </MotionSection>
  );
}

export default memo(HomeContent)
