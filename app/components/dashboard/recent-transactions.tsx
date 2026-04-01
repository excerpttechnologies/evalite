






// "use client"

// import { useEffect,useState } from "react"
// import { Card,CardContent,CardHeader,CardTitle } from "@/app/components/ui/card"
// import {
// Table,TableBody,TableCell,TableHead,TableHeader,TableRow
// } from "@/app/components/ui/table"

// export function RecentTransactions(){

// const [sales,setSales] = useState([])

// useEffect(()=>{
//  fetchSales()
// },[])

// const fetchSales = async ()=>{
//  const res = await fetch("/api/sales")
//  const data = await res.json()
//  setSales(data.slice(0,5))
// }

// const formatCurrency = (amount:number)=>{
//  return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(amount)
// }

// return(

// <Card>

// <CardHeader>
// <CardTitle>Recent Transactions</CardTitle>
// </CardHeader>

// <CardContent>

// <Table>

// <TableHeader>
// <TableRow>
// <TableHead>Customer</TableHead>
// <TableHead>Product</TableHead>
// <TableHead className="text-right">Amount</TableHead>
// <TableHead>Date</TableHead>
// </TableRow>
// </TableHeader>

// <TableBody>

// {sales.map((s:any)=>(
// <TableRow key={s._id}>

// <TableCell>{s.customer?.name}</TableCell>

// <TableCell>{s.product?.name}</TableCell>

// <TableCell className="text-right">
// {formatCurrency(s.total)}
// </TableCell>

// <TableCell>
// {new Date(s.date).toLocaleDateString()}
// </TableCell>

// </TableRow>
// ))}

// </TableBody>

// </Table>

// </CardContent>

// </Card>

// )

// }



//aravind
// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// export function RecentTransactions() {
//   const [sales, setSales] = useState([])

//   useEffect(() => { fetchSales() }, [])

//   const fetchSales = async () => {
//     const res = await authFetch("/api/sales") // ✅
//     const data = await res.json()
//     setSales(Array.isArray(data) ? data.slice(0, 5) : [])
//   }

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Recent Transactions</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Customer</TableHead>
//               <TableHead>Product</TableHead>
//               <TableHead className="text-right">Amount</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {sales.map((s: any) => (
//               <TableRow key={s._id}>
//                 <TableCell>{s.customer?.name}</TableCell>
//                 <TableCell>{s.product?.name}</TableCell>
//                 <TableCell className="text-right">{formatCurrency(s.total)}</TableCell>
//                 <TableCell>{new Date(s.date).toLocaleDateString()}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   )
// }



///jay

"use client"

import { useEffect, useState } from "react"
import { authFetch } from "@/app/lib/authFetch"

const INR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

export function RecentTransactions() {
  const [sales, setSales] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchSales() }, [])

  const fetchSales = async () => {
    try {
      const res  = await authFetch("/api/sales")
      const data = await res.json()
      setSales(Array.isArray(data) ? data.slice(0, 5) : [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded shadow dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
        <div style={{ borderLeft: "3px solid #378ADD" }} className="pl-3">
          <p className="text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-medium">
            Recent Transactions
          </p>
        </div>
        <span className="text-[10px] text-zinc-300 dark:text-zinc-600 tracking-wide">Last 5</span>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center h-40 text-xs text-zinc-400 tracking-wide">Loading…</div>
      ) : sales.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-xs text-zinc-400 tracking-wide">No transactions yet</div>
      ) : (
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              {["Customer", "Product", "Amount", "Date"].map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-2 text-[10px] uppercase tracking-widest font-medium text-zinc-400 dark:text-zinc-600 ${i >= 2 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sales.map((s: any, idx: number) => (
              <tr
                key={s._id}
                className={`border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors ${
                  idx === sales.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300 font-medium">
                  {s.customer?.name || "—"}
                </td>
                <td className="px-4 py-2.5 text-zinc-500 dark:text-zinc-400">
                  {s.product?.name || "—"}
                </td>
                <td className="px-4 py-2.5 text-right">
                  <span
                    style={{ borderLeft: "2px solid #1D9E75" }}
                    className="pl-2 text-zinc-700 dark:text-zinc-300 font-medium tabular-nums"
                  >
                    {INR(s.total)}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-zinc-400 dark:text-zinc-600 tabular-nums">
                  {new Date(s.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "2-digit" })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}