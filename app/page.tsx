import { LandingNav } from "@/app/components/landing/landing-nav"
import { HeroSection } from "@/app/components/landing/hero-section"
import { StatsBar } from "@/app/components/landing/stats-bar"
import { FeaturesSection } from "@/app/components/landing/features-section"
import { HowItWorks } from "@/app/components/landing/how-it-works"
import { TestimonialsSection } from "@/app/components/landing/testimonials-section"
import { PricingSection } from "@/app/components/landing/pricing-section"
import { CTASection, Footer } from "@/app/components/landing/cta-footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <LandingNav />
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>
  )
}
