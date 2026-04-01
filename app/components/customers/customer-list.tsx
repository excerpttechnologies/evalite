






// // "use client"

// // import { useState, useEffect } from "react"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// // import { Badge } from "@/app/components/ui/badge"
// // import { Button } from "@/app/components/ui/button"
// // import { Input } from "@/app/components/ui/input"
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/app/components/ui/table"
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// //   SheetDescription,
// // } from "@/app/components/ui/sheet"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/app/components/ui/dialog"
// // import { Separator } from "@/app/components/ui/separator"
// // import { Phone, Mail, MapPin, Plus } from "lucide-react"

// // type Transaction = {
// //   invoice: string
// //   date: string
// //   amount: number
// //   status: string
// // }

// // type Customer = {
// //   _id: string
// //   name: string
// //   phone: string
// //   email: string
// //   address: string
// //   totalPurchases: number
// //   balance: number
// //   transactions?: Transaction[]
// // }

// // export function CustomerList() {

// //   const [customers, setCustomers] = useState<Customer[]>([])
// //   const [selected, setSelected] = useState<Customer | null>(null)

// //   const [name, setName] = useState("")
// //   const [phone, setPhone] = useState("")
// //   const [email, setEmail] = useState("")
// //   const [address, setAddress] = useState("")

// //   useEffect(() => {
// //     fetchCustomers()
// //   }, [])

// //   const fetchCustomers = async () => {
// //     try {
// //       const res = await fetch("/api/customers")
// //       const data = await res.json()

// //       if (Array.isArray(data)) {
// //         setCustomers(data)
// //       } else {
// //         setCustomers([])
// //       }
// //     } catch (error) {
// //       console.error("Error fetching customers:", error)
// //       setCustomers([])
// //     }
// //   }

// //   const addCustomer = async () => {
// //     try {

// //       const res = await fetch("/api/customers", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           name,
// //           phone,
// //           email,
// //           address
// //         }),
// //       })

// //       const newCustomer = await res.json()

// //       setCustomers([...customers, newCustomer])

// //       setName("")
// //       setPhone("")
// //       setEmail("")
// //       setAddress("")

// //     } catch (error) {
// //       console.error("Error adding customer:", error)
// //     }
// //   }

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat("en-IN", {
// //       style: "currency",
// //       currency: "INR",
// //     }).format(amount || 0)
// //   }

// //   return (
// //     <>
// //       <Card>

// //         <CardHeader className="flex flex-row items-center justify-between">

// //           <CardTitle className="text-base">
// //             Customers ({customers.length})
// //           </CardTitle>

// //           <Dialog>

// //             <DialogTrigger asChild>
// //               <Button size="sm">
// //                 <Plus className="size-4 mr-1" />
// //                 Add Customer
// //               </Button>
// //             </DialogTrigger>

// //             <DialogContent>

// //               <DialogHeader>
// //                 <DialogTitle>Add New Customer</DialogTitle>
// //               </DialogHeader>

// //               <div className="flex flex-col gap-3 py-3">

// //                 <Input
// //                   placeholder="Customer Name"
// //                   value={name}
// //                   onChange={(e) => setName(e.target.value)}
// //                 />

// //                 <Input
// //                   placeholder="Phone"
// //                   value={phone}
// //                   onChange={(e) => setPhone(e.target.value)}
// //                 />

// //                 <Input
// //                   placeholder="Email"
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                 />

// //                 <Input
// //                   placeholder="Address"
// //                   value={address}
// //                   onChange={(e) => setAddress(e.target.value)}
// //                 />

// //                 <Button onClick={addCustomer}>
// //                   Save Customer
// //                 </Button>

// //               </div>

// //             </DialogContent>

// //           </Dialog>

// //         </CardHeader>

// //         <CardContent>

// //           <Table>

// //             <TableHeader>
// //               <TableRow>
// //                 <TableHead>Customer Name</TableHead>
// //                 <TableHead className="hidden sm:table-cell">Phone</TableHead>
// //                 <TableHead className="text-right">Total Purchases</TableHead>
// //                 <TableHead className="text-right">Outstanding</TableHead>
// //               </TableRow>
// //             </TableHeader>

// //             <TableBody>

// //               {customers.map((c) => (
// //                 <TableRow
// //                   key={c._id}
// //                   className="cursor-pointer"
// //                   onClick={() => setSelected(c)}
// //                 >

// //                   <TableCell>

// //                     <div className="flex items-center gap-3">

// //                       <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
// //                         {c.name?.split(" ").map((n) => n[0]).join("")}
// //                       </div>

// //                       <div>
// //                         <p className="font-medium text-foreground">{c.name}</p>
// //                         <p className="text-xs text-muted-foreground sm:hidden">
// //                           {c.phone}
// //                         </p>
// //                       </div>

// //                     </div>

// //                   </TableCell>

// //                   <TableCell className="hidden sm:table-cell text-muted-foreground">
// //                     {c.phone}
// //                   </TableCell>

// //                   <TableCell className="text-right font-medium text-foreground">
// //                     {formatCurrency(c.totalPurchases)}
// //                   </TableCell>

// //                   <TableCell className="text-right">

// //                     {c.balance > 0 ? (
// //                       <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
// //                         {formatCurrency(c.balance)}
// //                       </Badge>
// //                     ) : (
// //                       <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
// //                         Clear
// //                       </Badge>
// //                     )}

// //                   </TableCell>

// //                 </TableRow>
// //               ))}

// //             </TableBody>

// //           </Table>

// //         </CardContent>

// //       </Card>

// //       <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>

// //         <SheetContent className="w-full sm:max-w-md overflow-y-auto">

// //           <SheetHeader className="pb-0">
// //             <SheetTitle>{selected?.name}</SheetTitle>
// //             <SheetDescription>
// //               Customer details and transaction history
// //             </SheetDescription>
// //           </SheetHeader>

// //           {selected && (

// //             <div className="flex flex-col gap-4 px-4 pb-4">

// //               <div className="flex flex-col gap-3">

// //                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                   <Phone className="size-4" />
// //                   {selected.phone}
// //                 </div>

// //                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                   <Mail className="size-4" />
// //                   {selected.email}
// //                 </div>

// //                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                   <MapPin className="size-4" />
// //                   {selected.address}
// //                 </div>

// //               </div>

// //               <div className="grid grid-cols-2 gap-3">

// //                 <div className="rounded-lg border p-3 bg-card">
// //                   <p className="text-xs text-muted-foreground">Total Purchases</p>
// //                   <p className="text-lg font-bold text-foreground mt-1">
// //                     {formatCurrency(selected.totalPurchases)}
// //                   </p>
// //                 </div>

// //                 <div className="rounded-lg border p-3 bg-card">
// //                   <p className="text-xs text-muted-foreground">Outstanding</p>
// //                   <p className="text-lg font-bold text-foreground mt-1">
// //                     {formatCurrency(selected.balance)}
// //                   </p>
// //                 </div>

// //               </div>

// //               <Separator />

// //               <div>
// //                 <h4 className="text-sm font-medium text-foreground mb-3">
// //                   Transaction History
// //                 </h4>

// //                 {selected.transactions?.length ? (
// //                   selected.transactions.map((tx, i) => (
// //                     <div
// //                       key={i}
// //                       className="flex items-center justify-between rounded-lg border p-3 bg-card mb-2"
// //                     >
// //                       <div>
// //                         <p className="text-sm font-medium text-foreground">
// //                           {tx.invoice}
// //                         </p>
// //                         <p className="text-xs text-muted-foreground">
// //                           {tx.date}
// //                         </p>
// //                       </div>

// //                       <div className="text-right">
// //                         <p className="text-sm font-medium text-foreground">
// //                           {formatCurrency(tx.amount)}
// //                         </p>

// //                         <Badge
// //                           variant="outline"
// //                           className={
// //                             tx.status === "Paid"
// //                               ? "bg-green-100 text-green-700 border-green-200"
// //                               : "bg-yellow-100 text-yellow-700 border-yellow-200"
// //                           }
// //                         >
// //                           {tx.status}
// //                         </Badge>
// //                       </div>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p className="text-sm text-muted-foreground">
// //                     No transactions yet
// //                   </p>
// //                 )}

// //               </div>

// //             </div>

// //           )}

// //         </SheetContent>

// //       </Sheet>
// //     </>
// //   )
// // }












// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Badge } from "@/app/components/ui/badge"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Separator } from "@/app/components/ui/separator"
// import { Phone, Mail, MapPin, Plus, Pencil, Trash2 } from "lucide-react"

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

//   // Add form
//   const [addOpen, setAddOpen] = useState(false)
//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [email, setEmail] = useState("")
//   const [address, setAddress] = useState("")

//   // Edit form
//   const [editOpen, setEditOpen] = useState(false)
//   const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editPhone, setEditPhone] = useState("")
//   const [editEmail, setEditEmail] = useState("")
//   const [editAddress, setEditAddress] = useState("")

//   // Delete confirm
//   const [deleteId, setDeleteId] = useState<string | null>(null)
//   const [deleteOpen, setDeleteOpen] = useState(false)

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const fetchCustomers = async () => {
//     try {
//       const res = await fetch("/api/customers")
//       const data = await res.json()
//       setCustomers(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Error fetching customers:", error)
//       setCustomers([])
//     }
//   }

//   // ── ADD ──
//   const addCustomer = async () => {
//     if (!name) { alert("Name is required"); return }
//     try {
//       const res = await fetch("/api/customers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, phone, email, address }),
//       })
//       const newCustomer = await res.json()
//       setCustomers([...customers, newCustomer])
//       setName(""); setPhone(""); setEmail(""); setAddress("")
//       setAddOpen(false)
//     } catch (error) {
//       console.error("Error adding customer:", error)
//     }
//   }

//   // ── OPEN EDIT ──
//   const openEdit = (c: Customer, e: React.MouseEvent) => {
//     e.stopPropagation() // prevent row click opening sheet
//     setEditCustomer(c)
//     setEditName(c.name)
//     setEditPhone(c.phone)
//     setEditEmail(c.email)
//     setEditAddress(c.address)
//     setEditOpen(true)
//   }

//   // ── SAVE EDIT ──
//   const saveEdit = async () => {
//     if (!editCustomer) return
//     if (!editName) { alert("Name is required"); return }
//     try {
//       const res = await fetch(`/api/customers/${editCustomer._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: editName,
//           phone: editPhone,
//           email: editEmail,
//           address: editAddress,
//         }),
//       })
//       if (!res.ok) { alert("Failed to update customer"); return }
//       const updated = await res.json()
//       setCustomers(customers.map(c => c._id === updated._id ? updated : c))
//       // update sheet if open
//       if (selected?._id === updated._id) setSelected(updated)
//       setEditOpen(false)
//       setEditCustomer(null)
//     } catch (error) {
//       console.error("Error updating customer:", error)
//     }
//   }

//   // ── DELETE ──
//   const confirmDelete = (id: string, e: React.MouseEvent) => {
//     e.stopPropagation() // prevent row click opening sheet
//     setDeleteId(id)
//     setDeleteOpen(true)
//   }

//   const deleteCustomer = async () => {
//     if (!deleteId) return
//     try {
//       const res = await fetch(`/api/customers/${deleteId}`, { method: "DELETE" })
//       if (!res.ok) { alert("Failed to delete customer"); return }
//       setCustomers(customers.filter(c => c._id !== deleteId))
//       if (selected?._id === deleteId) setSelected(null)
//       setDeleteOpen(false)
//       setDeleteId(null)
//     } catch (error) {
//       console.error("Error deleting customer:", error)
//     }
//   }

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

//   return (
//     <>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle className="text-base">Customers ({customers.length})</CardTitle>

//           {/* ADD DIALOG */}
//           <Dialog open={addOpen} onOpenChange={setAddOpen}>
//             <DialogTrigger asChild>
//               <Button size="sm"><Plus className="size-4 mr-1" />Add Customer</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader><DialogTitle>Add New Customer</DialogTitle></DialogHeader>
//               <div className="flex flex-col gap-3 py-3">
//                 <div><Label>Name *</Label>
//                   <Input placeholder="Customer Name" value={name} onChange={e => setName(e.target.value)} />
//                 </div>
//                 <div><Label>Phone</Label>
//                   <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
//                 </div>
//                 <div><Label>Email</Label>
//                   <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//                 </div>
//                 <div><Label>Address</Label>
//                   <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
//                 </div>
//                 <Button onClick={addCustomer}>Save Customer</Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </CardHeader>

//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Customer Name</TableHead>
//                 <TableHead className="hidden sm:table-cell">Phone</TableHead>
//                 <TableHead className="text-right">Total Purchases</TableHead>
//                 <TableHead className="text-right">Outstanding</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {customers.map(c => (
//                 <TableRow key={c._id} className="cursor-pointer" onClick={() => setSelected(c)}>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
//                         {c.name?.split(" ").map(n => n[0]).join("")}
//                       </div>
//                       <div>
//                         <p className="font-medium text-foreground">{c.name}</p>
//                         <p className="text-xs text-muted-foreground sm:hidden">{c.phone}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell text-muted-foreground">{c.phone}</TableCell>
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
//                   <TableCell>
//                     <div className="flex items-center justify-center gap-1">
//                       <Button variant="ghost" size="icon" onClick={e => openEdit(c, e)} title="Edit">
//                         <Pencil className="size-4 text-muted-foreground" />
//                       </Button>
//                       <Button variant="ghost" size="icon" onClick={e => confirmDelete(c._id, e)} title="Delete">
//                         <Trash2 className="size-4 text-red-400" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* CUSTOMER DETAIL SHEET */}
//       <Sheet open={!!selected} onOpenChange={open => !open && setSelected(null)}>
//         <SheetContent className="w-full sm:max-w-md overflow-y-auto">
//           <SheetHeader className="pb-0">
//             <SheetTitle>{selected?.name}</SheetTitle>
//             <SheetDescription>Customer details and transaction history</SheetDescription>
//           </SheetHeader>

//           {selected && (
//             <div className="flex flex-col gap-4 px-4 pb-4">
//               <div className="flex flex-col gap-3">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Phone className="size-4" />{selected.phone}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Mail className="size-4" />{selected.email}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <MapPin className="size-4" />{selected.address}
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div className="rounded-lg border p-3 bg-card">
//                   <p className="text-xs text-muted-foreground">Total Purchases</p>
//                   <p className="text-lg font-bold text-foreground mt-1">{formatCurrency(selected.totalPurchases)}</p>
//                 </div>
//                 <div className="rounded-lg border p-3 bg-card">
//                   <p className="text-xs text-muted-foreground">Outstanding</p>
//                   <p className="text-lg font-bold text-foreground mt-1">{formatCurrency(selected.balance)}</p>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <h4 className="text-sm font-medium text-foreground mb-3">Transaction History</h4>
//                 {selected.transactions?.length ? (
//                   selected.transactions.map((tx, i) => (
//                     <div key={i} className="flex items-center justify-between rounded-lg border p-3 bg-card mb-2">
//                       <div>
//                         <p className="text-sm font-medium text-foreground">{tx.invoice}</p>
//                         <p className="text-xs text-muted-foreground">{tx.date}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium text-foreground">{formatCurrency(tx.amount)}</p>
//                         <Badge
//                           variant="outline"
//                           className={tx.status === "Paid"
//                             ? "bg-green-100 text-green-700 border-green-200"
//                             : "bg-yellow-100 text-yellow-700 border-yellow-200"
//                           }
//                         >
//                           {tx.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-muted-foreground">No transactions yet</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>

//       {/* EDIT DIALOG */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Edit Customer</DialogTitle></DialogHeader>
//           <div className="flex flex-col gap-3 py-3">
//             <div><Label>Name *</Label>
//               <Input value={editName} onChange={e => setEditName(e.target.value)} />
//             </div>
//             <div><Label>Phone</Label>
//               <Input value={editPhone} onChange={e => setEditPhone(e.target.value)} />
//             </div>
//             <div><Label>Email</Label>
//               <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} />
//             </div>
//             <div><Label>Address</Label>
//               <Input value={editAddress} onChange={e => setEditAddress(e.target.value)} />
//             </div>
//             <div className="flex gap-2">
//               <Button onClick={saveEdit} className="flex-1">Save Changes</Button>
//               <Button variant="outline" onClick={() => setEditOpen(false)} className="flex-1">Cancel</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* DELETE CONFIRM DIALOG */}
//       <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Delete Customer</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <p className="text-sm text-muted-foreground mb-6">
//               Are you sure you want to delete this customer? Their sales history will remain but the customer record will be removed.
//             </p>
//             <div className="flex gap-2">
//               <Button variant="destructive" onClick={deleteCustomer} className="flex-1">Yes, Delete</Button>
//               <Button variant="outline" onClick={() => setDeleteOpen(false)} className="flex-1">Cancel</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }





//aravind

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Badge } from "@/app/components/ui/badge"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import {
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
// } from "@/app/components/ui/table"
// import {
//   Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
// } from "@/app/components/ui/sheet"
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Separator } from "@/app/components/ui/separator"
// import { Phone, Mail, MapPin, Plus, Pencil, Trash2 } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅ import authFetch

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

//   const [addOpen, setAddOpen] = useState(false)
//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [email, setEmail] = useState("")
//   const [address, setAddress] = useState("")

//   const [editOpen, setEditOpen] = useState(false)
//   const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editPhone, setEditPhone] = useState("")
//   const [editEmail, setEditEmail] = useState("")
//   const [editAddress, setEditAddress] = useState("")

//   const [deleteId, setDeleteId] = useState<string | null>(null)
//   const [deleteOpen, setDeleteOpen] = useState(false)

//   useEffect(() => {
//     fetchCustomers()
//   }, [])

//   const fetchCustomers = async () => {
//     try {
//       const res = await authFetch("/api/customers") // ✅
//       const data = await res.json()
//       setCustomers(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Error fetching customers:", error)
//       setCustomers([])
//     }
//   }

//   const addCustomer = async () => {
//     if (!name) { alert("Name is required"); return }
//     try {
//       const res = await authFetch("/api/customers", { // ✅
//         method: "POST",
//         body: JSON.stringify({ name, phone, email, address }),
//       })
//       const newCustomer = await res.json()
//       setCustomers([...customers, newCustomer])
//       setName(""); setPhone(""); setEmail(""); setAddress("")
//       setAddOpen(false)
//     } catch (error) {
//       console.error("Error adding customer:", error)
//     }
//   }

//   const openEdit = (c: Customer, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setEditCustomer(c)
//     setEditName(c.name)
//     setEditPhone(c.phone)
//     setEditEmail(c.email)
//     setEditAddress(c.address)
//     setEditOpen(true)
//   }

//   const saveEdit = async () => {
//     if (!editCustomer) return
//     if (!editName) { alert("Name is required"); return }
//     try {
//       const res = await authFetch(`/api/customers/${editCustomer._id}`, { // ✅
//         method: "PUT",
//         body: JSON.stringify({
//           name: editName,
//           phone: editPhone,
//           email: editEmail,
//           address: editAddress,
//         }),
//       })
//       if (!res.ok) { alert("Failed to update customer"); return }
//       const updated = await res.json()
//       setCustomers(customers.map(c => c._id === updated._id ? updated : c))
//       if (selected?._id === updated._id) setSelected(updated)
//       setEditOpen(false)
//       setEditCustomer(null)
//     } catch (error) {
//       console.error("Error updating customer:", error)
//     }
//   }

//   const confirmDelete = (id: string, e: React.MouseEvent) => {
//     e.stopPropagation()
//     setDeleteId(id)
//     setDeleteOpen(true)
//   }

//   const deleteCustomer = async () => {
//     if (!deleteId) return
//     try {
//       const res = await authFetch(`/api/customers/${deleteId}`, { method: "DELETE" }) // ✅
//       if (!res.ok) { alert("Failed to delete customer"); return }
//       setCustomers(customers.filter(c => c._id !== deleteId))
//       if (selected?._id === deleteId) setSelected(null)
//       setDeleteOpen(false)
//       setDeleteId(null)
//     } catch (error) {
//       console.error("Error deleting customer:", error)
//     }
//   }

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

//   return (
//     <>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <CardTitle className="text-base">Customers ({customers.length})</CardTitle>

//           <Dialog open={addOpen} onOpenChange={setAddOpen}>
//             <DialogTrigger asChild>
//               <Button size="sm"><Plus className="size-4 mr-1" />Add Customer</Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader><DialogTitle>Add New Customer</DialogTitle></DialogHeader>
//               <div className="flex flex-col gap-3 py-3">
//                 <div><Label>Name *</Label>
//                   <Input placeholder="Customer Name" value={name} onChange={e => setName(e.target.value)} />
//                 </div>
//                 <div><Label>Phone</Label>
//                   <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
//                 </div>
//                 <div><Label>Email</Label>
//                   <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//                 </div>
//                 <div><Label>Address</Label>
//                   <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
//                 </div>
//                 <Button onClick={addCustomer}>Save Customer</Button>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </CardHeader>

//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Customer Name</TableHead>
//                 <TableHead className="hidden sm:table-cell">Phone</TableHead>
//                 <TableHead className="text-right">Total Purchases</TableHead>
//                 <TableHead className="text-right">Outstanding</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {customers.map(c => (
//                 <TableRow key={c._id} className="cursor-pointer" onClick={() => setSelected(c)}>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
//                         {c.name?.split(" ").map(n => n[0]).join("")}
//                       </div>
//                       <div>
//                         <p className="font-medium text-foreground">{c.name}</p>
//                         <p className="text-xs text-muted-foreground sm:hidden">{c.phone}</p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell text-muted-foreground">{c.phone}</TableCell>
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
//                   <TableCell>
//                     <div className="flex items-center justify-center gap-1">
//                       <Button variant="ghost" size="icon" onClick={e => openEdit(c, e)}>
//                         <Pencil className="size-4 text-muted-foreground" />
//                       </Button>
//                       <Button variant="ghost" size="icon" onClick={e => confirmDelete(c._id, e)}>
//                         <Trash2 className="size-4 text-red-400" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* CUSTOMER DETAIL SHEET */}
//       <Sheet open={!!selected} onOpenChange={open => !open && setSelected(null)}>
//         <SheetContent className="w-full sm:max-w-md overflow-y-auto">
//           <SheetHeader className="pb-0">
//             <SheetTitle>{selected?.name}</SheetTitle>
//             <SheetDescription>Customer details and transaction history</SheetDescription>
//           </SheetHeader>
//           {selected && (
//             <div className="flex flex-col gap-4 px-4 pb-4">
//               <div className="flex flex-col gap-3">
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Phone className="size-4" />{selected.phone}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <Mail className="size-4" />{selected.email}
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                   <MapPin className="size-4" />{selected.address}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="rounded-lg border p-3 bg-card">
//                   <p className="text-xs text-muted-foreground">Total Purchases</p>
//                   <p className="text-lg font-bold text-foreground mt-1">{formatCurrency(selected.totalPurchases)}</p>
//                 </div>
//                 <div className="rounded-lg border p-3 bg-card">
//                   <p className="text-xs text-muted-foreground">Outstanding</p>
//                   <p className="text-lg font-bold text-foreground mt-1">{formatCurrency(selected.balance)}</p>
//                 </div>
//               </div>
//               <Separator />
//               <div>
//                 <h4 className="text-sm font-medium text-foreground mb-3">Transaction History</h4>
//                 {selected.transactions?.length ? (
//                   selected.transactions.map((tx, i) => (
//                     <div key={i} className="flex items-center justify-between rounded-lg border p-3 bg-card mb-2">
//                       <div>
//                         <p className="text-sm font-medium text-foreground">{tx.invoice}</p>
//                         <p className="text-xs text-muted-foreground">{tx.date}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-sm font-medium text-foreground">{formatCurrency(tx.amount)}</p>
//                         <Badge variant="outline"
//                           className={tx.status === "Paid"
//                             ? "bg-green-100 text-green-700 border-green-200"
//                             : "bg-yellow-100 text-yellow-700 border-yellow-200"
//                           }>
//                           {tx.status}
//                         </Badge>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-muted-foreground">No transactions yet</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </SheetContent>
//       </Sheet>

//       {/* EDIT DIALOG */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Edit Customer</DialogTitle></DialogHeader>
//           <div className="flex flex-col gap-3 py-3">
//             <div><Label>Name *</Label>
//               <Input value={editName} onChange={e => setEditName(e.target.value)} />
//             </div>
//             <div><Label>Phone</Label>
//               <Input value={editPhone} onChange={e => setEditPhone(e.target.value)} />
//             </div>
//             <div><Label>Email</Label>
//               <Input value={editEmail} onChange={e => setEditEmail(e.target.value)} />
//             </div>
//             <div><Label>Address</Label>
//               <Input value={editAddress} onChange={e => setEditAddress(e.target.value)} />
//             </div>
//             <div className="flex gap-2">
//               <Button onClick={saveEdit} className="flex-1">Save Changes</Button>
//               <Button variant="outline" onClick={() => setEditOpen(false)} className="flex-1">Cancel</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* DELETE CONFIRM DIALOG */}
//       <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Delete Customer</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <p className="text-sm text-muted-foreground mb-6">
//               Are you sure you want to delete this customer? Their sales history will remain but the customer record will be removed.
//             </p>
//             <div className="flex gap-2">
//               <Button variant="destructive" onClick={deleteCustomer} className="flex-1">Yes, Delete</Button>
//               <Button variant="outline" onClick={() => setDeleteOpen(false)} className="flex-1">Cancel</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   )
// }


/////jay

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/app/components/ui/table"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/app/components/ui/sheet"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/app/components/ui/dialog"
import { Separator } from "@/app/components/ui/separator"
import { Phone, Mail, MapPin, Plus, Pencil, Trash2, Users, TrendingUp, AlertCircle } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"

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

/* ─── animation variants ─────────────────────────────────── */
const fadeUp:Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.18 } },
}

const slideRight:Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.22 } },
}

/* ─── Avatar ─────────────────────────────────────────────── */
const Avatar = ({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) => {
  const initials = name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "?"
  const hue = name ? (name.charCodeAt(0) * 37 + name.charCodeAt(1 % name.length) * 13) % 360 : 200
  const sizes = { sm: "size-8 text-xs", md: "size-9 text-sm", lg: "size-14 text-xl" }
  return (
    <div
      className={`${sizes[size]} flex items-center justify-center rounded font-bold text-white flex-shrink-0`}
      style={{ background: `linear-gradient(135deg, hsl(${hue},70%,55%), hsl(${(hue + 40) % 360},80%,45%))` }}
    >
      {initials}
    </div>
  )
}

/* ─── Stat Pill ──────────────────────────────────────────── */
const StatPill = ({ label, value, icon: Icon, accent }: {
  label: string; value: string; icon: any; accent: string
}) => (
  <motion.div
    variants={fadeUp}
    className="flex items-center gap-3 rounded border border-border/60 bg-card px-4 py-3 shadow-sm"
  >
    <div className={`flex size-9 items-center justify-center rounded ${accent}`}>
      <Icon className="size-4" />
    </div>
    <div>
      <p className="text-[11px] font-medium text-muted-foreground tracking-wide uppercase">{label}</p>
      <p className="text-sm font-bold text-foreground">{value}</p>
    </div>
  </motion.div>
)

/* ─── Field — plain div, no animation wrapper so focus is never lost ── */
const Field = ({
  label, value, onChange, placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">
      {label}
    </Label>
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="rounded border-zinc-200 bg-white focus-visible:ring-1 focus-visible:ring-zinc-400 h-9 text-sm shadow-sm"
    />
  </div>
)

/* ─── Main component ─────────────────────────────────────── */
export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selected, setSelected] = useState<Customer | null>(null)

  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")

  const [editOpen, setEditOpen] = useState(false)
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editAddress, setEditAddress] = useState("")

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  useEffect(() => { fetchCustomers() }, [])

  const fetchCustomers = async () => {
    try {
      const res = await authFetch("/api/customers")
      const data = await res.json()
      setCustomers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching customers:", error)
      setCustomers([])
      toast.error("Failed to load customers")
    }
  }

  const addCustomer = async () => {
    if (!name.trim()) { toast.error("Name is required"); return }
    const tid = toast.loading("Adding customer…")
    try {
      const res = await authFetch("/api/customers", {
        method: "POST",
        body: JSON.stringify({ name, phone, email, address }),
      })
      const newCustomer = await res.json()
      setCustomers(prev => [...prev, newCustomer])
      setName(""); setPhone(""); setEmail(""); setAddress("")
      setAddOpen(false)
      toast.success("Customer added!", { id: tid })
    } catch (error) {
      console.error("Error adding customer:", error)
      toast.error("Failed to add customer", { id: tid })
    }
  }

  const openEdit = (c: Customer, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditCustomer(c)
    setEditName(c.name); setEditPhone(c.phone)
    setEditEmail(c.email); setEditAddress(c.address)
    setEditOpen(true)
  }

  const saveEdit = async () => {
    if (!editCustomer) return
    if (!editName.trim()) { toast.error("Name is required"); return }
    const tid = toast.loading("Saving changes…")
    try {
      const res = await authFetch(`/api/customers/${editCustomer._id}`, {
        method: "PUT",
        body: JSON.stringify({ name: editName, phone: editPhone, email: editEmail, address: editAddress }),
      })
      if (!res.ok) { toast.error("Failed to update customer", { id: tid }); return }
      const updated = await res.json()
      setCustomers(prev => prev.map(c => c._id === updated._id ? updated : c))
      if (selected?._id === updated._id) setSelected(updated)
      setEditOpen(false); setEditCustomer(null)
      toast.success("Customer updated!", { id: tid })
    } catch (error) {
      console.error("Error updating customer:", error)
      toast.error("Failed to update customer", { id: tid })
    }
  }

  const confirmDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); setDeleteId(id); setDeleteOpen(true)
  }

  const deleteCustomer = async () => {
    if (!deleteId) return
    const tid = toast.loading("Deleting customer…")
    try {
      const res = await authFetch(`/api/customers/${deleteId}`, { method: "DELETE" })
      if (!res.ok) { toast.error("Failed to delete customer", { id: tid }); return }
      setCustomers(prev => prev.filter(c => c._id !== deleteId))
      if (selected?._id === deleteId) setSelected(null)
      setDeleteOpen(false); setDeleteId(null)
      toast.success("Customer deleted", { id: tid })
    } catch (error) {
      console.error("Error deleting customer:", error)
      toast.error("Failed to delete customer", { id: tid })
    }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

  const totalOutstanding = customers.reduce((s, c) => s + (c.balance || 0), 0)
  const totalRevenue = customers.reduce((s, c) => s + (c.totalPurchases || 0), 0)

  return (
    <>
      {/* ── react-hot-toast container ─────────────────────── */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "6px", fontSize: "13px", fontWeight: 500, boxShadow: "0 1px 6px rgba(0,0,0,0.10)" },
          success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
          error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
        }}
      />

      {/* ── Summary stats ─────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 -mb-2"
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <StatPill label="Total Customers" value={String(customers.length)} icon={Users}
          accent="bg-blue-100 text-blue-600" />
        <StatPill label="Total Revenue" value={formatCurrency(totalRevenue)} icon={TrendingUp}
          accent="bg-emerald-100 text-emerald-600" />
        <StatPill label="Outstanding" value={formatCurrency(totalOutstanding)} icon={AlertCircle}
          accent="bg-amber-100 text-amber-600" />
      </motion.div>

      {/* ── Main card ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="rounded shadow-sm border-zinc-200 overflow-hidden">
          <CardHeader className="flex flex-row justify-end items-center  px-5  border-b border-zinc-200 ">
            

            {/* Add Customer Dialog */}
            <Dialog open={addOpen} onOpenChange={open => {
              setAddOpen(open)
              if (!open) { setName(""); setPhone(""); setEmail(""); setAddress("") }
            }}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="sm" className="rounded gap-1.5 text-white px-3 font-semibold shadow-sm text-xs h-8">
                    <Plus className="size-3.5" /> Add Customer
                  </Button>
                </motion.div>
              </DialogTrigger>

              {/*
                IMPORTANT: No AnimatePresence / staggerChildren on the form fields.
                Animating children causes React to re-mount inputs, which kills focus.
                Only the dialog wrapper itself gets an enter animation.
              */}
              <DialogContent className="rounded border-zinc-200 shadow-sm sm:max-w-md bg-white p-0 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 py-4 border-b border-zinc-100 bg-white">
                    <DialogTitle className="text-base font-bold text-zinc-800">New Customer</DialogTitle>
                    <p className="text-xs text-zinc-400 mt-0.5">Fill in the details below</p>
                  </div>
                  {/* Static fields — no motion wrappers, no stagger, inputs stay focused */}
                  <div className="flex flex-col gap-3 px-6 py-5 bg-white">
                    <Field label="Name *" value={name} onChange={setName} placeholder="Full name" />
                    <Field label="Phone" value={phone} onChange={setPhone} placeholder="+91 XXXXX XXXXX" />
                    <Field label="Email" value={email} onChange={setEmail} placeholder="email@example.com" />
                    <Field label="Address" value={address} onChange={setAddress} placeholder="City, State" />
                    <div className="pt-1">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button onClick={addCustomer} className="w-full rounded h-9 font-semibold text-sm text-white shadow-sm">
                          Save Customer
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="p-0.5">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-zinc-200 bg-zinc-50 hover:bg-zinc-50">
                  <TableHead className="pl-5 py-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">Customer</TableHead>
                  <TableHead className="hidden sm:table-cell py-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">Phone</TableHead>
                  <TableHead className="text-right py-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">Purchases</TableHead>
                  <TableHead className="text-right py-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">Outstanding</TableHead>
                  <TableHead className="text-center pr-5 py-2 text-xs font-semibold tracking-wider uppercase text-zinc-500">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence initial={false}>
                  {customers.map((c, i) => (
                    <motion.tr
                      key={c._id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                      className="cursor-pointer group border-b border-zinc-200"
                      style={{
                        backgroundColor: hoveredRow === c._id ? "#f9fafb" : "transparent",
                        transition: "background-color 0.15s",
                      }}
                      onHoverStart={() => setHoveredRow(c._id)}
                      onHoverEnd={() => setHoveredRow(null)}
                      onClick={() => setSelected(c)}
                    >
                      <TableCell className="pl-5 p-2 text-sm">
                        <div className="flex items-center gap-3">
                          <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-full overflow-hidden">
                            <Avatar  name={c.name} />
                          </motion.div>
                          <div>
                            <p className="font-semibold text-sm text-foreground leading-tight">{c.name}</p>
                            <p className="text-xs text-muted-foreground sm:hidden mt-0.5">{c.phone}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell p-2 text-sm text-muted-foreground">{c.phone}</TableCell>
                      <TableCell className="text-right p-2 text-sm font-semibold text-foreground">
                        {formatCurrency(c.totalPurchases)}
                      </TableCell>
                      <TableCell className="text-right p-2 text-sm">
                        {c.balance > 0 ? (
                          <Badge className="rounded bg-amber-100 text-amber-700 border-amber-200 font-semibold text-xs px-2 shadow-sm">
                            {formatCurrency(c.balance)}
                          </Badge>
                        ) : (
                          <Badge className="rounded bg-emerald-100 text-emerald-700 border-emerald-200 font-semibold text-xs px-2 shadow-sm">
                            Clear
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="pr-5 p-2 text-sm">
                        <div className="flex items-center justify-center gap-1">
                          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost" size="icon"
                              className="size-7 rounded  transition-opacity"
                              onClick={e => openEdit(c, e)}
                            >
                              <Pencil className="size-3.5 text-muted-foreground" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost" size="icon"
                              className="size-7 rounded  transition-opacity hover:bg-red-50"
                              onClick={e => confirmDelete(c._id, e)}
                            >
                              <Trash2 className="size-3.5 text-red-400" />
                            </Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>

            {customers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center py-14 text-muted-foreground gap-3"
              >
                <div className="size-12 rounded border border-zinc-200 bg-zinc-50 shadow-sm flex items-center justify-center">
                  <Users className="size-6 opacity-40" />
                </div>
                <p className="text-sm font-medium">No customers yet</p>
                <p className="text-xs opacity-60">Click "Add Customer" to get started</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Customer Detail Sheet ─────────────────────────── */}
      <Sheet open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto rounded-l border-l mt-10 bg-white border-zinc-200 shadow-sm p-0">
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected._id}
                variants={slideRight}
                initial="hidden" animate="show" exit="exit"
                className="flex flex-col h-full"
              >
                <div className="px-6 pt-7 pb-5 bg-gradient-to-br from-zinc-50 to-white border-b border-zinc-200">
                  <div className="flex items-start gap-3">
                    <Avatar name={selected.name} size="lg"  />
                    <div className="flex-1 min-w-0">
                      <SheetTitle className="text-base font-bold leading-tight">{selected.name}</SheetTitle>
                      <SheetDescription className="text-xs mt-0.5">Customer Profile</SheetDescription>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {[
                      { icon: Phone, val: selected.phone },
                      { icon: Mail, val: selected.email },
                      { icon: MapPin, val: selected.address },
                    ].map(({ icon: Icon, val }, idx) => val && (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + idx * 0.05 }}
                        className="flex items-center gap-2.5 text-sm text-muted-foreground"
                      >
                        <Icon className="size-3.5 flex-shrink-0 opacity-60" />
                        <span className="truncate">{val}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-4 grid grid-cols-2 gap-3">
                  {[
                    { label: "Total Purchases", value: formatCurrency(selected.totalPurchases), color: "text-emerald-600" },
                    { label: "Outstanding", value: formatCurrency(selected.balance), color: "text-amber-600" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + i * 0.07 }}
                      className="rounded border border-zinc-200 p-3 bg-white shadow-sm"
                    >
                      <p className="text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">{stat.label}</p>
                      <p className={`text-sm font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </motion.div>
                  ))}
                </div>

                <Separator />

                <div className="px-5 py-4 flex-1 overflow-y-auto">
                  <p className="text-xs font-bold tracking-wider uppercase text-zinc-400 mb-3">Transaction History</p>
                  <AnimatePresence>
                    {selected.transactions?.length ? (
                      selected.transactions.map((tx, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-center justify-between rounded border border-zinc-200 p-3 bg-white shadow-sm mb-2"
                        >
                          <div>
                            <p className="text-sm font-semibold text-foreground">{tx.invoice}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{tx.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-foreground">{formatCurrency(tx.amount)}</p>
                            <Badge className={`mt-1 rounded text-xs px-2 font-semibold shadow-sm ${
                              tx.status === "Paid"
                                ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                : "bg-amber-100 text-amber-700 border-amber-200"
                            }`}>
                              {tx.status}
                            </Badge>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-sm text-muted-foreground text-center py-8"
                      >
                        No transactions yet
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </SheetContent>
      </Sheet>

      {/* ── Edit Dialog — bg-white, static fields ────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded border-zinc-200 shadow-sm sm:max-w-md bg-white p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-4 border-b border-zinc-100 bg-white">
              <DialogTitle className="text-base font-bold text-zinc-800">Edit Customer</DialogTitle>
            </div>
            <div className="flex flex-col gap-3 px-6 py-5 bg-white">
              <Field label="Name *" value={editName} onChange={setEditName} />
              <Field label="Phone" value={editPhone} onChange={setEditPhone} />
              <Field label="Email" value={editEmail} onChange={setEditEmail} />
              <Field label="Address" value={editAddress} onChange={setEditAddress} />
              <div className="flex gap-3 pt-1">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button onClick={saveEdit} className="w-full text-white rounded h-9 font-semibold text-sm shadow-sm">
                    Save Changes
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button variant="outline" onClick={() => setEditOpen(false)}
                    className="w-full rounded h-9 font-semibold text-sm shadow-sm border-zinc-200">
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirm Dialog ─────────────────────────── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="rounded border-zinc-200 shadow-sm sm:max-w-sm bg-white p-0 overflow-hidden">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pt-5 pb-4 border-b border-zinc-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded bg-red-100 flex items-center justify-center shadow-sm">
                  <Trash2 className="size-4 text-red-500" />
                </div>
                <DialogTitle className="text-sm font-bold">Delete Customer</DialogTitle>
              </div>
            </div>
            <div className="px-6 py-5 bg-white">
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Are you sure? Their sales history will remain but the customer record will be removed.
              </p>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button variant="destructive" onClick={deleteCustomer}
                    className="w-full rounded h-9 font-semibold text-sm shadow-sm">
                    Yes, Delete
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button variant="outline" onClick={() => setDeleteOpen(false)}
                    className="w-full rounded h-9 font-semibold text-sm shadow-sm border-zinc-200">
                    Cancel
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  )
}