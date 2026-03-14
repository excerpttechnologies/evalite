






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
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table"
import { authFetch } from "@/app/lib/authFetch" // ✅

export function RecentTransactions() {
  const [sales, setSales] = useState([])

  useEffect(() => { fetchSales() }, [])

  const fetchSales = async () => {
    const res = await authFetch("/api/sales") // ✅
    const data = await res.json()
    setSales(Array.isArray(data) ? data.slice(0, 5) : [])
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((s: any) => (
              <TableRow key={s._id}>
                <TableCell>{s.customer?.name}</TableCell>
                <TableCell>{s.product?.name}</TableCell>
                <TableCell className="text-right">{formatCurrency(s.total)}</TableCell>
                <TableCell>{new Date(s.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}