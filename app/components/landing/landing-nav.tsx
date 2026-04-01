"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import {
  Menu, X, ArrowRight,
  LayoutGrid, Settings, Users, CreditCard,
  Rocket, Zap,
} from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Button } from "@/app/components/ui/button"

interface NavLink {
  label: string
  href: string
  icon: React.ElementType
  description?: string
}

const navLinks: NavLink[] = [
  { label: "Features",     href: "#features",     icon: LayoutGrid, description: "Powerful tools"  },
  { label: "How It Works", href: "#how-it-works",  icon: Settings,   description: "Simple process"  },
  { label: "Testimonials", href: "#testimonials",  icon: Users,      description: "Trusted stories" },
  { label: "Pricing",      href: "#pricing",       icon: CreditCard, description: "Flexible plans"  },
]

/* ── Logo SVG Mark ── */
function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="7" fill="#F2A119"/>
      <path d="M7 14L12 9L17 14L22 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 19L12 14L17 19L22 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
    </svg>
  )
}

/* ── animation variants ── */
const logoV: Variants = {
  hidden:  { opacity: 0, x: -24, scale: 0.9 },
  visible: { opacity: 1, x: 0,  scale: 1, transition: { type: "spring", stiffness: 400, damping: 22, delay: 0.1 } },
}

const navItemV: Variants = {
  hidden:  (i: number) => ({ opacity: 0, y: -16 }),
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 22, delay: 0.2 + i * 0.07 } }),
}

const btnV: Variants = {
  hidden:  (i: number) => ({ opacity: 0, x: 20, scale: 0.95 }),
  visible: (i: number) => ({ opacity: 1, x: 0,  scale: 1,   transition: { type: "spring", stiffness: 380, damping: 22, delay: 0.5 + i * 0.1 } }),
}

const mobileBtnV: Variants = {
  hidden:  { opacity: 0, x: 18, scale: 0.9 },
  visible: { opacity: 1, x: 0,  scale: 1,   transition: { type: "spring", stiffness: 380, damping: 22, delay: 0.35 } },
}

const mobileItemV: Variants = {
  hidden:  (i: number) => ({ opacity: 0, x: -24 }),
  visible: (i: number) => ({ opacity: 1, x: 0,    transition: { type: "spring", stiffness: 380, damping: 22, delay: i * 0.07 } }),
}

export function LandingNav() {
  const [open,          setOpen]          = useState(false)
  const [isLoggedIn,    setIsLoggedIn]    = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [scrolled,      setScrolled]      = useState(false)
  const [mounted,       setMounted]       = useState(false)
  const menuRef    = useRef<HTMLDivElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
    setIsLoggedIn(!!localStorage.getItem("token"))

    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      for (const { href } of navLinks) {
        const el = document.getElementById(href.slice(1))
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= 100 && r.bottom >= 100) { setActiveSection(href.slice(1)); break }
        }
      }
    }

    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (menuRef.current && menuBtnRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          !menuBtnRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    if (open) {
      document.addEventListener("mousedown", onOutside)
      document.addEventListener("keydown", onEsc)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.removeEventListener("mousedown", onOutside)
      document.removeEventListener("keydown", onEsc)
      document.body.style.overflow = "unset"
    }
  }, [open])

  const scrollTo = (href: string) => {
    setOpen(false)
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 150)
  }

  return (
    <>
      {/* ── Header ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, type: "spring", stiffness: 110, damping: 20 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/50 backdrop-blur-xl border-b border-[#F2A119]/20 shadow-lg"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* Top accent line that animates in */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#F2A119] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: scrolled ? 1 : 0, opacity: scrolled ? 0.7 : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ transformOrigin: "left center", width: "100%" }}
        />

        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ── Logo ── */}
          <motion.div variants={logoV} initial="hidden" animate={mounted ? "visible" : "hidden"}>
            <Link href="/" className="group flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <LogoMark />
              </motion.div>
              <div className="flex flex-col leading-none">
                <span className={`text-[17px] font-black tracking-tight transition-colors duration-300 text-gray-900`}>
                  EVA <em className=" text-[#F2A119] ">lite</em>
                </span>
                <span className={`text-[9px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 ${
                  scrolled ? "text-[#F2A119]/60" : "text-[#F2A119]/70"
                }`}>
                  Smart Billing
                </span>
              </div>
            </Link>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, i) => {
              const active = activeSection === link.href.slice(1)
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={navItemV}
                  initial="hidden"
                  animate={mounted ? "visible" : "hidden"}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  className="relative px-3.5 py-2 cursor-pointer group"
                  whileHover={{ y: -1 }}
                >
                  {/* Background pill on hover / active */}
                  <motion.span
                    className={`absolute inset-0 rounded-lg ${active ? "bg-[#F2A119]/12" : "bg-transparent"}`}
                    whileHover={{ backgroundColor: "rgba(242,161,25,0.08)" }}
                    transition={{ duration: 0.2 }}
                  />

                  <span className={`relative z-10 flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${
                    active 
                      ? "text-[#F2A119]" 
                      : scrolled 
                        ? "text-gray-700 group-hover:text-gray-900" 
                        : "text-gray-500 group-hover:text-white"
                  }`}>
                    <link.icon className="size-3.5" />
                    {link.label}
                  </span>

                  {/* Active indicator */}
                  {active && (
                    <motion.span
                      layoutId="activeDesktop"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-4 rounded-full bg-[#F2A119]"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </nav>

          {/* ── Desktop Buttons ── */}
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <motion.div custom={0} variants={btnV} initial="hidden" animate={mounted ? "visible" : "hidden"}>
                <Link href="/dashboard">
                  <button className="group inline-flex items-center gap-2 rounded-full bg-[#F2A119] px-5 py-2.5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#F2A119]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#F2A119]/35 active:scale-95 overflow-hidden relative">
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative">Dashboard</span>
                    <ArrowRight className="relative size-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
              </motion.div>
            ) : (
              <>
                <motion.div custom={0} variants={btnV} initial="hidden" animate={mounted ? "visible" : "hidden"}>
                  <Link href="/login">
                    <button className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors duration-200 hover:bg-white/10 ${
                      scrolled 
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
                        : "text-gray-500 "
                    }`}>
                      Log in
                    </button>
                  </Link>
                </motion.div>
                <motion.div custom={1} variants={btnV} initial="hidden" animate={mounted ? "visible" : "hidden"}>
                  <Link href="/dashboard">
                    <button className="group inline-flex items-center gap-2 rounded-full bg-[#F2A119] px-5 py-2.5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#F2A119]/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#F2A119]/35 active:scale-95 overflow-hidden relative">
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative">Start Free</span>
                      <Rocket className="relative size-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.div variants={mobileBtnV} initial="hidden" animate={mounted ? "visible" : "hidden"} className="md:hidden">
            <motion.button
              ref={menuBtnRef}
              onClick={() => setOpen(v => !v)}
              whileTap={{ scale: 0.88 }}
              aria-label="Toggle navigation"
              className={`flex size-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                scrolled
                  ? "border-[#F2A119]/20 bg-white/80 backdrop-blur-sm hover:border-[#F2A119]/50"
                  : "border-gray-500/20 bg-white/10 backdrop-blur-sm hover:border-white/40"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <X className={`size-4 ${scrolled ? "text-[#F2A119]" : "text-gray-500"}`} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                    <Menu className={`size-4 ${scrolled ? "text-gray-600" : "text-gray-600"}`} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-[#F2A119]/15 bg-white/95 backdrop-blur-2xl"
              style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 49 }}
            >
              <div className="px-4 py-5 space-y-1.5 max-h-[calc(100vh-4rem)] overflow-y-auto">

                {navLinks.map((link, i) => {
                  const active = activeSection === link.href.slice(1)
                  return (
                    <motion.button
                      key={link.href}
                      custom={i}
                      variants={mobileItemV}
                      initial="hidden"
                      animate="visible"
                      onClick={() => scrollTo(link.href)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        active
                          ? "bg-[#F2A119]/10 border border-[#F2A119]/30"
                          : "hover:bg-[#F2A119]/5 border border-transparent"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg ${active ? "bg-[#F2A119]/20" : "bg-gray-100"}`}>
                        <link.icon className={`size-4 ${active ? "text-[#F2A119]" : "text-gray-500"}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold ${active ? "text-[#F2A119]" : "text-gray-800"}`}>{link.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{link.description}</p>
                      </div>
                      {active && (
                        <motion.div
                          layoutId="activeMobile"
                          className="h-6 w-1 rounded-full bg-[#F2A119]"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                        />
                      )}
                    </motion.button>
                  )
                })}

                {/* Divider */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.35 }}
                  className="h-px my-3 bg-gradient-to-r from-transparent via-[#F2A119]/30 to-transparent"
                  style={{ transformOrigin: "left" }}
                />

                {/* Mobile CTA buttons */}
                {isLoggedIn ? (
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <Link href="/dashboard">
                      <button onClick={() => setOpen(false)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#F2A119] py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#F2A119]/25 transition-all hover:scale-[1.02]">
                        Go to Dashboard <ArrowRight className="size-4" />
                      </button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-2.5">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                      <Link href="/login">
                        <button onClick={() => setOpen(false)} className="w-full rounded-xl border border-[#F2A119]/25 py-3.5 text-sm font-bold text-gray-600 hover:text-gray-900 hover:border-[#F2A119]/50 hover:bg-[#F2A119]/5 transition-all">
                          Log in
                        </button>
                      </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}>
                      <Link href="/dashboard">
                        <button onClick={() => setOpen(false)} className="group w-full flex items-center justify-center gap-2 rounded-xl bg-[#F2A119] py-3.5 text-sm font-black uppercase tracking-widest text-white shadow-lg shadow-[#F2A119]/25 transition-all hover:scale-[1.02]">
                          Start Free <Rocket className="size-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </Link>
                    </motion.div>
                  </div>
                )}

                {/* Bottom brand note */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-[10px] text-gray-400 font-mono pt-2 pb-1 tracking-widest uppercase"
                >
                  <Zap className="inline size-2.5 text-[#F2A119]/60 mr-1" />
                  GST 2.0 ready · Indian small businesses
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}