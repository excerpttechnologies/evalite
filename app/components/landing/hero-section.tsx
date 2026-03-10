import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/app/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute top-40 right-0 h-[300px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-foreground tracking-wide">Now with GST 2.0 support</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
          Run your business,{" "}
          <span className="text-primary">not spreadsheets</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
          evaLite is the all-in-one billing, accounting, and inventory tool built
          for Indian small businesses. GST invoicing, expense tracking, and smart
          reports in one clean dashboard.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 text-sm font-semibold px-7 shadow-lg shadow-primary/25">
              Get Started Free
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="gap-2 text-sm font-medium px-7">
            <Play className="size-4" />
            Watch Demo
          </Button>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-center text-xs font-medium text-muted-foreground">
          Trusted by <span className="text-foreground font-semibold">12,000+</span> businesses across India
        </p>

        {/* Hero image */}
        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="rounded-xl border border-border bg-card p-2 shadow-2xl shadow-primary/10">
            <Image
              src="/images/hero-dashboard.jpg"
              alt="evaLite dashboard showing sales analytics, inventory overview, and billing summary"
              width={1200}
              height={700}
              className="rounded-lg"
              priority
            />
          </div>
          {/* Floating stat cards */}
          <div className="absolute -left-4 bottom-12 hidden rounded-lg border border-border bg-card px-4 py-3 shadow-lg sm:block">
            <p className="text-xs font-medium text-muted-foreground">Monthly Sales</p>
            <p className="text-lg font-bold text-foreground">&#8377;2,10,000</p>
            <p className="text-xs font-semibold text-success">+12% this month</p>
          </div>
          <div className="absolute -right-4 top-12 hidden rounded-lg border border-border bg-card px-4 py-3 shadow-lg sm:block">
            <p className="text-xs font-medium text-muted-foreground">Invoices Sent</p>
            <p className="text-lg font-bold text-foreground">1,248</p>
            <p className="text-xs font-semibold text-primary">GST Compliant</p>
          </div>
        </div>
      </div>
    </section>
  )
}
