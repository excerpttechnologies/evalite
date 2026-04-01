"use client"

import { UserPlus, FileText, BarChart3, ArrowRight, Sparkles, Rocket, Zap, CheckCircle2, TrendingUp } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Sign up in 30 seconds",
    desc: "Create your free account. No credit card needed. Import your existing data or start fresh.",
    gradient: "from-[#F6D08F] to-[#F2A119]",
    color: "#F6D08F",
  },
  {
    num: "02",
    icon: FileText,
    title: "Create your first invoice",
    desc: "Add your products, set GST rates, and generate beautiful invoices your customers will love.",
    gradient: "from-[#F6D08F] to-[#F2A119]",
    color: "#F6D08F",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Watch your business grow",
    desc: "Track sales, expenses, and profit in real-time. Let smart reports guide your decisions.",
    gradient: "from-[#F6D08F] to-[#F2A119]",
    color: "#F6D08F",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.9,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.6,
    },
  },
} as const

const iconVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0,
    rotate: -180,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      duration: 0.5,
    },
  },
} as const

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })
  const isStepsInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef}
      className="relative py-12 sm:py-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FBFAF8 0%, #F6D08F 50%, #FFFEFE 100%)" }}
    >
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F6D08F] to-transparent" />
      
      {/* Gradient Border Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F6D08F]/50 to-transparent" />

      {/* Premium Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FBFAF8]/50 via-transparent to-[#FFFEFE]/50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-[#F6D08F]/20 to-[#F2A119]/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-[#F6D08F]/20 to-[#F2A119]/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-r from-[#F6D08F]/20 to-[#F2A119]/20 blur-3xl animate-pulse delay-2000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F6D08F08_1px,transparent_1px),linear-gradient(to_bottom,#F6D08F08_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#F6D08F]/20 to-[#F2A119]/20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
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
          className="text-center mb-8 lg:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F6D08F]/30 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-4">
            <Rocket className="size-3.5 text-[#F6D08F]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F6D08F]">Simple Process</span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl tracking-tight">
            Up and running in
            <span className="relative inline-block mx-2">
              <span className="relative z-10 bg-gradient-to-r from-[#F6D08F] via-[#F2A119] to-[#E0910A] bg-clip-text text-transparent">
                minutes
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-[#F6D08F]/30 to-[#F2A119]/30 blur-md" />
            </span>
          </h2>
          
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
            Get started with evaLite in three simple steps and transform your business operations
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div 
          className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate={isStepsInView ? "visible" : "hidden"}
        >
          {/* Decorative connector lines - Desktop only */}
          <div className="absolute top-20 left-0 right-0 hidden lg:block">
            <div className="relative h-px w-full">
              <div 
                className="absolute left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-[#F6D08F]/50 to-transparent"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              />
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#F6D08F]/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#F6D08F]/10 hover:border-[#F6D08F]/40">
                {/* Step Number Background */}
                <div className="absolute top-3 right-3 text-5xl font-black opacity-5 text-gray-900">
                  {step.num}
                </div>

                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  className="relative mb-5"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#F6D08F] to-[#F2A119] blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div 
                    className={`relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.gradient} shadow-lg shadow-[#F6D08F]/30`}
                  >
                    <step.icon className="size-7 text-white" />
                  </div>
                  
                  {/* Pulsing ring */}
                  <div className="absolute -inset-1 rounded-2xl border-2 border-[#F6D08F]/30 animate-pulse  transition-opacity duration-500" />
                </motion.div>

                {/* Step Number Badge */}
                <div className="inline-flex items-center justify-center rounded-full bg-[#F6D08F]/10 border border-[#F6D08F]/30 px-2.5 py-0.5 mb-3">
                  <span className="text-[10px] font-bold text-[#F6D08F]">Step {step.num}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.desc}
                </p>

                {/* Decorative bottom bar */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-[#F6D08F] to-[#F2A119] rounded-full  transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isStepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full p-1 border border-[#F6D08F]/20 shadow-lg">
            <div className="flex items-center gap-2 px-5 py-2.5">
              <Sparkles className="size-3.5 text-[#F6D08F]" />
              <span className="text-xs font-medium text-gray-700">Ready to transform your business?</span>
            </div>
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#F6D08F] to-[#F2A119] hover:from-[#F2A119] hover:to-[#E0910A] text-white font-semibold px-5 py-2.5 rounded-full transition-all duration-300 group shadow-lg shadow-[#F6D08F]/30 text-sm"
            >
              Try the live demo
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(10px); }
          75% { transform: translateY(10px) translateX(-8px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}