"use client"
import Button from '@/components/common/Button'
import MotionSection from "../ui/MotionSection";
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import TypewriterText from "../ui/TypewriterText";

const industries = [
  {
    title: "Medical Billing",
    services: [
      "Price updates",
      "Claims review", 
      "Invoice processing",
      "Data entry",
      "Payment tracking"
    ]
  },
  {
    title: "Pharmaceuticals",
    services: [
      "Inventory tracking",
      "Order processing",
      "Supply tracking", 
      "Quality control records",
      "Compliance documentation"
    ]
  },
  {
    title: "Medical equipment & supplies",
    services: [
      "Price updates",
      "Inventory tracking",
      "Order processing",
      "Customer service",
      "Invoice processing"
    ]
  },
  {
    title: "ABA Services", 
    services: [
      "Note taking",
      "Claims processing",
      "Communication tracking",
      "Data entry",
      "Provider documentation"
    ]
  },
  {
    title: "Integrated healthcare",
    services: [
      "Patient data entry",
      "Insurance verification",
      "Referral tracking",
      "Claims processing", 
      "Provider credentialing"
    ]
  },
  {
    title: "Home care agencies",
    services: [
      "Recruiting and staffing",
      "Prior authorization",
      "Insurance verification",
      "Client billing & payroll",
      "24/7 customer support"
    ]
  },
  {
    title: "Nursing facilities",
    services: [
      "Records management",
      "Claims processing",
      "Insurance verification",
      "Medication tracking",
      "Treatment documentation"
    ]
  },
  {
    title: "E-commerce",
    services: [
      "Product listing updates",
      "Price management",
      "Order processing",
      "Inventory tracking",
      "Customer service"
    ]
  },
  {
    title: "Telecommunications",
    services: [
      "Billing updates",
      "Order tracking",
      "Price updates",
      "Customer data",
      "Service documentation"
    ]
  },
  {
    title: "Hospitality",
    services: [
      "Reservation entry",
      "Price updates",
      "Invoice processing",
      "Expense tracking",
      "Customer communication"
    ]
  },
  {
    title: "Groceries and food service",
    services: [
      "Price updates",
      "Invoice processing",
      "Inventory tracking",
      "Order processing",
      "Supplier communication"
    ]
  },
  {
    title: "Accounting & book keeping",
    services: [
      "Accounts payable",
      "Invoice processing",
      "Bank reconciliation",
      "Payroll processing",
      "Financial data entry"
    ]
  },
  {
    title: "Manufacturing",
    services: [
      "Production data entry",
      "Inventory tracking",
      "Price updates",
      "Order processing",
      "Supplier communication"
    ]
  },
  {
    title: "Construction supplies",
    services: [
      "Inventory tracking",
      "Order processing",
      "Quote generation",
      "Price updates",
      "Delivery scheduling"
    ]
  },
  {
    title: "Logistics",
    services: [
      "Order processing",
      "Inventory tracking",
      "Price updates",
      "Invoice processing",
      "Delivery scheduling"
    ]
  },
  {
    title: "Insurance brokerage",
    services: [
      "Certificate issuing",
      "Data entry",
      "Document management",
      "Policy tracking",
      "Claims documentation"
    ]
  }
]

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 bg-white">
          <MotionSection className="section-wrap" variant="fadeUp">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1, margin: '0px' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <TypewriterText
              text="So many ways, so much potential"
              speed={40}
              shimmerOnComplete
              caretHeightClass="h-10"
            />
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Operational solutions across industries and specialties*
          </p>
          <p className="text-sm text-blue-600 font-medium">
            ReWorks Solutions is compliant with HIPAA Privacy Standards
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1, margin: '0px' }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="luxury-card glass-card rounded-xl p-6 group relative overflow-hidden"
            >
              {/* Animated gradient accent line */}
              <motion.div 
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-blue to-accent-blue"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                viewport={{ once: true }}
              />

              {/* Hover shine sweep */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                transition={{ duration: 0.9 }}
              />

              <h3 className="relative z-10 text-lg font-semibold text-text-base mb-4 group-hover:gradient-text transition-colors">
                {industry.title}
              </h3>
              <ul className="relative z-10 space-y-2">
                {industry.services.map((service, serviceIndex) => (
                  <li
                    key={serviceIndex}
                    className="text-text-muted text-sm flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-primary-blue flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1, margin: '0px' }}
        >
          <Button variant="primary" size="lg">
            BUILD MY TEAM
          </Button>
        </motion.div>

        {/* Case Study Section */}
        <motion.div
          className="mt-24 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.1, margin: '0px' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Imagine the ways we can transform your operations
            </h3>
          </div>

          <div className="luxury-card glass-card rounded-xl p-8 group relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary-blue to-accent-blue" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
              MEDICAL EQUIPMENT OPERATIONS
            </h4>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h5 className="font-semibold text-red-600 mb-3">The problem</h5>
                <p className="text-gray-600 text-sm">
                  With limited staff, your medical supply business is falling behind on inventory levels, order status, and quality control documentation across distribution centers.
                </p>
              </div>
              
              <div>
                <h5 className="font-semibold text-blue-600 mb-3">The solution</h5>
                <p className="text-gray-600 text-sm">
                  ReWorks provides the support volume you need to handle all documentation without overloading your team.
                </p>
              </div>
              
              <div>
                <h5 className="font-semibold text-green-600 mb-3">The outcome</h5>
                <p className="text-gray-600 text-sm">
                  Streamlined operations with up-to-date inventory tracking, efficient order processing, and comprehensive quality control documentation across all locations.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button variant="primary" size="lg">
              BUILD MY TEAM
            </Button>
          </div>
        </motion.div>
          </MotionSection>
    </section>
  )
}
