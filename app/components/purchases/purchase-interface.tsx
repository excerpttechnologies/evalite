
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
// import { Plus } from "lucide-react"

// export function PurchaseInterface() {

//   const [suppliers, setSuppliers] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [purchases, setPurchases] = useState<any[]>([])

//   const [supplier, setSupplier] = useState("")
//   const [product, setProduct] = useState("")
//   const [quantity, setQuantity] = useState("")
//   const [price, setPrice] = useState("")
//   const [date, setDate] = useState("")

//   useEffect(() => {
//     fetchSuppliers()
//     fetchProducts()
//     fetchPurchases()
//   }, [])

//   const fetchSuppliers = async () => {
//     const res = await fetch("/api/suppliers")
//     const data = await res.json()
//     setSuppliers(data)
//   }

//   const fetchProducts = async () => {
//     const res = await fetch("/api/products")
//     const data = await res.json()
//     setProducts(data)
//   }

//   const fetchPurchases = async () => {
//     const res = await fetch("/api/purchases")
//     const data = await res.json()
//     setPurchases(data)
//   }

//   const addPurchase = async () => {

//     const res = await fetch("/api/purchases", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         supplier,
//         product,
//         quantity: Number(quantity),
//         price: Number(price),
//         date,
//       }),
//     })

//     const newPurchase = await res.json()

//     setPurchases([...purchases, newPurchase])

//     setSupplier("")
//     setProduct("")
//     setQuantity("")
//     setPrice("")
//     setDate("")
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount || 0)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       <Card>

//         <CardHeader>
//           <CardTitle className="text-base">New Purchase Entry</CardTitle>
//         </CardHeader>

//         <CardContent>

//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

//             <div className="flex flex-col gap-1.5">
//               <Label>Supplier</Label>

//               <Select value={supplier} onValueChange={setSupplier}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select supplier" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   {suppliers.map((s) => (
//                     <SelectItem key={s._id} value={s._id}>
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
//                     <SelectItem key={p._id} value={p._id}>
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

//               <Input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//               />

//             </div>

//           </div>

//           <div className="mt-4">

//             <Button onClick={addPurchase}>
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
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>

//               {purchases.map((p) => (

//               <TableRow key={p._id || p.id || Math.random()}>

//                   <TableCell>
//                     {p.supplier?.name}
//                   </TableCell>

//                   <TableCell>
//                     {p.product?.name}
//                   </TableCell>

//                   <TableCell className="text-center">
//                     {p.quantity}
//                   </TableCell>

//                   <TableCell className="text-right">
//                     {formatCurrency(p.price)}
//                   </TableCell>

//                   <TableCell className="text-right">
//                     {formatCurrency(p.price * p.quantity)}
//                   </TableCell>

//                   <TableCell>
//                     {new Date(p.date).toLocaleDateString()}
//                   </TableCell>

//                 </TableRow>

//               ))}

//             </TableBody>

//           </Table>

//           <Separator className="my-4" />

//           <div className="flex justify-end">

//             <div className="text-sm">

//               <span className="text-muted-foreground mr-2">
//                 Total Purchases:
//               </span>

//               <span className="font-bold text-foreground">
//                 {formatCurrency(
//                   purchases.reduce(
//                     (sum, p) => sum + p.price * p.quantity,
//                     0
//                   )
//                 )}
//               </span>

//             </div>

//           </div>

//         </CardContent>

//       </Card>

//     </div>
//   )
// }








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
// import { Plus } from "lucide-react"

// export function PurchaseInterface() {

//   const [suppliers, setSuppliers] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [purchases, setPurchases] = useState<any[]>([])

//   const [supplier, setSupplier] = useState("")
//   const [product, setProduct] = useState("")
//   const [quantity, setQuantity] = useState("")
//   const [price, setPrice] = useState("")
//   const [date, setDate] = useState("")

//   // ✅ Validation error state
//   const [errors, setErrors] = useState<Record<string, string>>({})

//   useEffect(() => {
//     fetchSuppliers()
//     fetchProducts()
//     fetchPurchases()
//   }, [])

//   const fetchSuppliers = async () => {
//     const res = await fetch("/api/suppliers")
//     const data = await res.json()
//     setSuppliers(data)
//   }

//   const fetchProducts = async () => {
//     const res = await fetch("/api/products")
//     const data = await res.json()
//     setProducts(data)
//   }

//   const fetchPurchases = async () => {
//     const res = await fetch("/api/purchases")
//     const data = await res.json()
//     setPurchases(Array.isArray(data) ? data : [])
//   }

//   const validate = () => {
//     const newErrors: Record<string, string> = {}

//     if (!supplier)               newErrors.supplier = "Supplier is required"
//     if (!product)                newErrors.product  = "Product is required"
//     if (!quantity || Number(quantity) <= 0) newErrors.quantity = "Enter a valid quantity"
//     if (!price || Number(price) <= 0)       newErrors.price    = "Enter a valid price"
//     if (!date)                   newErrors.date     = "Date is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const addPurchase = async () => {
//     // ✅ Stop if validation fails
//     if (!validate()) return

//     const res = await fetch("/api/purchases", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         supplier,
//         product,
//         quantity: Number(quantity),
//         price: Number(price),
//         date,
//       }),
//     })

//     const newPurchase = await res.json()
//     setPurchases([...purchases, newPurchase])

//     setSupplier(""); setProduct(""); setQuantity(""); setPrice(""); setDate("")
//     setErrors({})
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount || 0)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">New Purchase Entry</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

//             {/* Supplier */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Supplier</Label>
//               <Select value={supplier} onValueChange={v => { setSupplier(v); setErrors(e => ({ ...e, supplier: "" })) }}>
//                 <SelectTrigger className={errors.supplier ? "border-destructive" : ""}>
//                   <SelectValue placeholder="Select supplier" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {suppliers.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               {errors.supplier && <p className="text-xs text-destructive">{errors.supplier}</p>}
//             </div>

//             {/* Product */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Product</Label>
//               <Select value={product} onValueChange={v => { setProduct(v); setErrors(e => ({ ...e, product: "" })) }}>
//                 <SelectTrigger className={errors.product ? "border-destructive" : ""}>
//                   <SelectValue placeholder="Select product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               {errors.product && <p className="text-xs text-destructive">{errors.product}</p>}
//             </div>

//             {/* Quantity */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Quantity</Label>
//               <Input
//                 type="number"
//                 placeholder="Enter quantity"
//                 value={quantity}
//                 className={errors.quantity ? "border-destructive" : ""}
//                 onChange={e => { setQuantity(e.target.value); setErrors(er => ({ ...er, quantity: "" })) }}
//               />
//               {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
//             </div>

//             {/* Price */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Purchase Price</Label>
//               <Input
//                 type="number"
//                 placeholder="Price per unit"
//                 value={price}
//                 className={errors.price ? "border-destructive" : ""}
//                 onChange={e => { setPrice(e.target.value); setErrors(er => ({ ...er, price: "" })) }}
//               />
//               {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
//             </div>

//             {/* Date */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Date</Label>
//               <Input
//                 type="date"
//                 value={date}
//                 className={errors.date ? "border-destructive" : ""}
//                 onChange={e => { setDate(e.target.value); setErrors(er => ({ ...er, date: "" })) }}
//               />
//               {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
//             </div>

//           </div>

//           <div className="mt-4">
//             <Button onClick={addPurchase}>
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
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {purchases.map(p => (
//                 <TableRow key={p._id || Math.random()}>
//                   <TableCell>{p.supplier?.name}</TableCell>
//                   <TableCell>{p.product?.name}</TableCell>
//                   <TableCell className="text-center">{p.quantity}</TableCell>
//                   <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
//                   <TableCell className="text-right">{formatCurrency(p.price * p.quantity)}</TableCell>
//                   <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Separator className="my-4" />

//           <div className="flex justify-end">
//             <div className="text-sm">
//               <span className="text-muted-foreground mr-2">Total Purchases:</span>
//               <span className="font-bold text-foreground">
//                 {formatCurrency(purchases.reduce((sum, p) => sum + p.price * p.quantity, 0))}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   )
// }




//aravind

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/app/components/ui/select"
// import {
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
// } from "@/app/components/ui/table"
// import { Separator } from "@/app/components/ui/separator"
// import { Plus } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// export function PurchaseInterface() {
//   const [suppliers, setSuppliers] = useState<any[]>([])
//   const [products, setProducts] = useState<any[]>([])
//   const [purchases, setPurchases] = useState<any[]>([])

//   const [supplier, setSupplier] = useState("")
//   const [product, setProduct] = useState("")
//   const [quantity, setQuantity] = useState("")
//   const [price, setPrice] = useState("")
//   const [date, setDate] = useState("")

//   const [errors, setErrors] = useState<Record<string, string>>({})

//   useEffect(() => {
//     fetchSuppliers()
//     fetchProducts()
//     fetchPurchases()
//   }, [])

//   const fetchSuppliers = async () => {
//     const res = await authFetch("/api/suppliers") // ✅
//     const data = await res.json()
//     setSuppliers(data)
//   }

//   const fetchProducts = async () => {
//     const res = await authFetch("/api/products") // ✅
//     const data = await res.json()
//     setProducts(data)
//   }

//   const fetchPurchases = async () => {
//     const res = await authFetch("/api/purchases") // ✅
//     const data = await res.json()
//     setPurchases(Array.isArray(data) ? data : [])
//   }

//   const validate = () => {
//     const newErrors: Record<string, string> = {}
//     if (!supplier)                      newErrors.supplier = "Supplier is required"
//     if (!product)                       newErrors.product  = "Product is required"
//     if (!quantity || Number(quantity) <= 0) newErrors.quantity = "Enter a valid quantity"
//     if (!price || Number(price) <= 0)   newErrors.price    = "Enter a valid price"
//     if (!date)                          newErrors.date     = "Date is required"
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const addPurchase = async () => {
//     if (!validate()) return

//     const res = await authFetch("/api/purchases", { // ✅
//       method: "POST",
//       body: JSON.stringify({
//         supplier,
//         product,
//         quantity: Number(quantity),
//         price: Number(price),
//         date,
//       }),
//     })

//     const newPurchase = await res.json()
//     setPurchases([...purchases, newPurchase])
//     setSupplier(""); setProduct(""); setQuantity(""); setPrice(""); setDate("")
//     setErrors({})
//   }

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0)

//   return (
//     <div className="flex flex-col gap-6">

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">New Purchase Entry</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

//             {/* Supplier */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Supplier</Label>
//               <Select value={supplier} onValueChange={v => { setSupplier(v); setErrors(e => ({ ...e, supplier: "" })) }}>
//                 <SelectTrigger className={errors.supplier ? "border-destructive" : ""}>
//                   <SelectValue placeholder="Select supplier" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {suppliers.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               {errors.supplier && <p className="text-xs text-destructive">{errors.supplier}</p>}
//             </div>

//             {/* Product */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Product</Label>
//               <Select value={product} onValueChange={v => { setProduct(v); setErrors(e => ({ ...e, product: "" })) }}>
//                 <SelectTrigger className={errors.product ? "border-destructive" : ""}>
//                   <SelectValue placeholder="Select product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               {errors.product && <p className="text-xs text-destructive">{errors.product}</p>}
//             </div>

//             {/* Quantity */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Quantity</Label>
//               <Input
//                 type="number"
//                 placeholder="Enter quantity"
//                 value={quantity}
//                 className={errors.quantity ? "border-destructive" : ""}
//                 onChange={e => { setQuantity(e.target.value); setErrors(er => ({ ...er, quantity: "" })) }}
//               />
//               {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
//             </div>

//             {/* Price */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Purchase Price</Label>
//               <Input
//                 type="number"
//                 placeholder="Price per unit"
//                 value={price}
//                 className={errors.price ? "border-destructive" : ""}
//                 onChange={e => { setPrice(e.target.value); setErrors(er => ({ ...er, price: "" })) }}
//               />
//               {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
//             </div>

//             {/* Date */}
//             <div className="flex flex-col gap-1.5">
//               <Label>Date</Label>
//               <Input
//                 type="date"
//                 value={date}
//                 className={errors.date ? "border-destructive" : ""}
//                 onChange={e => { setDate(e.target.value); setErrors(er => ({ ...er, date: "" })) }}
//               />
//               {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
//             </div>

//           </div>

//           <div className="mt-4">
//             <Button onClick={addPurchase}>
//               <Plus className="size-4 mr-1" />Add Purchase
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
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {purchases.map(p => (
//                 <TableRow key={p._id || Math.random()}>
//                   <TableCell>{p.supplier?.name}</TableCell>
//                   <TableCell>{p.product?.name}</TableCell>
//                   <TableCell className="text-center">{p.quantity}</TableCell>
//                   <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
//                   <TableCell className="text-right">{formatCurrency(p.price * p.quantity)}</TableCell>
//                   <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <Separator className="my-4" />

//           <div className="flex justify-end">
//             <div className="text-sm">
//               <span className="text-muted-foreground mr-2">Total Purchases:</span>
//               <span className="font-bold text-foreground">
//                 {formatCurrency(purchases.reduce((sum, p) => sum + p.price * p.quantity, 0))}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//     </div>
//   )
// }





//aravind


// "use client"

// import { useState, useEffect, useRef, useCallback } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Label } from "@/app/components/ui/label"
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/app/components/ui/select"
// import {
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
// } from "@/app/components/ui/table"
// import { Separator } from "@/app/components/ui/separator"
// import { Plus } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch"

// type AdRecord = {
//   _id: string
//   adName: string
//   clickLink: string
//   contact?: string
//   mediaPaths: string[]
//   mediaTypes: string[]
//   isActive: boolean
// }

// type Slide = {
//   adName: string
//   clickLink: string
//   contact?: string
//   src: string
//   type: "image" | "video"
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // VERTICAL SIDEBAR AD — fixed right side, portrait image, auto-slides 3s
// // ─────────────────────────────────────────────────────────────────────────────
// function SidebarAd() {
//   const [slides, setSlides]   = useState<Slide[]>([])
//   const [cur, setCur]         = useState(0)
//   const [closed, setClosed]   = useState(false)
//   const [fadeKey, setFadeKey] = useState(0)
//   const timerRef = useRef<NodeJS.Timeout | null>(null)

//   useEffect(() => {
//     fetch("/api/admin/ads?active=true")
//       .then((r) => r.json())
//       .then((d) => {
//         if (!d.success || !d.ads?.length) return
//         const flat: Slide[] = []
//         ;(d.ads as AdRecord[]).forEach((ad) => {
//           ad.mediaPaths.forEach((src, i) => {
//             flat.push({
//               adName: ad.adName,
//               clickLink: ad.clickLink,
//               contact: ad.contact,
//               src,
//               type: (ad.mediaTypes[i] as "image" | "video") || "image",
//             })
//           })
//         })
//         setSlides(flat)
//       })
//       .catch(() => {})
//   }, [])

//   const goNext = useCallback(() => {
//     setCur((p) => (p + 1) % slides.length)
//     setFadeKey((k) => k + 1)
//   }, [slides.length])

//   useEffect(() => {
//     if (slides.length < 2 || closed) return
//     timerRef.current = setInterval(goNext, 3000)
//     return () => { if (timerRef.current) clearInterval(timerRef.current) }
//   }, [slides.length, closed, goNext])

//   if (closed || !slides.length) return null

//   const slide = slides[cur]

//   const handleVisit = () => window.open(slide.clickLink, "_blank", "noopener noreferrer")
//   const handleCall  = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     if (!slide.contact) return
//     const phone = slide.contact.replace(/[^0-9+]/g, "")
//     if (phone.length >= 7) window.location.href = `tel:${phone}`
//     else window.open(slide.contact, "_blank", "noopener noreferrer")
//   }
//   const manualGo = (idx: number) => {
//     if (timerRef.current) clearInterval(timerRef.current)
//     setCur(idx); setFadeKey((k) => k + 1)
//     if (slides.length > 1) timerRef.current = setInterval(goNext, 3000)
//   }

//   return (
//     <>
//     <style>{`
// @keyframes sAdFade { from{opacity:0} to{opacity:1} }
// @keyframes sAdProg { from{width:0%} to{width:100%} }

// /* ── BOTTOM AD WRAPPER ── */
// .sad-wrap{
//   width:100%;
//   display:flex;
//   justify-content:center;
//   margin-top:20px;
//   font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;
// }

// /* AD CARD */
// .sad-card{
//   width:100%;
//   max-width:1100px;
//   background:#ffffff;
//   border:1px solid #e5e7eb;
//   border-radius:12px;
//   box-shadow:0 4px 18px rgba(0,0,0,0.06);
//   overflow:hidden;
//   display:flex;
//   align-items:center;
//   position:relative;
// }

// /* AD LABEL */
// .sad-label{
//   position:absolute;
//   top:8px;
//   left:8px;
//   background:#f97316;
//   color:#fff;
//   font-size:9px;
//   font-weight:700;
//   padding:3px 6px;
//   border-radius:4px;
//   letter-spacing:0.08em;
// }

// /* IMAGE WRAPPER */
// .sad-img-wrap{
//   width:65%;
//   height:120px;
//   overflow:hidden;
//   cursor:pointer;
//   background:#f3f4f6;
// }

// .sad-img-wrap img,
// .sad-img-wrap video{
//   width:100%;
//   height:100%;
//   object-fit:cover;
//   display:block;
//   animation:sAdFade .4s ease both;
// }

// /* PROGRESS BAR */
// .sad-progress-track{
//   position:absolute;
//   left:0;
//   bottom:0;
//   height:3px;
//   width:100%;
//   background:#fde7d6;
// }

// .sad-progress-fill{
//   height:100%;
//   background:#f97316;
//   animation:sAdProg 3s linear both;
// }

// /* INFO AREA */
// .sad-info{
//   width:35%;
//   padding:14px;
//   display:flex;
//   flex-direction:column;
//   gap:6px;
// }

// .sad-sponsored{
//   font-size:10px;
//   font-weight:700;
//   color:#f97316;
// }

// .sad-name{
//   font-size:14px;
//   font-weight:700;
//   color:#111827;
//   cursor:pointer;
// }

// .sad-contact{
//   font-size:12px;
//   color:#6b7280;
// }

// /* BUTTONS */
// .sad-btn{
//   height:30px;
//   border:none;
//   border-radius:6px;
//   font-size:12px;
//   font-weight:600;
//   cursor:pointer;
// }

// .sad-btn.visit{
//   background:#f97316;
//   color:white;
// }

// .sad-btn.call{
//   background:#16a34a;
//   color:white;
// }

// /* DOTS */
// .sad-dots{
//   display:flex;
//   gap:5px;
//   margin-top:4px;
// }

// .sad-dot{
//   width:6px;
//   height:6px;
//   border-radius:50%;
//   background:#e5e7eb;
// }

// .sad-dot.active{
//   background:#f97316;
// }

// /* CLOSE BUTTON */
// .sad-close{
//   position:absolute;
//   top:8px;
//   right:8px;
//   width:20px;
//   height:20px;
//   border-radius:50%;
//   border:none;
//   background:#f3f4f6;
//   cursor:pointer;
// }
// `}</style>

//       <div className="sad-wrap">
//         <div className="sad-card">

//           {/* top AD label */}
//           <div className="sad-label">✦ AD ✦</div>

//           {/* portrait image / video */}
//           <div className="sad-img-wrap" onClick={handleVisit}>
//             {slide.type === "video"
//               ? <video key={`${slide.src}-${fadeKey}`} src={slide.src} muted autoPlay loop playsInline />
//               : <img   key={`${slide.src}-${fadeKey}`} src={slide.src} alt={slide.adName} loading="lazy" />
//             }
//             {/* vertical progress bar */}
//             {slides.length > 1 && (
//               <div className="sad-progress-track">
//                 <div key={`pr-${cur}-${fadeKey}`} className="sad-progress-fill" />
//               </div>
//             )}
//           </div>

//           {/* info */}
//           <div className="sad-info">
//             <div className="sad-sponsored"><div className="sad-sp-dot"/>Sponsored</div>
//             <div className="sad-name" onClick={handleVisit} title={slide.adName}>{slide.adName}</div>

//             {slide.contact && (
//               <div className="sad-contact">
//                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                   <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
//                 </svg>
//                 {slide.contact}
//               </div>
//             )}

//             {/* buttons */}
//             <button className="sad-btn visit" onClick={handleVisit}>
//               <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                 <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
//                 <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
//               </svg>
//               Visit
//             </button>

//             {slide.contact && (
//               <button className="sad-btn call" onClick={handleCall}>
//                 <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                   <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
//                 </svg>
//                 Call
//               </button>
//             )}

//             {/* slide dots */}
//             {slides.length > 1 && (
//               <div className="sad-dots">
//                 {slides.map((_, i) => (
//                   <button key={i} className={`sad-dot${i === cur ? " active" : ""}`} onClick={() => manualGo(i)} />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* close */}
//           <button className="sad-close" onClick={() => setClosed(true)}>✕</button>
//         </div>
//       </div>
//     </>
//   )
// }

// // ─────────────────────────────────────────────────────────────────────────────
// // PURCHASE INTERFACE
// // ─────────────────────────────────────────────────────────────────────────────
// export function PurchaseInterface() {
//   const [suppliers, setSuppliers] = useState<any[]>([])
//   const [products,  setProducts]  = useState<any[]>([])
//   const [purchases, setPurchases] = useState<any[]>([])

//   const [supplier, setSupplier] = useState("")
//   const [product,  setProduct]  = useState("")
//   const [quantity, setQuantity] = useState("")
//   const [price,    setPrice]    = useState("")
//   const [date,     setDate]     = useState("")
//   const [errors,   setErrors]   = useState<Record<string, string>>({})

//   useEffect(() => {
//     fetchSuppliers()
//     fetchProducts()
//     fetchPurchases()
//   }, [])

//   const fetchSuppliers = async () => {
//     const res = await authFetch("/api/suppliers")
//     setSuppliers(await res.json())
//   }
//   const fetchProducts = async () => {
//     const res = await authFetch("/api/products")
//     setProducts(await res.json())
//   }
//   const fetchPurchases = async () => {
//     const res  = await authFetch("/api/purchases")
//     const data = await res.json()
//     setPurchases(Array.isArray(data) ? data : [])
//   }

//   const validate = () => {
//     const e: Record<string, string> = {}
//     if (!supplier)                          e.supplier = "Supplier is required"
//     if (!product)                           e.product  = "Product is required"
//     if (!quantity || Number(quantity) <= 0) e.quantity = "Enter a valid quantity"
//     if (!price    || Number(price)    <= 0) e.price    = "Enter a valid price"
//     if (!date)                              e.date     = "Date is required"
//     setErrors(e)
//     return !Object.keys(e).length
//   }

//   const addPurchase = async () => {
//     if (!validate()) return
//     const res = await authFetch("/api/purchases", {
//       method: "POST",
//       body: JSON.stringify({
//         supplier, product,
//         quantity: Number(quantity),
//         price: Number(price),
//         date,
//       }),
//     })
//     const newPurchase = await res.json()
//     setPurchases([...purchases, newPurchase])
//     setSupplier(""); setProduct(""); setQuantity(""); setPrice(""); setDate("")
//     setErrors({})
//   }

//   const fmt = (n: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n || 0)

//   return (
//     <div className="flex flex-col gap-6">

//       {/* NEW PURCHASE ENTRY */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">New Purchase Entry</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

//             <div className="flex flex-col gap-1.5">
//               <Label>Supplier</Label>
//               <Select value={supplier} onValueChange={v => { setSupplier(v); setErrors(e => ({ ...e, supplier: "" })) }}>
//                 <SelectTrigger className={errors.supplier ? "border-destructive" : ""}>
//                   <SelectValue placeholder="Select supplier" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {suppliers.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               {errors.supplier && <p className="text-xs text-destructive">{errors.supplier}</p>}
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Product</Label>
//               <Select value={product} onValueChange={v => { setProduct(v); setErrors(e => ({ ...e, product: "" })) }}>
//                 <SelectTrigger className={errors.product ? "border-destructive" : ""}>
//                   <SelectValue placeholder="Select product" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                 </SelectContent>
//               </Select>
//               {errors.product && <p className="text-xs text-destructive">{errors.product}</p>}
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Quantity</Label>
//               <Input type="number" placeholder="Enter quantity" value={quantity}
//                 className={errors.quantity ? "border-destructive" : ""}
//                 onChange={e => { setQuantity(e.target.value); setErrors(er => ({ ...er, quantity: "" })) }} />
//               {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Purchase Price</Label>
//               <Input type="number" placeholder="Price per unit" value={price}
//                 className={errors.price ? "border-destructive" : ""}
//                 onChange={e => { setPrice(e.target.value); setErrors(er => ({ ...er, price: "" })) }} />
//               {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
//             </div>

//             <div className="flex flex-col gap-1.5">
//               <Label>Date</Label>
//               <Input type="date" value={date}
//                 className={errors.date ? "border-destructive" : ""}
//                 onChange={e => { setDate(e.target.value); setErrors(er => ({ ...er, date: "" })) }} />
//               {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
//             </div>

//           </div>
//           <div className="mt-4">
//             <Button onClick={addPurchase}><Plus className="size-4 mr-1" />Add Purchase</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* PURCHASE HISTORY */}
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
//                 <TableHead>Date</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {purchases.map(p => (
//                 <TableRow key={p._id || Math.random()}>
//                   <TableCell>{p.supplier?.name}</TableCell>
//                   <TableCell>{p.product?.name}</TableCell>
//                   <TableCell className="text-center">{p.quantity}</TableCell>
//                   <TableCell className="text-right">{fmt(p.price)}</TableCell>
//                   <TableCell className="text-right">{fmt(p.price * p.quantity)}</TableCell>
//                   <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <Separator className="my-4" />
//           <div className="flex justify-end">
//             <div className="text-sm">
//               <span className="text-muted-foreground mr-2">Total Purchases:</span>
//               <span className="font-bold text-foreground">
//                 {fmt(purchases.reduce((sum, p) => sum + p.price * p.quantity, 0))}
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* VERTICAL SIDEBAR AD — fixed right */}
//       <SidebarAd />

//     </div>
//   )
// }


////jay

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/app/components/ui/table"
import { Separator } from "@/app/components/ui/separator"
import { Plus, Package, Truck, Calendar, IndianRupee, TrendingUp, X } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"
import {motion} from "framer-motion"
type AdRecord = {
  _id: string
  adName: string
  clickLink: string
  contact?: string
  mediaPaths: string[]
  mediaTypes: string[]
  isActive: boolean
}

type Slide = {
  adName: string
  clickLink: string
  contact?: string
  src: string
  type: "image" | "video"
}

// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL SIDEBAR AD — Modern design with minimal styling
// ─────────────────────────────────────────────────────────────────────────────
function SidebarAd() {
  const [slides, setSlides]   = useState<Slide[]>([])
  const [cur, setCur]         = useState(0)
  const [closed, setClosed]   = useState(false)
  const [fadeKey, setFadeKey] = useState(0)
  const [isClosing, setIsClosing] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetch("/api/admin/ads?active=true")
      .then((r) => r.json())
      .then((d) => {
        if (!d.success || !d.ads?.length) return
        const flat: Slide[] = []
        ;(d.ads as AdRecord[]).forEach((ad) => {
          ad.mediaPaths.forEach((src, i) => {
            flat.push({
              adName: ad.adName,
              clickLink: ad.clickLink,
              contact: ad.contact,
              src,
              type: (ad.mediaTypes[i] as "image" | "video") || "image",
            })
          })
        })
        setSlides(flat)
      })
      .catch(() => {})
  }, [])

  const goNext = useCallback(() => {
    setCur((p) => (p + 1) % slides.length)
    setFadeKey((k) => k + 1)
  }, [slides.length])

  useEffect(() => {
    if (slides.length < 2 || closed) return
    timerRef.current = setInterval(goNext, 3000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [slides.length, closed, goNext])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setClosed(true)
    }, 300)
  }

  if (closed) return null

  const slide = slides[cur]

  const handleVisit = () => window.open(slide.clickLink, "_blank", "noopener noreferrer")
  const handleCall  = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!slide.contact) return
    const phone = slide.contact.replace(/[^0-9+]/g, "")
    if (phone.length >= 7) window.location.href = `tel:${phone}`
    else window.open(slide.contact, "_blank", "noopener noreferrer")
  }
  const manualGo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setCur(idx); setFadeKey((k) => k + 1)
    if (slides.length > 1) timerRef.current = setInterval(goNext, 3000)
  }

  if (!slides.length) return null

  return (
    <div className={`w-full mt-4 transition-all duration-300 ${isClosing ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"}`}>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded shadow-sm overflow-hidden flex flex-col md:flex-row relative">
        {/* Media Section */}
        <div className="relative md:w-2/3 bg-zinc-100 dark:bg-zinc-800">
          <div className="absolute top-2 left-2 z-10">
            <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded shadow-sm">✦ AD ✦</span>
          </div>
          
          <div className="relative w-full h-48 cursor-pointer overflow-hidden" onClick={handleVisit}>
            {slide.type === "video" ? (
              <video 
                key={`${slide.src}-${fadeKey}`} 
                src={slide.src} 
                muted 
                autoPlay 
                loop 
                playsInline 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <img 
                key={`${slide.src}-${fadeKey}`} 
                src={slide.src} 
                alt={slide.adName} 
                loading="lazy" 
                className="w-full max-h-full object-cover transition-opacity duration-300"
              />
            )}
            
            {slides.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-200">
                <div 
                  key={`pr-${cur}-${fadeKey}`} 
                  className="h-full bg-orange-500" 
                  style={{ width: "100%", animation: "progressBar 3s linear" }} 
                />
              </div>
            )}
          </div>
          <style>{`
            @keyframes progressBar {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </div>

        {/* Info Section */}
        <div className="flex-1 p-4 flex flex-col gap-2">
          <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider">Sponsored</p>
          <h3 
            className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer hover:text-orange-500 transition-colors line-clamp-2" 
            onClick={handleVisit}
            title={slide.adName}
          >
            {slide.adName}
          </h3>
          
          {slide.contact && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 break-all">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              <span className="truncate">{slide.contact}</span>
            </p>
          )}
          
          <div className="flex gap-2 mt-1">
            <button 
              onClick={handleVisit} 
              className="flex-1 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium rounded transition-all duration-200 hover:shadow-md"
            >
              Visit
            </button>
            {slide.contact && (
              <button 
                onClick={handleCall} 
                className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-medium rounded transition-all duration-200 hover:shadow-md"
              >
                Call
              </button>
            )}
          </div>
          
          {slides.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => manualGo(i)}
                  className={`h-1 rounded-full transition-all duration-200 ${
                    i === cur ? "w-4 bg-orange-500" : "w-1.5 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Close Button - Now visible with better styling */}
        <button 
          onClick={handleClose} 
          className="absolute top-2 right-2 p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-md hover:shadow-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all duration-200 z-20 cursor-pointer group"
          aria-label="Close ad"
        >
          <X className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// PURCHASE INTERFACE - Modern Design
// ─────────────────────────────────────────────────────────────────────────────
export function PurchaseInterface() {
  const [suppliers, setSuppliers] = useState<any[]>([])
  const [products,  setProducts]  = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])

  const [supplier, setSupplier] = useState("")
  const [product,  setProduct]  = useState("")
  const [quantity, setQuantity] = useState("")
  const [price,    setPrice]    = useState("")
  const [date,     setDate]     = useState("")
  const [errors,   setErrors]   = useState<Record<string, string>>({})

  useEffect(() => {
    fetchSuppliers()
    fetchProducts()
    fetchPurchases()
  }, [])

  const fetchSuppliers = async () => {
    const res = await authFetch("/api/suppliers")
    setSuppliers(await res.json())
  }
  const fetchProducts = async () => {
    const res = await authFetch("/api/products")
    setProducts(await res.json())
  }
  const fetchPurchases = async () => {
    const res  = await authFetch("/api/purchases")
    const data = await res.json()
    setPurchases(Array.isArray(data) ? data : [])
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!supplier)                          e.supplier = "Supplier is required"
    if (!product)                           e.product  = "Product is required"
    if (!quantity || Number(quantity) <= 0) e.quantity = "Enter a valid quantity"
    if (!price    || Number(price)    <= 0) e.price    = "Enter a valid price"
    if (!date)                              e.date     = "Date is required"
    setErrors(e)
    return !Object.keys(e).length
  }

  const addPurchase = async () => {
    if (!validate()) return
    const res = await authFetch("/api/purchases", {
      method: "POST",
      body: JSON.stringify({
        supplier, product,
        quantity: Number(quantity),
        price: Number(price),
        date,
      }),
    })
    const newPurchase = await res.json()
    setPurchases([...purchases, newPurchase])
    setSupplier(""); setProduct(""); setQuantity(""); setPrice(""); setDate("")
    setErrors({})
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n || 0)

  const totalPurchases = purchases.reduce((sum, p) => sum + p.price * p.quantity, 0)

  return (
    <div className="space-y-4">
      {/* New Purchase Entry Card */}
      <motion.div initial={{
        opacity: 0,
        y: 20
       }} animate={{
        opacity: 1,
        y: 0
       }} transition={{
        duration: 0.5,
        ease: "easeOut"
      }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-500/10 rounded">
              <Package className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New Purchase Entry</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 ml-7">Record new stock purchases from suppliers</p>
        </div>
        
        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {/* Supplier Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1">
                <Truck className="w-3 h-3" />
                Supplier
              </Label>
              <Select value={supplier} onValueChange={v => { setSupplier(v); setErrors(e => ({ ...e, supplier: "" })) }}>
                <SelectTrigger className={`h-9 text-sm ${errors.supplier ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(s => <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.supplier && <p className="text-xs text-red-500">{errors.supplier}</p>}
            </div>

            {/* Product Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1">
                <Package className="w-3 h-3" />
                Product
              </Label>
              <Select value={product} onValueChange={v => { setProduct(v); setErrors(e => ({ ...e, product: "" })) }}>
                <SelectTrigger className={`h-9 text-sm ${errors.product ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.product && <p className="text-xs text-red-500">{errors.product}</p>}
            </div>

            {/* Quantity Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Quantity</Label>
              <Input 
                type="number" 
                placeholder="Enter quantity" 
                value={quantity}
                className={`h-9 text-sm ${errors.quantity ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}
                onChange={e => { setQuantity(e.target.value); setErrors(er => ({ ...er, quantity: "" })) }} 
              />
              {errors.quantity && <p className="text-xs text-red-500">{errors.quantity}</p>}
            </div>

            {/* Price Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1">
                <IndianRupee className="w-3 h-3" />
                Unit Price
              </Label>
              <Input 
                type="number" 
                placeholder="Price per unit" 
                value={price}
                className={`h-9 text-sm ${errors.price ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}
                onChange={e => { setPrice(e.target.value); setErrors(er => ({ ...er, price: "" })) }} 
              />
              {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </div>

            {/* Date Field */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Date
              </Label>
              <Input 
                type="date" 
                value={date}
                className={`h-9 text-sm ${errors.date ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"}`}
                onChange={e => { setDate(e.target.value); setErrors(er => ({ ...er, date: "" })) }} 
              />
              {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
            </div>
          </div>
          
          <div className="mt-5">
            <Button 
              onClick={addPurchase}
              className="h-9 px-4 bg-[#fda60f] dark:bg-zinc-800 rounded duration-300 hover:bg-[#fa5914] dark:hover:bg-zinc-700 text-white text-sm"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Purchase
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Purchase History Card */}
      <motion.div initial={{
        opacity: 0,
        y: 20
       }} animate={{
        opacity: 1,
        y: 0
       }} transition={{
        duration: .5,
        delay: 0.3,
        ease: "easeOut"
      }} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-500/10 rounded">
                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Purchase History</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">All recorded purchase transactions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <div className="text-right">
                <p className="text-[10px] text-zinc-500 uppercase">Total Purchases</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{fmt(totalPurchases)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-zinc-50 dark:bg-zinc-800/30 border-b border-zinc-200 dark:border-zinc-800">
                  <TableHead className="text-xs font-semibold h-10">Supplier</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Product</TableHead>
                  <TableHead className="text-center text-xs font-semibold h-10">Qty</TableHead>
                  <TableHead className="text-right text-xs font-semibold h-10">Unit Price</TableHead>
                  <TableHead className="text-right text-xs font-semibold h-10">Total</TableHead>
                  <TableHead className="text-xs font-semibold h-10">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchases.map((p, idx) => (
                  <TableRow key={p._id || idx} className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <TableCell className="text-sm py-3">{p.supplier?.name}</TableCell>
                    <TableCell className="text-sm py-3">{p.product?.name}</TableCell>
                    <TableCell className="text-center text-sm py-3">{p.quantity}</TableCell>
                    <TableCell className="text-right text-sm py-3">{fmt(p.price)}</TableCell>
                    <TableCell className="text-right text-sm font-medium text-emerald-600 dark:text-emerald-400 py-3">
                      {fmt(p.price * p.quantity)}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500 py-3">
                      {new Date(p.date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
                
                {purchases.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-zinc-400 text-sm">
                      No purchase records found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {purchases.length > 0 && (
            <>
              <Separator className="my-0" />
              <div className="px-5 py-3 flex justify-end bg-zinc-50 dark:bg-zinc-800/30">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">Total Purchases Value:</span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {fmt(totalPurchases)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Sidebar Ad */}
      <SidebarAd />
    </div>
  )
}