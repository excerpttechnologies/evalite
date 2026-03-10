import { TrendingUp, Users, Package, Shield } from "lucide-react"

const stats = [
  { value: "12K+", label: "Active Businesses", icon: Users },
  { value: "5Cr+", label: "Invoices Generated", icon: TrendingUp },
  { value: "50L+", label: "Products Tracked", icon: Package },
  { value: "99.9%", label: "Uptime Guarantee", icon: Shield },
]

export function StatsBar() {
  return (
    <section className="border-y border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4 md:gap-8 md:py-14">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <s.icon className="size-5 text-primary" />
            </div>
            <p className="text-2xl font-extrabold text-foreground sm:text-3xl">{s.value}</p>
            <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
