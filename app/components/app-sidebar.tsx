"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Receipt,
  ShoppingCart,
  Package,
  Users,
  Truck,
  Wallet,
  BarChart3,
  Settings,
  Store,
  Zap
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/app/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Sales / Billing", url: "/dashboard/sales", icon: Receipt },
  { title: "Purchases", url: "/dashboard/purchases", icon: ShoppingCart },
  { title: "Inventory", url: "/dashboard/inventory", icon: Package },
  { title: "Customers", url: "/dashboard/customers", icon: Users },
  { title: "Suppliers", url: "/dashboard/suppliers", icon: Truck },
  { title: "Expenses", url: "/dashboard/expenses", icon: Wallet },
  { title: "Reports", url: "/dashboard/reports", icon: BarChart3 },
  { title: "Financial Year", url: "/dashboard/financial-year-report", icon: BarChart3 },
  { title: "E-Way Bill", url: "/dashboard/ewaybill", icon: BarChart3 },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="size-4" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden">

            <span className="font-black text-sm tracking-tight">
              Eva<span className="text-primary font-light italic">lite</span>
            </span>




            <span className="text-xs text-sidebar-foreground/60">Business Manager</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.url === "/dashboard"
                        ? pathname === "/dashboard"
                        : pathname.startsWith(item.url)
                    }
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="group-data-[collapsible=icon]:hidden">
        <div className="rounded-lg bg-sidebar-accent/50 p-3">
          <p className="text-xs text-sidebar-foreground/70">Demo Version</p>
          <p className="text-xs text-sidebar-foreground/50 mt-0.5">Sample data only</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
