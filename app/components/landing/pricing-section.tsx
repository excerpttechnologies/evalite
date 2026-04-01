"use client"

import { Check, Sparkles, Crown, Rocket, Zap, Star, Shield, ArrowRight, TrendingUp, CreditCard, Infinity, Users, Calendar, Clock, Award, Gift, BarChart, FileText, Headphones, Settings, Cloud, Database, Lock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"
import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const billingPlans = {
  annual: {
    name: "Annual Plan",
    firstYear: 10000,
    renewal: 8400,
    desc: "Best value for long-term commitment",
    features: [
      { text: "Full access to all features", included: true },
      { text: "Unlimited invoices & billing", included: true },
      { text: "Advanced inventory management", included: true },
      { text: "Real-time analytics dashboard", included: true },
      { text: "Priority email support", included: true },
      { text: "GST filing ready", included: true },
      { text: "API access", included: true },
      { text: "Automatic backups", included: true },
    ],
    highlighted: true,
    icon: Calendar,
    gradient: "from-[#F2A119] to-[#E0910A]",
    color: "#F2A119",
    savings: "Save ₹1,600/year"
  },
  lifetime: {
    name: "Lifetime Access",
    price: 34658,
    desc: "One-time payment, forever access",
    features: [
      { text: "Everything in Annual Plan", included: true },
      { text: "Lifetime updates & upgrades", included: true },
      { text: "Priority support forever", included: true },
      { text: "No recurring fees ever", included: true },
      { text: "Early access to new features", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Custom branding options", included: true },
      { text: "White-label solution", included: true },
    ],
    highlighted: false,
    icon: Infinity,
    gradient: "from-[#F2A119] to-[#E0910A]",
    color: "#F2A119",
    value: "Save ₹50,000+ over 5 years"
  }
}

const memberPricing = {
  basePrice: 4200,
  bulkDiscount: {
    minMembers: 3,
    discount: 0.5 // 50% off
  }
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [selectedMembers, setSelectedMembers] = useState(1)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const calculateMemberPrice = () => {
    let total = selectedMembers * memberPricing.basePrice
    if (selectedMembers >= memberPricing.bulkDiscount.minMembers) {
      total = total * (1 - memberPricing.bulkDiscount.discount)
    }
    return total
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.96,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
        duration: 0.5,
      },
    },
  } as const

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FAF5EA 0%, #FAF3E6 100%)" }}
    >
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2A119] to-transparent" />
      
      {/* Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F2A119]/50 to-transparent" />

      {/* Premium Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF5EA] via-[#FAF3E6] to-[#F2A119]/5" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-[#F2A119]/10 to-[#E0910A]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-[#F2A119]/10 to-[#E0910A]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F2A11908_1px,transparent_1px),linear-gradient(to_bottom,#F2A11908_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating particles */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#F2A119]/20 to-[#E0910A]/20"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full border border-[#F2A119]/30 bg-gradient-to-r from-[#F2A119]/10 to-[#E0910A]/10 backdrop-blur-sm px-4 py-1.5 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="size-3.5 text-[#F2A119]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F2A119]">Flexible Billing</span>
          </motion.div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            Choose your
            <span className="relative inline-block mx-2">
              <span className="relative z-10 bg-gradient-to-r from-[#F2A119] via-[#E0910A] to-[#D08005] bg-clip-text text-transparent">
                payment style
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-[#F2A119]/30 to-[#E0910A]/30 blur-md"
                animate={{ 
                  scaleX: [1, 1.2, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </h2>
          
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
            Annual plans save you money. Lifetime gives you peace of mind. Add team members with bulk discounts.
          </p>
        </motion.div>

        {/* Main Pricing Cards */}
        <motion.div 
          className="grid gap-5 sm:gap-6 sm:grid-cols-2 max-w-4xl mx-auto mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
        >
          {/* Annual Plan Card */}
          <motion.div
            variants={cardVariants}
            className="relative group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-full flex flex-col rounded-xl bg-white border-2 border-[#F2A119]/40 shadow-xl shadow-[#F2A119]/20 p-6">
              {/* Most Popular Badge */}
              <motion.div 
                className="absolute -top-3 left-1/2 -translate-x-1/2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F2A119] to-[#E0910A] px-3 py-1 shadow-lg shadow-[#F2A119]/30">
                  <Star className="size-2.5 text-white" />
                  <span className="text-[10px] font-bold text-white">Best Value</span>
                </div>
              </motion.div>

              {/* Icon */}
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="inline-flex items-center justify-center p-2.5 rounded-lg bg-gradient-to-br from-[#F2A119] to-[#E0910A] shadow-md shadow-[#F2A119]/20">
                  <Calendar className="size-5 text-white" />
                </div>
              </motion.div>

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">Annual Plan</h3>

              {/* Price Structure */}
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-gray-900">₹{billingPlans.annual.firstYear.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">first year</span>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-bold text-[#F2A119]">₹{billingPlans.annual.renewal.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">/year after</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#F2A119]/10 px-2 py-0.5">
                  <TrendingUp className="size-3 text-[#F2A119]" />
                  <span className="text-xs text-[#F2A119]">{billingPlans.annual.savings}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600">{billingPlans.annual.desc}</p>

              {/* Features List */}
              <ul className="mt-6 flex flex-col gap-2 flex-1">
                {billingPlans.annual.features.map((feature, i) => (
                  <motion.li 
                    key={feature.text} 
                    className="flex items-center gap-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Check className="size-3.5 shrink-0 text-[#F2A119]" />
                    <span>{feature.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/dashboard" className="mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full bg-gradient-to-r from-[#F2A119] to-[#E0910A] hover:from-[#E0910A] hover:to-[#D08005] text-white font-semibold shadow-md shadow-[#F2A119]/30 h-10"
                  >
                    Get Annual Plan
                    <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              {/* Animated border glow */}
              <motion.div 
                className="absolute inset-0 rounded-xl pointer-events-none"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(242, 161, 25, 0)",
                    "0 0 0 2px rgba(242, 161, 25, 0.2)",
                    "0 0 0 0 rgba(242, 161, 25, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Lifetime Plan Card */}
          <motion.div
            variants={cardVariants}
            className="relative group"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative h-full flex flex-col rounded-xl bg-white/90 backdrop-blur-sm border border-[#F2A119]/20 hover:border-[#F2A119]/40 p-6">
              {/* Icon */}
              <motion.div 
                className="mb-4"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="inline-flex items-center justify-center p-2.5 rounded-lg bg-gradient-to-br from-[#F2A119] to-[#E0910A] shadow-md shadow-[#F2A119]/20">
                  <Infinity className="size-5 text-white" />
                </div>
              </motion.div>

              {/* Plan Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lifetime Access</h3>

              {/* Price */}
              <div className="mt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-gray-900">₹{billingPlans.lifetime.price.toLocaleString()}</span>
                  <span className="text-sm text-gray-500">one-time</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#F2A119]/10 px-2 py-0.5">
                  <Award className="size-3 text-[#F2A119]" />
                  <span className="text-xs text-[#F2A119]">{billingPlans.lifetime.value}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-gray-600">{billingPlans.lifetime.desc}</p>

              {/* Features List */}
              <ul className="mt-6 flex flex-col gap-2 flex-1">
                {billingPlans.lifetime.features.map((feature, i) => (
                  <motion.li 
                    key={feature.text} 
                    className="flex items-center gap-2 text-sm text-gray-700"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Check className="size-3.5 shrink-0 text-[#F2A119]" />
                    <span>{feature.text}</span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/dashboard" className="mt-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-[#F2A119]/40 hover:border-[#F2A119]/60 hover:bg-[#F2A119]/10 hover:text-[#F2A119] text-gray-700 font-semibold h-10"
                  >
                    Get Lifetime Access
                    <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              {/* Hover Glow Effect */}
              <div 
                className="absolute inset-0 rounded-xl  transition-opacity duration-400 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${billingPlans.lifetime.color}10, transparent 70%)`,
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Team Member Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="rounded-xl bg-white/90 backdrop-blur-sm border border-[#F2A119]/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#F2A119] to-[#E0910A] shadow-md shadow-[#F2A119]/20">
                <Users className="size-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Add Team Members</h3>
                <p className="text-sm text-gray-600">Scale your team with bulk discounts</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 block mb-2">
                  Number of members: <span className="text-[#F2A119] font-bold">{selectedMembers}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={selectedMembers}
                  onChange={(e) => setSelectedMembers(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F2A119]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                </div>
              </div>

              <div className="bg-[#FAF5EA] rounded-lg p-4 border border-[#F2A119]/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Base price per member:</span>
                  <span className="text-sm text-gray-900">₹{memberPricing.basePrice.toLocaleString()}/year</span>
                </div>
                {selectedMembers >= memberPricing.bulkDiscount.minMembers && (
                  <div className="flex justify-between items-center mb-2 text-[#F2A119]">
                    <span className="text-sm flex items-center gap-1">
                      <Gift className="size-3" />
                      Bulk discount (50% off):
                    </span>
                    <span className="text-sm font-bold">-50%</span>
                  </div>
                )}
                <div className="border-t border-[#F2A119]/10 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-[#F2A119]">₹{calculateMemberPrice().toLocaleString()}</span>
                </div>
                {selectedMembers >= memberPricing.bulkDiscount.minMembers && (
                  <p className="text-xs text-[#F2A119] mt-2">
                    ✨ You saved ₹{(selectedMembers * memberPricing.basePrice - calculateMemberPrice()).toLocaleString()} with bulk discount!
                  </p>
                )}
              </div>

              {/* <Button className="w-full bg-gradient-to-r from-[#F2A119] to-[#E0910A] hover:from-[#E0910A] hover:to-[#D08005] text-white font-semibold">
                Add Members
                <Users className="size-4 ml-2" />
              </Button> */}
            </div>
          </div>
        </motion.div>

        {/* What You Get Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Everything included in all plans</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: FileText, text: "Unlimited Invoices", desc: "Create unlimited professional invoices" },
              { icon: BarChart, text: "Advanced Analytics", desc: "Real-time business insights" },
              { icon: Database, text: "Inventory Management", desc: "Track stock across locations" },
              { icon: Cloud, text: "Cloud Backup", desc: "Automatic secure backups" },
              { icon: Lock, text: "Bank-level Security", desc: "256-bit encryption" },
              { icon: Headphones, text: "24/7 Support", desc: "Priority customer service" },
              { icon: Settings, text: "API Access", desc: "Integrate with any tool" },
              { icon: Award, text: "GST Ready", desc: "Auto-calculate taxes" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/50 border border-[#F2A119]/10 hover:border-[#F2A119]/30 transition-all"
              >
                <div className="p-1.5 rounded-lg bg-[#F2A119]/10 shrink-0">
                  <item.icon className="size-4 text-[#F2A119]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.text}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full bg-[#F2A119]/5 border border-[#F2A119]/20 px-4 py-2"
            whileHover={{ scale: 1.02, borderColor: "#F2A11940" }}
          >
            <Shield className="size-3.5 text-[#F2A119]" />
            <span className="text-xs text-gray-600">All annual plans include 30-day money-back guarantee. Lifetime access comes with lifetime updates.</span>
          </motion.div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isSectionInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-center"
        >
          {[
            { icon: CreditCard, text: "No hidden fees" },
            { icon: Infinity, text: "Cancel anytime" },
            { icon: TrendingUp, text: "Scale as you grow" },
            { icon: Clock, text: "Lifetime updates" },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + idx * 0.1 }}
              className="flex items-center gap-1.5 text-xs text-gray-600"
            >
              <item.icon className="size-3 text-[#F2A119]" />
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(10px); }
          75% { transform: translateY(10px) translateX(-8px); }
        }
      `}</style>
    </section>
  )
}