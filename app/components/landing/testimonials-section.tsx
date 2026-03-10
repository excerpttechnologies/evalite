import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Ramesh Agarwal",
    role: "Owner, Agarwal Medical Store",
    location: "Jaipur",
    quote: "We switched from paper billing to evaLite and saved 3 hours every day. GST filing is now a breeze.",
    rating: 5,
  },
  {
    name: "Priya Menon",
    role: "Founder, GreenLeaf Organics",
    location: "Kochi",
    quote: "The inventory tracking alone is worth it. I know exactly what's in stock and what to reorder. My business runs smoother than ever.",
    rating: 5,
  },
  {
    name: "Sunil Choudhary",
    role: "Manager, TechPlus Electronics",
    location: "Hyderabad",
    quote: "Clean interface, smart reports, and amazing support. evaLite feels like it was built just for Indian businesses.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground sm:text-4xl text-balance">
            Loved by businesses across India
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-card-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} &middot; {t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
