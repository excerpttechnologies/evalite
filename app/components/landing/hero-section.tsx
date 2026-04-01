"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight, Play, Sparkles, TrendingUp, FileText,
  Shield, Star, Zap, Clock, Rocket, ChevronRight,
} from "lucide-react"
import { Button } from "@/app/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

/* ─── Cursor Follower ─── */
function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(dotRef.current,  { x: e.clientX, y: e.clientY, duration: 0.1 })
      gsap.to(ringRef.current, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" })
    }
    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  return (
    <>
      <div ref={dotRef}  className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 size-2 rounded-full bg-[#F2A119]" />
      <div ref={ringRef} className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 size-8 rounded-full border border-[#F2A119]/40" />
    </>
  )
}



/* ─── Floating Stat Card ─── */
interface StatCardProps {
  refProp: React.Ref<HTMLDivElement>
  className?: string
  icon: React.ReactNode
  label: string
  value: string
  sub: string
  subIcon: React.ReactNode
}

function StatCard({ refProp, className = "", icon, label, value, sub, subIcon }: StatCardProps) {
  return (
    <div
      ref={refProp}
      className={`absolute hidden sm:block rounded-2xl backdrop-blur-xl border border-[#F2A119]/20 bg-white/95 shadow-2xl shadow-[#F2A119]/10 ${className}`}
    >
      <div className="px-4 py-3 min-w-[190px]">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#F2A119] p-2 shadow-lg shadow-[#F2A119]/30">
            <span className="text-white">{icon}</span>
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#F2A119]/50 uppercase tracking-widest">{label}</p>
            <p className="text-xl font-black text-[#F2A119]">{value}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[#F2A119]/10">
          <span className="text-[#F2A119]/60">{subIcon}</span>
          <p className="text-[9px] font-bold text-[#F2A119]/70">{sub}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─── */
export function HeroSection() {
  const sectionRef      = useRef<HTMLElement>(null)
  const badgeRef        = useRef<HTMLDivElement>(null)
  const headlineRef     = useRef<HTMLHeadingElement>(null)
  const headlineWords   = useRef<HTMLSpanElement[]>([])
  const descRef         = useRef<HTMLParagraphElement>(null)
  const cta0            = useRef<HTMLDivElement>(null)
  const cta1            = useRef<HTMLDivElement>(null)
  const starsRef        = useRef<HTMLDivElement[]>([])
  const imageWrap       = useRef<HTMLDivElement>(null)
  const leftCard        = useRef<HTMLDivElement>(null)
  const rightCard       = useRef<HTMLDivElement>(null)
  const bottomCard      = useRef<HTMLDivElement>(null)
  const lineRef         = useRef<HTMLDivElement>(null)
  const noiseRef        = useRef<SVGSVGElement>(null)

  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  // Magnetic mouse parallax on the radial spotlight
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([badgeRef.current], { opacity: 0, y: -20, scale: 0.85 })
      gsap.set(headlineWords.current, { opacity: 0, y: 50, skewY: 4 })
      gsap.set(descRef.current, { opacity: 0, y: 20 })
      gsap.set([cta0.current, cta1.current], { opacity: 0, y: 20 })
      gsap.set(starsRef.current, { opacity: 0, scale: 0 })
      gsap.set(imageWrap.current, { opacity: 0, y: 60, scale: 0.94 })
      gsap.set([leftCard.current, rightCard.current, bottomCard.current], { opacity: 0, scale: 0.8 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" })

      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 0.9 } })

      tl.to(lineRef.current,          { scaleX: 1, duration: 0.6, ease: "power3.inOut" })
        .to(badgeRef.current,         { opacity: 1, y: 0, scale: 1, ease: "back.out(1.4)", duration: 0.6 }, "-=0.2")
        .to(headlineWords.current,    { opacity: 1, y: 0, skewY: 0, stagger: 0.07 }, "-=0.3")
        .to(descRef.current,          { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .to([cta0.current, cta1.current], { opacity: 1, y: 0, stagger: 0.12 }, "-=0.3")
        .to(starsRef.current,         { opacity: 1, scale: 1, stagger: 0.05, ease: "back.out(2)" }, "-=0.3")
        .to(imageWrap.current,        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "elastic.out(1, 0.55)" }, "-=0.1")
        .to([leftCard.current, rightCard.current], { opacity: 1, scale: 1, stagger: 0.15, ease: "back.out(0.9)" }, "-=0.5")
        .to(bottomCard.current,       { opacity: 1, scale: 1, ease: "back.out(1.2)" }, "-=0.3")

      // Floating
      gsap.to(leftCard.current,  { y: -14, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(rightCard.current, { y: -18, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 })
      gsap.to(bottomCard.current,{ y: -8,  duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 })

      // Subtle image breathe
      gsap.to(imageWrap.current, { scale: 1.012, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" })

      // Parallax orbs on scroll
      gsap.to(".hero-orb", {
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 2 },
        y: 180, scale: 1.2,
      })
    })
    return () => ctx.revert()
  }, [])

  const headline = "Run your business, not spreadsheets"
  const words    = headline.split(" ")

  const spotX = 10 + mousePos.x * 80
  const spotY = 10 + mousePos.y * 80

  return (
    <>
      <CursorGlow />

      <section
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden pt-28 pb-24 sm:pt-28 sm:pb-32"
        style={{ background: "linear-gradient(135deg, #FAF2E6 0%, #FFFFFF 50%, #FAF2E6 100%)" }}
      >
        {/* ── Background ── */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {/* Mouse-reactive spotlight */}
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(ellipse 60% 50% at ${spotX}% ${spotY}%, rgba(242,161,25,0.08) 0%, transparent 70%)`
            }}
          />

          {/* Static ambient blobs */}
          <div className="hero-orb absolute top-[5%]  left-[15%] w-[500px] h-[500px] rounded-full bg-[#F2A119]/[0.05] blur-[120px]" />
          <div className="hero-orb absolute bottom-[5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#F2A119]/[0.04] blur-[100px]" />

          {/* Fine grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(242,161,25,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,161,25,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

          {/* Corner gradient vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#FAF2E6_100%)]" />

          {/* SVG noise texture */}
          <svg ref={noiseRef} className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
              <feColorMatrix type="saturate" values="0"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)"/>
          </svg>

          {/* Floating micro-dots */}
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#F2A119]"
              style={{
                width:  Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                left:  `${Math.random() * 100}%`,
                top:   `${Math.random() * 100}%`,
                opacity: Math.random() * 0.2 + 0.03,
                animation: `floatDot ${Math.random() * 14 + 8}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* ── Top accent line ── */}
        <div
          ref={lineRef}
          className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#F2A119] to-transparent opacity-60"
        />

        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">

          {/* ── Badge ── */}
          <div ref={badgeRef} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F2A119]/30 bg-white/80 backdrop-blur-md px-5 py-2 shadow-lg shadow-[#F2A119]/10">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-[#F2A119] opacity-75 animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-[#F2A119]" />
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-[#F2A119]">
                GST 2.0 Support Live
              </span>
              <Sparkles className="size-3.5 text-[#F2A119]" />
            </div>
          </div>

          {/* ── Headline ── */}
          <h1
            ref={headlineRef}
            className="mx-auto max-w-4xl text-center text-[clamp(2.2rem,6vw,5rem)] font-black leading-[1.1] tracking-tight"
          >
            {words.map((word, i) => (
              <span
                key={i}
                ref={el => { if (el) headlineWords.current[i] = el }}
                className={`inline-block mx-1 ${
                  word === "spreadsheets"
                    ? "text-[#F2A119] relative"
                    : "text-gray-800"
                }`}
              >
                {word}
                {/* Underline accent on last word */}
                {word === "spreadsheets" && (
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#F2A119]/0 via-[#F2A119] to-[#F2A119]/0 rounded-full" />
                )}
              </span>
            ))}
          </h1>

          {/* ── Description ── */}
          <p
            ref={descRef}
            className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-gray-500 font-mono"
          >
            EVA lite is the all-in-one billing, accounting &amp; inventory tool built
            for Indian small businesses — GST invoicing, expense tracking, and smart
            reports in one clean dashboard.
          </p>

          {/* ── CTAs ── */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-5">
            <div ref={cta0}>
              <Link href="/dashboard">
                <button className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#F2A119] px-8 py-4 text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-[#F2A119]/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#F2A119]/40 active:scale-95 overflow-hidden">
                  {/* Shimmer sweep */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Get Started Free</span>
                  <ArrowRight className="relative size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>

            <div ref={cta1}>
              <button className="group inline-flex items-center gap-2.5 rounded-full border border-[#F2A119]/30 bg-white/50 px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#F2A119] backdrop-blur-sm transition-all duration-300 hover:border-[#F2A119]/60 hover:bg-[#F2A119]/10 hover:scale-105">
                <span className="flex size-7 items-center justify-center rounded-full bg-[#F2A119]/15 ring-1 ring-[#F2A119]/30 group-hover:ring-[#F2A119]/60 transition-all">
                  <Play className="size-3.5 fill-[#F2A119] text-[#F2A119]" />
                </span>
                Watch Demo
              </button>
            </div>
          </div>

          {/* ── Social Proof ── */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} ref={el => { if (el) starsRef.current[i] = el }}>
                  <Star className="size-4 fill-[#F2A119] text-[#F2A119]" />
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 font-mono">
              Trusted by{" "}
              <span className="font-black text-base text-[#F2A119]">12,000+</span>
              {" "}businesses across India
            </p>
          </div>

          {/* ── Hero Image ── */}
          <div  className="relative mx-auto mt-20 max-w-4xl cursor-pointer group">
            {/* Glow behind image */}
            <div className="absolute -inset-4 rounded bg-[#F2A119]/5 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Border ring */}
            <div className="relative rounded-lg bg-gradient-to-br from-[#F2A119]/30 via-[#F2A119]/10 to-[#F2A119]/20 p-[1.5px] shadow-2xl">
              <div className="relative rounded-lg bg-white overflow-hidden">
                <Image
                  src="/images/dashbord.PNG"
                  alt="evaLite dashboard"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  priority
                />
                {/* Tinted overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#F2A119]/5 via-transparent to-[#F2A119]/3" />

                {/* Live badge on image */}
                <div className="absolute top-4 right-4 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 border border-[#F2A119]/30 flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#F2A119] animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest uppercase text-[#F2A119]">Live</span>
                  <ChevronRight className="size-2.5 text-[#F2A119]/60" />
                </div>

                {/* Bottom scan line effect */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
              </div>
            </div>

            {/* Stat cards */}
            <StatCard
              refProp={leftCard}
              className="-left-6 bottom-14"
              icon={<TrendingUp className="size-4" />}
              label="Monthly Sales"
              value="₹2.1L"
              sub="+12.5% growth this month"
              subIcon={<Zap className="size-2.5" />}
            />

            <StatCard
              refProp={rightCard}
              className="-right-6 top-14"
              icon={<FileText className="size-4" />}
              label="Invoices Sent"
              value="1.2K"
              sub="GST Compliant · Auto-filed"
              subIcon={<Shield className="size-2.5" />}
            />

            {/* Bottom pill */}
            <div
              ref={bottomCard}
              className="absolute -bottom-12 left-1/2 hidden -translate-x-1/2 sm:flex items-center gap-2 rounded-full bg-white border border-[#F2A119]/25 backdrop-blur-md px-6 py-2.5 shadow-xl shadow-[#F2A119]/10"
            >
              <Clock className="size-3 text-[#F2A119]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#F2A119]/70">
                Real-time updates &amp; analytics
              </span>
              <Rocket className="size-3 text-[#F2A119]" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#FAF2E6] to-transparent pointer-events-none" />

        <style jsx>{`
          @keyframes floatDot {
            0%,100% { transform: translateY(0) translateX(0); }
            33%      { transform: translateY(-22px) translateX(12px); }
            66%      { transform: translateY(16px) translateX(-10px); }
          }
          @keyframes ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .animate-ticker {
            animation: ticker 28s linear infinite;
          }
        `}</style>
      </section>
    </>
  )
}