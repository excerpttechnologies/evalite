








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

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell, BarChart, Bar, Legend,
// } from "recharts"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// const COLORS = [
//   "oklch(0.55 0.2 255)", "oklch(0.65 0.18 155)", "oklch(0.70 0.18 45)",
//   "oklch(0.65 0.20 310)", "oklch(0.60 0.18 20)", "oklch(0.60 0.15 200)",
// ]

// type SaleRecord = { _id: string; total: number; price: number; quantity: number; date: string }
// type ProductRecord = { _id: string; name: string; category?: string; stock?: number }
// type ChartDataPoint = { month: string; sales: number; profit: number }
// type CategoryDataPoint = { name: string; value: number }

// function CustomTooltip({ active, payload, label }: {
//   active?: boolean; payload?: Array<{ name: string; value: number }>; label?: string
// }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border bg-card p-3 shadow-md">
//         <p className="text-sm font-medium text-foreground">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm text-muted-foreground">
//             {entry.name}: {new Intl.NumberFormat("en-IN", {
//               style: "currency", currency: "INR", maximumFractionDigits: 0
//             }).format(entry.value)}
//           </p>
//         ))}
//       </div>
//     )
//   }
//   return null
// }

// const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

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
//       const res = await authFetch("/api/sales") // ✅
//       const sales: SaleRecord[] = await res.json()
//       if (!Array.isArray(sales)) return

//       const monthMap: Record<string, { sales: number; cost: number }> = {}
//       sales.forEach(sale => {
//         const date = new Date(sale.date)
//         const key = `${date.getFullYear()}-${date.getMonth()}`
//         if (!monthMap[key]) monthMap[key] = { sales: 0, cost: 0 }
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
//       const res = await authFetch("/api/products") // ✅
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
//                   <Pie data={categoryData} cx="50%" cy="50%" innerRadius={42} outerRadius={68} paddingAngle={4} dataKey="value">
//                     {categoryData.map((_, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value: number) => [`${value}%`, ""]}
//                     contentStyle={{ borderRadius: "8px", border: "1px solid oklch(0.91 0.005 250)", backgroundColor: "oklch(1 0 0)" }}
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


////jay

"use client"

import { useEffect, useState } from "react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts"
import { authFetch } from "@/app/lib/authFetch"
import { motion, AnimatePresence } from "framer-motion"

const PALETTE = ["#378ADD", "#1D9E75", "#BA7517", "#7F77DD", "#E24B4A", "#0F6E56"]

type SaleRecord    = { _id: string; total: number; price: number; quantity: number; date: string }
type ProductRecord = { _id: string; name: string; category?: string; stock?: number }
type ChartPoint    = { month: string; sales: number; profit: number }
type CatPoint      = { name: string; value: number }

const INR = (v: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v)

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
} as const

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.8,
    },
  },
  hover: {
    y: -4,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
} as const

const sectionHeaderVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      delay: 0.2,
    },
  },
} as const

const chartVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.3,
    },
  },
} as const

const legendVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      staggerChildren: 0.05,
    },
  },
}

const legendItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
}

function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div
      variants={sectionHeaderVariants}
      initial="hidden"
      animate="visible"
      style={{ borderLeft: "3px solid #378ADD" }}
      className="pl-3 mb-3"
    >
      <motion.p
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium"
      >
        {title}
      </motion.p>
    </motion.div>
  )
}

function Empty({ h = 200 }: { h?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ height: h }}
      className="flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 tracking-wide"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        📊 No data yet
      </motion.div>
    </motion.div>
  )
}

function Loading({ h = 200 }: { h?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ height: h }}
      className="flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-600 tracking-wide"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full mr-2"
      />
      Loading…
    </motion.div>
  )
}

function ChartTooltip({ active, payload, label }: {
  active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string
}) {
  if (!active || !payload?.length) return null
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-xs shadow-lg"
    >
      <p className="text-zinc-500 dark:text-zinc-400 mb-1 font-medium">{label}</p>
      {payload.map((e, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          style={{ color: e.color }}
          className="font-medium"
        >
          {e.name}: {INR(e.value)}
        </motion.p>
      ))}
    </motion.div>
  )
}

const axisStyle = { fontSize: 10, fill: "#888" }
const gridStyle = { stroke: "#e5e7eb", strokeDasharray: "3 3" }

export function DashboardCharts() {
  const [chartData, setChartData]     = useState<ChartPoint[]>([])
  const [categoryData, setCategoryData] = useState<CatPoint[]>([])
  const [loading, setLoading]         = useState(true)
  const [catLoading, setCatLoading]   = useState(true)

  useEffect(() => {
    fetchSalesData()
    fetchProductData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const res   = await authFetch("/api/sales")
      const sales: SaleRecord[] = await res.json()
      if (!Array.isArray(sales)) return

      const monthMap: Record<string, { sales: number; cost: number }> = {}
      sales.forEach(sale => {
        const d   = new Date(sale.date)
        const key = `${d.getFullYear()}-${d.getMonth()}`
        if (!monthMap[key]) monthMap[key] = { sales: 0, cost: 0 }
        monthMap[key].sales += sale.total || 0
        monthMap[key].cost  += (sale.price || 0) * (sale.quantity || 0) * 0.7
      })

      setChartData(
        Object.entries(monthMap)
          .sort(([a], [b]) => {
            const [ay, am] = a.split("-").map(Number)
            const [by, bm] = b.split("-").map(Number)
            return ay !== by ? ay - by : am - bm
          })
          .map(([key, val]) => {
            const [, month] = key.split("-").map(Number)
            return {
              month:  MONTH_NAMES[month],
              sales:  Math.round(val.sales),
              profit: Math.round(val.sales - val.cost),
            }
          })
      )
    } catch (err) {
      console.error("Sales chart error:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchProductData = async () => {
    try {
      const res = await authFetch("/api/products")
      const products: ProductRecord[] = await res.json()
      if (!Array.isArray(products)) return

      const catMap: Record<string, number> = {}
      products.forEach(p => {
        const cat = p.category?.trim() || "Uncategorized"
        catMap[cat] = (catMap[cat] || 0) + (p.stock || 1)
      })

      const total = Object.values(catMap).reduce((s, v) => s + v, 0)
      setCategoryData(
        Object.entries(catMap).map(([name, count]) => ({
          name,
          value: total > 0 ? Math.round((count / total) * 100) : 0,
        }))
      )
    } catch (err) {
      console.error("Category chart error:", err)
    } finally {
      setCatLoading(false)
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-3 gap-2"
    >
      {/* Sales & Profit Trend */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white dark:bg-zinc-900 border shadow rounded border-zinc-200 dark:border-zinc-800 px-4 py-4 min-h-80 relative overflow-hidden"
      >
        {/* Animated gradient background on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), #378ADD, transparent)",
          }}
        />
        
        <SectionHeader title="Sales & Profit Trend" />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <Loading key="loading" />
          ) : chartData.length === 0 ? (
            <Empty key="empty" />
          ) : (
            <motion.div
              key="chart"
              variants={chartVariants}
              initial="hidden"
              animate="visible"
              className="relative z-10"
            >
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#378ADD" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#378ADD" stopOpacity={0}    />
                    </linearGradient>
                    <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#1D9E75" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#1D9E75" stopOpacity={0}    />
                    </linearGradient>
                  </defs>
                  <CartesianGrid {...gridStyle} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="sales"  
                    name="Sales"  
                    stroke="#378ADD" 
                    fill="url(#gSales)"  
                    strokeWidth={1.5} 
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="profit" 
                    name="Profit" 
                    stroke="#1D9E75" 
                    fill="url(#gProfit)" 
                    strokeWidth={1.5} 
                    dot={false}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!loading && chartData.length > 0 && (
          <motion.div 
            variants={legendVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 mt-2"
          >
            {[{ label: "Sales", color: "#378ADD" }, { label: "Profit", color: "#1D9E75" }].map(l => (
              <motion.div key={l.label} variants={legendItemVariants} className="flex items-center gap-1.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 16 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                  style={{ width: 16, height: 2, backgroundColor: l.color }} 
                />
                <span className="text-[10px] text-zinc-400">{l.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Inventory by Category */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white dark:bg-zinc-900 border shadow rounded border-zinc-200 dark:border-zinc-800 px-4 py-4 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), #7F77DD, transparent)",
          }}
        />
        
        <SectionHeader title="Inventory by Category" />
        
        <AnimatePresence mode="wait">
          {catLoading ? (
            <Loading key="cat-loading" />
          ) : categoryData.length === 0 ? (
            <Empty key="cat-empty" />
          ) : (
            <motion.div
              key="pie-chart"
              variants={chartVariants}
              initial="hidden"
              animate="visible"
            >
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%" cy="50%"
                    innerRadius={44} outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number) => [`${v}%`, ""]}
                    contentStyle={{
                      borderRadius: 0,
                      border: "0.5px solid #e5e7eb",
                      background: "#fff",
                      fontSize: 11,
                      padding: "6px 10px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              <motion.div 
                variants={legendVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2"
              >
                {categoryData.map((item, i) => (
                  <motion.div 
                    key={item.name} 
                    variants={legendItemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 cursor-pointer"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 500 }}
                      style={{ width: 8, height: 8, backgroundColor: PALETTE[i % PALETTE.length] }} 
                    />
                    <span className="text-[10px] text-zinc-400">{item.name} {item.value}%</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Monthly Sales vs Profit */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="bg-white dark:bg-zinc-900 border shadow rounded border-zinc-200 dark:border-zinc-800 px-4 py-4 relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "radial-gradient(circle at var(--x, 50%) var(--y, 50%), #1D9E75, transparent)",
          }}
        />
        
        <SectionHeader title="Monthly Sales vs Profit" />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <Loading key="bar-loading" />
          ) : chartData.length === 0 ? (
            <Empty key="bar-empty" />
          ) : (
            <motion.div
              key="bar-chart"
              variants={chartVariants}
              initial="hidden"
              animate="visible"
            >
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={chartData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={10}>
                  <CartesianGrid {...gridStyle} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                  <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v/1000}k`} />
                  <Tooltip content={<ChartTooltip />} />
                  <Bar 
                    dataKey="sales"  
                    name="Sales"  
                    fill="#378ADD" 
                    radius={[2,2,0,0]}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill="#378ADD" />
                    ))}
                  </Bar>
                  <Bar 
                    dataKey="profit" 
                    name="Profit" 
                    fill="#1D9E75" 
                    radius={[2,2,0,0]}
                    isAnimationActive={true}
                    animationDuration={1000}
                    animationEasing="ease-out"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill="#1D9E75" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          )}
        </AnimatePresence>
        
        {!loading && chartData.length > 0 && (
          <motion.div 
            variants={legendVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4 mt-2"
          >
            {[{ label: "Sales", color: "#378ADD" }, { label: "Profit", color: "#1D9E75" }].map(l => (
              <motion.div key={l.label} variants={legendItemVariants} className="flex items-center gap-1.5">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ width: 10, height: 10, backgroundColor: l.color }} 
                />
                <span className="text-[10px] text-zinc-400">{l.label}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}