

"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/app/components/ui/button"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            eva<span className="text-primary">Lite</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button size="sm" className="text-sm font-semibold">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  Log in
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" className="text-sm font-semibold">
                  Start Free
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-1.5"
              >
                {l.label}
              </a>
            ))}
            {isLoggedIn ? (
              <Link href="/dashboard" className="mt-2">
                <Button size="sm" className="w-full text-sm font-semibold">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="mt-2">
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="sm" className="w-full text-sm font-semibold">
                    Start Free
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}