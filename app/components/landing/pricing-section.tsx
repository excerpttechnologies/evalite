import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/app/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect for getting started",
    features: ["50 invoices / month", "Basic inventory", "1 user", "Email support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "499",
    desc: "For growing businesses",
    features: ["Unlimited invoices", "Full inventory & reports", "5 users", "Priority support", "GST filing ready"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Business",
    price: "1,499",
    desc: "For teams and multi-store",
    features: ["Everything in Pro", "Unlimited users", "Multi-store support", "API access", "Dedicated manager"],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Pricing</p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Start free. Upgrade when you are ready. No hidden fees.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border p-6 transition-all ${
                p.highlighted
                  ? "border-primary bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-primary/20 hover:shadow-md"
              }`}
            >
              {p.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-bold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <p className="text-sm font-bold text-card-foreground">{p.name}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-foreground">&#8377;{p.price}</span>
                <span className="text-sm text-muted-foreground">/ month</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-6 flex flex-col gap-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-card-foreground">
                    <Check className="size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/dashboard" className="mt-6">
                <Button
                  className="w-full font-semibold"
                  variant={p.highlighted ? "default" : "outline"}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
