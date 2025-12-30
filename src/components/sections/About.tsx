"use client";
import Button from '@/components/common/Button'
import { 
  CheckCircle, 
  Settings, 
  MessageSquare, 
  RotateCcw, 
  DollarSign 
} from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MotionSection from "../ui/MotionSection"
import TypewriterText from "../ui/TypewriterText"

// Using shared TypewriterText to ensure text always renders

const values = [
  {
    icon: CheckCircle,
    title: "Precision",
    description: "Get carefully selected workers to match specific skills you need.",
    details: [
      "Choose from the highest-performing candidates thanks to our customized testing methods.",
      "Selecting the right employee drives swift, effective results."
    ]
  },
  {
    icon: Settings,
    title: "Optimization", 
    description: "Upgrade your workflow – our onboarding specialists will identify and fix weak links in your processes.",
    details: [
      "Enjoy high-touch service that ensures things fall into place quickly, and stay that way.",
      "Efficient processes drive powerful results."
    ]
  },
  {
    icon: MessageSquare,
    title: "Alignment",
    description: "Leverage our specialists' presence during interviews and training to facilitate clear communications and expectations.",
    details: [
      "Gain from our regular check-ins with both you and your staff – throughout the job.",
      "Clear communication at every level fuels business growth."
    ]
  },
  {
    icon: RotateCcw,
    title: "Agility",
    description: "Scale your workforce as business demands change.",
    details: [
      "Set the schedule you want – your team works any hours, fully committed.",
      "Make adjustments seamlessly – we work it all out between you and your staff, promptly.",
      "Flexibility gives you the space to grow."
    ]
  },
  {
    icon: DollarSign,
    title: "Excellent value",
    description: "Get top talent at low cost.",
    details: [
      "Get advanced-level skills at affordable rates.",
      "Cut payroll costs by up to 70%.",
      "Smart staffing means higher quality at lower cost."
    ]
  }
]

export default function About() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <MotionSection className="section-wrap" variant="fadeUp">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={headerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TypewriterText 
              text="Strategic outsourcing, built around your business" 
              speed={40}
            />
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Your vision, our solutions. Exceptional results
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 2.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button variant="primary" size="lg">
              BUILD MY TEAM
            </Button>
          </motion.div>
        </div>

        {/* Company Description */}
        <motion.div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-blue/5 to-accent-blue/5"
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-6 text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TypewriterText 
              text="ReWorks Solutions – Your Outsourcing HR Partner"
              speed={30}
              delay={500}
            />
          </motion.h3>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            Every business thrives with the right team structure. At ReWorks Solutions, we collaborate with you to determine the most efficient way to optimize your operations. Whether you need a hybrid team or strategic outsourcing support, we streamline workflows and create a seamless, high-performing system tailored to your needs.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                className="glass-card rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Animated border top */}
                <motion.div
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                />
                
                {/* Hover shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.9 }}
                />
                
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                >
                  <motion.div 
                    className="bg-blue-100 rounded-lg p-3 mr-4"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:gradient-text transition-all duration-300">
                    {value.title}
                  </h3>
                </motion.div>
                
                <motion.p 
                  className="text-gray-700 mb-4 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  {value.description}
                </motion.p>
                
                <div className="space-y-2">
                  {value.details.map((detail, detailIndex) => (
                    <motion.p 
                      key={detailIndex} 
                      className="text-gray-600 text-sm leading-relaxed flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.1 + detailIndex * 0.05 + 0.4 
                      }}
                    >
                      <motion.span
                        className="inline-block w-1.5 h-1.5 bg-primary-blue rounded-full mr-2 mt-1.5 flex-shrink-0"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1 + detailIndex * 0.05 + 0.5,
                          type: "spring",
                          stiffness: 200
                        }}
                      />
                      {detail}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 70 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button variant="primary" size="lg">
              BUILD MY TEAM
            </Button>
          </motion.div>
        </motion.div>
      </MotionSection>
    </section>
  )
}
