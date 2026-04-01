"use client"

import Link from "next/link"
import { ArrowRight, Zap, Sparkles, Rocket, Shield, Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin, Star, Award, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/app/components/ui/button"
import { motion, useInView, Variants } from "framer-motion"
import { useRef } from "react"



function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="#F6D08F"/>
      <path d="M7 14L12 9L17 14L22 9" stroke="#111617" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 19L12 14L17 19L22 14" stroke="#111617" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
    </svg>
  )
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 overflow-hidden"
      style={{ backgroundColor: "#FBFAF8" }}
    >
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F6D08F] to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#F6D08F]/5 via-[#F2A119]/5 to-[#E0910A]/5 backdrop-blur-sm border border-[#F6D08F]/30 px-5 py-8 text-center sm:px-8 sm:py-10"
        >
          {/* Animated background glow - smaller */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-r from-[#F6D08F]/20 to-[#F2A119]/20 blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-[#F2A119]/20 to-[#E0910A]/20 blur-3xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </div>

          {/* Decorative elements - smaller */}
          <motion.div 
            className="absolute top-3 left-3 opacity-10"
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="size-8 text-gray-900" />
          </motion.div>
          <motion.div 
            className="absolute bottom-3 right-3 opacity-10"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Rocket className="size-8 text-gray-900" />
          </motion.div>

          <div className="relative z-10">
            <motion.div 
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F6D08F]/10 border border-[#F6D08F]/30 px-3 py-1 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Rocket className="size-3 text-[#F6D08F]" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6D08F]">Get Started Today</span>
            </motion.div>
            
            <h2 className="mx-auto max-w-2xl text-2xl font-extrabold text-gray-900 sm:text-3xl lg:text-4xl text-balance">
              Ready to simplify your
              <span className="relative inline-block mx-1">
                <span className="relative z-10 bg-gradient-to-r from-[#F6D08F] via-[#F2A119] to-[#E0910A] bg-clip-text text-transparent">
                  business?
                </span>
                <motion.div 
                  className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-gradient-to-r from-[#F6D08F]/30 to-[#F2A119]/30 blur-sm"
                  animate={{ 
                    scaleX: [1, 1.1, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </h2>
            
            <p className="mx-auto mt-2 max-w-md text-xs text-gray-600 leading-relaxed sm:text-sm">
              Join 12,000+ Indian businesses that trust evaLite for billing, inventory, and accounting.
            </p>
            
            <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-3">
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="default"
                    className="gap-2 text-sm font-semibold px-5 py-2 h-9 bg-gradient-to-r from-[#F6D08F] to-[#F2A119] hover:from-[#F2A119] hover:to-[#E0910A] text-gray-900 shadow-md shadow-[#F6D08F]/30 group"
                  >
                    Start Free Today
                    <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/dashboard">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-2 text-sm font-medium px-5 py-2 h-9 border-[#F6D08F]/40 hover:border-[#F6D08F]/60 hover:bg-[#F6D08F]/10 text-gray-700"
                  >
                    View Live Demo
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Trust indicators - compact */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <motion.div 
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 }}
              >
                <Shield className="size-3 text-[#F6D08F]" />
                <span className="text-[10px] text-gray-600">No credit card</span>
              </motion.div>
              <div className="w-px h-2.5 bg-[#F6D08F]/20" />
              <motion.div 
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <Star className="size-3 text-[#F6D08F]" />
                <span className="text-[10px] text-gray-600">14-day trial</span>
              </motion.div>
              <div className="w-px h-2.5 bg-[#F6D08F]/20" />
              <motion.div 
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <CheckCircle className="size-3 text-[#F6D08F]" />
                <span className="text-[10px] text-gray-600">Cancel anytime</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: "-50px" })

  const footerLinks = {
    product: [
      { name: "Billing", href: "#features" },
      { name: "Inventory", href: "#features" },
      { name: "Reports", href: "#features" },
      { name: "Expenses", href: "#features" },
      { name: "GST Filing", href: "#features" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Press Kit", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Refund Policy", href: "#" },
      { name: "Security", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  }

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ]

  const logoV: Variants = {
    hidden:  { opacity: 0, x: -24, scale: 0.9 },
    visible: { opacity: 1, x: 0,  scale: 1, transition: { type: "spring", stiffness: 400, damping: 22, delay: 0.1 } },
  }

  return (
    <footer 
      ref={footerRef}
      className="relative border-t border-[#F6D08F]/20 overflow-hidden"
      style={{ backgroundColor: "#FBFAF8" }}
    >
      {/* Gradient Border Top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F6D08F] to-transparent" />

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F6D08F08_1px,transparent_1px),linear-gradient(to_bottom,#F6D08F08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <motion.div variants={logoV} initial="hidden" animate="visible">
              <Link href="/" className="group flex items-center gap-2.5">
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <LogoMark />
                </motion.div>
                <div className="flex flex-col leading-none">
                  <span className="text-[17px] font-black tracking-tight text-gray-900">
                    EVA <em className="not-italic text-[#F6D08F]">lite</em>
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#F6D08F]/50">
                    Smart Billing
                  </span>
                </div>
              </Link>
            </motion.div>
            
            <p className="mt-3 text-xs text-gray-600 leading-relaxed max-w-xs">
              Modern billing, accounting, and inventory management for Indian small businesses.
            </p>

            {/* Contact Info - compact */}
            <div className="mt-4 space-y-1.5">
              {[
                { icon: Mail, text: "info@excerptech.com", delay: 0 },
                { icon: Phone, text: "+91 63646 57660 / 99013 71386", delay: 0.1 },
                { icon: MapPin, text: "B133/1, 2nd Floor, KSSIDC ITI Estate,Whitefield Main Road, Mahadevapura,Bengaluru, Karnataka – 560048", delay: 0.2 },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-center gap-1.5 text-xs text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + item.delay }}
                >
                  <item.icon className="size-3 text-[#F6D08F]" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links - compact */}
            {/* <div className="mt-4 flex gap-2">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-1.5 rounded-md bg-white/50 border border-[#F6D08F]/20 hover:border-[#F6D08F]/40 hover:bg-[#F6D08F]/10 transition-all duration-300 group"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + idx * 0.1, type: "spring" }}
                  whileHover={{ y: -2 }}
                >
                  <social.icon className="size-3.5 text-gray-500 group-hover:text-[#F6D08F] transition-colors" />
                </motion.a>
              ))}
            </div> */}
          </motion.div>

          {/* Footer Links - compact */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h4>
              <ul className="mt-2 flex flex-col gap-1.5">
                {links.map((link, linkIdx) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + idx * 0.1 + linkIdx * 0.05 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-xs text-gray-600 hover:text-[#F6D08F] transition-colors duration-300 group flex items-center gap-1"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform duration-300">→</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section - compact */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[#F6D08F]/20 pt-6 sm:flex-row"
        >
          <div className="text-[10px] text-gray-500">
            &copy; {new Date().getFullYear()} evaLite. All rights reserved.
          </div>

          <a href="https://excerptech.com/" target="_blank"  className="text-[10px] text-gray-500">
           Developed by <b>Excerpt Technology Pvt. Ltd.</b>
          </a>
          
          <div className="flex items-center gap-3">
            <motion.div 
              className="text-[10px] text-gray-500 flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              Made with <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="size-2.5 text-[#F6D08F] fill-[#F6D08F]/20" />
              </motion.div> for Indian businesses
            </motion.div>
            <div className="h-2 w-px bg-[#F6D08F]/20" />
            <motion.div 
              className="text-[10px] text-gray-500 flex items-center gap-1"
              whileHover={{ scale: 1.02 }}
            >
              <Award className="size-2.5 text-[#F6D08F]" />
              GST Ready
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
      `}</style>
    </footer>
  )
}