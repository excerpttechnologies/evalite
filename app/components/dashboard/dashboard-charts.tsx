








// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   Legend,
// } from "recharts"

// const COLORS = [
//   "oklch(0.55 0.2 255)",
//   "oklch(0.65 0.18 155)",
//   "oklch(0.70 0.18 45)",
//   "oklch(0.65 0.20 310)",
//   "oklch(0.60 0.18 20)",
//   "oklch(0.60 0.15 200)",
// ]

// type SaleRecord = {
//   _id: string
//   total: number
//   price: number
//   quantity: number
//   date: string
// }

// type ProductRecord = {
//   _id: string
//   name: string
//   category?: string
//   stock?: number
// }

// type ChartDataPoint = {
//   month: string
//   sales: number
//   profit: number
// }

// type CategoryDataPoint = {
//   name: string
//   value: number
// }

// function CustomTooltip({ active, payload, label }: {
//   active?: boolean
//   payload?: Array<{ name: string; value: number }>
//   label?: string
// }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border bg-card p-3 shadow-md">
//         <p className="text-sm font-medium text-foreground">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm text-muted-foreground">
//             {entry.name}: {new Intl.NumberFormat("en-IN", {
//               style: "currency",
//               currency: "INR",
//               maximumFractionDigits: 0
//             }).format(entry.value)}
//           </p>
//         ))}
//       </div>
//     )
//   }
//   return null
// }

// const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// export function DashboardCharts() {

//   const [chartData, setChartData] = useState<ChartDataPoint[]>([])
//   const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([])
//   const [loading, setLoading] = useState(true)
//   const [catLoading, setCatLoading] = useState(true)

//   useEffect(() => {
//     fetchSalesData()
//     fetchProductData()
//   }, [])

//   const fetchSalesData = async () => {
//     try {
//       const res = await fetch("/api/sales")
//       const sales: SaleRecord[] = await res.json()

//       if (!Array.isArray(sales)) return

//       const monthMap: Record<string, { sales: number; cost: number }> = {}

//       sales.forEach(sale => {
//         const date = new Date(sale.date)
//         const key = `${date.getFullYear()}-${date.getMonth()}`

//         if (!monthMap[key]) {
//           monthMap[key] = { sales: 0, cost: 0 }
//         }

//         monthMap[key].sales += sale.total || 0
//         monthMap[key].cost += (sale.price || 0) * (sale.quantity || 0) * 0.7
//       })

//       const sorted = Object.entries(monthMap)
//         .sort(([a], [b]) => {
//           const [ay, am] = a.split("-").map(Number)
//           const [by, bm] = b.split("-").map(Number)
//           return ay !== by ? ay - by : am - bm
//         })
//         .map(([key, val]) => {
//           const [year, month] = key.split("-").map(Number)
//           return {
//             month: `${MONTH_NAMES[month]} ${year}`,
//             sales: Math.round(val.sales),
//             profit: Math.round(val.sales - val.cost)
//           }
//         })

//       setChartData(sorted)
//     } catch (err) {
//       console.error("Sales chart error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchProductData = async () => {
//     try {
//       const res = await fetch("/api/products")
//       const products: ProductRecord[] = await res.json()

//       if (!Array.isArray(products)) return

//       // Group products by category using stock count
//       const catMap: Record<string, number> = {}

//       products.forEach(p => {
//         const cat = p.category?.trim() || "Uncategorized"
//         catMap[cat] = (catMap[cat] || 0) + (p.stock || 1)
//       })

//       const total = Object.values(catMap).reduce((s, v) => s + v, 0)

//       const formatted = Object.entries(catMap).map(([name, count]) => ({
//         name,
//         value: total > 0 ? Math.round((count / total) * 100) : 0
//       }))

//       setCategoryData(formatted)
//     } catch (err) {
//       console.error("Category chart error:", err)
//     } finally {
//       setCatLoading(false)
//     }
//   }

//   return (
//     <div className="grid gap-4 lg:grid-cols-3">

//       {/* Sales & Profit Trend — /api/sales */}
//       <Card className="lg:col-span-2">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-sm">Sales & Profit Trend</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
//           ) : chartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={220}>
//               <AreaChart data={chartData}>
//                 <defs>
//                   <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//                 <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
//                 <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area type="monotone" dataKey="sales" stroke="oklch(0.55 0.2 255)" fill="url(#salesGradient)" strokeWidth={2} name="Sales" />
//                 <Area type="monotone" dataKey="profit" stroke="oklch(0.65 0.18 155)" fill="url(#profitGradient)" strokeWidth={2} name="Profit" />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* Inventory by Category — /api/products */}
//       <Card>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-sm">Inventory by Category</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {catLoading ? (
//             <div className="flex items-center justify-center h-[160px] text-sm text-muted-foreground">Loading...</div>
//           ) : categoryData.length === 0 ? (
//             <div className="flex items-center justify-center h-[160px] text-sm text-muted-foreground">No products yet</div>
//           ) : (
//             <>
//               <ResponsiveContainer width="100%" height={160}>
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={42}
//                     outerRadius={68}
//                     paddingAngle={4}
//                     dataKey="value"
//                   >
//                     {categoryData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value: number) => [`${value}%`, ""]}
//                     contentStyle={{
//                       borderRadius: "8px",
//                       border: "1px solid oklch(0.91 0.005 250)",
//                       backgroundColor: "oklch(1 0 0)",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="mt-1 flex flex-wrap justify-center gap-2">
//                 {categoryData.map((item, index) => (
//                   <div key={item.name} className="flex items-center gap-1 text-xs">
//                     <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
//                     <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Monthly Sales vs Profit Bar — /api/sales */}
//       <Card className="lg:col-span-3">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-sm">Monthly Sales vs Profit</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">Loading...</div>
//           ) : chartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[200px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={200}>
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//                 <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
//                 <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Bar dataKey="sales" name="Sales" fill="oklch(0.55 0.2 255)" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="profit" name="Profit" fill="oklch(0.65 0.18 155)" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//     </div>
//   )
// }





// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   Legend,
// } from "recharts"

// const COLORS = [
//   "oklch(0.55 0.2 255)",
//   "oklch(0.65 0.18 155)",
//   "oklch(0.70 0.18 45)",
//   "oklch(0.65 0.20 310)",
//   "oklch(0.60 0.18 20)",
//   "oklch(0.60 0.15 200)",
// ]

// type SaleRecord = {
//   _id: string
//   total: number
//   price: number
//   quantity: number
//   date: string
// }

// type ProductRecord = {
//   _id: string
//   name: string
//   category?: string
//   stock?: number
// }

// type ChartDataPoint = {
//   month: string
//   sales: number
//   profit: number
// }

// type CategoryDataPoint = {
//   name: string
//   value: number
// }

// function CustomTooltip({ active, payload, label }: {
//   active?: boolean
//   payload?: Array<{ name: string; value: number }>
//   label?: string
// }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border bg-card p-3 shadow-md">
//         <p className="text-sm font-medium text-foreground">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm text-muted-foreground">
//             {entry.name}: {new Intl.NumberFormat("en-IN", {
//               style: "currency",
//               currency: "INR",
//               maximumFractionDigits: 0
//             }).format(entry.value)}
//           </p>
//         ))}
//       </div>
//     )
//   }
//   return null
// }

// const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
//                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// export function DashboardCharts() {

//   const [chartData, setChartData] = useState<ChartDataPoint[]>([])
//   const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([])
//   const [loading, setLoading] = useState(true)
//   const [catLoading, setCatLoading] = useState(true)

//   useEffect(() => {
//     fetchSalesData()
//     fetchProductData()
//   }, [])

//   const fetchSalesData = async () => {
//     try {
//       const res = await fetch("/api/sales")
//       const sales: SaleRecord[] = await res.json()

//       if (!Array.isArray(sales)) return

//       const monthMap: Record<string, { sales: number; cost: number }> = {}

//       sales.forEach(sale => {
//         const date = new Date(sale.date)
//         const key = `${date.getFullYear()}-${date.getMonth()}`

//         if (!monthMap[key]) {
//           monthMap[key] = { sales: 0, cost: 0 }
//         }

//         monthMap[key].sales += sale.total || 0
//         monthMap[key].cost += (sale.price || 0) * (sale.quantity || 0) * 0.7
//       })

//       const sorted = Object.entries(monthMap)
//         .sort(([a], [b]) => {
//           const [ay, am] = a.split("-").map(Number)
//           const [by, bm] = b.split("-").map(Number)
//           return ay !== by ? ay - by : am - bm
//         })
//         .map(([key, val]) => {
//           const [year, month] = key.split("-").map(Number)
//           return {
//             month: `${MONTH_NAMES[month]} ${year}`,
//             sales: Math.round(val.sales),
//             profit: Math.round(val.sales - val.cost)
//           }
//         })

//       setChartData(sorted)
//     } catch (err) {
//       console.error("Sales chart error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const fetchProductData = async () => {
//     try {
//       const res = await fetch("/api/products")
//       const products: ProductRecord[] = await res.json()

//       if (!Array.isArray(products)) return

//       const catMap: Record<string, number> = {}

//       products.forEach(p => {
//         const cat = p.category?.trim() || "Uncategorized"
//         catMap[cat] = (catMap[cat] || 0) + (p.stock || 1)
//       })

//       const total = Object.values(catMap).reduce((s, v) => s + v, 0)

//       const formatted = Object.entries(catMap).map(([name, count]) => ({
//         name,
//         value: total > 0 ? Math.round((count / total) * 100) : 0
//       }))

//       setCategoryData(formatted)
//     } catch (err) {
//       console.error("Category chart error:", err)
//     } finally {
//       setCatLoading(false)
//     }
//   }

//   return (
//     // ✅ All 3 cards in one row — equal width columns
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//       {/* 1. Sales & Profit Trend */}
//       <Card>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-sm">Sales & Profit Trend</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
//           ) : chartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={220}>
//               <AreaChart data={chartData}>
//                 <defs>
//                   <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//                 <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
//                 <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Area type="monotone" dataKey="sales" stroke="oklch(0.55 0.2 255)" fill="url(#salesGradient)" strokeWidth={2} name="Sales" />
//                 <Area type="monotone" dataKey="profit" stroke="oklch(0.65 0.18 155)" fill="url(#profitGradient)" strokeWidth={2} name="Profit" />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* 2. Inventory by Category */}
//       <Card>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-sm">Inventory by Category</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {catLoading ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
//           ) : categoryData.length === 0 ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No products yet</div>
//           ) : (
//             <>
//               <ResponsiveContainer width="100%" height={180}>
//                 <PieChart>
//                   <Pie
//                     data={categoryData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={42}
//                     outerRadius={68}
//                     paddingAngle={4}
//                     dataKey="value"
//                   >
//                     {categoryData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value: number) => [`${value}%`, ""]}
//                     contentStyle={{
//                       borderRadius: "8px",
//                       border: "1px solid oklch(0.91 0.005 250)",
//                       backgroundColor: "oklch(1 0 0)",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="mt-1 flex flex-wrap justify-center gap-2">
//                 {categoryData.map((item, index) => (
//                   <div key={item.name} className="flex items-center gap-1 text-xs">
//                     <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
//                     <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* 3. Monthly Sales vs Profit */}
//       <Card>
//         <CardHeader className="pb-2">
//           <CardTitle className="text-sm">Monthly Sales vs Profit</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
//           ) : chartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//                 <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
//                 <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip content={<CustomTooltip />} />
//                 <Legend />
//                 <Bar dataKey="sales" name="Sales" fill="oklch(0.55 0.2 255)" radius={[4, 4, 0, 0]} />
//                 <Bar dataKey="profit" name="Profit" fill="oklch(0.65 0.18 155)" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//     </div>
//   )
// }




//aravinfd

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts"
import { authFetch } from "@/app/lib/authFetch" // ✅

const COLORS = [
  "oklch(0.55 0.2 255)", "oklch(0.65 0.18 155)", "oklch(0.70 0.18 45)",
  "oklch(0.65 0.20 310)", "oklch(0.60 0.18 20)", "oklch(0.60 0.15 200)",
]

type SaleRecord = { _id: string; total: number; price: number; quantity: number; date: string }
type ProductRecord = { _id: string; name: string; category?: string; stock?: number }
type ChartDataPoint = { month: string; sales: number; profit: number }
type CategoryDataPoint = { name: string; value: number }

function CustomTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ name: string; value: number }>; label?: string
}) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-card p-3 shadow-md">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-muted-foreground">
            {entry.name}: {new Intl.NumberFormat("en-IN", {
              style: "currency", currency: "INR", maximumFractionDigits: 0
            }).format(entry.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export function DashboardCharts() {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])
  const [categoryData, setCategoryData] = useState<CategoryDataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [catLoading, setCatLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
    fetchProductData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const res = await authFetch("/api/sales") // ✅
      const sales: SaleRecord[] = await res.json()
      if (!Array.isArray(sales)) return

      const monthMap: Record<string, { sales: number; cost: number }> = {}
      sales.forEach(sale => {
        const date = new Date(sale.date)
        const key = `${date.getFullYear()}-${date.getMonth()}`
        if (!monthMap[key]) monthMap[key] = { sales: 0, cost: 0 }
        monthMap[key].sales += sale.total || 0
        monthMap[key].cost += (sale.price || 0) * (sale.quantity || 0) * 0.7
      })

      const sorted = Object.entries(monthMap)
        .sort(([a], [b]) => {
          const [ay, am] = a.split("-").map(Number)
          const [by, bm] = b.split("-").map(Number)
          return ay !== by ? ay - by : am - bm
        })
        .map(([key, val]) => {
          const [year, month] = key.split("-").map(Number)
          return {
            month: `${MONTH_NAMES[month]} ${year}`,
            sales: Math.round(val.sales),
            profit: Math.round(val.sales - val.cost)
          }
        })

      setChartData(sorted)
    } catch (err) {
      console.error("Sales chart error:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProductData = async () => {
    try {
      const res = await authFetch("/api/products") // ✅
      const products: ProductRecord[] = await res.json()
      if (!Array.isArray(products)) return

      const catMap: Record<string, number> = {}
      products.forEach(p => {
        const cat = p.category?.trim() || "Uncategorized"
        catMap[cat] = (catMap[cat] || 0) + (p.stock || 1)
      })

      const total = Object.values(catMap).reduce((s, v) => s + v, 0)
      const formatted = Object.entries(catMap).map(([name, count]) => ({
        name,
        value: total > 0 ? Math.round((count / total) * 100) : 0
      }))

      setCategoryData(formatted)
    } catch (err) {
      console.error("Category chart error:", err)
    } finally {
      setCatLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {/* 1. Sales & Profit Trend */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Sales & Profit Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No sales data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.65 0.18 155)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="sales" stroke="oklch(0.55 0.2 255)" fill="url(#salesGradient)" strokeWidth={2} name="Sales" />
                <Area type="monotone" dataKey="profit" stroke="oklch(0.65 0.18 155)" fill="url(#profitGradient)" strokeWidth={2} name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* 2. Inventory by Category */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Inventory by Category</CardTitle>
        </CardHeader>
        <CardContent>
          {catLoading ? (
            <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
          ) : categoryData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No products yet</div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={4} dataKey="value">
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, ""]}
                    contentStyle={{ borderRadius: "8px", border: "1px solid oklch(0.91 0.005 250)", backgroundColor: "oklch(1 0 0)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-1 flex flex-wrap justify-center gap-2">
                {categoryData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-1 text-xs">
                    <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-muted-foreground">{item.name} ({item.value}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* 3. Monthly Sales vs Profit */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Monthly Sales vs Profit</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">Loading...</div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">No sales data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" />
                <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="sales" name="Sales" fill="oklch(0.55 0.2 255)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Profit" fill="oklch(0.65 0.18 155)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

    </div>
  )
}