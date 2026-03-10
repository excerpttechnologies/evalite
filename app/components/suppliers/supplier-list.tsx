

// "use client"

// import { useEffect, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Phone, Mail, MapPin } from "lucide-react"

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

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount || 0)
//   }

//   return (
//     <Card>

//       <CardHeader>
//         <CardTitle className="text-base">
//           Suppliers ({suppliers.length})
//         </CardTitle>
//       </CardHeader>

//       <CardContent>

//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

//           {suppliers.map((s) => (

//             <div
//               key={s._id}
//               className="rounded-lg border p-4 bg-card flex flex-col gap-3 hover:shadow-md transition-shadow"
//             >

//               <div className="flex items-center justify-between">

//                 <div className="flex items-center gap-3">

//                   <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
//                     {s.name
//                       ?.split(" ")
//                       .map((n) => n[0])
//                       .join("")
//                       .slice(0, 2)}
//                   </div>

//                   <div>
//                     <p className="font-medium text-foreground text-sm">
//                       {s.name}
//                     </p>
//                   </div>

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











"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Phone, Mail, MapPin, Plus } from "lucide-react"

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

  useEffect(() => {
    fetchSuppliers()
  }, [])

  const fetchSuppliers = async () => {
    try {

      const res = await fetch("/api/suppliers")
      const data = await res.json()

      if (Array.isArray(data)) {
        setSuppliers(data)
      } else {
        setSuppliers([])
      }

    } catch (error) {
      console.error("Error fetching suppliers:", error)
      setSuppliers([])
    }
  }

  const addSupplier = async () => {
    try {

      const res = await fetch("/api/suppliers", {
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

      const newSupplier = await res.json()

      setSuppliers([...suppliers, newSupplier])

      setName("")
      setPhone("")
      setEmail("")
      setAddress("")

    } catch (error) {
      console.error("Error adding supplier:", error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0)
  }

  return (
    <Card>

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle className="text-base">
          Suppliers ({suppliers.length})
        </CardTitle>

        <Dialog>

          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-4 mr-1" />
              Add Supplier
            </Button>
          </DialogTrigger>

          <DialogContent>

            <DialogHeader>
              <DialogTitle>Add New Supplier</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-3 py-3">

              <Input
                placeholder="Supplier Name"
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

              <Button onClick={addSupplier}>
                Save Supplier
              </Button>

            </div>

          </DialogContent>

        </Dialog>

      </CardHeader>

      <CardContent>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {suppliers.map((s) => (

            <div
              key={s._id}
              className="rounded-lg border p-4 bg-card flex flex-col gap-3 hover:shadow-md transition-shadow"
            >

              <div className="flex items-center gap-3">

                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold">
                  {s.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <p className="font-medium text-foreground text-sm">
                    {s.name}
                  </p>
                </div>

              </div>

              <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">

                <div className="flex items-center gap-2">
                  <Phone className="size-3" />
                  {s.phone}
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="size-3" />
                  {s.email}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="size-3" />
                  {s.address}
                </div>

              </div>

              <div className="flex items-center justify-between pt-2 border-t">

                <span className="text-xs text-muted-foreground">
                  Total Purchases
                </span>

                <span className="text-sm font-bold text-foreground">
                  {formatCurrency(s.totalPurchases)}
                </span>

              </div>

            </div>

          ))}

        </div>

        {suppliers.length === 0 && (
          <p className="text-center text-muted-foreground py-6">
            No suppliers found
          </p>
        )}

      </CardContent>

    </Card>
  )
}