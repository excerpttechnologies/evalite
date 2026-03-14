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

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select"
import { Plus, Wallet, Receipt, Zap, Bus, Banknote, Wifi } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch" // ✅

const categoryIcons: Record<string, React.ElementType> = {
  Rent: Wallet,
  Electricity: Zap,
  Transport: Bus,
  Salary: Banknote,
  Maintenance: Receipt,
  Internet: Wifi,
}

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState<any[]>([])
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => { fetchExpenses() }, [])

  const fetchExpenses = async () => {
    const res = await authFetch("/api/expenses") // ✅
    const data = await res.json()
    setExpenses(Array.isArray(data) ? data : [])
  }

  const addExpense = async () => {
    const res = await authFetch("/api/expenses", { // ✅
      method: "POST",
      body: JSON.stringify({
        title: category,
        category,
        amount: Number(amount),
        date,
        note: notes
      })
    })
    const newExpense = await res.json()
    setExpenses([newExpense, ...expenses])
    setCategory("")
    setAmount("")
    setDate("")
    setNotes("")
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

  const totalExpenses = expenses.reduce((sum, e) => sum + (e.amount || 0), 0)

  const now = new Date()

  const thisMonthExpenses = expenses
    .filter((e) => {
      const d = new Date(e.date)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    })
    .reduce((sum, e) => sum + (e.amount || 0), 0)

  const largestExpense = expenses.length > 0
    ? expenses.reduce((max, e) => e.amount > max.amount ? e : max)
    : null

  return (
    <div className="flex flex-col gap-6">

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Total Expenses</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(totalExpenses)}</div>
            <p className="text-xs text-muted-foreground mt-1">{expenses.length} records</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">This Month</div>
            <div className="text-2xl font-bold mt-1">{formatCurrency(thisMonthExpenses)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {now.toLocaleString("default", { month: "long", year: "numeric" })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Largest Expense</div>
            <div className="text-2xl font-bold mt-1">
              {largestExpense ? formatCurrency(largestExpense.amount) : formatCurrency(0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {largestExpense?.category || "No data"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add Expense */}
      <Card>
        <CardHeader><CardTitle>Add Expense</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="flex flex-col gap-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rent">Rent</SelectItem>
                  <SelectItem value="Electricity">Electricity</SelectItem>
                  <SelectItem value="Transport">Transport</SelectItem>
                  <SelectItem value="Salary">Salary</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Internet">Internet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Amount</Label>
              <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Date</Label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Notes</Label>
              <Input value={notes} onChange={e => setNotes(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <Button onClick={addExpense}>
              <Plus className="size-4 mr-1" />Add Expense
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card>
        <CardHeader><CardTitle>Expense Records</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {expenses.map((exp) => {
              const Icon = categoryIcons[exp.category] || Receipt
              return (
                <div key={exp._id} className="flex items-center justify-between border p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="size-4" />
                    <div>
                      <p className="text-sm font-medium">{exp.category}</p>
                      <p className="text-xs text-muted-foreground">{exp.note}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{formatCurrency(exp.amount)}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(exp.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}