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
    if (!token) {
      router.replace("/login")
    }
  }, [router])

  // Don't render anything until auth check passes
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  if (!token) return null

  return (
   <>
   
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground text-balance">
          Dashboard
        </h2>
       
      </div>
      <DashboardStats />
      <DashboardCharts />
      <RecentTransactions />
    </div>
   </>
  )
}




