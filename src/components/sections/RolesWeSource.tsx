"use client";
import { motion, Variants } from "framer-motion";
import MotionSection from "../ui/MotionSection";
import { User, TrendingUp, Target, Handshake, Rocket, BarChart3, FileCheck, Calculator, Users, Monitor, Activity, Hammer, Briefcase, Video, Smartphone, PieChart, FileText, Headphones } from "lucide-react";
import TypewriterText from "../ui/TypewriterText";

const roles = [
  { title: "Executive Assistant (EA)", desc: "Operations powerhouse for executives.", icon: User },
  { title: "Sales Development Rep (SDR)", desc: "Pipeline builders and prospecting pros.", icon: TrendingUp },
  { title: "Project Manager (PM)", desc: "Delivery oversight and stakeholder coordination.", icon: Target },
  { title: "Customer Success", desc: "Retention-focused support champions.", icon: Handshake },
  { title: "Marketing Ops", desc: "Automation and campaign execution.", icon: Rocket },
  { title: "Data Analyst", desc: "Insights from data to decisions.", icon: BarChart3 },
  { title: "Medical Biller", desc: "Accurate coding and claims processing.", icon: FileCheck },
  { title: "Bookkeeper", desc: "Financial record keeping and reconciliation.", icon: Calculator },
  { title: "Recruiter", desc: "Talent acquisition and candidate screening.", icon: Users },
  { title: "IT Support", desc: "Technical assistance and system maintenance.", icon: Monitor },
  { title: "Healthcare Intake", desc: "Patient coordination and insurance verification.", icon: Activity },
  { title: "Construction Estimator", desc: "Project cost analysis and bidding.", icon: Hammer },
  { title: "HR Coordinator", desc: "Employee relations and policy management.", icon: Briefcase },
  { title: "Video Editor / Animator", desc: "Creative visual content production.", icon: Video },
  { title: "Social Media Manager", desc: "Brand presence and community engagement.", icon: Smartphone },
  { title: "Finance Manager", desc: "Strategic financial planning and analysis.", icon: PieChart },
  { title: "Technical Writer", desc: "Documentation and process mapping.", icon: FileText },
  { title: "Call Center Agent", desc: "Inbound/outbound customer support.", icon: Headphones },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      type: "spring" as const,
      stiffness: 100
    }
  }
};

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring" as const,
      stiffness: 120
    }
  }
};

export default function RolesWeSource() {
  return (
    <MotionSection className="relative bg-transparent pt-0 pb-24 overflow-hidden" variant="fadeUp" viewportAmount={0}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/8 to-purple-600/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/12 to-cyan-600/12 rounded-full blur-2xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

        <div className="relative z-10 section-wrap">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          
          <h2 className="text-4xl lg:text-5xl font-bold text-text-base mb-4 font-display">
            <TypewriterText
              text="Roles We Source"
              speed={40}
              shimmerOnComplete
              caretHeightClass="h-12"
            />
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            From operations to growth, we source the top 1% across core business functions
          </p>
        </motion.div>

        {/* Roles Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              variants={cardVariants}
              whileHover={{ 
                y: -15,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="luxury-card glass-card rounded-2xl p-8 group relative overflow-hidden"
            >
              {/* Animated gradient border */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary-blue/20 via-transparent to-accent-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />
              
              {/* Top accent line with animation */}
              <motion.div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              />
              
              {/* Icon (no animation on roles page) */}
              <div className="relative z-10 mb-6 text-primary-blue">
                <role.icon className="w-10 h-10" />
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className="mb-3 text-xl font-bold text-text-base group-hover:gradient-text transition-all duration-300">
                  {role.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{role.desc}</p>
              </div>

              {/* Hover shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-xl text-text-muted font-medium">and many more roles available</p>
        </motion.div>

        {/* Bottom Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {[
              { number: "7 days", label: "Average Time to Hire" },
              { number: "98%", label: "Client Retention Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-xl p-6"
              >
                <div className="text-3xl font-bold gradient-text font-display mb-2">
                  {stat.number}
                </div>
                <div className="text-text-muted font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </MotionSection>
  );
}
