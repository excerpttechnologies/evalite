




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
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from "recharts"

// const COLORS = [
//   "#6366f1",
//   "#22c55e",
//   "#f59e0b",
//   "#ec4899",
//   "#06b6d4"
// ]

// export function ReportsCharts() {

//   const [sales,setSales] = useState<any[]>([])
//   const [expenses,setExpenses] = useState<any[]>([])
//   const [products,setProducts] = useState<any[]>([])

//   useEffect(()=>{
//     loadData()
//   },[])

//   const loadData = async () => {

//     const s = await fetch("/api/sales")
//     const e = await fetch("/api/expenses")
//     const p = await fetch("/api/products")

//     setSales(await s.json())
//     setExpenses(await e.json())
//     setProducts(await p.json())

//   }

//   /* ---------------- SALES CHART ---------------- */

//   const monthlySales:any = {}

//   sales.forEach((sale)=>{

//     const date = new Date(sale.date)
//     const month = date.toLocaleString("default",{month:"short"})

//     if(!monthlySales[month]){
//       monthlySales[month] = {month,sales:0,profit:0}
//     }

//     monthlySales[month].sales += sale.total || 0
//     monthlySales[month].profit += (sale.total || 0) * 0.3

//   })

//   const salesChartData = Object.values(monthlySales)

//   /* ---------------- EXPENSE CHART ---------------- */

//   const monthlyExpenses:any = {}

//   expenses.forEach((exp)=>{

//     const date = new Date(exp.date)
//     const month = date.toLocaleString("default",{month:"short"})

//     if(!monthlyExpenses[month]){
//       monthlyExpenses[month] = {
//         month,
//         rent:0,
//         salary:0,
//         electricity:0,
//         transport:0,
//         other:0
//       }
//     }

//     const cat = exp.category?.toLowerCase()

//     if(cat === "rent") monthlyExpenses[month].rent += exp.amount
//     else if(cat === "salary") monthlyExpenses[month].salary += exp.amount
//     else if(cat === "electricity") monthlyExpenses[month].electricity += exp.amount
//     else if(cat === "transport") monthlyExpenses[month].transport += exp.amount
//     else monthlyExpenses[month].other += exp.amount

//   })

//   const expenseChartData = Object.values(monthlyExpenses)

//   /* ---------------- STOCK SUMMARY ---------------- */

//   const stockSummary = [
//     {
//       name:"In Stock",
//       value: products.filter(p=>p.stock > 10).length,
//       fill:"#22c55e"
//     },
//     {
//       name:"Low Stock",
//       value: products.filter(p=>p.stock <=10 && p.stock >0).length,
//       fill:"#f59e0b"
//     },
//     {
//       name:"Out of Stock",
//       value: products.filter(p=>p.stock === 0).length,
//       fill:"#ef4444"
//     }
//   ]

//   /* ---------------- UI ---------------- */

//   return (

//     <div className="grid gap-4 lg:grid-cols-2">

//       {/* SALES REPORT */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Monthly Sales Report</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <ResponsiveContainer width="100%" height={300}>

//             <AreaChart data={salesChartData}>

//               <CartesianGrid strokeDasharray="3 3" />

//               <XAxis dataKey="month"/>

//               <YAxis/>

//               <Tooltip/>

//               <Area
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="#6366f1"
//                 fill="#6366f1"
//               />

//             </AreaChart>

//           </ResponsiveContainer>

//         </CardContent>

//       </Card>

//       {/* PROFIT REPORT */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Profit Report</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <ResponsiveContainer width="100%" height={300}>

//             <BarChart data={salesChartData}>

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis dataKey="month"/>

//               <YAxis/>

//               <Tooltip/>

//               <Bar dataKey="profit" fill="#22c55e"/>

//             </BarChart>

//           </ResponsiveContainer>

//         </CardContent>

//       </Card>

//       {/* EXPENSE REPORT */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Expense Breakdown</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <ResponsiveContainer width="100%" height={300}>

//             <BarChart data={expenseChartData} layout="vertical">

//               <CartesianGrid strokeDasharray="3 3"/>

//               <XAxis type="number"/>

//               <YAxis dataKey="month" type="category"/>

//               <Tooltip/>

//               <Legend/>

//               <Bar dataKey="rent" stackId="a" fill={COLORS[0]}/>
//               <Bar dataKey="salary" stackId="a" fill={COLORS[1]}/>
//               <Bar dataKey="electricity" stackId="a" fill={COLORS[2]}/>
//               <Bar dataKey="transport" stackId="a" fill={COLORS[3]}/>
//               <Bar dataKey="other" stackId="a" fill={COLORS[4]}/>

//             </BarChart>

//           </ResponsiveContainer>

//         </CardContent>

//       </Card>

//       {/* INVENTORY SUMMARY */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Inventory Stock Summary</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <ResponsiveContainer width="100%" height={240}>

//             <PieChart>

//               <Pie
//                 data={stockSummary}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={55}
//                 outerRadius={90}
//                 dataKey="value"
//               >

//                 {stockSummary.map((entry,index)=>(
//                   <Cell key={index} fill={entry.fill}/>
//                 ))}

//               </Pie>

//               <Tooltip/>

//             </PieChart>

//           </ResponsiveContainer>

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
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from "recharts"

// const COLORS = [
//   "#6366f1",
//   "#22c55e",
//   "#f59e0b",
//   "#ec4899",
//   "#06b6d4"
// ]

// // Fixed month order for correct sorting
// const MONTH_ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

// export function ReportsCharts() {

//   const [sales, setSales] = useState<any[]>([])
//   const [expenses, setExpenses] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     loadData()
//   }, [])

//   const loadData = async () => {
//     try {
//       const [s, e, p] = await Promise.all([
//         fetch("/api/sales"),
//         fetch("/api/expenses"),
//         fetch("/api/products")
//       ])

//       const salesData = await s.json()
//       const expenseData = await e.json()
//       const productData = await p.json()

//       setSales(Array.isArray(salesData) ? salesData : [])
//       setExpenses(Array.isArray(expenseData) ? expenseData : [])
//       setProducts(Array.isArray(productData) ? productData : [])
//     } catch (err) {
//       console.error("Reports load error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   /* ── SALES CHART (sorted by month order) ── */
//   const monthlySalesMap: Record<string, { month: string; sales: number; profit: number }> = {}

//   sales.forEach((sale) => {
//     const date = new Date(sale.date)
//     const month = date.toLocaleString("default", { month: "short" })
//     if (!monthlySalesMap[month]) {
//       monthlySalesMap[month] = { month, sales: 0, profit: 0 }
//     }
//     monthlySalesMap[month].sales += sale.total || 0
//     monthlySalesMap[month].profit += (sale.total || 0) * 0.3
//   })

//   const salesChartData = MONTH_ORDER
//     .filter(m => monthlySalesMap[m])
//     .map(m => ({
//       ...monthlySalesMap[m],
//       sales: Math.round(monthlySalesMap[m].sales),
//       profit: Math.round(monthlySalesMap[m].profit)
//     }))

//   /* ── EXPENSE CHART (sorted by month order) ── */
//   const monthlyExpensesMap: Record<string, any> = {}

//   expenses.forEach((exp) => {
//     const date = new Date(exp.date)
//     const month = date.toLocaleString("default", { month: "short" })
//     if (!monthlyExpensesMap[month]) {
//       monthlyExpensesMap[month] = { month, rent: 0, salary: 0, electricity: 0, transport: 0, other: 0 }
//     }
//     const cat = exp.category?.toLowerCase()
//     if (cat === "rent") monthlyExpensesMap[month].rent += exp.amount
//     else if (cat === "salary") monthlyExpensesMap[month].salary += exp.amount
//     else if (cat === "electricity") monthlyExpensesMap[month].electricity += exp.amount
//     else if (cat === "transport") monthlyExpensesMap[month].transport += exp.amount
//     else monthlyExpensesMap[month].other += exp.amount
//   })

//   const expenseChartData = MONTH_ORDER
//     .filter(m => monthlyExpensesMap[m])
//     .map(m => monthlyExpensesMap[m])

//   /* ── STOCK SUMMARY ── */
//   const stockSummary = [
//     { name: "In Stock", value: products.filter(p => p.stock > 10).length, fill: "#22c55e" },
//     { name: "Low Stock", value: products.filter(p => p.stock <= 10 && p.stock > 0).length, fill: "#f59e0b" },
//     { name: "Out of Stock", value: products.filter(p => p.stock === 0).length, fill: "#ef4444" }
//   ]

//   const formatCurrency = (v: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v)

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
//         Loading reports...
//       </div>
//     )
//   }

//   return (
//     <div className="grid gap-4 lg:grid-cols-2">

//       {/* SALES REPORT */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Monthly Sales Report</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {salesChartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={salesChartData}>
//                 <defs>
//                   <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip formatter={(v: number) => formatCurrency(v)} />
//                 <Area type="monotone" dataKey="sales" name="Sales" stroke="#6366f1" fill="url(#salesFill)" strokeWidth={2} />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* PROFIT REPORT */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Profit Report</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {salesChartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={salesChartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip formatter={(v: number) => formatCurrency(v)} />
//                 <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* EXPENSE REPORT */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Expense Breakdown</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {expenseChartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">No expense data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={expenseChartData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
//                 <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />
//                 <Tooltip formatter={(v: number) => formatCurrency(v)} />
//                 <Legend />
//                 <Bar dataKey="rent" stackId="a" fill={COLORS[0]} name="Rent" />
//                 <Bar dataKey="salary" stackId="a" fill={COLORS[1]} name="Salary" />
//                 <Bar dataKey="electricity" stackId="a" fill={COLORS[2]} name="Electricity" />
//                 <Bar dataKey="transport" stackId="a" fill={COLORS[3]} name="Transport" />
//                 <Bar dataKey="other" stackId="a" fill={COLORS[4]} name="Other" />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* INVENTORY SUMMARY */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Inventory Stock Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={240}>
//             <PieChart>
//               <Pie
//                 data={stockSummary}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={55}
//                 outerRadius={90}
//                 dataKey="value"
//                 label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
//                 labelLine={false}
//               >
//                 {stockSummary.map((entry, index) => (
//                   <Cell key={index} fill={entry.fill} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(v: number) => [`${v} products`, ""]} />
//               <Legend
//                 formatter={(value) => <span className="text-xs">{value}</span>}
//               />
//             </PieChart>
//           </ResponsiveContainer>

//           {/* Stock counts below pie */}
//           <div className="flex justify-around mt-2">
//             {stockSummary.map(s => (
//               <div key={s.name} className="text-center">
//                 <div className="text-lg font-bold" style={{ color: s.fill }}>{s.value}</div>
//                 <div className="text-xs text-muted-foreground">{s.name}</div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   )
// }


//aravind

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//   BarChart, Bar, PieChart, Pie, Cell, Legend
// } from "recharts"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4"]
// const MONTH_ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

// export function ReportsCharts() {
//   const [sales, setSales] = useState<any[]>([])
//   const [expenses, setExpenses] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => { loadData() }, [])

//   const loadData = async () => {
//     try {
//       // ✅ all 3 replaced with authFetch
//       const [s, e, p] = await Promise.all([
//         authFetch("/api/sales"),
//         authFetch("/api/expenses"),
//         authFetch("/api/products")
//       ])

//       const salesData = await s.json()
//       const expenseData = await e.json()
//       const productData = await p.json()

//       setSales(Array.isArray(salesData) ? salesData : [])
//       setExpenses(Array.isArray(expenseData) ? expenseData : [])
//       setProducts(Array.isArray(productData) ? productData : [])
//     } catch (err) {
//       console.error("Reports load error:", err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   /* ── SALES CHART ── */
//   const monthlySalesMap: Record<string, { month: string; sales: number; profit: number }> = {}

//   sales.forEach((sale) => {
//     const month = new Date(sale.date).toLocaleString("default", { month: "short" })
//     if (!monthlySalesMap[month]) monthlySalesMap[month] = { month, sales: 0, profit: 0 }
//     monthlySalesMap[month].sales += sale.total || 0
//     monthlySalesMap[month].profit += (sale.total || 0) * 0.3
//   })

//   const salesChartData = MONTH_ORDER
//     .filter(m => monthlySalesMap[m])
//     .map(m => ({
//       ...monthlySalesMap[m],
//       sales: Math.round(monthlySalesMap[m].sales),
//       profit: Math.round(monthlySalesMap[m].profit)
//     }))

//   /* ── EXPENSE CHART ── */
//   const monthlyExpensesMap: Record<string, any> = {}

//   expenses.forEach((exp) => {
//     const month = new Date(exp.date).toLocaleString("default", { month: "short" })
//     if (!monthlyExpensesMap[month])
//       monthlyExpensesMap[month] = { month, rent: 0, salary: 0, electricity: 0, transport: 0, other: 0 }
//     const cat = exp.category?.toLowerCase()
//     if (cat === "rent") monthlyExpensesMap[month].rent += exp.amount
//     else if (cat === "salary") monthlyExpensesMap[month].salary += exp.amount
//     else if (cat === "electricity") monthlyExpensesMap[month].electricity += exp.amount
//     else if (cat === "transport") monthlyExpensesMap[month].transport += exp.amount
//     else monthlyExpensesMap[month].other += exp.amount
//   })

//   const expenseChartData = MONTH_ORDER
//     .filter(m => monthlyExpensesMap[m])
//     .map(m => monthlyExpensesMap[m])

//   /* ── STOCK SUMMARY ── */
//   const stockSummary = [
//     { name: "In Stock", value: products.filter(p => p.stock > 10).length, fill: "#22c55e" },
//     { name: "Low Stock", value: products.filter(p => p.stock <= 10 && p.stock > 0).length, fill: "#f59e0b" },
//     { name: "Out of Stock", value: products.filter(p => p.stock === 0).length, fill: "#ef4444" }
//   ]

//   const formatCurrency = (v: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v)

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
//         Loading reports...
//       </div>
//     )
//   }

//   return (
//     <div className="grid gap-4 lg:grid-cols-2">

//       {/* SALES REPORT */}
//       <Card>
//         <CardHeader><CardTitle>Monthly Sales Report</CardTitle></CardHeader>
//         <CardContent>
//           {salesChartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={salesChartData}>
//                 <defs>
//                   <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip formatter={(v: number) => formatCurrency(v)} />
//                 <Area type="monotone" dataKey="sales" name="Sales" stroke="#6366f1" fill="url(#salesFill)" strokeWidth={2} />
//               </AreaChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* PROFIT REPORT */}
//       <Card>
//         <CardHeader><CardTitle>Profit Report</CardTitle></CardHeader>
//         <CardContent>
//           {salesChartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">No sales data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={salesChartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
//                 <Tooltip formatter={(v: number) => formatCurrency(v)} />
//                 <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* EXPENSE REPORT */}
//       <Card>
//         <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
//         <CardContent>
//           {expenseChartData.length === 0 ? (
//             <div className="flex items-center justify-center h-[300px] text-sm text-muted-foreground">No expense data yet</div>
//           ) : (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={expenseChartData} layout="vertical">
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis type="number" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
//                 <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} />
//                 <Tooltip formatter={(v: number) => formatCurrency(v)} />
//                 <Legend />
//                 <Bar dataKey="rent" stackId="a" fill={COLORS[0]} name="Rent" />
//                 <Bar dataKey="salary" stackId="a" fill={COLORS[1]} name="Salary" />
//                 <Bar dataKey="electricity" stackId="a" fill={COLORS[2]} name="Electricity" />
//                 <Bar dataKey="transport" stackId="a" fill={COLORS[3]} name="Transport" />
//                 <Bar dataKey="other" stackId="a" fill={COLORS[4]} name="Other" />
//               </BarChart>
//             </ResponsiveContainer>
//           )}
//         </CardContent>
//       </Card>

//       {/* INVENTORY SUMMARY */}
//       <Card>
//         <CardHeader><CardTitle>Inventory Stock Summary</CardTitle></CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={240}>
//             <PieChart>
//               <Pie
//                 data={stockSummary}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={55}
//                 outerRadius={90}
//                 dataKey="value"
//                 label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
//                 labelLine={false}
//               >
//                 {stockSummary.map((entry, index) => (
//                   <Cell key={index} fill={entry.fill} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(v: number) => [`${v} products`, ""]} />
//               <Legend formatter={(value) => <span className="text-xs">{value}</span>} />
//             </PieChart>
//           </ResponsiveContainer>

//           <div className="flex justify-around mt-2">
//             {stockSummary.map(s => (
//               <div key={s.name} className="text-center">
//                 <div className="text-lg font-bold" style={{ color: s.fill }}>{s.value}</div>
//                 <div className="text-xs text-muted-foreground">{s.name}</div>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   )
// }


////jay

"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts"
import { authFetch } from "@/app/lib/authFetch"
import { TrendingUp, BarChart2, PieChart as PieIcon, Package } from "lucide-react"

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4"]
const MONTH_ORDER = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

// ── animation helpers ──────────────────────────────────────────────────────────
const fadeUp = (delay = 0):Variants => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut", delay } },
})

// ── custom tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-sm shadow-lg border border-black/5 bg-white dark:bg-zinc-900 px-3 py-2 text-xs">
      {label && <p className="font-semibold text-muted-foreground mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <span className="size-2 rounded-full flex-shrink-0" style={{ background: p.color || p.fill }} />
          <span className="text-muted-foreground">{p.name}:</span>
          <span className="font-bold">{formatter ? formatter(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── loading skeleton ───────────────────────────────────────────────────────────
const Skeleton = () => (
  <div className="grid gap-3 lg:grid-cols-2">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="rounded-sm bg-zinc-200 ring-1 ring-black/5 shadow-sm overflow-hidden">
        <div className="p-3 border-b border-black/5">
          <div className="h-4 w-40 bg-zinc-100 dark:bg-zinc-800 rounded-sm animate-pulse" />
        </div>
        <div className="p-3 h-[300px] flex items-center justify-center">
          <div className="w-full h-full bg-zinc-50 dark:bg-zinc-800/50 rounded-sm animate-pulse" />
        </div>
      </div>
    ))}
  </div>
)

// ── chart card wrapper ─────────────────────────────────────────────────────────
function ChartCard({
  title, icon: Icon, color, children, delay = 0, empty, emptyMsg,
}: {
  title: string
  icon: React.ElementType
  color: string
  children: React.ReactNode
  delay?: number
  empty?: boolean
  emptyMsg?: string
}) {
  return (
    <motion.div variants={fadeUp(delay)} initial="hidden" animate="show">
      <Card className="rounded shadow-sm border-0 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden h-full">
        <CardHeader className="px-3  pb-2 flex flex-row items-center gap-2 space-y-0">
          <span className={`p-1.5 rounded-sm ${color}`}>
            <Icon className="size-3.5" />
          </span>
          <CardTitle className="text-sm font-semibold tracking-tight">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {empty ? (
            <div className="flex items-center justify-center h-[300px] text-sm bg-gray-100 text-muted-foreground">
              {emptyMsg}
            </div>
          ) : children}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ── main component ─────────────────────────────────────────────────────────────
export function ReportsCharts() {
  const [sales, setSales]       = useState<any[]>([])
  const [expenses, setExpenses] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    try {
      const [s, e, p] = await Promise.all([
        authFetch("/api/sales"),
        authFetch("/api/expenses"),
        authFetch("/api/products"),
      ])
      const salesData   = await s.json()
      const expenseData = await e.json()
      const productData = await p.json()

      setSales(Array.isArray(salesData)     ? salesData   : [])
      setExpenses(Array.isArray(expenseData) ? expenseData : [])
      setProducts(Array.isArray(productData) ? productData : [])
    } catch (err) {
      console.error("Reports load error:", err)
    } finally {
      setLoading(false)
    }
  }

  /* ── SALES CHART ── */
  const monthlySalesMap: Record<string, { month: string; sales: number; profit: number }> = {}
  sales.forEach(sale => {
    const month = new Date(sale.date).toLocaleString("default", { month: "short" })
    if (!monthlySalesMap[month]) monthlySalesMap[month] = { month, sales: 0, profit: 0 }
    monthlySalesMap[month].sales  += sale.total || 0
    monthlySalesMap[month].profit += (sale.total || 0) * 0.3
  })
  const salesChartData = MONTH_ORDER
    .filter(m => monthlySalesMap[m])
    .map(m => ({ ...monthlySalesMap[m], sales: Math.round(monthlySalesMap[m].sales), profit: Math.round(monthlySalesMap[m].profit) }))

  /* ── EXPENSE CHART ── */
  const monthlyExpensesMap: Record<string, any> = {}
  expenses.forEach(exp => {
    const month = new Date(exp.date).toLocaleString("default", { month: "short" })
    if (!monthlyExpensesMap[month])
      monthlyExpensesMap[month] = { month, rent: 0, salary: 0, electricity: 0, transport: 0, other: 0 }
    const cat = exp.category?.toLowerCase()
    if      (cat === "rent")        monthlyExpensesMap[month].rent        += exp.amount
    else if (cat === "salary")      monthlyExpensesMap[month].salary      += exp.amount
    else if (cat === "electricity") monthlyExpensesMap[month].electricity += exp.amount
    else if (cat === "transport")   monthlyExpensesMap[month].transport   += exp.amount
    else                            monthlyExpensesMap[month].other       += exp.amount
  })
  const expenseChartData = MONTH_ORDER.filter(m => monthlyExpensesMap[m]).map(m => monthlyExpensesMap[m])

  /* ── STOCK SUMMARY ── */
  const stockSummary = [
    { name: "In Stock",     value: products.filter(p => p.stock > 10).length,                fill: "#22c55e" },
    { name: "Low Stock",    value: products.filter(p => p.stock <= 10 && p.stock > 0).length, fill: "#f59e0b" },
    { name: "Out of Stock", value: products.filter(p => p.stock === 0).length,                fill: "#ef4444" },
  ]

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v)

  const axisStyle = { fontSize: 11, fill: "var(--muted-foreground)" }
  const gridStyle = { stroke: "var(--border)", strokeDasharray: "4 4" }

  if (loading) return <Skeleton />

  return (
    <div className="grid gap-3 lg:grid-cols-2">

      {/* ── Monthly Sales ── */}
      <ChartCard
        title="Monthly Sales Report"
        icon={TrendingUp}
        color="bg-violet-50 text-violet-500 dark:bg-violet-900/30"
        delay={0}
        empty={salesChartData.length === 0}
        emptyMsg="No sales data yet"
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesChartData} margin={{ top: 8, right: 4, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridStyle} vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
            <Area
              type="monotone" dataKey="sales" name="Sales"
              stroke="#6366f1" fill="url(#salesFill)" strokeWidth={2.5}
              dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Profit Report ── */}
      <ChartCard
        title="Profit Report"
        icon={BarChart2}
        color="bg-emerald-50 text-emerald-500 dark:bg-emerald-900/30"
        delay={0.08}
        empty={salesChartData.length === 0}
        emptyMsg="No sales data yet"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesChartData} margin={{ top: 8, right: 4, left: -10, bottom: 0 }}>
            <CartesianGrid {...gridStyle} vertical={false} />
            <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
            <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
            <Bar dataKey="profit" name="Profit" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Expense Breakdown ── */}
      <ChartCard
        title="Expense Breakdown"
        icon={BarChart2}
        color="bg-amber-50 text-amber-500 dark:bg-amber-900/30"
        delay={0.16}
        empty={expenseChartData.length === 0}
        emptyMsg="No expense data yet"
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={expenseChartData} layout="vertical" margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <CartesianGrid {...gridStyle} horizontal={false} />
            <XAxis type="number" tick={axisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
            <YAxis dataKey="month" type="category" tick={axisStyle} axisLine={false} tickLine={false} width={28} />
            <Tooltip content={<CustomTooltip formatter={formatCurrency} />} />
            <Legend
              iconType="circle"
              iconSize={7}
              formatter={v => <span className="text-[11px] text-muted-foreground">{v}</span>}
            />
            <Bar dataKey="rent"        stackId="a" fill={COLORS[0]} name="Rent"        />
            <Bar dataKey="salary"      stackId="a" fill={COLORS[1]} name="Salary"      />
            <Bar dataKey="electricity" stackId="a" fill={COLORS[2]} name="Electricity" />
            <Bar dataKey="transport"   stackId="a" fill={COLORS[3]} name="Transport"   />
            <Bar dataKey="other"       stackId="a" fill={COLORS[4]} name="Other" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* ── Inventory ── */}
      <ChartCard
        title="Inventory Stock Summary"
        icon={Package}
        color="bg-sky-50 text-sky-500 dark:bg-sky-900/30"
        delay={0.24}
      >
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={stockSummary}
              cx="50%" cy="50%"
              innerRadius={58} outerRadius={88}
              dataKey="value"
              paddingAngle={3}
              label={({ name, value }) => value > 0 ? `${name}: ${value}` : ""}
              labelLine={false}
            >
              {stockSummary.map((entry, i) => (
                <Cell key={i} fill={entry.fill} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => [`${v} products`, ""]} content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={7}
              formatter={v => <span className="text-[11px] text-muted-foreground">{v}</span>}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* stat pills */}
        <div className="flex justify-around mt-1 gap-2">
          {stockSummary.map(s => (
            <div
              key={s.name}
              className="flex-1 text-center rounded-sm py-2 px-1"
              style={{ background: `${s.fill}18` }}
            >
              <div className="text-lg font-bold" style={{ color: s.fill }}>{s.value}</div>
              <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.name}</div>
            </div>
          ))}
        </div>
      </ChartCard>

    </div>
  )
}