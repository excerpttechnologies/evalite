




"use client"

import { useEffect, useState } from "react"
import {
  IndianRupee,
  TrendingUp,
  ShoppingCart,
  AlertTriangle,
  Clock
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

export function DashboardStats() {

  const [sales,setSales] = useState<any[]>([])
  const [purchases,setPurchases] = useState<any[]>([])
  const [products,setProducts] = useState<any[]>([])
  const [customers,setCustomers] = useState<any[]>([])

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {

    const s = await fetch("/api/sales")
    const p = await fetch("/api/purchases")
    const pr = await fetch("/api/products")
    const c = await fetch("/api/customers")

  const salesData = await s.json()
const purchaseData = await p.json()
const productData = await pr.json()
const customerData = await c.json()

setSales(Array.isArray(salesData) ? salesData : [])
setPurchases(Array.isArray(purchaseData) ? purchaseData : [])
setProducts(Array.isArray(productData) ? productData : [])
setCustomers(Array.isArray(customerData) ? customerData : [])

  }
const totalSales = (sales || []).reduce(
  (sum,s)=> sum + (s.total || 0),
0)

const totalPurchases = (purchases || []).reduce(
  (sum,p)=> sum + ((p.price || 0) * (p.quantity || 0)),
0)

  const lowStock = products.filter(p => p.stock < 10).length

  const pendingPayments = customers.reduce((sum,c)=> sum + (c.balance || 0),0)

  const stats = [
    {
      title:"Total Sales",
      value: totalSales,
      icon: IndianRupee
    },
    {
      title:"Total Purchases",
      value: totalPurchases,
      icon: ShoppingCart
    },
    {
      title:"Customers",
      value: customers.length,
      icon: TrendingUp
    },
    {
      title:"Low Stock Items",
      value: lowStock,
      icon: AlertTriangle
    },
    {
      title:"Pending Payments",
      value: pendingPayments,
      icon: Clock
    }
  ]

  const formatCurrency = (amount:number)=>{
    return new Intl.NumberFormat("en-IN",{
      style:"currency",
      currency:"INR"
    }).format(amount)
  }

  return (

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      {stats.map((stat)=>{

        const Icon = stat.icon

        return(

          <Card key={stat.title}>

            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-muted-foreground">
                {stat.title}
              </CardTitle>

              <Icon className="size-4 text-primary"/>
            </CardHeader>

            <CardContent>

              <div className="text-2xl font-bold">

                {stat.title === "Customers" || stat.title === "Low Stock Items"
                  ? stat.value
                  : formatCurrency(stat.value)
                }

              </div>

            </CardContent>

          </Card>

        )

      })}

    </div>

  )

}