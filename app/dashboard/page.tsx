// import { DashboardStats } from "@/app/components/dashboard/dashboard-stats"
// import { DashboardCharts } from "@/app/components/dashboard/dashboard-charts"
// import { RecentTransactions } from "@/app/components/dashboard/recent-transactions"

// export default function DashboardPage() {
//   return (
//     <div className="flex flex-col gap-6 p-4 md:p-6">
//       <div>
//         <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
//           Dashboard
//         </h2>
//         <p className="text-muted-foreground text-sm mt-1">
//           Welcome back, Krishna General Store
//         </p>
//       </div>
//       <DashboardStats />
//       <DashboardCharts />
//       <RecentTransactions />
//     </div>
//   )
// }



// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { DashboardStats } from "@/app/components/dashboard/dashboard-stats"
// import { DashboardCharts } from "@/app/components/dashboard/dashboard-charts"
// import { RecentTransactions } from "@/app/components/dashboard/recent-transactions"

// export default function DashboardPage() {

//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     if (!token) {
//       router.replace("/login")
//     }
//   }, [router])

//   // Don't render anything until auth check passes
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
//   if (!token) return null

//   return (
//    <>
   
//     <div className="flex flex-col gap-4 p-4 md:p-6">
//       <div>
//         <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
//           Dashboard
//         </h2>
       
//       </div>
//       <DashboardStats />
//       <DashboardCharts />
//       <RecentTransactions />
//     </div>
//    </>
//   )
// }




////jay
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/app/components/dashboard/dashboard-stats"
import { DashboardCharts } from "@/app/components/dashboard/dashboard-charts"
import { RecentTransactions } from "@/app/components/dashboard/recent-transactions"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) router.replace("/login")
  }, [router])

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  if (!token) return null

  const now = new Date()
  const timeLabel = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="flex flex-col gap-4 p-4 md:p-6 max-w-screen-2xl mx-auto">

        {/* Page header */}
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div>
        
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none">
              Dashboard
            </h1>
          </div>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-600 tabular-nums">{timeLabel}</p>
        </div>

        <DashboardStats />
        <DashboardCharts />
        <RecentTransactions />

      </div>
    </div>
  )
}