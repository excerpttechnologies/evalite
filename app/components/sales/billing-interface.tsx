// "use client"

// import { useState, useEffect } from "react"
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
// import { Plus, Trash2, FileText } from "lucide-react"

// type Product = {
//   _id: string
//   name: string
//   sellingPrice: number
// }

// type Customer = {
//   _id: string
//   name: string
// }

// type InvoiceItem = {
//   id: number
//   productId: string
//   name: string
//   quantity: number
//   price: number
//   total: number
// }

// export function BillingInterface() {

//   const [products, setProducts] = useState<Product[]>([])
//   const [customers, setCustomers] = useState<Customer[]>([])

//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
//   const [discount, setDiscount] = useState("0")
//   const [gstRate, setGstRate] = useState("18")

//   useEffect(() => {
//     fetchProducts()
//     fetchCustomers()
//   }, [])

//   const fetchProducts = async () => {
//     const res = await fetch("/api/products")
//     const data = await res.json()
//     setProducts(data)
//   }

//   const fetchCustomers = async () => {
//     const res = await fetch("/api/customers")
//     const data = await res.json()
//     setCustomers(data)
//   }

//   const addItem = () => {

//     const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1

//     setInvoiceItems([
//       ...invoiceItems,
//       {
//         id: newId,
//         productId: "",
//         name: "",
//         quantity: 1,
//         price: 0,
//         total: 0
//       }
//     ])

//   }

//   const removeItem = (id: number) => {
//     setInvoiceItems(invoiceItems.filter(i => i.id !== id))
//   }

//   const updateItem = (id: number, field: string, value: string | number) => {

//     setInvoiceItems(
//       invoiceItems.map(item => {

//         if (item.id !== id) return item

//         if (field === "productId") {

//           const product = products.find(p => p._id === value)

//           if (product) {

//             return {
//               ...item,
//               productId: product._id,
//               name: product.name,
//               price: product.sellingPrice,
//               total: item.quantity * product.sellingPrice
//             }

//           }

//         }

//         if (field === "quantity") {

//           const qty = Number(value)

//           return {
//             ...item,
//             quantity: qty,
//             total: qty * item.price
//           }

//         }

//         return item

//       })
//     )

//   }

//   const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)

//   const discountAmount = Number(discount) || 0

//   const gstAmount = Math.round(
//     ((subtotal - discountAmount) * Number(gstRate)) / 100
//   )

//   const grandTotal = subtotal - discountAmount + gstAmount

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount)
//   }

//   const saveInvoice = async () => {

//     if (!selectedCustomer) {
//       alert("Select customer")
//       return
//     }

//     for (const item of invoiceItems) {

//       await fetch("/api/sales", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           customer: selectedCustomer,
//           product: item.productId,
//           quantity: item.quantity,
//           price: item.price
//         })
//       })

//     }

//     alert("Invoice saved successfully")

//     setInvoiceItems([])
//   }

//   return (
//     <div className="grid gap-4 lg:grid-cols-5">

//       {/* Left Side */}

//       <div className="lg:col-span-3">

//         <Card>

//           <CardHeader>
//             <CardTitle>New Invoice</CardTitle>
//           </CardHeader>

//           <CardContent className="flex flex-col gap-4">

//             <div className="grid sm:grid-cols-2 gap-4">

//               <div>
//                 <Label>Select Customer</Label>

//                 <Select
//                   value={selectedCustomer}
//                   onValueChange={setSelectedCustomer}
//                 >

//                   <SelectTrigger>
//                     <SelectValue placeholder="Choose customer" />
//                   </SelectTrigger>

//                   <SelectContent>

//                     {customers.map(c => (
//                       <SelectItem key={c._id} value={c._id}>
//                         {c.name}
//                       </SelectItem>
//                     ))}

//                   </SelectContent>

//                 </Select>

//               </div>

//             </div>

//             <Separator />

//             <div>

//               <div className="flex justify-between mb-3">

//                 <h3 className="text-sm font-medium">
//                   Items
//                 </h3>

//                 <Button size="sm" onClick={addItem}>
//                   <Plus className="size-4 mr-1"/>
//                   Add Item
//                 </Button>

//               </div>

//               <Table>

//                 <TableHeader>

//                   <TableRow>
//                     <TableHead>Product</TableHead>
//                     <TableHead>Qty</TableHead>
//                     <TableHead>Price</TableHead>
//                     <TableHead>Total</TableHead>
//                     <TableHead></TableHead>
//                   </TableRow>

//                 </TableHeader>

//                 <TableBody>

//                   {invoiceItems.map(item => (

//                     <TableRow key={item.id}>

//                       <TableCell>

//                         <Select
//                           value={item.productId}
//                           onValueChange={v => updateItem(item.id,"productId",v)}
//                         >

//                           <SelectTrigger>
//                             <SelectValue placeholder="Select product"/>
//                           </SelectTrigger>

//                           <SelectContent>

//                             {products.map(p => (
//                               <SelectItem key={p._id} value={p._id}>
//                                 {p.name}
//                               </SelectItem>
//                             ))}

//                           </SelectContent>

//                         </Select>

//                       </TableCell>

//                       <TableCell>

//                         <Input
//                           type="number"
//                           value={item.quantity}
//                           onChange={e =>
//                             updateItem(item.id,"quantity",e.target.value)
//                           }
//                         />

//                       </TableCell>

//                       <TableCell>
//                         {formatCurrency(item.price)}
//                       </TableCell>

//                       <TableCell>
//                         {formatCurrency(item.total)}
//                       </TableCell>

//                       <TableCell>

//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => removeItem(item.id)}
//                         >
//                           <Trash2 className="size-4 text-red-500"/>
//                         </Button>

//                       </TableCell>

//                     </TableRow>

//                   ))}

//                 </TableBody>

//               </Table>

//             </div>

//             <Separator />

//             <div className="grid sm:grid-cols-2 gap-4">

//               <div>

//                 <Label>Discount</Label>

//                 <Input
//                   type="number"
//                   value={discount}
//                   onChange={e => setDiscount(e.target.value)}
//                 />

//               </div>

//               <div>

//                 <Label>GST %</Label>

//                 <Input
//                   type="number"
//                   value={gstRate}
//                   onChange={e => setGstRate(e.target.value)}
//                 />

//               </div>

//             </div>

//           </CardContent>

//         </Card>

//       </div>

//       {/* Right Side */}

//       <div className="lg:col-span-2">

//         <Card>

//           <CardHeader>
//             <CardTitle>Invoice Summary</CardTitle>
//           </CardHeader>

//           <CardContent className="flex flex-col gap-3">

//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>{formatCurrency(subtotal)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Discount</span>
//               <span>-{formatCurrency(discountAmount)}</span>
//             </div>

//             <div className="flex justify-between">
//               <span>GST</span>
//               <span>{formatCurrency(gstAmount)}</span>
//             </div>

//             <Separator/>

//             <div className="flex justify-between font-bold">
//               <span>Total</span>
//               <span>{formatCurrency(grandTotal)}</span>
//             </div>

//             <Button onClick={saveInvoice} className="mt-4">
//               <FileText className="size-4 mr-2"/>
//               Generate Invoice
//             </Button>

//           </CardContent>

//         </Card>

//       </div>

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
import { Plus, Trash2, FileText } from "lucide-react"

type Product = {
  _id: string
  name: string
  sellingPrice: number
}

type Customer = {
  _id: string
  name: string
}

type InvoiceItem = {
  id: number
  productId: string
  name: string
  quantity: number
  price: number
  total: number
}

export function BillingInterface() {

  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])

  const [selectedCustomer, setSelectedCustomer] = useState("")
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
  const [discount, setDiscount] = useState("0")
  const [gstRate, setGstRate] = useState("18")

  useEffect(() => {
    fetchProducts()
    fetchCustomers()
  }, [])

  const fetchProducts = async () => {
    const res = await fetch("/api/products")
    const data = await res.json()
    setProducts(data)
  }

  const fetchCustomers = async () => {
    const res = await fetch("/api/customers")
    const data = await res.json()
    setCustomers(data)
  }

  const addItem = () => {

    const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1

    setInvoiceItems([
      ...invoiceItems,
      {
        id: newId,
        productId: "",
        name: "",
        quantity: 1,
        price: 0,
        total: 0
      }
    ])

  }

  const removeItem = (id: number) => {
    setInvoiceItems(invoiceItems.filter(i => i.id !== id))
  }

  const updateItem = (id: number, field: string, value: string | number) => {

    setInvoiceItems(
      invoiceItems.map(item => {

        if (item.id !== id) return item

        if (field === "productId") {

          const product = products.find(p => p._id === value)

          if (product) {

            return {
              ...item,
              productId: product._id,
              name: product.name,
              price: product.sellingPrice,
              total: item.quantity * product.sellingPrice
            }

          }

        }

        if (field === "quantity") {

          const qty = Number(value)

          return {
            ...item,
            quantity: qty,
            total: qty * item.price
          }

        }

        return item

      })
    )

  }

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)

  const discountAmount = Number(discount) || 0

  const gstAmount = Math.round(
    ((subtotal - discountAmount) * Number(gstRate)) / 100
  )

  const grandTotal = subtotal - discountAmount + gstAmount

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

  // const saveInvoice = async () => {

  //   if (!selectedCustomer) {
  //     alert("Select customer")
  //     return
  //   }

  //   for (const item of invoiceItems) {

  //     await fetch("/api/sales", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         customer: selectedCustomer,
  //         product: item.productId,
  //         quantity: item.quantity,
  //         price: item.price
  //       })
  //     })

  //   }

  //   alert("Invoice saved successfully")

  //   setInvoiceItems([])
  // }


  const saveInvoice = async () => {

  if (!selectedCustomer) {
    alert("Select customer")
    return
  }

  if (invoiceItems.length === 0) {
    alert("Add at least one product")
    return
  }

  for (const item of invoiceItems) {

    if (!item.productId) {
      alert("Please select product")
      return
    }

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customer: selectedCustomer,
        product: item.productId,
        quantity: Number(item.quantity),
        price: Number(item.price)
      })
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(data)
      alert("Error creating sale")
      return
    }

  }

  alert("Invoice saved successfully")
  setInvoiceItems([])
}
  return (
    <div className="grid gap-4 lg:grid-cols-5">

      {/* Left Side */}

      <div className="lg:col-span-3">

        <Card>

          <CardHeader>
            <CardTitle>New Invoice</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">

            <div className="grid sm:grid-cols-2 gap-4">

              <div>
                <Label>Select Customer</Label>

                <Select
                  value={selectedCustomer}
                  onValueChange={setSelectedCustomer}
                >

                  <SelectTrigger>
                    <SelectValue placeholder="Choose customer" />
                  </SelectTrigger>

                  <SelectContent>

                    {customers.map(c => (
                      <SelectItem key={c._id} value={c._id}>
                        {c.name}
                      </SelectItem>
                    ))}

                  </SelectContent>

                </Select>

              </div>

            </div>

            <Separator />

            <div>

              <div className="flex justify-between mb-3">

                <h3 className="text-sm font-medium">
                  Items
                </h3>

                <Button size="sm" onClick={addItem}>
                  <Plus className="size-4 mr-1"/>
                  Add Item
                </Button>

              </div>

              <Table>

                <TableHeader>

                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>

                </TableHeader>

                <TableBody>

                  {invoiceItems.map(item => (

                    <TableRow key={item.id}>

                      <TableCell>

                        <Select
                          value={item.productId}
                          onValueChange={v => updateItem(item.id,"productId",v)}
                        >

                          <SelectTrigger>
                            <SelectValue placeholder="Select product"/>
                          </SelectTrigger>

                          <SelectContent>

                            {products.map(p => (
                              <SelectItem key={p._id} value={p._id}>
                                {p.name}
                              </SelectItem>
                            ))}

                          </SelectContent>

                        </Select>

                      </TableCell>

                      <TableCell>

                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={e =>
                            updateItem(item.id,"quantity",e.target.value)
                          }
                        />

                      </TableCell>

                      <TableCell>
                        {formatCurrency(item.price)}
                      </TableCell>

                      <TableCell>
                        {formatCurrency(item.total)}
                      </TableCell>

                      <TableCell>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="size-4 text-red-500"/>
                        </Button>

                      </TableCell>

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </div>

            <Separator />

            <div className="grid sm:grid-cols-2 gap-4">

              <div>

                <Label>Discount</Label>

                <Input
                  type="number"
                  value={discount}
                  onChange={e => setDiscount(e.target.value)}
                />

              </div>

              <div>

                <Label>GST %</Label>

                <Input
                  type="number"
                  value={gstRate}
                  onChange={e => setGstRate(e.target.value)}
                />

              </div>

            </div>

          </CardContent>

        </Card>

      </div>

      {/* Right Side */}

      <div className="lg:col-span-2">

        <Card>

          <CardHeader>
            <CardTitle>Invoice Summary</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span>-{formatCurrency(discountAmount)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>{formatCurrency(gstAmount)}</span>
            </div>

            <Separator/>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <Button onClick={saveInvoice} className="mt-4">
              <FileText className="size-4 mr-2"/>
              Generate Invoice
            </Button>

          </CardContent>

        </Card>

      </div>

    </div>
  )
}