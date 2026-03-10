// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/app/components/ui/table"
// import { Separator } from "@/app/components/ui/separator"
// import { Plus } from "lucide-react"
// import { purchases, suppliers, products, formatCurrency } from "@/app/lib/mock-data"

// export function PurchaseInterface() {
//   const [supplier, setSupplier] = useState("")
//   const [product, setProduct] = useState("")
//   const [quantity, setQuantity] = useState("")
//   const [price, setPrice] = useState("")

//   return (
//     <div className="flex flex-col gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">New Purchase Entry</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
//             <div className="flex flex-col gap-1.5">
//               <Label>Supplier Name</Label>
//               <Select value={supplier} onValueChange={setSupplier}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select supplier" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {suppliers.map((s) => (
//                     <SelectItem key={s.id} value={String(s.id)}>
//                       {s.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <Label>Product</Label>
//               <Select value={product} onValueChange={setProduct}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {products.map((p) => (
//                     <SelectItem key={p.id} value={String(p.id)}>
//                       {p.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <Label>Quantity</Label>
//               <Input
//                 type="number"
//                 placeholder="Enter quantity"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <Label>Purchase Price</Label>
//               <Input
//                 type="number"
//                 placeholder="Price per unit"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//             <div className="flex flex-col gap-1.5">
//               <Label>Date</Label>
//               <Input type="date" defaultValue="2026-03-05" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <Button>
//               <Plus className="size-4 mr-1" />
//               Add Purchase
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Purchase History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Supplier</TableHead>
//                 <TableHead>Product</TableHead>
//                 <TableHead className="text-center">Qty</TableHead>
//                 <TableHead className="text-right">Unit Price</TableHead>
//                 <TableHead className="text-right">Total</TableHead>
//                 <TableHead className="hidden sm:table-cell">Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {purchases.map((p) => (
//                 <TableRow key={p.id}>
//                   <TableCell className="font-medium text-foreground">{p.supplier}</TableCell>
//                   <TableCell className="text-muted-foreground">{p.product}</TableCell>
//                   <TableCell className="text-center">{p.quantity}</TableCell>
//                   <TableCell className="text-right text-muted-foreground">
//                     {formatCurrency(p.price)}
//                   </TableCell>
//                   <TableCell className="text-right font-medium text-foreground">
//                     {formatCurrency(p.total)}
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell text-muted-foreground">
//                     {p.date}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Separator className="my-4" />
//           <div className="flex justify-end">
//             <div className="text-sm">
//               <span className="text-muted-foreground mr-2">Total Purchases:</span>
//               <span className="font-bold text-foreground">
//                 {formatCurrency(purchases.reduce((sum, p) => sum + p.total, 0))}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import { Separator } from "@/app/components/ui/separator"
import { Plus } from "lucide-react"

export function PurchaseInterface() {

  const [suppliers, setSuppliers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])

  const [supplier, setSupplier] = useState("")
  const [product, setProduct] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    fetchSuppliers()
    fetchProducts()
    fetchPurchases()
  }, [])

  const fetchSuppliers = async () => {
    const res = await fetch("/api/suppliers")
    const data = await res.json()
    setSuppliers(data)
  }

  const fetchProducts = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    setProducts(data)
  }

  const fetchPurchases = async () => {
    const res = await fetch("/api/purchases")
    const data = await res.json()
    setPurchases(data)
  }

  const addPurchase = async () => {

    const res = await fetch("/api/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supplier,
        product,
        quantity: Number(quantity),
        price: Number(price),
        date,
      }),
    })

    const newPurchase = await res.json()

    setPurchases([...purchases, newPurchase])

    setSupplier("")
    setProduct("")
    setQuantity("")
    setPrice("")
    setDate("")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0)
  }

  return (
    <div className="flex flex-col gap-6">

      <Card>

        <CardHeader>
          <CardTitle className="text-base">New Purchase Entry</CardTitle>
        </CardHeader>

        <CardContent>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

            <div className="flex flex-col gap-1.5">
              <Label>Supplier</Label>

              <Select value={supplier} onValueChange={setSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>

                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            <div className="flex flex-col gap-1.5">

              <Label>Product</Label>

              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>

                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p._id} value={p._id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            <div className="flex flex-col gap-1.5">

              <Label>Quantity</Label>

              <Input
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

            </div>

            <div className="flex flex-col gap-1.5">

              <Label>Purchase Price</Label>

              <Input
                type="number"
                placeholder="Price per unit"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

            </div>

            <div className="flex flex-col gap-1.5">

              <Label>Date</Label>

              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

            </div>

          </div>

          <div className="mt-4">

            <Button onClick={addPurchase}>
              <Plus className="size-4 mr-1" />
              Add Purchase
            </Button>

          </div>

        </CardContent>

      </Card>

      <Card>

        <CardHeader>
          <CardTitle className="text-base">Purchase History</CardTitle>
        </CardHeader>

        <CardContent>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Product</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {purchases.map((p) => (

              <TableRow key={p._id || p.id || Math.random()}>

                  <TableCell>
                    {p.supplier?.name}
                  </TableCell>

                  <TableCell>
                    {p.product?.name}
                  </TableCell>

                  <TableCell className="text-center">
                    {p.quantity}
                  </TableCell>

                  <TableCell className="text-right">
                    {formatCurrency(p.price)}
                  </TableCell>

                  <TableCell className="text-right">
                    {formatCurrency(p.price * p.quantity)}
                  </TableCell>

                  <TableCell>
                    {new Date(p.date).toLocaleDateString()}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

          <Separator className="my-4" />

          <div className="flex justify-end">

            <div className="text-sm">

              <span className="text-muted-foreground mr-2">
                Total Purchases:
              </span>

              <span className="font-bold text-foreground">
                {formatCurrency(
                  purchases.reduce(
                    (sum, p) => sum + p.price * p.quantity,
                    0
                  )
                )}
              </span>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}