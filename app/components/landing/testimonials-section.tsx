"use client"

import { Star, Quote, Users, Award, Sparkles, ChevronLeft, ChevronRight, TrendingUp, Zap, Clock, Shield } from "lucide-react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const testimonials = [
  {
    name: "Ramesh Agarwal",
    role: "Owner, Agarwal Medical Store",
    location: "Jaipur",
    quote: "We switched from paper billing to evaLite and saved 3 hours every day. GST filing is now a breeze. The interface is so intuitive that my entire team picked it up in just one day.",
    rating: 5,
    avatar: "RA",
    gradient: "from-[#F7D397] to-[#F2A119]",
    color: "#F7D397",
  },
  {
    name: "Priya Menon",
    role: "Founder, GreenLeaf Organics",
    location: "Kochi",
    quote: "The inventory tracking alone is worth it. I know exactly what's in stock and what to reorder. My business runs smoother than ever. Real-time reports help me make better decisions.",
    rating: 5,
    avatar: "PM",
    gradient: "from-[#F7D397] to-[#F2A119]",
    color: "#F7D397",
  },
  {
    name: "Sunil Choudhary",
    role: "Manager, TechPlus Electronics",
    location: "Hyderabad",
    quote: "Clean interface, smart reports, and amazing support. evaLite feels like it was built just for Indian businesses. The GST compliance features are exactly what we needed.",
    rating: 5,
    avatar: "SC",
    gradient: "from-[#F7D397] to-[#F2A119]",
    color: "#F7D397",
  },
  {
    name: "Anita Sharma",
    role: "CEO, Fashion Hub",
    location: "Delhi",
    quote: "The best investment we made this year. evaLite has transformed how we manage our finances. Customer support is exceptional and always ready to help.",
    rating: 5,
    avatar: "AS",
    gradient: "from-[#F7D397] to-[#F2A119]",
    color: "#F7D397",
  },
  {
    name: "Vikram Singh",
    role: "Director, Singh Traders",
    location: "Mumbai",
    quote: "Finally, an accounting software that understands Indian business needs. The GST invoicing and reporting features are top-notch. Highly recommended!",
    rating: 5,
    avatar: "VS",
    gradient: "from-[#F7D397] to-[#F2A119]",
    color: "#F7D397",
  },
  {
    name: "Meera Reddy",
    role: "Owner, Meera's Kitchen",
    location: "Bangalore",
    quote: "Managing multiple outlets was a challenge until we found evaLite. Now I can track sales across all locations from one dashboard. Game changer!",
    rating: 5,
    avatar: "MR",
    gradient: "from-[#F7D397] to-[#F2A119]",
    color: "#F7D397",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.95,
    transition: {
      duration: 0.3,
    },
  },
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : 3
  const totalSlides = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying && isSectionInView) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, isSectionInView, totalSlides])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage, 
    currentIndex * itemsPerPage + itemsPerPage
  )

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F7D397 100%)" }}
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-[#F7D397]/20 to-[#F7D397]/30" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-gradient-to-r from-[#F7D397]/20 to-[#F2A119]/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-gradient-to-r from-[#F7D397]/20 to-[#F2A119]/20 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#F7D397]/10 to-[#F2A119]/10 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F7D39708_1px,transparent_1px),linear-gradient(to_bottom,#F7D39708_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-[#F7D397]/20 to-[#F2A119]/20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full border border-[#F7D397]/30 bg-white/80 backdrop-blur-sm px-4 py-1.5 mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Users className="size-3.5 text-[#F7D397]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#F7D397]">Trusted Stories</span>
          </motion.div>
          
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tight">
            Loved by
            <span className="relative inline-block mx-2">
              <span className="relative z-10 bg-gradient-to-r from-[#F7D397] via-[#F2A119] to-[#E0910A] bg-clip-text text-transparent">
                businesses
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-[#F7D397]/30 to-[#F2A119]/30 blur-md"
                animate={{ 
                  scaleX: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
            across India
          </h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of satisfied business owners who trust evaLite for their daily operations
          </motion.p>
        </motion.div>

        {/* Testimonials Grid with Carousel */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block z-10">
            <motion.button
              onClick={prevSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#F7D397]/30 hover:bg-[#F7D397]/20 transition-all duration-300 group shadow-lg"
            >
              <ChevronLeft className="size-5 text-[#F7D397] group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block z-10">
            <motion.button
              onClick={nextSlide}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#F7D397]/30 hover:bg-[#F7D397]/20 transition-all duration-300 group shadow-lg"
            >
              <ChevronRight className="size-5 text-[#F7D397] group-hover:scale-110 transition-transform" />
            </motion.button>
          </div>

          {/* Testimonials Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentIndex}
              className={`grid gap-6 ${itemsPerPage === 1 ? 'grid-cols-1' : 'lg:grid-cols-3 sm:grid-cols-2'}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${currentIndex}-${index}`}
                  variants={cardVariants}
                  className="group relative"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-full flex flex-col rounded-2xl bg-white/90 backdrop-blur-sm border border-[#F7D397]/20 p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-[#F7D397]/10 hover:border-[#F7D397]/40">
                    {/* Quote Icon Background */}
                    <motion.div 
                      className="absolute top-4 right-4 opacity-10"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Quote className="size-12 text-gray-900" />
                    </motion.div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star className="size-4 fill-[#F7D397] text-[#F7D397]" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="text-sm text-gray-700 leading-relaxed relative z-10 line-clamp-4">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Author Info */}
                    <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[#F7D397]/20">
                      <motion.div 
                        className={`relative flex size-10 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} shadow-lg shadow-[#F7D397]/30`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <span className="text-xs font-bold text-gray-900">{testimonial.avatar}</span>
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role} • {testimonial.location}</p>
                      </div>
                      <Sparkles className="size-3 text-[#F7D397]  transition-opacity" />
                    </div>

                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 rounded-2xl  transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${testimonial.color}15, transparent 70%)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setCurrentIndex(idx)
                  setTimeout(() => setIsAutoPlaying(true), 5000)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx 
                    ? "w-8 bg-[#F7D397]" 
                    : "w-2 bg-[#F7D397]/30 hover:bg-[#F7D397]/50"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 pt-8 border-t border-[#F7D397]/20"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { value: "12,000+", label: "Active Businesses", icon: TrendingUp, delay: 0 },
              { value: "5Cr+", label: "Invoices Generated", icon: Zap, delay: 0.1 },
              { value: "98%", label: "Customer Satisfaction", icon: Shield, delay: 0.2 },
              { value: "24/7", label: "Support Available", icon: Clock, delay: 0.3 },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isSectionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + stat.delay, duration: 0.5 }}
                className="text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="relative inline-block mb-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F7D397] to-[#F2A119] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <stat.icon className="size-6 text-[#F7D397] mx-auto mb-2 relative z-10" />
                </div>
                <motion.div 
                  className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-[#F7D397] to-[#F2A119] bg-clip-text text-transparent"
                  initial={{ scale: 0.5 }}
                  animate={isSectionInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.9 + stat.delay, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isSectionInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F7D397]/20 px-5 py-2.5 shadow-lg"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(247, 211, 151, 0.3)" }}
          >
            <Award className="size-3.5 text-[#F7D397]" />
            <span className="text-xs text-gray-600">Trusted by businesses across 50+ Indian cities</span>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-15px) translateX(10px); }
          75% { transform: translateY(10px) translateX(-8px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
      `}</style>
    </section>
  )
}