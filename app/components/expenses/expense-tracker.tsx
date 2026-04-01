// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { Badge } from "@/app/components/ui/badge"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select"

// import { Plus, Wallet, Receipt, Zap, Bus, Banknote, Wifi } from "lucide-react"

// const categoryIcons: Record<string, React.ElementType> = {
//   Rent: Wallet,
//   Electricity: Zap,
//   Transport: Bus,
//   Salary: Banknote,
//   Maintenance: Receipt,
//   Internet: Wifi,
// }

// export function ExpenseTracker() {

//   const [expenses, setExpenses] = useState<any[]>([])

//   const [category, setCategory] = useState("")
//   const [amount, setAmount] = useState("")
//   const [date, setDate] = useState("")
//   const [notes, setNotes] = useState("")

//   useEffect(() => {
//     fetchExpenses()
//   }, [])

//   const fetchExpenses = async () => {

//     const res = await fetch("/api/expenses")
//     const data = await res.json()

//     if (Array.isArray(data)) {
//       setExpenses(data)
//     } else {
//       setExpenses([])
//     }

//   }

//   const addExpense = async () => {

//     const res = await fetch("/api/expenses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         title: category,
//         category,
//         amount: Number(amount),
//         date,
//         note: notes
//       })
//     })

//     const newExpense = await res.json()

//     setExpenses([newExpense, ...expenses])

//     setCategory("")
//     setAmount("")
//     setDate("")
//     setNotes("")

//   }

//   const formatCurrency = (amount: number) => {

//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount)

//   }

//   const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0)

//   return (

//     <div className="flex flex-col gap-6">

//       {/* Stats */}

//       <Card>

//         <CardContent className="pt-6">

//           <div className="text-sm text-muted-foreground">
//             Total Expenses
//           </div>

//           <div className="text-2xl font-bold mt-1">
//             {formatCurrency(totalExpenses)}
//           </div>

//           <p className="text-xs text-muted-foreground mt-1">
//             {expenses.length} records
//           </p>

//         </CardContent>

//       </Card>

//       {/* Add Expense */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Add Expense</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <div className="grid gap-4 sm:grid-cols-4">

//             <div className="flex flex-col gap-1.5">

//               <Label>Category</Label>

//               <Select value={category} onValueChange={setCategory}>

//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category"/>
//                 </SelectTrigger>

//                 <SelectContent>

//                   <SelectItem value="Rent">Rent</SelectItem>
//                   <SelectItem value="Electricity">Electricity</SelectItem>
//                   <SelectItem value="Transport">Transport</SelectItem>
//                   <SelectItem value="Salary">Salary</SelectItem>
//                   <SelectItem value="Maintenance">Maintenance</SelectItem>
//                   <SelectItem value="Internet">Internet</SelectItem>

//                 </SelectContent>

//               </Select>

//             </div>

//             <div className="flex flex-col gap-1.5">

//               <Label>Amount</Label>

//               <Input
//                 type="number"
//                 value={amount}
//                 onChange={(e)=>setAmount(e.target.value)}
//               />

//             </div>

//             <div className="flex flex-col gap-1.5">

//               <Label>Date</Label>

//               <Input
//                 type="date"
//                 value={date}
//                 onChange={(e)=>setDate(e.target.value)}
//               />

//             </div>

//             <div className="flex flex-col gap-1.5">

//               <Label>Notes</Label>

//               <Input
//                 value={notes}
//                 onChange={(e)=>setNotes(e.target.value)}
//               />

//             </div>

//           </div>

//           <div className="mt-4">

//             <Button onClick={addExpense}>

//               <Plus className="size-4 mr-1"/>

//               Add Expense

//             </Button>

//           </div>

//         </CardContent>

//       </Card>

//       {/* Expense List */}

//       <Card>

//         <CardHeader>

//           <CardTitle>Expense Records</CardTitle>

//         </CardHeader>

//         <CardContent>

//           <div className="flex flex-col gap-2">

//             {expenses.map((exp)=>{

//               const Icon = categoryIcons[exp.category] || Receipt

//               return(

//                 <div
//                   key={exp._id}
//                   className="flex items-center justify-between border p-3 rounded-lg"
//                 >

//                   <div className="flex items-center gap-3">

//                     <Icon className="size-4"/>

//                     <div>

//                       <p className="text-sm font-medium">
//                         {exp.category}
//                       </p>

//                       <p className="text-xs text-muted-foreground">
//                         {exp.note}
//                       </p>

//                     </div>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-sm font-bold">
//                       {formatCurrency(exp.amount)}
//                     </p>

//                     <p className="text-xs text-muted-foreground">
//                       {new Date(exp.date).toLocaleDateString()}
//                     </p>

//                   </div>

//                 </div>

//               )

//             })}

//           </div>

//         </CardContent>

//       </Card>

//     </div>

//   )

// }






















// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import { Badge } from "@/app/components/ui/badge"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select"

// import { Plus, Wallet, Receipt, Zap, Bus, Banknote, Wifi } from "lucide-react"

// const categoryIcons: Record<string, React.ElementType> = {
//   Rent: Wallet,
//   Electricity: Zap,
//   Transport: Bus,
//   Salary: Banknote,
//   Maintenance: Receipt,
//   Internet: Wifi,
// }

// export function ExpenseTracker() {

//   const [expenses, setExpenses] = useState<any[]>([])

//   const [category, setCategory] = useState("")
//   const [amount, setAmount] = useState("")
//   const [date, setDate] = useState("")
//   const [notes, setNotes] = useState("")

//   useEffect(() => {
//     fetchExpenses()
//   }, [])

//   const fetchExpenses = async () => {

//     const res = await fetch("/api/expenses")
//     const data = await res.json()

//     if (Array.isArray(data)) {
//       setExpenses(data)
//     } else {
//       setExpenses([])
//     }

//   }

//   const addExpense = async () => {

//     const res = await fetch("/api/expenses", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         title: category,
//         category,
//         amount: Number(amount),
//         date,
//         note: notes
//       })
//     })

//     const newExpense = await res.json()

//     setExpenses([newExpense, ...expenses])

//     setCategory("")
//     setAmount("")
//     setDate("")
//     setNotes("")
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR"
//     }).format(amount)
//   }

//   /* ------------------ Stats Calculations ------------------ */

//   const totalExpenses = expenses.reduce(
//     (sum, e) => sum + (e.amount || 0),
//     0
//   )

//   const now = new Date()

//   const thisMonthExpenses = expenses
//     .filter((e) => {
//       const d = new Date(e.date)
//       return (
//         d.getMonth() === now.getMonth() &&
//         d.getFullYear() === now.getFullYear()
//       )
//     })
//     .reduce((sum, e) => sum + (e.amount || 0), 0)

//   const largestExpense =
//     expenses.length > 0
//       ? expenses.reduce((max, e) =>
//           e.amount > max.amount ? e : max
//         )
//       : null

//   /* -------------------------------------------------------- */

//   return (

//     <div className="flex flex-col gap-6">

//       {/* Stats Cards */}

//       <div className="grid gap-4 sm:grid-cols-3">

//         <Card>
//           <CardContent className="pt-6">

//             <div className="text-sm text-muted-foreground">
//               Total Expenses
//             </div>

//             <div className="text-2xl font-bold mt-1">
//               {formatCurrency(totalExpenses)}
//             </div>

//             <p className="text-xs text-muted-foreground mt-1">
//               {expenses.length} records
//             </p>

//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">

//             <div className="text-sm text-muted-foreground">
//               This Month
//             </div>

//             <div className="text-2xl font-bold mt-1">
//               {formatCurrency(thisMonthExpenses)}
//             </div>

//             <p className="text-xs text-muted-foreground mt-1">
//               {now.toLocaleString("default", { month: "long", year: "numeric" })}
//             </p>

//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">

//             <div className="text-sm text-muted-foreground">
//               Largest Expense
//             </div>

//             <div className="text-2xl font-bold mt-1">
//               {largestExpense
//                 ? formatCurrency(largestExpense.amount)
//                 : formatCurrency(0)}
//             </div>

//             <p className="text-xs text-muted-foreground mt-1">
//               {largestExpense?.category || "No data"}
//             </p>

//           </CardContent>
//         </Card>

//       </div>

//       {/* Add Expense */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Add Expense</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <div className="grid gap-4 sm:grid-cols-4">

//             <div className="flex flex-col gap-1.5">

//               <Label>Category</Label>

//               <Select value={category} onValueChange={setCategory}>

//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category"/>
//                 </SelectTrigger>

//                 <SelectContent>

//                   <SelectItem value="Rent">Rent</SelectItem>
//                   <SelectItem value="Electricity">Electricity</SelectItem>
//                   <SelectItem value="Transport">Transport</SelectItem>
//                   <SelectItem value="Salary">Salary</SelectItem>
//                   <SelectItem value="Maintenance">Maintenance</SelectItem>
//                   <SelectItem value="Internet">Internet</SelectItem>

//                 </SelectContent>

//               </Select>

//             </div>

//             <div className="flex flex-col gap-1.5">

//               <Label>Amount</Label>

//               <Input
//                 type="number"
//                 value={amount}
//                 onChange={(e)=>setAmount(e.target.value)}
//               />

//             </div>

//             <div className="flex flex-col gap-1.5">

//               <Label>Date</Label>

//               <Input
//                 type="date"
//                 value={date}
//                 onChange={(e)=>setDate(e.target.value)}
//               />

//             </div>

//             <div className="flex flex-col gap-1.5">

//               <Label>Notes</Label>

//               <Input
//                 value={notes}
//                 onChange={(e)=>setNotes(e.target.value)}
//               />

//             </div>

//           </div>

//           <div className="mt-4">

//             <Button onClick={addExpense}>
//               <Plus className="size-4 mr-1"/>
//               Add Expense
//             </Button>

//           </div>

//         </CardContent>

//       </Card>

//       {/* Expense List */}

//       <Card>

//         <CardHeader>
//           <CardTitle>Expense Records</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <div className="flex flex-col gap-2">

//             {expenses.map((exp)=>{

//               const Icon = categoryIcons[exp.category] || Receipt

//               return(

//                 <div
//                   key={exp._id}
//                   className="flex items-center justify-between border p-3 rounded-lg"
//                 >

//                   <div className="flex items-center gap-3">

//                     <Icon className="size-4"/>

//                     <div>

//                       <p className="text-sm font-medium">
//                         {exp.category}
//                       </p>

//                       <p className="text-xs text-muted-foreground">
//                         {exp.note}
//                       </p>

//                     </div>

//                   </div>

//                   <div className="text-right">

//                     <p className="text-sm font-bold">
//                       {formatCurrency(exp.amount)}
//                     </p>

//                     <p className="text-xs text-muted-foreground">
//                       {new Date(exp.date).toLocaleDateString()}
//                     </p>

//                   </div>

//                 </div>

//               )

//             })}

//           </div>

//         </CardContent>

//       </Card>

//     </div>

//   )

// }






//aravinf

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/app/components/ui/select"
// import { Plus, Wallet, Receipt, Zap, Bus, Banknote, Wifi } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// const categoryIcons: Record<string, React.ElementType> = {
//   Rent: Wallet,
//   Electricity: Zap,
//   Transport: Bus,
//   Salary: Banknote,
//   Maintenance: Receipt,
//   Internet: Wifi,
// }

// export function ExpenseTracker() {
//   const [expenses, setExpenses] = useState<any[]>([])
//   const [category, setCategory] = useState("")
//   const [amount, setAmount] = useState("")
//   const [date, setDate] = useState("")
//   const [notes, setNotes] = useState("")

//   useEffect(() => { fetchExpenses() }, [])

//   const fetchExpenses = async () => {
//     const res = await authFetch("/api/expenses") // ✅
//     const data = await res.json()
//     setExpenses(Array.isArray(data) ? data : [])
//   }

//   const addExpense = async () => {
//     const res = await authFetch("/api/expenses", { // ✅
//       method: "POST",
//       body: JSON.stringify({
//         title: category,
//         category,
//         amount: Number(amount),
//         date,
//         note: notes
//       })
//     })
//     const newExpense = await res.json()
//     setExpenses([newExpense, ...expenses])
//     setCategory("")
//     setAmount("")
//     setDate("")
//     setNotes("")
//   }

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0)

//   const now = new Date()

//   const thisMonthExpenses = expenses
//     .filter((e) => {
//       const d = new Date(e.date)
//       return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
//     })
//     .reduce((sum, e) => sum + (e.amount || 0), 0)

//   const largestExpense = expenses.length > 0
//     ? expenses.reduce((max, e) => e.amount > max.amount ? e : max)
//     : null

//   return (
//     <div className="flex flex-col gap-6">

//       {/* Stats Cards */}
//       <div className="grid gap-4 sm:grid-cols-3">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-sm text-muted-foreground">Total Expenses</div>
//             <div className="text-2xl font-bold mt-1">{formatCurrency(totalExpenses)}</div>
//             <p className="text-xs text-muted-foreground mt-1">{expenses.length} records</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-sm text-muted-foreground">This Month</div>
//             <div className="text-2xl font-bold mt-1">{formatCurrency(thisMonthExpenses)}</div>
//             <p className="text-xs text-muted-foreground mt-1">
//               {now.toLocaleString("default", { month: "long", year: "numeric" })}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="text-sm text-muted-foreground">Largest Expense</div>
//             <div className="text-2xl font-bold mt-1">
//               {largestExpense ? formatCurrency(largestExpense.amount) : formatCurrency(0)}
//             </div>
//             <p className="text-xs text-muted-foreground mt-1">
//               {largestExpense?.category || "No data"}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Add Expense */}
//       <Card>
//         <CardHeader><CardTitle>Add Expense</CardTitle></CardHeader>
//         <CardContent>
//           <div className="grid gap-4 sm:grid-cols-4">
//             <div className="flex flex-col gap-1.5">
//               <Label>Category</Label>
//               <Select value={category} onValueChange={setCategory}>
//                 <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Rent">Rent</SelectItem>
//                   <SelectItem value="Electricity">Electricity</SelectItem>
//                   <SelectItem value="Transport">Transport</SelectItem>
//                   <SelectItem value="Salary">Salary</SelectItem>
//                   <SelectItem value="Maintenance">Maintenance</SelectItem>
//                   <SelectItem value="Internet">Internet</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Amount</Label>
//               <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Date</Label>
//               <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Notes</Label>
//               <Input value={notes} onChange={e => setNotes(e.target.value)} />
//             </div>
//           </div>

//           <div className="mt-4">
//             <Button onClick={addExpense}>
//               <Plus className="size-4 mr-1" />Add Expense
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Expense List */}
//       <Card>
//         <CardHeader><CardTitle>Expense Records</CardTitle></CardHeader>
//         <CardContent>
//           <div className="flex flex-col gap-2">
//             {expenses.map((exp) => {
//               const Icon = categoryIcons[exp.category] || Receipt
//               return (
//                 <div key={exp._id} className="flex items-center justify-between border p-3 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <Icon className="size-4" />
//                     <div>
//                       <p className="text-sm font-medium">{exp.category}</p>
//                       <p className="text-xs text-muted-foreground">{exp.note}</p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm font-bold">{formatCurrency(exp.amount)}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {new Date(exp.date).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   )
// }


////jay

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select"
import { Plus, Wallet, Receipt, Zap, Bus, Banknote, Wifi, TrendingUp, Calendar, ArrowUpRight } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"

const categoryIcons: Record<string, React.ElementType> = {
  Rent: Wallet,
  Electricity: Zap,
  Transport: Bus,
  Salary: Banknote,
  Maintenance: Receipt,
  Internet: Wifi,
}

const categoryColors: Record<string, string> = {
  Rent:        "bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-300",
  Electricity: "bg-amber-100  text-amber-600  dark:bg-amber-900/40  dark:text-amber-300",
  Transport:   "bg-sky-100    text-sky-600    dark:bg-sky-900/40    dark:text-sky-300",
  Salary:      "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300",
  Maintenance: "bg-rose-100   text-rose-600   dark:bg-rose-900/40   dark:text-rose-300",
  Internet:    "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300",
}

// ─── Animation variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const fadeUp:Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const listItem:Variants = {
  hidden: { opacity: 0, x: -16, scale: 0.97 },
  show:   { opacity: 1, x: 0,   scale: 1,    transition: { duration: 0.35, ease: "easeOut" } },
  exit:   { opacity: 0, x: 20,  scale: 0.96, transition: { duration: 0.25 } },
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ExpenseTracker() {
  const [expenses, setExpenses]   = useState<any[]>([])
  const [category, setCategory]   = useState("")
  const [amount, setAmount]       = useState("")
  const [date, setDate]           = useState("")
  const [notes, setNotes]         = useState("")
  const [loading, setLoading]     = useState(false)

  useEffect(() => { fetchExpenses() }, [])

  const fetchExpenses = async () => {
    try {
      const res  = await authFetch("/api/expenses")
      const data = await res.json()
      setExpenses(Array.isArray(data) ? data : [])
    } catch {
      toast.error("Failed to load expenses")
    }
  }

  const addExpense = async () => {
    if (!category || !amount || !date) {
      toast.error("Please fill in category, amount and date")
      return
    }
    setLoading(true)
    try {
      const res = await authFetch("/api/expenses", {
        method: "POST",
        body: JSON.stringify({
          title: category,
          category,
          amount: Number(amount),
          date,
          note: notes,
        }),
      })
      const newExpense = await res.json()
      setExpenses(prev => [newExpense, ...prev])
      setCategory("")
      setAmount("")
      setDate("")
      setNotes("")
      toast.success("Expense added!", { icon: "💸" })
    } catch {
      toast.error("Could not add expense")
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amt: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amt)

  const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0)

  const now = new Date()
  const thisMonthExpenses = expenses
    .filter(e => {
      const d = new Date(e.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((s, e) => s + (e.amount || 0), 0)

  const largestExpense = expenses.length > 0
    ? expenses.reduce((max, e) => e.amount > max.amount ? e : max)
    : null

  const stats = [
    {
      label: "Total Expenses",
      value: formatCurrency(totalExpenses),
      sub:   `${expenses.length} records`,
      icon:  TrendingUp,
      color: "text-violet-500",
      bg:    "bg-violet-50 dark:bg-violet-900/20",
    },
    {
      label: "This Month",
      value: formatCurrency(thisMonthExpenses),
      sub:   now.toLocaleString("default", { month: "long", year: "numeric" }),
      icon:  Calendar,
      color: "text-sky-500",
      bg:    "bg-sky-50 dark:bg-sky-900/20",
    },
    {
      label: "Largest Expense",
      value: largestExpense ? formatCurrency(largestExpense.amount) : formatCurrency(0),
      sub:   largestExpense?.category || "No data",
      icon:  ArrowUpRight,
      color: "text-rose-500",
      bg:    "bg-rose-50 dark:bg-rose-900/20",
    },
  ]

  return (
    <>
      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
          },
        }}
      />

      <motion.div
        className="flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* ── Stats ── */}
        <div className="grid gap-3 sm:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <Card className="rounded shadow-sm border-0 ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
                <CardContent className="px-4">
                  <div className="flex items-start justify-between gap-1.5">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                      <p className="text-xl font-bold tracking-tight mt-0.5">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                    </div>
                    <span className={`p-2 rounded-sm ${s.bg}`}>
                      <s.icon className={`size-4 ${s.color}`} />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ── Add Expense ── */}
        <motion.div variants={fadeUp}>
          <Card className="rounded shadow-sm border-0 ring-1 ring-black/5 dark:ring-white/10">
            <CardHeader className="px-3  pb-0">
              <CardTitle className="text-sm font-semibold tracking-tight">Add Expense</CardTitle>
            </CardHeader>
            <CardContent className="px-3 -mt-4">
              <div className="grid gap-3 sm:grid-cols-4">
                {/* Category */}
                <div className="flex flex-col   gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="rounded-sm h-9  w-full text-sm shadow-none border ring-1 ring-black/10 focus:ring-2 focus:ring-violet-400 transition-shadow">
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm">
                      {Object.keys(categoryIcons).map(c => (
                        <SelectItem key={c} value={c} className="text-sm">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Amount (₹)</Label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="rounded-sm h-9 text-sm shadow-none ring-1 ring-black/10 border focus:ring-2 focus:ring-violet-400 transition-shadow"
                  />
                </div>

                {/* Date */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Date</Label>
                  <Input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="rounded-sm h-9 text-sm shadow-none ring-1 ring-black/10 border focus:ring-2 focus:ring-violet-400 transition-shadow"
                  />
                </div>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Notes</Label>
                  <Input
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Optional note…"
                    className="rounded-sm h-9 text-sm shadow-none ring-1 ring-black/10 border focus:ring-2 focus:ring-violet-400 transition-shadow"
                  />
                </div>
              </div>

              <div className="mt-3">
                <motion.div whileTap={{ scale: 0.97 }} whileHover={{ scale: 1 }}>
                  <Button
                    onClick={addExpense}
                    disabled={loading}
                    className="rounded h-9 text-sm px-4 gap-1.5 text-white shadow-sm transition-colors"
                  >
                    <Plus className="size-3.5" />
                    {loading ? "Adding…" : "Add Expense"}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Expense Records ── */}
        <motion.div variants={fadeUp}>
          <Card className="rounded shadow-sm border-0 ring-1 ring-black/5 dark:ring-white/10">
            <CardHeader className="px-3  pb-0">
              <CardTitle className="text-sm font-semibold tracking-tight">Expense Records</CardTitle>
            </CardHeader>
            <CardContent className="p-2.5">
              {expenses.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground text-center py-6"
                >
                  No expenses yet. Add your first one above ↑
                </motion.p>
              ) : (
                <div className="flex flex-col gap-2">
                  <AnimatePresence initial={false}>
                    {expenses.map(exp => {
                      const Icon    = categoryIcons[exp.category] || Receipt
                      const colors  = categoryColors[exp.category] || "bg-zinc-100 text-zinc-600"
                      return (
                        <motion.div
                          key={exp._id}
                          variants={listItem}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          layout
                          className="flex items-center justify-between rounded p-2.5 shadow-sm ring-1 ring-black/5 dark:ring-white/8 bg-white dark:bg-zinc-900/60 gap-3 hover:ring-orange-300 dark:hover:ring-violet-600 transition-shadow"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`flex-shrink-0 p-2 rounded-sm ${colors}`}>
                              <Icon className="size-3.5" />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium leading-tight truncate">{exp.category}</p>
                              {exp.note && (
                                <p className="text-xs text-muted-foreground truncate">{exp.note}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-bold">{formatCurrency(exp.amount)}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(exp.date).toLocaleDateString("en-IN", {
                                day:   "2-digit",
                                month: "short",
                                year:  "numeric",
                              })}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  )
}