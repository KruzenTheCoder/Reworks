"use client";
import Button from "@/components/common/Button";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import MotionSection from "../ui/MotionSection";
import Image from "next/image";
import { Check } from "lucide-react";
import { useRef, useEffect, useState } from "react";
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

export default function HomeContent() {
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

      {/* ReWorks Solutions – Your Outsourcing HR Partner */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 60, damping: 12 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            <TypewriterText 
              text="ReWorks Solutions – Your Outsourcing HR Partner"
              speed={25}
              caretHeightClass="h-8"
              onComplete={() => console.log("Partner heading complete")}
            />
          </h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 text-slate-700"
          >
            Every business thrives with the right team structure. At ReWorks Solutions, we collaborate with you to determine the most efficient way to optimize your operations. Whether you need a hybrid team or strategic outsourcing support, we streamline workflows and create a seamless, high-performing system tailored to your needs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 glass-card rounded-2xl p-4 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Image
                src="/globe.svg"
                alt="Global talent and streamlined operations"
                width={600}
                height={360}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            { title: "Precision",
            lines: [
              "Get carefully selected workers to match specific skills you need.",
              "Choose from the highest-performing candidates thanks to our customized testing methods.",
              "Selecting the right employee drives swift, effective results."
            ]
          },{
            title: "Optimization",
            lines: [
              "Upgrade your workflow – our onboarding specialists will identify and fix weak links in your processes.",
              "Enjoy high-touch service that ensures things fall into place quickly, and stay that way.",
              "Efficient processes drive powerful results."
            ]
          },{
            title: "Alignment",
            lines: [
              "Leverage our specialists' presence during interviews and training to facilitate clear communications and expectations.",
              "Gain from our regular check-ins with both you and your staff – throughout the job.",
              "Clear communication at every level fuels business growth."
            ]
          },{
            title: "Agility",
            lines: [
              "Scale your workforce as business demands change.",
              "Set the schedule you want – your team works any hours, fully committed",
              "Make adjustments seamlessly – we work it all out between you and your staff, promptly.",
              "Flexibility gives you the space to grow."
            ]
          },{
            title: "Excellent value",
            lines: [
              "Get top talent at low cost",
              "Get advanced-level skills at affordable rates",
              "Cut payroll costs by up to 80%",
              "Smart staffing means higher quality at lower cost."
            ]
          }].map((block, idx) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: idx * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="luxury-card glass-card rounded-2xl p-6 group relative overflow-hidden"
            >
              <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                viewport={{ once: true }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.9 }}
              />
              <h4 className="relative z-10 font-semibold text-slate-900 mb-3 group-hover:gradient-text transition-all duration-300">
                {block.title}
              </h4>
              <ul className="relative z-10 space-y-2 text-slate-700">
                {block.lines.map((l, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-2 text-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + i * 0.05 }}
                  >
                    <Check className="w-4 h-4 text-primary-blue flex-shrink-0 mt-0.5" />
                    <span>{l}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-primary-blue/5 to-accent-blue/5 rounded-3xl p-8 md:p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <AnimatedCounter value={80} />
            <p className="mt-2 text-slate-700">Cost Reduction</p>
          </div>
          <div>
            <AnimatedCounter value={95} />
            <p className="mt-2 text-slate-700">Client Satisfaction</p>
          </div>
          <div>
            <AnimatedCounter value={24} suffix="/7" />
            <p className="mt-2 text-slate-700">Support Available</p>
          </div>
          <div>
            <AnimatedCounter value={100} suffix="+" />
            <p className="mt-2 text-slate-700">Happy Clients</p>
          </div>
        </div>
      </motion.div>

      {/* Operational solutions across industries */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
            <TypewriterText 
              text="So many ways, so much potential" 
              speed={25}
              caretHeightClass="h-8"
              onComplete={() => console.log("Potential heading complete")}
            />
          </h3>
          <p className="text-slate-700 mb-6">Operational solutions across industries and specialties*</p>
          <p className="text-slate-600">ReWorks Solutions is compliant with HIPAA Privacy Standards</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Medical Billing", items: ["Price updates","Claims review","Invoice processing","Data entry","Payment tracking"] },
            { title: "Pharmaceuticals", items: ["Inventory tracking","Order processing","Supply tracking","Quality control records","Compliance documentation"] },
            { title: "Medical equipment & supplies", items: ["Price updates","Inventory tracking","Order processing","Customer service","Invoice processing"] },
            { title: "ABA Services", items: ["Note taking","Claims processing","Communication tracking","Data entry","Provider documentation"] },
            { title: "Integrated healthcare", items: ["Patient data entry","Insurance verification","Referral tracking","Claims processing","Provider credentialing"] },
            { title: "Home care agencies", items: ["Recruiting and staffing","Prior authorization","Insurance verification","Client billing & payroll","24/7 customer support"] },
            { title: "Nursing facilities", items: ["Records management","Claims processing","Insurance verification","Medication tracking","Treatment documentation"] },
            { title: "E-commerce", items: ["Product listing updates","Price management","Order processing","Inventory tracking","Customer service"] },
            { title: "Telecommunications", items: ["Billing updates","Order tracking","Price updates","Customer data","Service documentation"] },
            { title: "Hospitality", items: ["Reservation entry","Price updates","Invoice processing","Expense tracking","Customer communication"] },
            { title: "Groceries and food service", items: ["Price updates","Invoice processing","Inventory tracking","Order processing","Supplier communication"] },
            { title: "Accounting & book keeping", items: ["Accounts payable","Invoice processing","Bank reconciliation","Payroll processing","Financial data entry"] },
            { title: "Manufacturing", items: ["Production data entry","Inventory tracking","Price updates","Order processing","Supplier communication"] },
            { title: "Construction supplies", items: ["Inventory tracking","Order processing","Quote generation","Price updates","Delivery scheduling"] },
            { title: "Logistics", items: ["Order processing","Inventory tracking","Price updates","Invoice processing","Delivery scheduling"] },
            { title: "Insurance brokerage", items: ["Certificate issuing","Data entry","Document management","Policy tracking","Claims documentation"] },
          ].map(({ title, items }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: Math.min(idx * 0.05, 0.3),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="luxury-card glass-card rounded-2xl p-6 group relative overflow-hidden transform-gpu"
            >
              <motion.div
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: idx * 0.02 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "left" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.9 }}
              />
              <h4 className="relative z-10 font-semibold text-slate-900 mb-3 group-hover:gradient-text transition-all duration-300">
                {title}
              </h4>
              <ul className="relative z-10 space-y-2 text-slate-700">
                {items.map((item, i) => (
                  <motion.li 
                    key={item} 
                    className="flex items-start gap-2 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.02 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.2 + i * 0.02,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Check className="w-4 h-4 text-primary-blue flex-shrink-0" />
                    </motion.div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Home Care Support Operations */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring", stiffness: 60, damping: 12 }}
          className="mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            <TypewriterText 
              text="HOME CARE SUPPORT OPERATIONS" 
              speed={25}
              caretHeightClass="h-8"
              onComplete={() => console.log("Home care heading complete")}
            />
          </h3>
          <div className="mt-6 space-y-6">
            {[
              { title: "The problem", text: "Your home care agency is buried in scheduling conflicts, missed authorizations, and billing backlogs while your clinical staff struggles to keep up." },
              { title: "The solution", text: "ReWorks provides your dedicated support team for scheduling, authorization reviews, documentation, and comprehensive billing operations." },
              { title: "The outcome", text: "Run your agency smoothly, increase patient visits, and grow your service area." }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <h4 className="font-semibold text-slate-900">{item.title}</h4>
                <p className="text-slate-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          whileHover={{ scale: 1.02 }}
          className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 p-8 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-blue/10 to-accent-blue/10"
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          <p className="text-slate-700 relative z-10 text-lg">
            Imagine the ways we can transform your operations
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
        className="text-center"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          <TypewriterText text="You can envision your dream team." speed={50} />
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-slate-700 mb-6"
        >
          <TypewriterText 
            text="Or you can make it happen with ReWorks Solutions." 
            speed={35}
            caretHeightClass="h-6"
          />
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
          <Button href="/contact" variant="luxury">OUTSOURCE WITH THE EXPERTS!</Button>
        </motion.div>
      </motion.div>
    </MotionSection>
  );
}
