"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  Receipt, Package, BarChart3,
  Wallet, FileText, Bell,
  ArrowUpRight, Zap, Layers,
} from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useInView } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

/* ─── Data ───────────────────────────────────────────────────────── */
const features = [
  {
    icon: Receipt,
    title: "GST Invoicing",
    desc: "Create professional GST-compliant invoices in seconds. Auto-calculate CGST, SGST, and IGST with print and share options. Smart templates with QR codes for instant payments.",
    image: "/images/invoice.png",
    imageAlt: "evaLite GST invoicing interface",
    tag: "01 / Billing",
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Track stock in real-time with low-stock alerts. Manage products, categories, and pricing from a single view. Barcode scanning and batch tracking included.",
    image: "/images/inventory1.avif",
    imageAlt: "evaLite inventory dashboard",
    tag: "02 / Stock",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    desc: "Visual profit & loss, sales trends, expense breakdowns, and category performance. AI-powered insights and predictive analytics for smarter decisions.",
    image: "/images/analytics1.webp",
    imageAlt: "evaLite analytics charts",
    tag: "03 / Analytics",
  },
]

const miniFeatures = [
  {
    icon: Wallet,
    title: "Expense Tracking",
    desc: "Log and categorize every business expense with receipt management and tax optimization.",
    stat: "Save up to 30%",
  },
  {
    icon: FileText,
    title: "Purchase Orders",
    desc: "Manage supplier purchases, track deliveries, and monitor payables with automated workflows.",
    stat: "50+ integrations",
  },
  {
    icon: Bell,
    title: "Payment Reminders",
    desc: "Automated reminders for pending invoices and overdue customer balances with smart follow-ups.",
    stat: "95% on-time payment",
  },
]

/* ─── Mini Card ──────────────────────────────────────────────────── */
function MiniCard({ f, index }: { f: typeof miniFeatures[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-[#F2A119]/15 bg-white p-6 cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:border-[#F2A119]/40 hover:shadow-2xl hover:shadow-[#F2A119]/10"
    >
      {/* Corner brackets */}
      <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#F2A119]/20 rounded-tl-2xl group-hover:border-[#F2A119]/60 transition-colors duration-300" />
      <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#F2A119]/15 rounded-br-2xl group-hover:border-[#F2A119]/50 transition-colors duration-300" />

      {/* Hover glow */}
      <div className="absolute inset-0  transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(242,161,25,0.07) 0%, transparent 70%)" }}
      />

      {/* Top row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex size-11 items-center justify-center rounded-xl bg-[#F2A119]/10 border border-[#F2A119]/20 group-hover:bg-[#F2A119]/20 transition-all duration-300">
          <f.icon className="size-5 text-[#F2A119]" strokeWidth={1.8} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#F2A119]/60 transition-colors">{f.stat}</span>
          <ArrowUpRight className="size-3 text-gray-300 group-hover:text-[#F2A119] transition-colors" />
        </div>
      </div>

      <h4 className="text-base font-black text-gray-900 tracking-tight">{f.title}</h4>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-300">{f.desc}</p>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#F2A119]/60 via-[#F2A119] to-[#F2A119]/60" />
    </motion.div>
  )
}

/* ─── Main Section ───────────────────────────────────────────────── */
export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from(".features-badge", {
        opacity: 0, y: 20, scale: 0.9, duration: 0.7, ease: "back.out(1.2)",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      })
      gsap.from(".features-title", {
        opacity: 0, y: 36, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      })
      gsap.from(".features-subtitle", {
        opacity: 0, y: 24, duration: 0.7, delay: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
      })

      // Feature panels
      gsap.utils.toArray<HTMLElement>(".feature-panel").forEach((panel, i) => {
        const img     = panel.querySelector(".feature-image")
        const content = panel.querySelector(".feature-content")

        gsap.fromTo(img,
          { opacity: 0, scale: 0.88, rotationY: -12 },
          { opacity: 1, scale: 1, rotationY: 0, duration: 1.1, ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 76%", toggleActions: "play none none reverse" } }
        )
        gsap.fromTo(content,
          { opacity: 0, x: i % 2 === 0 ? -56 : 56 },
          { opacity: 1, x: 0, duration: 0.95, ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 76%", toggleActions: "play none none reverse" } }
        )
        gsap.fromTo(panel.querySelector(".feature-tag"),
          { opacity: 0, x: -24 },
          { opacity: 1, x: 0, duration: 0.55, ease: "back.out(1)",
            scrollTrigger: { trigger: panel, start: "top 80%" } }
        )
        // Parallax
        gsap.to(img, {
          yPercent: -8, ease: "none",
          scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: 1 },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "#FBFAF8" }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Ambient blobs */}
        <div className="absolute top-24 left-1/4 w-[420px] h-[420px] rounded-full bg-[#F2A119]/[0.04] blur-[110px]" />
        <div className="absolute bottom-24 right-1/4 w-[340px] h-[340px] rounded-full bg-[#F2A119]/[0.03] blur-[90px]" />

        {/* Fine grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(242,161,25,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,161,25,0.03)_1px,transparent_1px)] bg-[size:65px_65px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#FBFAF8_100%)]" />

        {/* SVG noise */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <filter id="fn"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>
          <rect width="100%" height="100%" filter="url(#fn)"/>
        </svg>

        {/* Floating dots */}
        {[...Array(36)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#F2A119]"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.15 + 0.02,
              animation: `fDot ${Math.random() * 12 + 6}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      {/* Top/bottom edge lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F2A119]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F2A119]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center mb-20 lg:mb-28">
          <div className="features-badge inline-flex items-center gap-2 rounded-full border border-[#F2A119]/25 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-6">
            <Layers className="size-3.5 text-[#F2A119]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F2A119]">Features</span>
          </div>

          <h2 className="features-title text-4xl font-black text-gray-900 sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
            Everything your{" "}
            <span className="relative inline-block">
              <span className="text-[#F2A119]">business</span>
              <span className="absolute -bottom-1 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-[#F2A119]/0 via-[#F2A119] to-[#F2A119]/0" />
            </span>
            {" "}needs
          </h2>

          <p className="features-subtitle mx-auto mt-6 max-w-xl text-base text-gray-500 leading-relaxed font-mono">
            From invoicing to inventory, evaLite covers every angle of your daily operations
            so you can focus on growth.
          </p>
        </div>

        {/* ── Feature Panels ── */}
        <div className="flex flex-col gap-28 lg:gap-36">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-panel relative flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20"
            >
              {/* Content */}
              <div className={`feature-content flex-1 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                {/* Tag */}
                <div className="feature-tag inline-flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-gradient-to-r from-[#F2A119] to-transparent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F2A119]/70 font-mono">
                    {feature.tag}
                  </span>
                </div>

                {/* Icon */}
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 rounded-2xl bg-[#F2A119]/10 blur-xl" />
                  <div className="relative flex size-16 items-center justify-center rounded-2xl bg-white border border-[#F2A119]/25 shadow-xl shadow-[#F2A119]/10">
                    <feature.icon className="size-7 text-[#F2A119]" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="text-3xl font-black text-gray-900 lg:text-4xl tracking-tight mb-4 leading-[1.15]">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md font-mono">
                  {feature.desc}
                </p>

                <div className="mt-4 h-px w-20 bg-gradient-to-r from-[#F2A119]/40 to-transparent" />
              </div>

              {/* Image */}
              <div className="feature-image flex-1 w-full">
                <div className="relative group">
                  {/* Glow behind */}
                  <div className="absolute -inset-3 rounded-3xl bg-[#F2A119]/5 blur-2xl  transition-opacity duration-500" />

                  <div className="relative overflow-hidden rounded-2xl border border-[#F2A119]/15 bg-white shadow-2xl group-hover:border-[#F2A119]/35 transition-all duration-400">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      width={600}
                      height={450}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {/* Overlay tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-[#F2A119]/5" />

                    {/* Live badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 border border-[#F2A119]/25">
                      <span className="size-1.5 rounded-full bg-[#F2A119] animate-pulse" />
                      <span className="text-[9px] font-black tracking-widest uppercase text-[#F2A119]">Live Demo</span>
                    </div>

                    {/* Number label bottom-left */}
                    <div className="absolute bottom-4 left-4 text-[56px] font-black text-[#F2A119]/8 leading-none select-none pointer-events-none">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mini Features Grid ── */}
        <div className="mt-28 lg:mt-36">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F2A119]/20 bg-white/80 px-4 py-1.5 mb-4">
              <Zap className="size-3.5 text-[#F2A119]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F2A119]">Plus More</span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 sm:text-3xl tracking-tight">
              Powerful tools for modern business
            </h3>
            <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto font-mono">
              Everything you need to streamline operations and boost productivity
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {miniFeatures.map((f, i) => (
              <MiniCard key={f.title} f={f} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fDot {
          0%,100% { transform: translateY(0) translateX(0); }
          33%      { transform: translateY(-22px) translateX(12px); }
          66%      { transform: translateY(16px) translateX(-10px); }
        }
      `}</style>
    </section>
  )
}