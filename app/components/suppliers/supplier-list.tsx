


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

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Phone, Mail, MapPin, Plus, Pencil, Trash2 } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅

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
//   const [addOpen, setAddOpen] = useState(false)

//   const [editOpen, setEditOpen] = useState(false)
//   const [editSupplier, setEditSupplier] = useState<Supplier | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editPhone, setEditPhone] = useState("")
//   const [editEmail, setEditEmail] = useState("")
//   const [editAddress, setEditAddress] = useState("")

//   useEffect(() => { fetchSuppliers() }, [])

//   const fetchSuppliers = async () => {
//     try {
//       const res = await authFetch("/api/suppliers") // ✅
//       const data = await res.json()
//       setSuppliers(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Error fetching suppliers:", error)
//       setSuppliers([])
//     }
//   }

//   const addSupplier = async () => {
//     try {
//       const res = await authFetch("/api/suppliers", { // ✅
//         method: "POST",
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
//       const res = await authFetch(`/api/suppliers/${editSupplier._id}`, { // ✅
//         method: "PUT",
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
//       await authFetch(`/api/suppliers/${id}`, { method: "DELETE" }) // ✅
//       setSuppliers(suppliers.filter(s => s._id !== id))
//     } catch (error) {
//       console.error("Error deleting supplier:", error)
//     }
//   }

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-base">Suppliers ({suppliers.length})</CardTitle>

//         <Dialog open={addOpen} onOpenChange={setAddOpen}>
//           <DialogTrigger asChild>
//             <Button size="sm"><Plus className="size-4 mr-1" />Add Supplier</Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader><DialogTitle>Add New Supplier</DialogTitle></DialogHeader>
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
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
//                     {s.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
//                   </div>
//                   <p className="font-medium text-foreground text-sm">{s.name}</p>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Button size="icon" variant="ghost" className="size-7 text-muted-foreground hover:text-foreground" onClick={() => openEdit(s)}>
//                     <Pencil className="size-3.5" />
//                   </Button>
//                   <Button size="icon" variant="ghost" className="size-7 text-muted-foreground hover:text-destructive" onClick={() => deleteSupplier(s._id)}>
//                     <Trash2 className="size-3.5" />
//                   </Button>
//                 </div>
//               </div>

//               <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
//                 <div className="flex items-center gap-2"><Phone className="size-3" />{s.phone}</div>
//                 <div className="flex items-center gap-2"><Mail className="size-3" />{s.email}</div>
//                 <div className="flex items-center gap-2"><MapPin className="size-3" />{s.address}</div>
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
//           <DialogHeader><DialogTitle>Edit Supplier</DialogTitle></DialogHeader>
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


/////jay

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Badge } from "@/app/components/ui/badge"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/app/components/ui/dialog"
import { Plus, Pencil, Trash2, Building2, TrendingUp } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"

type Supplier = {
  _id: string
  name: string
  phone: string
  email: string
  address: string
  totalPurchases: number
}

/* ─── animation variants ─────────────────────────────────── */
const fadeUp:Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
}

/* ─── Avatar ─────────────────────────────────────────────── */
const Avatar = ({ name }: { name: string }) => {
  const initials = name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "?"
  const hue = name ? (name.charCodeAt(0) * 41 + name.charCodeAt(1 % name.length) * 17) % 360 : 220
  return (
    <div
      className="size-10 flex items-center justify-center rounded font-bold text-white flex-shrink-0 text-sm"
      style={{ background: `linear-gradient(135deg, hsl(${hue},65%,55%), hsl(${(hue + 45) % 360},75%,45%))` }}
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

/* ─── Field — plain div, no animation so inputs stay focused ─ */
const Field = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-semibold text-zinc-500 tracking-wider uppercase">{label}</Label>
    <Input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="rounded border-zinc-200 bg-white focus-visible:ring-1 focus-visible:ring-zinc-400 h-9 text-sm shadow-sm"
    />
  </div>
)

/* ─── Main component ─────────────────────────────────────── */
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

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  useEffect(() => { fetchSuppliers() }, [])

  const fetchSuppliers = async () => {
    try {
      const res = await authFetch("/api/suppliers")
      const data = await res.json()
      setSuppliers(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching suppliers:", error)
      setSuppliers([])
      toast.error("Failed to load suppliers")
    }
  }

  const addSupplier = async () => {
    if (!name.trim()) { toast.error("Name is required"); return }
    const tid = toast.loading("Adding supplier…")
    try {
      const res = await authFetch("/api/suppliers", {
        method: "POST",
        body: JSON.stringify({ name, phone, email, address }),
      })
      const newSupplier = await res.json()
      setSuppliers(prev => [...prev, newSupplier])
      setName(""); setPhone(""); setEmail(""); setAddress("")
      setAddOpen(false)
      toast.success("Supplier added!", { id: tid })
    } catch (error) {
      console.error("Error adding supplier:", error)
      toast.error("Failed to add supplier", { id: tid })
    }
  }

  const openEdit = (s: Supplier) => {
    setEditSupplier(s)
    setEditName(s.name); setEditPhone(s.phone)
    setEditEmail(s.email); setEditAddress(s.address)
    setEditOpen(true)
  }

  const saveEdit = async () => {
    if (!editSupplier) return
    if (!editName.trim()) { toast.error("Name is required"); return }
    const tid = toast.loading("Saving changes…")
    try {
      const res = await authFetch(`/api/suppliers/${editSupplier._id}`, {
        method: "PUT",
        body: JSON.stringify({ name: editName, phone: editPhone, email: editEmail, address: editAddress }),
      })
      if (!res.ok) { toast.error("Failed to update supplier", { id: tid }); return }
      const updated = await res.json()
      setSuppliers(prev => prev.map(s => s._id === updated._id ? updated : s))
      setEditOpen(false); setEditSupplier(null)
      toast.success("Supplier updated!", { id: tid })
    } catch (error) {
      console.error("Error updating supplier:", error)
      toast.error("Failed to update supplier", { id: tid })
    }
  }

  const confirmDelete = (id: string) => { setDeleteId(id); setDeleteOpen(true) }

  const deleteSupplier = async () => {
    if (!deleteId) return
    const tid = toast.loading("Deleting supplier…")
    try {
      const res = await authFetch(`/api/suppliers/${deleteId}`, { method: "DELETE" })
      if (!res.ok) { toast.error("Failed to delete supplier", { id: tid }); return }
      setSuppliers(prev => prev.filter(s => s._id !== deleteId))
      setDeleteOpen(false); setDeleteId(null)
      toast.success("Supplier deleted", { id: tid })
    } catch (error) {
      console.error("Error deleting supplier:", error)
      toast.error("Failed to delete supplier", { id: tid })
    }
  }

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

  const totalSpend = suppliers.reduce((s, x) => s + (x.totalPurchases || 0), 0)

  return (
    <>
      {/* react-hot-toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "6px", fontSize: "13px", fontWeight: 500, boxShadow: "0 1px 6px rgba(0,0,0,0.10)" },
          success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
          error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
        }}
      />

      {/* ── Stat pills ────────────────────────────────────── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 -mb-2"
        initial="hidden" animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      >
        <StatPill label="Total Suppliers" value={String(suppliers.length)} icon={Building2}
          accent="bg-violet-100 text-violet-600" />
        <StatPill label="Total Spend" value={formatCurrency(totalSpend)} icon={TrendingUp}
          accent="bg-emerald-100 text-emerald-600" />
      </motion.div>

      {/* ── Main card ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="rounded shadow-sm border-zinc-200 overflow-hidden">
          <CardHeader className="flex justify-end flex-row items-center  px-5  border-b border-zinc-200 ">
            

            {/* Add Supplier Dialog */}
            <Dialog open={addOpen} onOpenChange={open => {
              setAddOpen(open)
              if (!open) { setName(""); setPhone(""); setEmail(""); setAddress("") }
            }}>
              <DialogTrigger asChild>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Button size="sm" className="rounded text-white gap-1.5 px-3 font-semibold shadow-sm text-xs h-8">
                    <Plus className="size-3.5" /> Add Supplier
                  </Button>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="rounded border-zinc-200 shadow-sm sm:max-w-md bg-white p-0 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="px-6 py-4 border-b border-zinc-100 bg-white">
                    <DialogTitle className="text-base font-bold text-zinc-800">New Supplier</DialogTitle>
                    <p className="text-xs text-zinc-400 mt-0.5">Fill in the details below</p>
                  </div>
                  {/* Static fields — no motion wrappers so inputs stay focused */}
                  <div className="flex flex-col gap-3 px-6 py-5 bg-white">
                    <Field label="Name *" value={name} onChange={setName} placeholder="Supplier name" />
                    <Field label="Phone" value={phone} onChange={setPhone} placeholder="+91 XXXXX XXXXX" />
                    <Field label="Email" value={email} onChange={setEmail} placeholder="email@example.com" />
                    <Field label="Address" value={address} onChange={setAddress} placeholder="City, State" />
                    <div className="pt-1">
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                        <Button onClick={addSupplier} className="w-full text-white rounded h-9 font-semibold text-sm shadow-sm">
                          Save Supplier
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="pl-5 py-2.5 text-left text-xs font-semibold tracking-wider uppercase text-zinc-500">Supplier</th>
                  <th className="hidden sm:table-cell py-2 text-left text-xs font-semibold tracking-wider uppercase text-zinc-500">Phone</th>
                  <th className="hidden md:table-cell py-2 text-left text-xs font-semibold tracking-wider uppercase text-zinc-500">Email</th>
                  <th className="hidden lg:table-cell py-2 text-left text-xs font-semibold tracking-wider uppercase text-zinc-500">Address</th>
                  <th className="py-2 text-right text-xs font-semibold tracking-wider uppercase text-zinc-500">Purchases</th>
                  <th className="pr-5 py-2 text-center text-xs font-semibold tracking-wider uppercase text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false}>
                  {suppliers.map((s, i) => (
                    <motion.tr
                      key={s._id}
                      custom={i}
                      variants={fadeUp}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                      layout
                      className="group border-b border-zinc-200"
                      style={{
                        backgroundColor: hoveredRow === s._id ? "#f9fafb" : "transparent",
                        transition: "background-color 0.15s",
                      }}
                      onHoverStart={() => setHoveredRow(s._id)}
                      onHoverEnd={() => setHoveredRow(null)}
                    >
                      <td className="pl-5  text-sm">
                        <div className="flex items-center gap-3">
                          <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 300 }} className="rounded-full h-9 flex justify-center items-center w-9 overflow-hidden "  >
                            <Avatar name={s.name} />
                          </motion.div>
                          <div>
                            <p className="font-semibold text-sm text-foreground leading-tight">{s.name}</p>
                            <p className="text-xs text-muted-foreground sm:hidden mt-0.5">{s.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell p-2 text-sm text-muted-foreground">{s.phone}</td>
                      <td className="hidden md:table-cell p-2 text-sm text-muted-foreground">{s.email}</td>
                      <td className="hidden lg:table-cell p-2 text-sm text-muted-foreground">{s.address}</td>
                      <td className="p-2 text-sm text-right">
                        <Badge className="rounded bg-emerald-100 text-emerald-700 border-emerald-200 font-semibold text-xs px-2 shadow-sm">
                          {formatCurrency(s.totalPurchases)}
                        </Badge>
                      </td>
                      <td className="pr-5 p-2 text-sm">
                        <div className="flex items-center justify-center gap-1">
                          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost" size="icon"
                              className="size-7 rounded  transition-opacity hover:bg-zinc-100"
                              onClick={() => openEdit(s)}
                            >
                              <Pencil className="size-3.5 text-muted-foreground" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost" size="icon"
                              className="size-7 rounded  transition-opacity hover:bg-red-50"
                              onClick={() => confirmDelete(s._id)}
                            >
                              <Trash2 className="size-3.5 text-red-400" />
                            </Button>
                          </motion.div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>

            {suppliers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="flex flex-col items-center justify-center py-14 text-muted-foreground gap-3"
              >
                <div className="size-12 rounded border border-zinc-200 bg-zinc-50 shadow-sm flex items-center justify-center">
                  <Building2 className="size-6 opacity-40" />
                </div>
                <p className="text-sm font-medium">No suppliers yet</p>
                <p className="text-xs opacity-60">Click "Add Supplier" to get started</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* ── Edit Dialog — bg-white, static fields ────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded border-zinc-200 shadow-sm sm:max-w-md bg-white p-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-4 border-b border-zinc-100 bg-white">
              <DialogTitle className="text-base font-bold text-zinc-800">Edit Supplier</DialogTitle>
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
                <DialogTitle className="text-sm font-bold">Delete Supplier</DialogTitle>
              </div>
            </div>
            <div className="px-6 py-5 bg-white">
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Are you sure? This supplier will be permanently removed and cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button variant="destructive" onClick={deleteSupplier}
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