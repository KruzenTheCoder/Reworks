"use client"
import { useState } from 'react'
import Button from '@/components/common/Button'
import MotionSection from "../ui/MotionSection";
import { motion } from 'framer-motion'
import { CheckCircle, ShoppingCart, ClipboardList, Network, Calculator, Factory, Truck, Package, Home, FileCheck, Building } from 'lucide-react'
import TypewriterText from "../ui/TypewriterText";
import OperationTabs from './OperationTabs'

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

const operations = [
  {
    title: "PHARMACEUTICAL SUPPLY OPERATIONS",
    icon: Package,
    problem:
      "Inventory discrepancies, compliance documentation, and tracking backlogs are slowing down your pharmaceutical distribution.",
    solution:
      "ReWorks provides staff across your distribution network to handle inventory records, compliance documentation, and distribution tracking.",
    outcome:
      "Distribute more products efficiently, maintain perfect compliance, and expand your distribution network.",
  },
  {
    title: "ABA SERVICE COORDINATION",
    icon: ClipboardList,
    problem:
      "Your therapy center is buried in progress notes, insurance verifications, and provider documentation across multiple cases.",
    solution:
      "ReWorks brings in the workforce needed to process therapy notes, insurance paperwork, and clinical documentation.",
    outcome:
      "Serve more patients effectively, expand your therapy programs, and strengthen your practice’s reputation.",
  },
  {
    title: "HOME CARE SUPPORT OPERATIONS",
    icon: Home,
    problem:
      "Your home care agency is buried in scheduling conflicts, missed authorizations, and billing backlogs while your clinical staff struggles to keep.",
    solution:
      "ReWorks provides your dedicated support team for scheduling, authorization reviews, documentation, and comprehensive billing operations.",
    outcome:
      "Run your agency smoothly, increase patient visits, and grow your service area.",
  },
  {
    title: "MEDICAL BILLING OPERATIONS",
    icon: FileCheck,
    problem:
      "Your medical center is struggling to keep up with paperwork, keeps missing claims deadlines, and loses track of invoices and payments.",
    solution:
      "ReWorks provides trained staff to handle your claims paperwork, payment posting, and follow-ups from start to finish.",
    outcome:
      "Claims get processed faster, payments arrive on time, and you can focus on patient care.",
  },
  {
    title: "NURSING FACILITY COORDINATION",
    icon: Building,
    problem:
      "Documentation demands and insurance delays are slowing down your entire facility’s operations.",
    solution:
      "ReWorks sources large-scale back-office staff to process medical records, insurance verification, and claims workload.",
    outcome:
      "ReWorks sources large-scale back-office staff to process medical records, insurance verification, and claims workload.",
  },
  // New operations provided
  {
    title: "E-COMMERCE OPERATIONS",
    icon: ShoppingCart,
    problem:
      "Your online store is losing money and sales due to outdated listings, inventory errors, and delayed customer service responses.",
    solution:
      "ReWorks connects you with full-time support to process inventory updates, product listings, and customer inquiries.",
    outcome:
      "Process more orders accurately, expand your product lines confidently, and accelerate your market growth.",
  },
  {
    title: "INSURANCE CLAIMS OPERATIONS",
    icon: ClipboardList,
    problem:
      "Your brokerage is overwhelmed with processing claims documentation, coordinating with carriers, and managing client communication across lines.",
    solution:
      "ReWorks assigns full teams to manage your claims paperwork, carrier communications, and client updates",
    outcome:
      "Process more claims faster, grow your client base steadily, and build stronger carrier relationships.",
  },
  {
    title: "TELECOM NETWORK OPERATIONS",
    icon: Network,
    problem:
      "Your telecom company’s growth means network issues, service requests, and technical support are overwhelming current staff.",
    solution:
      "ReWorks assigns teams to handle your support tickets, service coordination, and escalation tracking.",
    outcome:
      "ReWorks assigns teams to handle your support tickets, service coordination, and escalation tracking.",
  },
  {
    title: "BOOKKEEPING OPERATIONS",
    icon: Calculator,
    problem:
      "Your company is growing fast, but your staff can’t keep up with the mounting invoices, payroll, and account reconciliation.",
    solution:
      "ReWorks delivers comprehensive staffing for accounts payable, payroll, and reconciliation processing.",
    outcome:
      "Numbers stay perfect, cash flow accelerates, your strategic vision takes flight.",
  },
  {
    title: "MANUFACTURING OPERATIONS SUPPORT",
    icon: Factory,
    problem:
      "Purchase orders, supplier documentation, and quality control paperwork are overwhelming your manufacturing operations.",
    solution:
      "ReWorks equips your operation with dedicated staff for processing vendor records, tracking inventory, maintaining quality documentation.",
    outcome:
      "Scale production smoothly, strengthen vendor partnerships, and accelerate your market expansion.",
  },
  {
    title: "LOGISTICS MANAGEMENT",
    icon: Truck,
    problem:
      "Your delivery operations are chaotic with tracking gaps, scheduling conflicts, and communication breakdowns between drivers and dispatch.",
    solution:
      "ReWorks provides logistics staff to process your route planning, dispatch coordination, and delivery tracking workload",
    outcome:
      "Routes run smoothly, deliveries multiply, territories expand naturally.",
  },
]

export default function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <section id="solutions" className="pt-0 pb-24 bg-white">
          <MotionSection className="section-wrap" variant="fadeUp" viewportAmount={0}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0, margin: '0px' }}
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
              viewport={{ once: true, amount: 0, margin: '0px' }}
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
          viewport={{ once: true, amount: 0, margin: '0px' }}
        >
          <Button href="https://forms.zohopublic.com/reworksolutionsllc1/form/ReworksSolutionsHiringRequestForm/formperma/nNDuzrzZFylKkBDPU0a5ZcWN9HBqeAL_cClLs35VrxU" variant="primary" size="lg">
            BUILD MY TEAM
          </Button>
        </motion.div>

        {/* Case Study Section — tabbed operations panel */}
        <motion.div
          className="mt-24 rounded-2xl p-8 md:p-12 bg-gradient-to-r from-blue-50 to-indigo-50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0, margin: '0px' }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-text-base mb-4 font-display tracking-tight">
              <TypewriterText 
                text="Imagine the ways we can transform your operations" 
                speed={28}
                caretHeightClass="h-8"
                shimmerOnComplete
                className="bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue bg-clip-text text-transparent"
              />
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
              className="h-[3px] bg-gradient-to-r from-primary-blue/40 via-accent-blue/60 to-primary-blue/40 rounded-full max-w-xl mx-auto"
              style={{ transformOrigin: "center" }}
            />
          </div>

          {/* Tabs + Detail using react-bits */}
          <OperationTabs operations={operations} />

          <div className="text-center mt-8">
            <Button href="contact" variant="primary" size="lg">
              BUILD MY TEAM
            </Button>
          </div>
        </motion.div>
          </MotionSection>
    </section>
  )
}
