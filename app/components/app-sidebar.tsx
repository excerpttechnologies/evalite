// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import {
//   LayoutDashboard,
//   Receipt,
//   ShoppingCart,
//   Package,
//   Users,
//   Truck,
//   Wallet,
//   BarChart3,
//   Settings,
//   Store,
//   Zap
// } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter,
// } from "@/app/components/ui/sidebar"

// const menuItems = [
//   { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
//   { title: "Sales / Billing", url: "/dashboard/sales", icon: Receipt },
//   { title: "Purchases", url: "/dashboard/purchases", icon: ShoppingCart },
//   { title: "Inventory", url: "/dashboard/inventory", icon: Package },
//   { title: "Customers", url: "/dashboard/customers", icon: Users },
//   { title: "Suppliers", url: "/dashboard/suppliers", icon: Truck },
//   { title: "Expenses", url: "/dashboard/expenses", icon: Wallet },
//   { title: "Reports", url: "/dashboard/reports", icon: BarChart3 },
//   { title: "Financial Year", url: "/dashboard/financial-year-report", icon: BarChart3 },
//   { title: "E-Way Bill", url: "/dashboard/ewaybill", icon: Truck },
//   { title: "Settings", url: "/dashboard/settings", icon: Settings },
// ]


// /* ── Logo SVG Mark ── */
// function LogoMark() {
//   return (
//     <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="28" height="28" rx="7" fill="#F2A119"/>
//       <path d="M7 14L12 9L17 14L22 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//       <path d="M7 19L12 14L17 19L22 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
//     </svg>
//   )
// }

// export function AppSidebar() {
//   const pathname = usePathname()



//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-3">
        //  <div>
        //       <Link href="/" className="group flex items-center gap-2">
        //                     <div>
        //                       <LogoMark />
        //                     </div>
        //                     <div className="flex flex-col leading-none">
        //                       <span className={`text-[17px] font-black tracking-tight transition-colors duration-300 text-gray-100`}>
        //                         EVA <em className=" text-[#F2A119] ">lite</em>
        //                       </span>
        //                       <span className={`text-[9px] font-bold tracking-[0.25em] uppercase transition-colors duration-300 
        //                       text-[#FBFAF8]
        //                       `}>
        //                         Smart Billing
        //                       </span>
        //                     </div>
        //                   </Link>
        //         </div>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Menu</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     isActive={
//                       item.url === "/dashboard"
//                         ? pathname === "/dashboard"
//                         : pathname.startsWith(item.url)
//                     }
//                     tooltip={item.title}
//                   >
//                     <Link href={item.url}>
//                       <item.icon className="text-[#F2A119]"/>
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="group-data-[collapsible=icon]:hidden">
//         <div className="rounded-lg bg-sidebar-accent/50 p-3">
//           <p className="text-xs text-sidebar-foreground/70">Demo Version</p>
//           <p className="text-xs text-sidebar-foreground/50 mt-0.5">Sample data only</p>
//         </div>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }


///jay

// "use client"

// import { usePathname, useRouter } from "next/navigation"
// import Link from "next/link"
// import {
//   LayoutDashboard, Receipt, ShoppingCart, Package,
//   Users, Truck, Wallet, BarChart3, Settings, LogOut,
// } from "lucide-react"
// import {
//   Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
//   SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter,
// } from "@/app/components/ui/sidebar"

// const menuItems = [
//   { title: "Dashboard",         url: "/dashboard",                      icon: LayoutDashboard },
//   { title: "Sales / Billing",   url: "/dashboard/sales",                icon: Receipt         },
//   { title: "Purchases",         url: "/dashboard/purchases",            icon: ShoppingCart    },
//   { title: "Inventory",         url: "/dashboard/inventory",            icon: Package         },
//   { title: "Customers",         url: "/dashboard/customers",            icon: Users           },
//   { title: "Suppliers",         url: "/dashboard/suppliers",            icon: Truck           },
//   { title: "Expenses",          url: "/dashboard/expenses",             icon: Wallet          },
//   { title: "Reports",           url: "/dashboard/reports",              icon: BarChart3       },
//   { title: "Financial Year",    url: "/dashboard/financial-year-report",icon: BarChart3       },
//   { title: "E-Way Bill",        url: "/dashboard/ewaybill",             icon: Truck           },
//   { title: "Settings",          url: "/dashboard/settings",             icon: Settings        },
// ]

// function LogoMark() {
//   return (
//     <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <rect width="28" height="28" rx="7" fill="#F2A119"/>
//       <path d="M7 14L12 9L17 14L22 9" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//       <path d="M7 19L12 14L17 19L22 14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45"/>
//     </svg>
//   )
// }

// export function AppSidebar() {
//   const pathname = usePathname()
//   const router   = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem("token")
//     router.replace("/login")
//   }

//   return (
//     <Sidebar collapsible="icon" >

//       {/* ── Brand header ── */}
//       <SidebarHeader className="p-3  dark:border-zinc-800">
                 
//               <Link href="/" className="group flex items-center gap-2">
//                             <div>
//                               <LogoMark />
//                             </div>
//                             <div className="flex flex-col  leading-none group-data-[collapsible=icon]:hidden"><span className="font-black text-sm tracking-tight">EVA<span className="text-[#F19700] font-light italic ">lite</span></span><span className="text-xs text-sidebar-foreground/60 ">Smart Billing</span></div>
//                           </Link>
              
//       </SidebarHeader>

//       {/* ── Nav ── */}
//       <SidebarContent className="py-2  ">
//         <SidebarGroup>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {menuItems.map((item) => {
//                 const isActive = item.url === "/dashboard"
//                   ? pathname === "/dashboard"
//                   : pathname.startsWith(item.url)

//                 return (
//                   <SidebarMenuItem key={item.title} className="transition-all">
//                     <SidebarMenuButton
//                       asChild
//                       isActive={isActive}
//                       tooltip={item.title}
//                       className={
//                         isActive
//                           ? "border-l-2 duration-300 border-[#F2A119] rounded-none bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
//                           : "rounded duration-300 transition-all border-l-2 border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/40"
//                       }
//                     >
//                       <Link href={item.url} className="flex items-center gap-2.5">
//                         <item.icon
//                           size={15}
//                           className={isActive ? "text-[#F2A119] duration-300" : "text-zinc-500 dark:text-zinc-600 duration-300"}
//                         />
//                         <span className="text-[12px] duration-300 font-medium tracking-wide">{item.title}</span>
//                       </Link>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 )
//               })}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>

//       {/* ── Footer ── */}
//       <SidebarFooter className="p-0  border-t border-gray-600 dark:border-zinc-800 group-data-[collapsible=icon]:hidden">
//         <div className="px-3 py-2.5 flex items-center justify-between">
         
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
//           >
//             <LogOut size={12} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </SidebarFooter>

//     </Sidebar>
//   )
// }


"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, Receipt, ShoppingCart, Package,
  Users, Truck, Wallet, BarChart3, Settings, LogOut,
  ChevronRight,
} from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter,
} from "@/app/components/ui/sidebar"

const menuItems = [
  { title: "Dashboard",         url: "/dashboard",                       icon: LayoutDashboard },
  { title: "Sales / Billing",   url: "/dashboard/sales",                 icon: Receipt         },
  { title: "Purchases",         url: "/dashboard/purchases",             icon: ShoppingCart    },
  { title: "Inventory",         url: "/dashboard/inventory",             icon: Package         },
  { title: "Customers",         url: "/dashboard/customers",             icon: Users           },
  { title: "Suppliers",         url: "/dashboard/suppliers",             icon: Truck           },
  { title: "Expenses",          url: "/dashboard/expenses",             icon: Wallet          },
  { title: "Reports",           url: "/dashboard/reports",               icon: BarChart3       },
  { title: "Financial Year",    url: "/dashboard/financial-year-report", icon: BarChart3       },
  { title: "E-Way Bill",        url: "/dashboard/ewaybill",              icon: Truck           },
  { title: "Settings",          url: "/dashboard/settings",              icon: Settings        },
]

/* ── Animated Logo ── */
function LogoMark() {
  return (
    <motion.svg
      width="32" height="32" viewBox="0 0 28 28" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <rect width="28" height="28" rx="7" fill="url(#logoGrad)" />
      <path d="M7 14L12 9L17 14L22 9"
        stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 19L12 14L17 19L22 14"
        stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F9BF3B" />
          <stop offset="1" stopColor="#E07B00" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}

/* ── Glow dot indicator ── */
function ActiveDot() {
  return (
    <motion.span
      layoutId="active-dot"
      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-[#F2A119]"
      style={{ boxShadow: "0 0 8px 2px rgba(242,161,25,0.55)" }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  )
}

/* ── Sidebar item ── */
function NavItem({ item, index, isActive }: {
  item: typeof menuItems[0]
  index: number
  isActive: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <SidebarMenuItem className="relative">
        {isActive && <ActiveDot />}

        <SidebarMenuButton
          asChild
          isActive={isActive}
          tooltip={item.title}
          className={[
            "relative mx-1 my-[1px] rounded-lg h-8 transition-none",
            isActive
              ? "bg-gradient-to-r from-amber-50/90 to-orange-50/60 dark:from-amber-900/20 dark:to-orange-900/10 text-zinc-900 dark:text-zinc-100"
              : "text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          <Link href={item.url} className="flex items-center gap-3 pl-4 pr-2">
            {/* icon wrapper */}
            <motion.span
              whileHover={{ scale: 1.18, rotate: -6 }}
              transition={{ type: "spring", stiffness: 420, damping: 20 }}
              className={isActive ? "text-[#F2A119]" : "text-zinc-400 dark:text-zinc-600"}
            >
              <item.icon size={15} strokeWidth={isActive ? 2.2 : 1.8} />
            </motion.span>

            <span className={[
              "text-[11.5px] font-semibold tracking-wide group-data-[collapsible=icon]:hidden",
              isActive ? "text-zinc-800 dark:text-zinc-100" : "",
            ].join(" ")}>
              {item.title}
            </span>

            {isActive && (
              <motion.span
                initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                className="ml-auto group-data-[collapsible=icon]:hidden"
              >
                <ChevronRight size={12} className="text-[#F2A119]" />
              </motion.span>
            )}

            {/* hover shimmer overlay */}
            {!isActive && (
              <motion.span
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={false}
                whileHover={{ background: "rgba(242,161,25,0.05)" }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </motion.div>
  )
}

/* ══════════ Main Component ══════════ */
export function AppSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.replace("/login")
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-950">

      {/* ── Brand header ── */}
      <SidebarHeader className="px-3 pt-4 pb-3">
        <Link href="/" className="group flex items-center gap-2.5">
          <LogoMark />

          <motion.div
            className="flex flex-col leading-none group-data-[collapsible=icon]:hidden overflow-hidden"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-black text-[15px] tracking-tight text-zinc-300 dark:text-white">
              EVA
              <span className="text-[#F19700] font-light italic">lite</span>
            </span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium tracking-widest uppercase">
              Smart Billing
            </span>
          </motion.div>
        </Link>

        {/* separator line with glow */}
        <motion.div
          className="mt-3 h-px w-full"
          style={{
            background: "linear-gradient(to right, transparent, rgba(242,161,25,0.4), transparent)"
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
        />
      </SidebarHeader>

      {/* ── Nav ── */}
      <SidebarContent className="py-1 overflow-hidden">
        {/* soft ambient top glow */}
        <div
          className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full opacity-[0.06] blur-2xl"
          style={{ background: "radial-gradient(circle, #F2A119 0%, transparent 70%)" }}
        />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, i) => {
                const isActive = item.url === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.url)
                return <NavItem key={item.title} item={item} index={i} isActive={isActive} />
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ── Footer ── */}
      <SidebarFooter className="p-0 group-data-[collapsible=icon]:hidden">
        {/* top separator */}
        <div
          className="h-px w-full"
          style={{ background: "linear-gradient(to right, transparent, rgba(242,161,25,0.25), transparent)" }}
        />

        <div className="px-4 py-3 flex items-center justify-between">
          {/* version badge */}
          <motion.span
            className="text-[9px] font-bold tracking-widest text-zinc-300 dark:text-zinc-600 uppercase"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          >
            v2.0
          </motion.span>

          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200 group"
          >
            <motion.span
              className="opacity-70 group-hover:opacity-100 transition-opacity"
              whileHover={{ rotate: -15 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <LogOut size={12} />
            </motion.span>
            <span>Logout</span>
          </motion.button>
        </div>
      </SidebarFooter>

    </Sidebar>
  )
}