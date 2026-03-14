


// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Phone, Mail, MapPin, Plus } from "lucide-react"

// type Supplier = {
//   _id: string
//   name: string
//   phone: string
//   email: string
//   address: string
//   totalPurchases: number
// }

// export function SupplierList() {

//   const [suppliers, setSuppliers] = useState<Supplier[]>([])

//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [email, setEmail] = useState("")
//   const [address, setAddress] = useState("")

//   useEffect(() => {
//     fetchSuppliers()
//   }, [])

//   const fetchSuppliers = async () => {
//     try {

//       const res = await fetch("/api/suppliers")
//       const data = await res.json()

//       if (Array.isArray(data)) {
//         setSuppliers(data)
//       } else {
//         setSuppliers([])
//       }

//     } catch (error) {
//       console.error("Error fetching suppliers:", error)
//       setSuppliers([])
//     }
//   }

//   const addSupplier = async () => {
//     try {

//       const res = await fetch("/api/suppliers", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           phone,
//           email,
//           address
//         }),
//       })

//       const newSupplier = await res.json()

//       setSuppliers([...suppliers, newSupplier])

//       setName("")
//       setPhone("")
//       setEmail("")
//       setAddress("")

//     } catch (error) {
//       console.error("Error adding supplier:", error)
//     }
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount || 0)
//   }

//   return (
//     <Card>

//       <CardHeader className="flex flex-row items-center justify-between">

//         <CardTitle className="text-base">
//           Suppliers ({suppliers.length})
//         </CardTitle>

//         <Dialog>

//           <DialogTrigger asChild>
//             <Button size="sm">
//               <Plus className="size-4 mr-1" />
//               Add Supplier
//             </Button>
//           </DialogTrigger>

//           <DialogContent>

//             <DialogHeader>
//               <DialogTitle>Add New Supplier</DialogTitle>
//             </DialogHeader>

//             <div className="flex flex-col gap-3 py-3">

//               <Input
//                 placeholder="Supplier Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />

//               <Input
//                 placeholder="Phone"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />

//               <Input
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <Input
//                 placeholder="Address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />

//               <Button onClick={addSupplier}>
//                 Save Supplier
//               </Button>

//             </div>

//           </DialogContent>

//         </Dialog>

//       </CardHeader>

//       <CardContent>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

//           {suppliers.map((s) => (

//             <div
//               key={s._id}
//               className="rounded-lg border p-4 bg-card flex flex-col gap-3 hover:shadow-md transition-shadow"
//             >

//               <div className="flex items-center gap-3">

//                 <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
//                   {s.name
//                     ?.split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .slice(0, 2)}
//                 </div>

//                 <div>
//                   <p className="font-medium text-foreground text-sm">
//                     {s.name}
//                   </p>
//                 </div>

//               </div>

//               <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">

//                 <div className="flex items-center gap-2">
//                   <Phone className="size-3" />
//                   {s.phone}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <Mail className="size-3" />
//                   {s.email}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <MapPin className="size-3" />
//                   {s.address}
//                 </div>

//               </div>

//               <div className="flex items-center justify-between pt-2 border-t">

//                 <span className="text-xs text-muted-foreground">
//                   Total Purchases
//                 </span>

//                 <span className="text-sm font-bold text-foreground">
//                   {formatCurrency(s.totalPurchases)}
//                 </span>

//               </div>

//             </div>

//           ))}

//         </div>

//         {suppliers.length === 0 && (
//           <p className="text-center text-muted-foreground py-6">
//             No suppliers found
//           </p>
//         )}

//       </CardContent>

//     </Card>
//   )
// }







// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Phone, Mail, MapPin, Plus, Pencil, Trash2 } from "lucide-react"

// type Supplier = {
//   _id: string
//   name: string
//   phone: string
//   email: string
//   address: string
//   totalPurchases: number
// }

// export function SupplierList() {

//   const [suppliers, setSuppliers] = useState<Supplier[]>([])

//   // Add form
//   const [name, setName] = useState("")
//   const [phone, setPhone] = useState("")
//   const [email, setEmail] = useState("")
//   const [address, setAddress] = useState("")
//   const [addOpen, setAddOpen] = useState(false)

//   // Edit form
//   const [editOpen, setEditOpen] = useState(false)
//   const [editSupplier, setEditSupplier] = useState<Supplier | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editPhone, setEditPhone] = useState("")
//   const [editEmail, setEditEmail] = useState("")
//   const [editAddress, setEditAddress] = useState("")

//   useEffect(() => {
//     fetchSuppliers()
//   }, [])

//   const fetchSuppliers = async () => {
//     try {
//       const res = await fetch("/api/suppliers")
//       const data = await res.json()
//       setSuppliers(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Error fetching suppliers:", error)
//       setSuppliers([])
//     }
//   }

//   const addSupplier = async () => {
//     try {
//       const res = await fetch("/api/suppliers", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, phone, email, address }),
//       })
//       const newSupplier = await res.json()
//       setSuppliers([...suppliers, newSupplier])
//       setName(""); setPhone(""); setEmail(""); setAddress("")
//       setAddOpen(false)
//     } catch (error) {
//       console.error("Error adding supplier:", error)
//     }
//   }

//   const openEdit = (s: Supplier) => {
//     setEditSupplier(s)
//     setEditName(s.name)
//     setEditPhone(s.phone)
//     setEditEmail(s.email)
//     setEditAddress(s.address)
//     setEditOpen(true)
//   }

//   const saveEdit = async () => {
//     if (!editSupplier) return
//     try {
//       const res = await fetch(`/api/suppliers/${editSupplier._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: editName,
//           phone: editPhone,
//           email: editEmail,
//           address: editAddress,
//         }),
//       })
//       const updated = await res.json()
//       setSuppliers(suppliers.map(s => s._id === updated._id ? updated : s))
//       setEditOpen(false)
//       setEditSupplier(null)
//     } catch (error) {
//       console.error("Error updating supplier:", error)
//     }
//   }

//   const deleteSupplier = async (id: string) => {
//     if (!confirm("Delete this supplier? This cannot be undone.")) return
//     try {
//       await fetch(`/api/suppliers/${id}`, { method: "DELETE" })
//       setSuppliers(suppliers.filter(s => s._id !== id))
//     } catch (error) {
//       console.error("Error deleting supplier:", error)
//     }
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount || 0)
//   }

//   return (
//     <Card>

//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-base">Suppliers ({suppliers.length})</CardTitle>

//         {/* Add Supplier Dialog */}
//         <Dialog open={addOpen} onOpenChange={setAddOpen}>
//           <DialogTrigger asChild>
//             <Button size="sm">
//               <Plus className="size-4 mr-1" />
//               Add Supplier
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Add New Supplier</DialogTitle>
//             </DialogHeader>
//             <div className="flex flex-col gap-3 py-3">
//               <Input placeholder="Supplier Name" value={name} onChange={e => setName(e.target.value)} />
//               <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
//               <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//               <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
//               <Button onClick={addSupplier}>Save Supplier</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </CardHeader>

//       <CardContent>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {suppliers.map(s => (
//             <div
//               key={s._id}
//               className="rounded-lg border p-4 bg-card flex flex-col gap-3 hover:shadow-md transition-shadow"
//             >
//               {/* Header row with avatar + name + action buttons */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
//                     {s.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
//                   </div>
//                   <p className="font-medium text-foreground text-sm">{s.name}</p>
//                 </div>

//                 {/* ✅ Edit + Delete buttons */}
//                 <div className="flex items-center gap-1">
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     className="size-7 text-muted-foreground hover:text-foreground"
//                     onClick={() => openEdit(s)}
//                   >
//                     <Pencil className="size-3.5" />
//                   </Button>
//                   <Button
//                     size="icon"
//                     variant="ghost"
//                     className="size-7 text-muted-foreground hover:text-destructive"
//                     onClick={() => deleteSupplier(s._id)}
//                   >
//                     <Trash2 className="size-3.5" />
//                   </Button>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
//                 <div className="flex items-center gap-2">
//                   <Phone className="size-3" />
//                   {s.phone}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="size-3" />
//                   {s.email}
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="size-3" />
//                   {s.address}
//                 </div>
//               </div>

//               <div className="flex items-center justify-between pt-2 border-t">
//                 <span className="text-xs text-muted-foreground">Total Purchases</span>
//                 <span className="text-sm font-bold text-foreground">{formatCurrency(s.totalPurchases)}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {suppliers.length === 0 && (
//           <p className="text-center text-muted-foreground py-6">No suppliers found</p>
//         )}
//       </CardContent>

//       {/* Edit Supplier Dialog */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Edit Supplier</DialogTitle>
//           </DialogHeader>
//           <div className="flex flex-col gap-3 py-3">
//             <Input placeholder="Supplier Name" value={editName} onChange={e => setEditName(e.target.value)} />
//             <Input placeholder="Phone" value={editPhone} onChange={e => setEditPhone(e.target.value)} />
//             <Input placeholder="Email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
//             <Input placeholder="Address" value={editAddress} onChange={e => setEditAddress(e.target.value)} />
//             <Button onClick={saveEdit}>Save Changes</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//     </Card>
//   )
// }



//aravind''

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/app/components/ui/dialog"
import { Phone, Mail, MapPin, Plus, Pencil, Trash2 } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch" // ✅

type Supplier = {
  _id: string
  name: string
  phone: string
  email: string
  address: string
  totalPurchases: number
}

export function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [addOpen, setAddOpen] = useState(false)

  const [editOpen, setEditOpen] = useState(false)
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null)
  const [editName, setEditName] = useState("")
  const [editPhone, setEditPhone] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editAddress, setEditAddress] = useState("")

  useEffect(() => { fetchSuppliers() }, [])

  const fetchSuppliers = async () => {
    try {
      const res = await authFetch("/api/suppliers") // ✅
      const data = await res.json()
      setSuppliers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching suppliers:", error)
      setSuppliers([])
    }
  }

  const addSupplier = async () => {
    try {
      const res = await authFetch("/api/suppliers", { // ✅
        method: "POST",
        body: JSON.stringify({ name, phone, email, address }),
      })
      const newSupplier = await res.json()
      setSuppliers([...suppliers, newSupplier])
      setName(""); setPhone(""); setEmail(""); setAddress("")
      setAddOpen(false)
    } catch (error) {
      console.error("Error adding supplier:", error)
    }
  }

  const openEdit = (s: Supplier) => {
    setEditSupplier(s)
    setEditName(s.name)
    setEditPhone(s.phone)
    setEditEmail(s.email)
    setEditAddress(s.address)
    setEditOpen(true)
  }

  const saveEdit = async () => {
    if (!editSupplier) return
    try {
      const res = await authFetch(`/api/suppliers/${editSupplier._id}`, { // ✅
        method: "PUT",
        body: JSON.stringify({
          name: editName,
          phone: editPhone,
          email: editEmail,
          address: editAddress,
        }),
      })
      const updated = await res.json()
      setSuppliers(suppliers.map(s => s._id === updated._id ? updated : s))
      setEditOpen(false)
      setEditSupplier(null)
    } catch (error) {
      console.error("Error updating supplier:", error)
    }
  }

  const deleteSupplier = async (id: string) => {
    if (!confirm("Delete this supplier? This cannot be undone.")) return
    try {
      await authFetch(`/api/suppliers/${id}`, { method: "DELETE" }) // ✅
      setSuppliers(suppliers.filter(s => s._id !== id))
    } catch (error) {
      console.error("Error deleting supplier:", error)
    }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Suppliers ({suppliers.length})</CardTitle>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="size-4 mr-1" />Add Supplier</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Supplier</DialogTitle></DialogHeader>
            <div className="flex flex-col gap-3 py-3">
              <Input placeholder="Supplier Name" value={name} onChange={e => setName(e.target.value)} />
              <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
              <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <Input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
              <Button onClick={addSupplier}>Save Supplier</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {suppliers.map(s => (
            <div
              key={s._id}
              className="rounded-lg border p-4 bg-card flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                    {s.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <p className="font-medium text-foreground text-sm">{s.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="size-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(s)}>
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="size-7 text-muted-foreground hover:text-destructive" onClick={() => deleteSupplier(s._id)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><Phone className="size-3" />{s.phone}</div>
                <div className="flex items-center gap-2"><Mail className="size-3" />{s.email}</div>
                <div className="flex items-center gap-2"><MapPin className="size-3" />{s.address}</div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-xs text-muted-foreground">Total Purchases</span>
                <span className="text-sm font-bold text-foreground">{formatCurrency(s.totalPurchases)}</span>
              </div>
            </div>
          ))}
        </div>

        {suppliers.length === 0 && (
          <p className="text-center text-muted-foreground py-6">No suppliers found</p>
        )}
      </CardContent>

      {/* Edit Supplier Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Supplier</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-3 py-3">
            <Input placeholder="Supplier Name" value={editName} onChange={e => setEditName(e.target.value)} />
            <Input placeholder="Phone" value={editPhone} onChange={e => setEditPhone(e.target.value)} />
            <Input placeholder="Email" value={editEmail} onChange={e => setEditEmail(e.target.value)} />
            <Input placeholder="Address" value={editAddress} onChange={e => setEditAddress(e.target.value)} />
            <Button onClick={saveEdit}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}