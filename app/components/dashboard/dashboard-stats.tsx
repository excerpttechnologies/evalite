




// // "use client"

// // import { useEffect, useState } from "react"
// // import {
// //   IndianRupee,
// //   TrendingUp,
// //   ShoppingCart,
// //   AlertTriangle,
// //   Clock
// // } from "lucide-react"

// // import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

// // export function DashboardStats() {

// //   const [sales,setSales] = useState<any[]>([])
// //   const [purchases,setPurchases] = useState<any[]>([])
// //   const [products,setProducts] = useState<any[]>([])
// //   const [customers,setCustomers] = useState<any[]>([])

// //   useEffect(()=>{
// //     loadData()
// //   },[])

// //   const loadData = async () => {

// //     const s = await fetch("/api/sales")
// //     const p = await fetch("/api/purchases")
// //     const pr = await fetch("/api/products")
// //     const c = await fetch("/api/customers")

// //   const salesData = await s.json()
// // const purchaseData = await p.json()
// // const productData = await pr.json()
// // const customerData = await c.json()

// // setSales(Array.isArray(salesData) ? salesData : [])
// // setPurchases(Array.isArray(purchaseData) ? purchaseData : [])
// // setProducts(Array.isArray(productData) ? productData : [])
// // setCustomers(Array.isArray(customerData) ? customerData : [])

// //   }
// // const totalSales = (sales || []).reduce(
// //   (sum,s)=> sum + (s.total || 0),
// // 0)

// // const totalPurchases = (purchases || []).reduce(
// //   (sum,p)=> sum + ((p.price || 0) * (p.quantity || 0)),
// // 0)

// //   const lowStock = products.filter(p => p.stock < 10).length

// //   const pendingPayments = customers.reduce((sum,c)=> sum + (c.balance || 0),0)

// //   const stats = [
// //     {
// //       title:"Total Sales",
// //       value: totalSales,
// //       icon: IndianRupee
// //     },
// //     {
// //       title:"Total Purchases",
// //       value: totalPurchases,
// //       icon: ShoppingCart
// //     },
// //     {
// //       title:"Customers",
// //       value: customers.length,
// //       icon: TrendingUp
// //     },
// //     {
// //       title:"Low Stock Items",
// //       value: lowStock,
// //       icon: AlertTriangle
// //     },
// //     {
// //       title:"Pending Payments",
// //       value: pendingPayments,
// //       icon: Clock
// //     }
// //   ]

// //   const formatCurrency = (amount:number)=>{
// //     return new Intl.NumberFormat("en-IN",{
// //       style:"currency",
// //       currency:"INR"
// //     }).format(amount)
// //   }

// //   return (

// //     <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

// //       {stats.map((stat)=>{

// //         const Icon = stat.icon

// //         return(

// //           <Card key={stat.title}>

// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <CardTitle className="text-sm text-muted-foreground">
// //                 {stat.title}
// //               </CardTitle>

// //               <Icon className="size-4 text-primary"/>
// //             </CardHeader>

// //             <CardContent>

// //               <div className="text-2xl font-bold">

// //                 {stat.title === "Customers" || stat.title === "Low Stock Items"
// //                   ? stat.value
// //                   : formatCurrency(stat.value)
// //                 }

// //               </div>

// //             </CardContent>

// //           </Card>

// //         )

// //       })}

// //     </div>

// //   )

// // }










// "use client"

// import { useEffect, useState } from "react"
// import {
//   IndianRupee,
//   TrendingUp,
//   ShoppingCart,
//   AlertTriangle,
//   Clock
// } from "lucide-react"

// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

// export function DashboardStats() {

//   const [sales, setSales] = useState<any[]>([])
//   const [purchases, setPurchases] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [customers, setCustomers] = useState<any[]>([])

//   useEffect(() => {
//     loadData()
//   }, [])

//   const loadData = async () => {
//     const s = await fetch("/api/sales")
//     const p = await fetch("/api/purchases")
//     const pr = await fetch("/api/products")
//     const c = await fetch("/api/customers")

//     const salesData = await s.json()
//     const purchaseData = await p.json()
//     const productData = await pr.json()
//     const customerData = await c.json()

//     setSales(Array.isArray(salesData) ? salesData : [])
//     setPurchases(Array.isArray(purchaseData) ? purchaseData : [])
//     setProducts(Array.isArray(productData) ? productData : [])
//     setCustomers(Array.isArray(customerData) ? customerData : [])
//   }

//   const totalSales = (sales || []).reduce((sum, s) => sum + (s.total || 0), 0)
//   const totalPurchases = (purchases || []).reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0)
//   const lowStock = products.filter(p => p.stock < 10).length
//   const pendingPayments = customers.reduce((sum, c) => sum + (c.balance || 0), 0)

//   const stats = [
//     { title: "Total Sales", value: totalSales, icon: IndianRupee },
//     { title: "Total Purchases", value: totalPurchases, icon: ShoppingCart },
//     { title: "Customers", value: customers.length, icon: TrendingUp },
//     { title: "Low Stock Items", value: lowStock, icon: AlertTriangle },
//     { title: "Pending Payments", value: pendingPayments, icon: Clock }
//   ]

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)
//   }

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//       {stats.map((stat) => {
//         const Icon = stat.icon
//         return (
//           <Card key={stat.title} className="py-0">
//             <CardHeader className="flex flex-row items-center justify-between pt-3 pb-1 px-3">
//               <CardTitle className="text-xs text-muted-foreground leading-tight">
//                 {stat.title}
//               </CardTitle>
//               <Icon className="size-3.5 text-primary shrink-0" />
//             </CardHeader>
//             <CardContent className="px-3 pb-3">
//               <div className="text-lg font-bold leading-tight">
//                 {stat.title === "Customers" || stat.title === "Low Stock Items"
//                   ? stat.value
//                   : formatCurrency(stat.value)
//                 }
//               </div>
//             </CardContent>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }





//aravind


// "use client"

// import { useEffect, useState } from "react"
// import { IndianRupee, TrendingUp, ShoppingCart, AlertTriangle, Clock } from "lucide-react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// export function DashboardStats() {
//   const [sales, setSales] = useState<any[]>([])
//   const [purchases, setPurchases] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [customers, setCustomers] = useState<any[]>([])

//   useEffect(() => { loadData() }, [])

//   const loadData = async () => {
//     // ✅ all 4 replaced with authFetch
//     const s = await authFetch("/api/sales")
//     const p = await authFetch("/api/purchases")
//     const pr = await authFetch("/api/products")
//     const c = await authFetch("/api/customers")

//     const salesData = await s.json()
//     const purchaseData = await p.json()
//     const productData = await pr.json()
//     const customerData = await c.json()

//     setSales(Array.isArray(salesData) ? salesData : [])
//     setPurchases(Array.isArray(purchaseData) ? purchaseData : [])
//     setProducts(Array.isArray(productData) ? productData : [])
//     setCustomers(Array.isArray(customerData) ? customerData : [])
//   }

//   const totalSales = sales.reduce((sum, s) => sum + (s.total || 0), 0)
//   const totalPurchases = purchases.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0)
//   const lowStock = products.filter(p => p.stock < 10).length
//   const pendingPayments = customers.reduce((sum, c) => sum + (c.balance || 0), 0)

//   const stats = [
//     { title: "Total Sales", value: totalSales, icon: IndianRupee },
//     { title: "Total Purchases", value: totalPurchases, icon: ShoppingCart },
//     { title: "Customers", value: customers.length, icon: TrendingUp },
//     { title: "Low Stock Items", value: lowStock, icon: AlertTriangle },
//     { title: "Pending Payments", value: pendingPayments, icon: Clock },
//   ]

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
//       {stats.map((stat) => {
//         const Icon = stat.icon
//         return (
//           <Card key={stat.title} className="py-0">
//             <CardHeader className="flex flex-row items-center justify-between pt-3 pb-1 px-3">
//               <CardTitle className="text-xs text-muted-foreground leading-tight">{stat.title}</CardTitle>
//               <Icon className="size-3.5 text-primary shrink-0" />
//             </CardHeader>
//             <CardContent className="px-3 pb-3">
//               <div className="text-lg font-bold leading-tight">
//                 {stat.title === "Customers" || stat.title === "Low Stock Items"
//                   ? stat.value
//                   : formatCurrency(stat.value)
//                 }
//               </div>
//             </CardContent>
//           </Card>
//         )
//       })}
//     </div>
//   )
// }


//// jay

"use client"

import { useEffect, useState } from "react"
import { IndianRupee, TrendingUp, ShoppingCart, AlertTriangle, Clock } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"
import { motion, AnimatePresence } from "framer-motion"

const STAT_CONFIG = [
  { title: "Total Sales",       key: "totalSales",      isCurrency: true,  icon: IndianRupee,   accent: "#1D9E75", sub: "Revenue"        },
  { title: "Total Purchases",   key: "totalPurchases",  isCurrency: true,  icon: ShoppingCart,  accent: "#7F77DD", sub: "Expense"        },
  { title: "Customers",         key: "customers",       isCurrency: false, icon: TrendingUp,    accent: "#378ADD", sub: "Total"          },
  { title: "Low Stock Items",   key: "lowStock",        isCurrency: false, icon: AlertTriangle, accent: "#BA7517", sub: "Below 10 units" },
  { title: "Pending Payments",  key: "pendingPayments", isCurrency: true,  icon: Clock,         accent: "#E24B4A", sub: "Outstanding"    },
]

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.8,
    },
  },
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 30,
    },
  },
} as const

const numberVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 25,
      mass: 0.5,
    },
  },
} as const

export function DashboardStats() {
  const [sales, setSales]         = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])
  const [products, setProducts]   = useState<any[]>([])
  const [customers, setCustomers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [s, p, pr, c] = await Promise.all([
      authFetch("/api/sales"),
      authFetch("/api/purchases"),
      authFetch("/api/products"),
      authFetch("/api/customers"),
    ])
    const [salesData, purchaseData, productData, customerData] = await Promise.all([
      s.json(), p.json(), pr.json(), c.json(),
    ])
    setSales(Array.isArray(salesData) ? salesData : [])
    setPurchases(Array.isArray(purchaseData) ? purchaseData : [])
    setProducts(Array.isArray(productData) ? productData : [])
    setCustomers(Array.isArray(customerData) ? customerData : [])
    setIsLoading(false)
  }

  const values: Record<string, number> = {
    totalSales:      sales.reduce((s, x) => s + (x.total || 0), 0),
    totalPurchases:  purchases.reduce((s, x) => s + (x.price || 0) * (x.quantity || 0), 0),
    customers:       customers.length,
    lowStock:        products.filter(p => p.stock < 10).length,
    pendingPayments: customers.reduce((s, c) => s + (c.balance || 0), 0),
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2"
    >
      <AnimatePresence mode="wait">
        {STAT_CONFIG.map(({ title, key, isCurrency, icon: Icon, accent, sub }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{
                y:-20,
                opacity:0
              }}
            animate={{
              y:0,
              opacity:1,
              transition:{
                duration:0.3,
                delay:0.1 * STAT_CONFIG.findIndex(s => s.key === key)
              }
            }}
            style={{ borderLeft: `3px solid ${accent}` }}
            className="bg-white rounded shadow dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-3 cursor-pointer relative overflow-hidden"
          >
            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}20, transparent)`,
              }}
            />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <motion.p
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-[11px] uppercase tracking-wide text-zinc-400 dark:text-zinc-500 font-medium"
                >
                  {title}
                </motion.p>
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 15,
                    delay: 0.1 
                  }}
                >
                  <Icon size={13} style={{ color: accent }} />
                </motion.div>
              </div>
              
              <motion.p
                variants={numberVariants}
                initial="initial"
                animate="animate"
                key={values[key]} // Trigger animation when value changes
                className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-none"
              >
                {isCurrency ? fmt(values[key]) : values[key].toLocaleString("en-IN")}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[11px] text-zinc-400 dark:text-zinc-600 mt-1.5"
              >
                {sub}
              </motion.p>
            </div>

            {/* Animated pulse effect for low stock items */}
            {key === "lowStock" && values[key] > 0 && (
              <motion.div
                className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Animated pulse effect for pending payments */}
            {key === "pendingPayments" && values[key] > 0 && (
              <motion.div
                className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: accent }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}