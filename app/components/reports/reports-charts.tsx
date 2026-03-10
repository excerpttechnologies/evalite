// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import {
//   salesChartData,
//   categoryDistribution,
//   monthlyExpenses,
//   products,
//   formatCurrency,
// } from "@/app/lib/mock-data"
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
//   Legend,
//   RadialBarChart,
//   RadialBar,
// } from "recharts"

// const COLORS = [
//   "oklch(0.55 0.2 255)",
//   "oklch(0.65 0.18 155)",
//   "oklch(0.70 0.18 45)",
//   "oklch(0.65 0.20 310)",
//   "oklch(0.60 0.15 200)",
// ]

// function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
//   if (active && payload && payload.length) {
//     return (
//       <div className="rounded-lg border bg-card p-3 shadow-md">
//         <p className="text-sm font-medium text-foreground">{label}</p>
//         {payload.map((entry, index) => (
//           <p key={index} className="text-sm text-muted-foreground">
//             {entry.name}: {formatCurrency(entry.value)}
//           </p>
//         ))}
//       </div>
//     )
//   }
//   return null
// }

// const stockSummary = [
//   { name: "In Stock", value: products.filter((p) => p.status === "In Stock").length, fill: "oklch(0.65 0.18 155)" },
//   { name: "Low Stock", value: products.filter((p) => p.status === "Low Stock").length, fill: "oklch(0.80 0.16 80)" },
//   { name: "Out of Stock", value: products.filter((p) => p.status === "Out of Stock").length, fill: "oklch(0.577 0.245 27.325)" },
// ]

// export function ReportsCharts() {
//   return (
//     <div className="grid gap-4 lg:grid-cols-2">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Monthly Sales Report</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={salesChartData}>
//               <defs>
//                 <linearGradient id="reportSalesGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0.3} />
//                   <stop offset="95%" stopColor="oklch(0.55 0.2 255)" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//               <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" />
//               <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//               <Tooltip content={<ChartTooltip />} />
//               <Area
//                 type="monotone"
//                 dataKey="sales"
//                 stroke="oklch(0.55 0.2 255)"
//                 fill="url(#reportSalesGrad)"
//                 strokeWidth={2}
//                 name="Sales"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Profit Report</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={salesChartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//               <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" />
//               <YAxis tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//               <Tooltip content={<ChartTooltip />} />
//               <Bar dataKey="profit" name="Profit" fill="oklch(0.65 0.18 155)" radius={[6, 6, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Expense Breakdown</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={monthlyExpenses} layout="vertical">
//               <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.91 0.005 250)" />
//               <XAxis type="number" tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" tickFormatter={(v) => `${v / 1000}k`} />
//               <YAxis dataKey="month" type="category" tick={{ fontSize: 12 }} stroke="oklch(0.50 0.02 260)" width={40} />
//               <Tooltip content={<ChartTooltip />} />
//               <Legend />
//               <Bar dataKey="rent" name="Rent" stackId="a" fill={COLORS[0]} />
//               <Bar dataKey="salary" name="Salary" stackId="a" fill={COLORS[1]} />
//               <Bar dataKey="electricity" name="Electricity" stackId="a" fill={COLORS[2]} />
//               <Bar dataKey="transport" name="Transport" stackId="a" fill={COLORS[3]} />
//               <Bar dataKey="other" name="Other" stackId="a" fill={COLORS[4]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Inventory Stock Summary</CardTitle>
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
//                 paddingAngle={4}
//                 dataKey="value"
//                 label={({ name, value }) => `${name}: ${value}`}
//               >
//                 {stockSummary.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.fill} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//           <div className="mt-4 flex justify-center gap-4">
//             {stockSummary.map((item) => (
//               <div key={item.name} className="flex items-center gap-2 text-xs">
//                 <div className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
//                 <span className="text-muted-foreground">{item.name} ({item.value})</span>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }












"use client"

import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts"

const COLORS = [
  "#6366f1",
  "#22c55e",
  "#f59e0b",
  "#ec4899",
  "#06b6d4"
]

export function ReportsCharts() {

  const [sales,setSales] = useState<any[]>([])
  const [expenses,setExpenses] = useState<any[]>([])
  const [products,setProducts] = useState<any[]>([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {

    const s = await fetch("/api/sales")
    const e = await fetch("/api/expenses")
    const p = await fetch("/api/products")

    setSales(await s.json())
    setExpenses(await e.json())
    setProducts(await p.json())

  }

  /* ---------------- SALES CHART ---------------- */

  const monthlySales:any = {}

  sales.forEach((sale)=>{

    const date = new Date(sale.date)
    const month = date.toLocaleString("default",{month:"short"})

    if(!monthlySales[month]){
      monthlySales[month] = {month,sales:0,profit:0}
    }

    monthlySales[month].sales += sale.total || 0
    monthlySales[month].profit += (sale.total || 0) * 0.3

  })

  const salesChartData = Object.values(monthlySales)

  /* ---------------- EXPENSE CHART ---------------- */

  const monthlyExpenses:any = {}

  expenses.forEach((exp)=>{

    const date = new Date(exp.date)
    const month = date.toLocaleString("default",{month:"short"})

    if(!monthlyExpenses[month]){
      monthlyExpenses[month] = {
        month,
        rent:0,
        salary:0,
        electricity:0,
        transport:0,
        other:0
      }
    }

    const cat = exp.category?.toLowerCase()

    if(cat === "rent") monthlyExpenses[month].rent += exp.amount
    else if(cat === "salary") monthlyExpenses[month].salary += exp.amount
    else if(cat === "electricity") monthlyExpenses[month].electricity += exp.amount
    else if(cat === "transport") monthlyExpenses[month].transport += exp.amount
    else monthlyExpenses[month].other += exp.amount

  })

  const expenseChartData = Object.values(monthlyExpenses)

  /* ---------------- STOCK SUMMARY ---------------- */

  const stockSummary = [
    {
      name:"In Stock",
      value: products.filter(p=>p.stock > 10).length,
      fill:"#22c55e"
    },
    {
      name:"Low Stock",
      value: products.filter(p=>p.stock <=10 && p.stock >0).length,
      fill:"#f59e0b"
    },
    {
      name:"Out of Stock",
      value: products.filter(p=>p.stock === 0).length,
      fill:"#ef4444"
    }
  ]

  /* ---------------- UI ---------------- */

  return (

    <div className="grid gap-4 lg:grid-cols-2">

      {/* SALES REPORT */}

      <Card>

        <CardHeader>
          <CardTitle>Monthly Sales Report</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>

            <AreaChart data={salesChartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Area
                type="monotone"
                dataKey="sales"
                stroke="#6366f1"
                fill="#6366f1"
              />

            </AreaChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

      {/* PROFIT REPORT */}

      <Card>

        <CardHeader>
          <CardTitle>Profit Report</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={salesChartData}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Bar dataKey="profit" fill="#22c55e"/>

            </BarChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

      {/* EXPENSE REPORT */}

      <Card>

        <CardHeader>
          <CardTitle>Expense Breakdown</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={expenseChartData} layout="vertical">

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis type="number"/>

              <YAxis dataKey="month" type="category"/>

              <Tooltip/>

              <Legend/>

              <Bar dataKey="rent" stackId="a" fill={COLORS[0]}/>
              <Bar dataKey="salary" stackId="a" fill={COLORS[1]}/>
              <Bar dataKey="electricity" stackId="a" fill={COLORS[2]}/>
              <Bar dataKey="transport" stackId="a" fill={COLORS[3]}/>
              <Bar dataKey="other" stackId="a" fill={COLORS[4]}/>

            </BarChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

      {/* INVENTORY SUMMARY */}

      <Card>

        <CardHeader>
          <CardTitle>Inventory Stock Summary</CardTitle>
        </CardHeader>

        <CardContent>

          <ResponsiveContainer width="100%" height={240}>

            <PieChart>

              <Pie
                data={stockSummary}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                dataKey="value"
              >

                {stockSummary.map((entry,index)=>(
                  <Cell key={index} fill={entry.fill}/>
                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </CardContent>

      </Card>

    </div>

  )

}