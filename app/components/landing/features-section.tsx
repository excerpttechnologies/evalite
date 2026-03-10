import Image from "next/image"
import { Receipt, Package, BarChart3, Wallet, FileText, Bell } from "lucide-react"

const features = [
  {
    icon: Receipt,
    title: "GST Invoicing",
    desc: "Create professional GST-compliant invoices in seconds. Auto-calculate CGST, SGST, and IGST with print and share options.",
    image: "/images/feature-billing.jpg",
    imageAlt: "evaLite GST invoicing interface showing a professional invoice with tax breakdown",
  },
  {
    icon: Package,
    title: "Inventory Management",
    desc: "Track stock in real-time with low-stock alerts. Manage products, categories, and pricing from a single view.",
    image: "/images/feature-inventory.jpg",
    imageAlt: "evaLite inventory dashboard showing product stock levels and categories",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    desc: "Visual profit & loss, sales trends, expense breakdowns, and category performance. Data-driven decisions made easy.",
    image: "/images/feature-reports.jpg",
    imageAlt: "evaLite analytics showing bar charts and trend lines for business performance",
  },
]

const miniFeatures = [
  { icon: Wallet, title: "Expense Tracking", desc: "Log and categorize every business expense with receipt management." },
  { icon: FileText, title: "Purchase Orders", desc: "Manage supplier purchases, track deliveries, and monitor payables." },
  { icon: Bell, title: "Payment Reminders", desc: "Automated reminders for pending invoices and overdue customer balances." },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Features</p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl text-balance">
            Everything your business needs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed text-pretty">
            From invoicing to inventory, evaLite covers every angle of your daily operations so you can focus on growth.
          </p>
        </div>

        {/* Main features with images */}
        <div className="mt-14 flex flex-col gap-16 lg:gap-20">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-14 ${
                i % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <f.icon className="size-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{f.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-md">
                  {f.desc}
                </p>
              </div>
              <div className="flex-1">
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
                  <Image
                    src={f.image}
                    alt={f.imageAlt}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini feature cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {miniFeatures.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <f.icon className="size-5 text-primary" />
              </div>
              <h4 className="mt-4 text-base font-bold text-card-foreground">{f.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
