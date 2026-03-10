import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-foreground px-6 py-14 text-center sm:px-14 sm:py-20">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[200px] w-[500px] rounded-full bg-primary/20 blur-3xl" />

          <div className="relative">
            <h2 className="mx-auto max-w-xl text-2xl font-extrabold text-background sm:text-3xl lg:text-4xl text-balance">
              Ready to simplify your business?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-background/70 leading-relaxed sm:text-base">
              Join 12,000+ Indian businesses that trust evaLite for billing, inventory, and accounting.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-sm font-semibold px-7">
                  Start Free Today
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 text-sm font-medium px-7 border-background/20 bg-transparent text-background hover:bg-background/10 hover:text-background"
                >
                  View Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary">
                <Zap className="size-3.5 text-primary-foreground" />
              </div>
              <span className="text-base font-bold text-foreground">
                eva<span className="text-primary">Lite</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Modern billing, accounting, and inventory management for Indian small businesses.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground">Product</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {["Billing", "Inventory", "Reports", "Expenses"].map((l) => (
                <li key={l}>
                  <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground">Company</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {["About", "Blog", "Careers", "Contact"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground">Legal</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} evaLite. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with care for Indian businesses
          </p>
        </div>
      </div>
    </footer>
  )
}
