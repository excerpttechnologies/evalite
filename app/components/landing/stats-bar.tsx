"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion, Variants } from "framer-motion"
import { TrendingUp, Users, Package, Shield, Zap } from "lucide-react"

const stats = [
  {
    value: "12K+",
    label: "Active Businesses",
    icon: Users,
    numericValue: 12,
    format: "K",
    suffix: "K+",
  },
  {
    value: "5Cr+",
    label: "Invoices Generated",
    icon: TrendingUp,
    numericValue: 5,
    format: "Cr",
    suffix: "Cr+",
  },
  {
    value: "50L+",
    label: "Products Tracked",
    icon: Package,
    numericValue: 50,
    format: "L",
    suffix: "L+",
  },
  {
    value: "99.9%",
    label: "Uptime Guarantee",
    icon: Shield,
    numericValue: 99.9,
    format: "percent",
    suffix: "%",
  },
]

/* ── Variants ── */
const containerV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardV: Variants = {
  hidden:  { opacity: 0, y: 36, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1,   transition: { type: "spring", stiffness: 360, damping: 28 } },
}

/* ── Animated counter hook ── */
function useCounter(target: number, decimals: number, active: boolean, delay = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const timeout = setTimeout(() => {
      const dur = 1800, step = 16
      const steps = dur / step
      let i = 0
      const t = setInterval(() => {
        i++
        const p = i / steps
        const ease = 1 - Math.pow(1 - p, 3) // ease-out-cubic
        setVal(parseFloat((target * ease).toFixed(decimals)))
        if (i >= steps) { setVal(target); clearInterval(t) }
      }, step)
      return () => clearInterval(t)
    }, delay)
    return () => clearTimeout(timeout)
  }, [active, target, decimals, delay])
  return val
}

/* ── Single stat card ── */
function StatCard({ stat, index, inView }: { stat: typeof stats[0]; index: number; inView: boolean }) {
  const decimals = stat.format === "percent" ? 1 : 0
  const raw = useCounter(stat.numericValue, decimals, inView, index * 120)

  const display =
    stat.format === "percent"
      ? `${raw.toFixed(1)}%`
      : `${raw % 1 === 0 ? Math.floor(raw) : raw}${stat.suffix}`

  return (
    <motion.div
      variants={cardV}
      whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className="group relative"
    >
      {/* Hover glow behind card */}
      <div className="absolute -inset-px rounded-2xl bg-[#F2A119]/0 group-hover:bg-[#F2A119]/8 transition-all duration-500 blur-xl" />

      <div className="relative flex flex-col items-center text-center p-7 rounded-2xl border border-[#F2A119]/15 bg-white overflow-hidden transition-all duration-400 group-hover:border-[#F2A119]/40 group-hover:shadow-2xl group-hover:shadow-[#F2A119]/10">

        {/* Top-left corner accent */}
        <span className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#F2A119]/30 rounded-tl-2xl group-hover:border-[#F2A119]/60 transition-colors duration-300" />
        {/* Bottom-right corner accent */}
        <span className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#F2A119]/20 rounded-br-2xl group-hover:border-[#F2A119]/50 transition-colors duration-300" />

        {/* Inner radial glow */}
        <div className="absolute inset-0  transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(242,161,25,0.07) 0%, transparent 70%)" }}
        />

        {/* Icon */}
        <motion.div
          className="relative mb-5"
          whileHover={{ rotate: 8, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {/* Ping ring */}
          <motion.span
            className="absolute -inset-2 rounded-xl border border-[#F2A119]/20 group-hover:border-[#F2A119]/50"
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
          />
          <div className="relative flex size-14 items-center justify-center rounded-xl bg-[#F2A119]/10 border border-[#F2A119]/25 group-hover:bg-[#F2A119]/20 transition-all duration-300 shadow-lg shadow-[#F2A119]/10">
            <stat.icon className="size-6 text-[#F2A119]" strokeWidth={1.8} />
          </div>
        </motion.div>

        {/* Number */}
        <p className="text-4xl sm:text-5xl font-black text-[#F2A119] tabular-nums tracking-tight leading-none">
          {inView ? display : stat.value}
        </p>

        {/* Label */}
        <p className="mt-2.5 text-xs font-bold uppercase tracking-[0.18em] text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
          {stat.label}
        </p>

        {/* Animated underline bar */}
        <motion.div
          className="mt-4 h-[2px] rounded-full bg-[#F2A119]"
          initial={{ width: 0, opacity: 0 }}
          animate={inView ? { width: "40%", opacity: 0.5 } : {}}
          transition={{ delay: 0.5 + index * 0.12, duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  )
}

/* ── Main export ── */
export function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25, rootMargin: "-40px 0px" })

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#FBFAF8" }}>

      {/* ── Background ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Ambient blobs */}
        <motion.div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#F2A119]/[0.04] blur-[100px]"
          animate={{ scale: [1, 1.15, 1], x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[350px] h-[350px] rounded-full bg-[#F2A119]/[0.03] blur-[90px]"
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />

        {/* Fine grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(242,161,25,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(242,161,25,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#FBFAF8_100%)]" />

        {/* Floating dots */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#F2A119]"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{ y: [0, -28, 0], opacity: [0, 0.2, 0] }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 6,
            }}
          />
        ))}
      </div>

      {/* ── Top & bottom border lines ── */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F2A119]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F2A119]/20 to-transparent" />

      <motion.div
        ref={ref}
        variants={containerV}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
      >

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2A119]/25 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-4">
            <Zap className="size-3.5 text-[#F2A119]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F2A119]">
              Trusted Numbers
            </span>
          </div>

          <h3 className="text-2xl font-black text-gray-900 sm:text-3xl tracking-tight">
            Growing with{" "}
            <span className="text-[#F2A119]">Indian Businesses</span>
          </h3>
          <p className="mt-3 text-sm text-gray-500 max-w-md mx-auto font-mono">
            Real numbers from real businesses using evaLite
          </p>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:gap-7">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Bottom accent ── */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-[#F2A119] to-transparent"
          style={{ transformOrigin: "center" }}
        />
      </motion.div>
    </section>
  )
}