






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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const [businessName,setBusinessName] = useState("Store")
  const [mounted,setMounted] = useState(false)

  useEffect(()=>{
    setMounted(true)
    loadBusiness()
  },[])

  const loadBusiness = async () => {

    try{

      const res = await fetch("/api/settings")
      const data = await res.json()

      if(data?.name){
        setBusinessName(data.name)
      }

    }catch(err){
      console.log(err)
    }

  }

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  if(!mounted) return null

  const firstLetter = businessName.charAt(0).toUpperCase()

  return (

    <SidebarProvider>

      <AppSidebar />

      <SidebarInset>

        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card px-4">

          <SidebarTrigger className="-ml-1" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-sm font-medium text-foreground">
              evaLite
            </h1>
          </div>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 cursor-pointer">

                <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
                  {firstLetter}
                </div>

                <span className="text-sm font-medium text-secondary-foreground hidden sm:inline">
                  {businessName}
                </span>

              </div>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <DropdownMenuItem onClick={logout} className="cursor-pointer">
                <LogOut className="w-4 h-4 mr-2"/>
                Logout
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </header>

        <div className="flex-1 overflow-auto">
          {children}
        </div>

      </SidebarInset>

    </SidebarProvider>

  )
}
