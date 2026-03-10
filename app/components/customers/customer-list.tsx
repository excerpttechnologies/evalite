
// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Badge } from "@/app/components/ui/badge"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/app/components/ui/table"
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetDescription,
// } from "@/app/components/ui/sheet"
// import { Separator } from "@/app/components/ui/separator"
// import { Phone, Mail, MapPin } from "lucide-react"

// type Transaction = {
//   invoice: string
//   date: string
//   amount: number
//   status: string
// }

// type Customer = {
//   _id: string
//   name: string
//   phone: string
//   email: string
//   address: string
//   totalPurchases: number
//   balance: number
//   transactions?: Transaction[]
// }

// export function CustomerList() {

//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [selected, setSelected] = useState<Customer | null>(null)

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const fetchCustomers = async () => {
//     try {

//       const res = await fetch("/api/customers")
//       const data = await res.json()

//       if (Array.isArray(data)) {
//         setCustomers(data)
//       } else {
//         setCustomers([])
//       }

//     } catch (error) {
//       console.error("Error fetching customers:", error)
//       setCustomers([])
//     }
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount || 0)
//   }

//   return (
//     <>
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">
//             Customers ({customers.length})
//           </CardTitle>
//         </CardHeader>

//         <CardContent>

//           <Table>

//             <TableHeader>
//               <TableRow>
//                 <TableHead>Customer Name</TableHead>
//                 <TableHead className="hidden sm:table-cell">Phone</TableHead>
//                 <TableHead className="text-right">Total Purchases</TableHead>
//                 <TableHead className="text-right">Outstanding</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>

//               {customers.map((c) => (
//                 <TableRow
//                   key={c._id}
//                   className="cursor-pointer"
//                   onClick={() => setSelected(c)}
//                 >

//                   <TableCell>

//                     <div className="flex items-center gap-3">

//                       <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
//                         {c.name
//                           ?.split(" ")
//                           .map((n) => n[0])
//                           .join("")}
//                       </div>

//                       <div>
//                         <p className="font-medium text-foreground">{c.name}</p>
//                         <p className="text-xs text-muted-foreground sm:hidden">
//                           {c.phone}
//                         </p>
//                       </div>

//                     </div>

//                   </TableCell>

//                   <TableCell className="hidden sm:table-cell text-muted-foreground">
//                     {c.phone}
//                   </TableCell>

//                   <TableCell className="text-right font-medium text-foreground">
//                     {formatCurrency(c.totalPurchases)}
//                   </TableCell>

//                   <TableCell className="text-right">

//                     {c.balance > 0 ? (
//                       <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
//                         {formatCurrency(c.balance)}
//                       </Badge>
//                     ) : (
//                       <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
//                         Clear
//                       </Badge>
//                     )}

//                   </TableCell>

//                 </TableRow>
//               ))}

//             </TableBody>

//           </Table>

//         </CardContent>
//       </Card>

//       <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>

//         <SheetContent className="w-full sm:max-w-md overflow-y-auto">

//           <SheetHeader className="pb-0">
//             <SheetTitle>{selected?.name}</SheetTitle>
//             <SheetDescription>
//               Customer details and transaction history
//             </SheetDescription>
//           </SheetHeader>

//           {selected && (

//             <div className="flex flex-col gap-4 px-4 pb-4">

//               <div className="flex flex-col gap-3">

//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Phone className="size-4" />
//                   {selected.phone}
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Mail className="size-4" />
//                   {selected.email}
//                 </div>

//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <MapPin className="size-4" />
//                   {selected.address}
//                 </div>

//               </div>

//               <div className="grid grid-cols-2 gap-3">

//                 <div className="rounded-lg border p-3 bg-card">
//                   <p className="text-xs text-muted-foreground">Total Purchases</p>
//                   <p className="text-lg font-bold text-foreground mt-1">
//                     {formatCurrency(selected.totalPurchases)}
//                   </p>
//                 </div>

//                 <div className="rounded-lg border p-3 bg-card">
//                   <p className="text-xs text-muted-foreground">Outstanding</p>
//                   <p className="text-lg font-bold text-foreground mt-1">
//                     {formatCurrency(selected.balance)}
//                   </p>
//                 </div>

//               </div>

//               <Separator />

//               <div>
//                 <h4 className="text-sm font-medium text-foreground mb-3">
//                   Transaction History
//                 </h4>

//                 {selected.transactions?.length ? (
//                   selected.transactions.map((tx, i) => (
//                     <div
//                       key={i}
//                       className="flex items-center justify-between rounded-lg border p-3 bg-card mb-2"
//                     >
//                       <div>
//                         <p className="text-sm font-medium text-foreground">
//                           {tx.invoice}
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           {tx.date}
//                         </p>
//                       </div>

//                       <div className="text-right">
//                         <p className="text-sm font-medium text-foreground">
//                           {formatCurrency(tx.amount)}
//                         </p>

//                         <Badge
//                           variant="outline"
//                           className={
//                             tx.status === "Paid"
//                               ? "bg-green-100 text-green-700 border-green-200"
//                               : "bg-yellow-100 text-yellow-700 border-yellow-200"
//                           }
//                         >
//                           {tx.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-muted-foreground">
//                     No transactions yet
//                   </p>
//                 )}

//               </div>

//             </div>

//           )}

//         </SheetContent>

//       </Sheet>
//     </>
//   )
// }










"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/app/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Separator } from "@/app/components/ui/separator"
import { Phone, Mail, MapPin, Plus } from "lucide-react"

type Transaction = {
  invoice: string
  date: string
  amount: number
  status: string
}

type Customer = {
  _id: string
  name: string
  phone: string
  email: string
  address: string
  totalPurchases: number
  balance: number
  transactions?: Transaction[]
}

export function CustomerList() {

  const [customers, setCustomers] = useState<Customer[]>([])
  const [selected, setSelected] = useState<Customer | null>(null)

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/customers")
      const data = await res.json()

      if (Array.isArray(data)) {
        setCustomers(data)
      } else {
        setCustomers([])
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
      setCustomers([])
    }
  }

  const addCustomer = async () => {
    try {

      const res = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          address
        }),
      })

      const newCustomer = await res.json()

      setCustomers([...customers, newCustomer])

      setName("")
      setPhone("")
      setEmail("")
      setAddress("")

    } catch (error) {
      console.error("Error adding customer:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0)
  }

  return (
    <>
      <Card>

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle className="text-base">
            Customers ({customers.length})
          </CardTitle>

          <Dialog>

            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="size-4 mr-1" />
                Add Customer
              </Button>
            </DialogTrigger>

            <DialogContent>

              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
              </DialogHeader>

              <div className="flex flex-col gap-3 py-3">

                <Input
                  placeholder="Customer Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />

                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <Button onClick={addCustomer}>
                  Save Customer
                </Button>

              </div>

            </DialogContent>

          </Dialog>

        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                <TableHead className="text-right">Total Purchases</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {customers.map((c) => (
                <TableRow
                  key={c._id}
                  className="cursor-pointer"
                  onClick={() => setSelected(c)}
                >

                  <TableCell>

                    <div className="flex items-center gap-3">

                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {c.name?.split(" ").map((n) => n[0]).join("")}
                      </div>

                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">
                          {c.phone}
                        </p>
                      </div>

                    </div>

                  </TableCell>

                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {c.phone}
                  </TableCell>

                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(c.totalPurchases)}
                  </TableCell>

                  <TableCell className="text-right">

                    {c.balance > 0 ? (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                        {formatCurrency(c.balance)}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                        Clear
                      </Badge>
                    )}

                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

        </CardContent>

      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>

        <SheetContent className="w-full sm:max-w-md overflow-y-auto">

          <SheetHeader className="pb-0">
            <SheetTitle>{selected?.name}</SheetTitle>
            <SheetDescription>
              Customer details and transaction history
            </SheetDescription>
          </SheetHeader>

          {selected && (

            <div className="flex flex-col gap-4 px-4 pb-4">

              <div className="flex flex-col gap-3">

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="size-4" />
                  {selected.phone}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="size-4" />
                  {selected.email}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="size-4" />
                  {selected.address}
                </div>

              </div>

              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-lg border p-3 bg-card">
                  <p className="text-xs text-muted-foreground">Total Purchases</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {formatCurrency(selected.totalPurchases)}
                  </p>
                </div>

                <div className="rounded-lg border p-3 bg-card">
                  <p className="text-xs text-muted-foreground">Outstanding</p>
                  <p className="text-lg font-bold text-foreground mt-1">
                    {formatCurrency(selected.balance)}
                  </p>
                </div>

              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">
                  Transaction History
                </h4>

                {selected.transactions?.length ? (
                  selected.transactions.map((tx, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border p-3 bg-card mb-2"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {tx.invoice}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {tx.date}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          {formatCurrency(tx.amount)}
                        </p>

                        <Badge
                          variant="outline"
                          className={
                            tx.status === "Paid"
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-yellow-100 text-yellow-700 border-yellow-200"
                          }
                        >
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No transactions yet
                  </p>
                )}

              </div>

            </div>

          )}

        </SheetContent>

      </Sheet>
    </>
  )
}