


"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LogOut } from "lucide-react"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/app/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"
import { Separator } from "@/app/components/ui/separator"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/app/components/ui/dropdown-menu"
import { authFetch } from "../lib/authFetch"
import { motion } from "framer-motion";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [businessName, setBusinessName] = useState("Store")
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)





  useEffect(() => {
    // Check token first
    const token = localStorage.getItem("token")

    if (!token) {
      router.replace("/login")
      return
    }

    setAuthed(true)

    // Then load business name
    loadBusiness()

    // 2 second minimum loader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  

const loadBusiness = async () => {
  try {
    const res = await authFetch("/api/settings")

    if (!res.ok) {
      throw new Error("Failed to fetch settings")
    }

    const data = await res.json()
 
    setBusinessName(data?.name || "")
  } catch (err) {
    console.error("Error loading business:", err)
  }
}

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  // Show loader for 2s (covers flash on all pages)
 if (loading) {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-6 bg-background">
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-sm"
            animate={{
              y: [0, -12, 0],
              rotate: [0, 45, 0],
              borderRadius: ["2px", "4px", "2px"],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="flex gap-1 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          Loading
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
        >
          .
        </motion.span>
      </motion.div>
    </div>
  );
}
  // Not authed — redirect in progress
  if (!authed) return null

  const firstLetter = businessName.charAt(0).toUpperCase()

  return (
    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>

       <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-card px-4 shadow-sm">
  <SidebarTrigger className="-ml-1 transition-opacity hover:opacity-80" />
  
  <Separator orientation="vertical" className="mr-2 h-4" />
  
  <div className="flex flex-1 items-center gap-2">
    <h1 className="text-sm font-semibold text-foreground tracking-tight">
      EVA Lite
    </h1>
    
  </div>
  
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div 
        className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 cursor-pointer transition-all hover:bg-secondary/80 active:scale-95"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
      >
        <div className="size-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xs font-medium shadow-sm">
          {firstLetter}
        </div>
        <span className="text-sm font-medium text-secondary-foreground hidden sm:inline max-w-[150px] truncate">
          {businessName}
        </span>
      </div>
    </DropdownMenuTrigger>
    
    <DropdownMenuContent align="end" className="w-48">
      <DropdownMenuItem 
        onClick={logout} 
        className="cursor-pointer focus:bg-destructive/10 focus:text-destructive"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</header>

        <div className="flex-1 overflow-auto bg-[#f1f1f1e1]">
          {children}
        </div>

      </SidebarInset>

    </SidebarProvider>
  )
}