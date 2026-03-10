import { UserPlus, FileText, BarChart3, ArrowRight } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: UserPlus,
    title: "Sign up in 30 seconds",
    desc: "Create your free account. No credit card needed. Import your existing data or start fresh.",
  },
  {
    num: "02",
    icon: FileText,
    title: "Create your first invoice",
    desc: "Add your products, set GST rates, and generate beautiful invoices your customers will love.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Watch your business grow",
    desc: "Track sales, expenses, and profit in real-time. Let smart reports guide your decisions.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl text-balance">
            Up and running in minutes
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
          {/* Connector line */}
          <div className="pointer-events-none absolute top-14 left-[16.6%] right-[16.6%] hidden h-px bg-border sm:block" />

          {steps.map((s) => (
            <div key={s.num} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border-2 border-primary bg-card shadow-sm">
                <s.icon className="size-6 text-primary" />
              </div>
              <span className="mt-4 text-xs font-bold uppercase tracking-widest text-primary">{s.num}</span>
              <h3 className="mt-2 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Try the live demo
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
