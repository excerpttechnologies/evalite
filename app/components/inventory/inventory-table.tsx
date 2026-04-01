


// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Badge } from "@/app/components/ui/badge"
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Plus, Search, Package } from "lucide-react"

// const categories = ["All", "Medicine", "Grocery", "Electronics", "Stationery"]

// export function InventoryTable() {

//   const [products, setProducts] = useState<any[]>([])
//   const [search, setSearch] = useState("")
//   const [category, setCategory] = useState("All")

//   const [name, setName] = useState("")
//   const [productCategory, setProductCategory] = useState("")
//   const [purchasePrice, setPurchasePrice] = useState("")
//   const [sellingPrice, setSellingPrice] = useState("")
//   const [stock, setStock] = useState("")

//   // Fetch products
//   useEffect(() => {
//     fetchProducts()
//   }, [])

// const fetchProducts = async () => {
//   try {
//     const res = await fetch("/api/products")
//     const data = await res.json()

//     if (Array.isArray(data)) {
//       setProducts(data)
//     } else {
//       setProducts([])
//       console.error("API returned error:", data)
//     }

//   } catch (error) {
//     console.error("Error fetching products:", error)
//     setProducts([])
//   }
// }

//   // Add product
//   const addProduct = async () => {
//     try {

//       const status =
//         Number(stock) === 0
//           ? "Out of Stock"
//           : Number(stock) < 10
//           ? "Low Stock"
//           : "In Stock"

//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           category: productCategory,
//           purchasePrice: Number(purchasePrice),
//           sellingPrice: Number(sellingPrice),
//           stock: Number(stock),
//           status,
//         }),
//       })

//       const newProduct = await res.json()

//       setProducts([...products, newProduct])

//       // reset form
//       setName("")
//       setProductCategory("")
//       setPurchasePrice("")
//       setSellingPrice("")
//       setStock("")

//     } catch (error) {
//       console.error("Error adding product:", error)
//     }
//   }

//   // Filter products
//  const filtered = Array.isArray(products)
//   ? products.filter((p) => {
//       const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
//       const matchesCategory = category === "All" || p.category === category
//       return matchesSearch && matchesCategory
//     })
//   : []
//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount)
//   }

//   const statusColor = (status: string) => {
//     if (status === "In Stock") return "bg-green-100 text-green-700 border-green-200"
//     if (status === "Low Stock") return "bg-yellow-100 text-yellow-700 border-yellow-200"
//     return "bg-red-100 text-red-700 border-red-200"
//   }

//   return (
//     <div className="flex flex-col gap-4">

//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//             <CardTitle className="text-base">
//               Products ({filtered.length})
//             </CardTitle>

//             <Dialog>

//               <DialogTrigger asChild>
//                 <Button size="sm">
//                   <Plus className="size-4 mr-1" />
//                   Add Product
//                 </Button>
//               </DialogTrigger>

//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Add New Product</DialogTitle>
//                 </DialogHeader>

//                 <div className="flex flex-col gap-4 py-4">

//                   <Input
//                     placeholder="Product Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   />

//                   <Select onValueChange={setProductCategory}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Category" />
//                     </SelectTrigger>

//                     <SelectContent>
//                       {categories
//                         .filter((c) => c !== "All")
//                         .map((c) => (
//                           <SelectItem key={c} value={c}>
//                             {c}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>

//                   <div className="grid grid-cols-2 gap-4">

//                     <Input
//                       placeholder="Purchase Price"
//                       type="number"
//                       value={purchasePrice}
//                       onChange={(e) => setPurchasePrice(e.target.value)}
//                     />

//                     <Input
//                       placeholder="Selling Price"
//                       type="number"
//                       value={sellingPrice}
//                       onChange={(e) => setSellingPrice(e.target.value)}
//                     />

//                   </div>

//                   <Input
//                     placeholder="Stock Quantity"
//                     type="number"
//                     value={stock}
//                     onChange={(e) => setStock(e.target.value)}
//                   />

//                   <Button onClick={addProduct}>
//                     Add Product
//                   </Button>

//                 </div>
//               </DialogContent>

//             </Dialog>

//           </div>
//         </CardHeader>

//         <CardContent>

//           <div className="flex flex-col gap-3 sm:flex-row mb-4">

//             <div className="relative flex-1">

//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

//               <Input
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-9"
//               />

//             </div>

//             <Select value={category} onValueChange={setCategory}>
//               <SelectTrigger className="sm:w-[180px]">
//                 <SelectValue />
//               </SelectTrigger>

//               <SelectContent>
//                 {categories.map((c) => (
//                   <SelectItem key={c} value={c}>
//                     {c}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//           </div>

//           <Table>

//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead className="hidden sm:table-cell">
//                   Category
//                 </TableHead>
//                 <TableHead className="text-right">
//                   Purchase
//                 </TableHead>
//                 <TableHead className="text-right">
//                   Selling
//                 </TableHead>
//                 <TableHead className="text-center">
//                   Stock
//                 </TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>

//             <TableBody>

//               {filtered.map((p) => (
//                 <TableRow key={p._id}>

//                   <TableCell>
//                     <div className="flex items-center gap-2">

//                       <div className="flex size-8 items-center justify-center rounded-md bg-muted">
//                         <Package className="size-4 text-muted-foreground" />
//                       </div>

//                       <span className="font-medium text-foreground">
//                         {p.name}
//                       </span>

//                     </div>
//                   </TableCell>

//                   <TableCell className="hidden sm:table-cell">
//                     <Badge variant="secondary">
//                       {p.category}
//                     </Badge>
//                   </TableCell>

//                   <TableCell className="text-right text-muted-foreground">
//                     {formatCurrency(p.purchasePrice)}
//                   </TableCell>

//                   <TableCell className="text-right font-medium text-foreground">
//                     {formatCurrency(p.sellingPrice)}
//                   </TableCell>

//                   <TableCell className="text-center">
//                     {p.stock}
//                   </TableCell>

//                   <TableCell>
//                     <Badge
//                       variant="outline"
//                       className={statusColor(p.status)}
//                     >
//                       {p.status}
//                     </Badge>
//                   </TableCell>

//                 </TableRow>
//               ))}

//             </TableBody>

//           </Table>

//           {filtered.length === 0 && (
//             <div className="py-8 text-center">
//               <Package className="mx-auto size-10 text-muted-foreground/50" />
//               <p className="mt-2 text-sm text-muted-foreground">
//                 No products found
//               </p>
//             </div>
//           )}

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
// import { Badge } from "@/app/components/ui/badge"
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Label } from "@/app/components/ui/label"
// import { Plus, Search, Package, Pencil, Trash2 } from "lucide-react"

// const categories = ["All", "Medicine", "Grocery", "Electronics", "Stationery"]

// type Product = {
//   _id: string
//   name: string
//   category: string
//   purchasePrice: number
//   sellingPrice: number
//   stock: number
//   status: string
// }

// export function InventoryTable() {

//   const [products, setProducts] = useState<Product[]>([])
//   const [search, setSearch] = useState("")
//   const [category, setCategory] = useState("All")

//   // Add form state
//   const [addOpen, setAddOpen] = useState(false)
//   const [name, setName] = useState("")
//   const [productCategory, setProductCategory] = useState("")
//   const [purchasePrice, setPurchasePrice] = useState("")
//   const [sellingPrice, setSellingPrice] = useState("")
//   const [stock, setStock] = useState("")

//   // Edit state
//   const [editOpen, setEditOpen] = useState(false)
//   const [editProduct, setEditProduct] = useState<Product | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editCategory, setEditCategory] = useState("")
//   const [editPurchasePrice, setEditPurchasePrice] = useState("")
//   const [editSellingPrice, setEditSellingPrice] = useState("")
//   const [editStock, setEditStock] = useState("")

//   // Delete confirm state
//   const [deleteId, setDeleteId] = useState<string | null>(null)
//   const [deleteOpen, setDeleteOpen] = useState(false)

//   useEffect(() => {
//     fetchProducts()
//   }, [])

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("/api/products")
//       const data = await res.json()
//       setProducts(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Error fetching products:", error)
//       setProducts([])
//     }
//   }

//   const computeStatus = (stockVal: number) => {
//     if (stockVal === 0) return "Out of Stock"
//     if (stockVal < 10) return "Low Stock"
//     return "In Stock"
//   }

//   // ── ADD ──
//   const addProduct = async () => {
//     if (!name || !productCategory || !purchasePrice || !sellingPrice || !stock) {
//       alert("Please fill all fields")
//       return
//     }
//     try {
//       const stockNum = Number(stock)
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           category: productCategory,
//           purchasePrice: Number(purchasePrice),
//           sellingPrice: Number(sellingPrice),
//           stock: stockNum,
//           status: computeStatus(stockNum),
//         }),
//       })
//       const newProduct = await res.json()
//       setProducts([...products, newProduct])
//       setName(""); setProductCategory(""); setPurchasePrice(""); setSellingPrice(""); setStock("")
//       setAddOpen(false)
//     } catch (error) {
//       console.error("Error adding product:", error)
//     }
//   }

//   // ── OPEN EDIT ──
//   const openEdit = (p: Product) => {
//     setEditProduct(p)
//     setEditName(p.name)
//     setEditCategory(p.category)
//     setEditPurchasePrice(String(p.purchasePrice))
//     setEditSellingPrice(String(p.sellingPrice))
//     setEditStock(String(p.stock))
//     setEditOpen(true)
//   }

//   // ── SAVE EDIT ──
//   const saveEdit = async () => {
//     if (!editProduct) return
//     if (!editName || !editCategory || !editPurchasePrice || !editSellingPrice || !editStock) {
//       alert("Please fill all fields")
//       return
//     }
//     try {
//       const stockNum = Number(editStock)
//       const res = await fetch(`/api/products/${editProduct._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: editName,
//           category: editCategory,
//           purchasePrice: Number(editPurchasePrice),
//           sellingPrice: Number(editSellingPrice),
//           stock: stockNum,
//           status: computeStatus(stockNum),
//         }),
//       })
//       if (!res.ok) { alert("Failed to update product"); return }
//       const updated = await res.json()
//       setProducts(products.map(p => p._id === updated._id ? updated : p))
//       setEditOpen(false)
//       setEditProduct(null)
//     } catch (error) {
//       console.error("Error updating product:", error)
//     }
//   }

//   // ── DELETE ──
//   const confirmDelete = (id: string) => {
//     setDeleteId(id)
//     setDeleteOpen(true)
//   }

//   const deleteProduct = async () => {
//     if (!deleteId) return
//     try {
//       const res = await fetch(`/api/products/${deleteId}`, { method: "DELETE" })
//       if (!res.ok) { alert("Failed to delete product"); return }
//       setProducts(products.filter(p => p._id !== deleteId))
//       setDeleteOpen(false)
//       setDeleteId(null)
//     } catch (error) {
//       console.error("Error deleting product:", error)
//     }
//   }

//   const filtered = products.filter((p) => {
//     const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
//     const matchesCategory = category === "All" || p.category === category
//     return matchesSearch && matchesCategory
//   })

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const statusColor = (status: string) => {
//     if (status === "In Stock") return "bg-green-100 text-green-700 border-green-200"
//     if (status === "Low Stock") return "bg-yellow-100 text-yellow-700 border-yellow-200"
//     return "bg-red-100 text-red-700 border-red-200"
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <CardTitle className="text-base">Products ({filtered.length})</CardTitle>

//             {/* ADD DIALOG */}
//             <Dialog open={addOpen} onOpenChange={setAddOpen}>
//               <DialogTrigger asChild>
//                 <Button size="sm"><Plus className="size-4 mr-1" />Add Product</Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
//                 <div className="flex flex-col gap-4 py-4">
//                   <div><Label>Product Name</Label>
//                     <Input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
//                   </div>
//                   <div><Label>Category</Label>
//                     <Select onValueChange={setProductCategory} value={productCategory}>
//                       <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
//                       <SelectContent>
//                         {categories.filter(c => c !== "All").map(c => (
//                           <SelectItem key={c} value={c}>{c}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div><Label>Purchase Price</Label>
//                       <Input placeholder="Purchase Price" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
//                     </div>
//                     <div><Label>Selling Price</Label>
//                       <Input placeholder="Selling Price" type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
//                     </div>
//                   </div>
//                   <div><Label>Stock Quantity</Label>
//                     <Input placeholder="Stock Quantity" type="number" value={stock} onChange={e => setStock(e.target.value)} />
//                   </div>
//                   <Button onClick={addProduct}>Add Product</Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="flex flex-col gap-3 sm:flex-row mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//             <Select value={category} onValueChange={setCategory}>
//               <SelectTrigger className="sm:w-[180px]"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead className="hidden sm:table-cell">Category</TableHead>
//                 <TableHead className="text-right">Purchase</TableHead>
//                 <TableHead className="text-right">Selling</TableHead>
//                 <TableHead className="text-center">Stock</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filtered.map(p => (
//                 <TableRow key={p._id}>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex size-8 items-center justify-center rounded-md bg-muted">
//                         <Package className="size-4 text-muted-foreground" />
//                       </div>
//                       <span className="font-medium text-foreground">{p.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell">
//                     <Badge variant="secondary">{p.category}</Badge>
//                   </TableCell>
//                   <TableCell className="text-right text-muted-foreground">
//                     {formatCurrency(p.purchasePrice)}
//                   </TableCell>
//                   <TableCell className="text-right font-medium text-foreground">
//                     {formatCurrency(p.sellingPrice)}
//                   </TableCell>
//                   <TableCell className="text-center">{p.stock}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center justify-center gap-1">
//                       <Button variant="ghost" size="icon" onClick={() => openEdit(p)} title="Edit">
//                         <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
//                       </Button>
//                       <Button variant="ghost" size="icon" onClick={() => confirmDelete(p._id)} title="Delete">
//                         <Trash2 className="size-4 text-red-400 hover:text-red-600" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {filtered.length === 0 && (
//             <div className="py-8 text-center">
//               <Package className="mx-auto size-10 text-muted-foreground/50" />
//               <p className="mt-2 text-sm text-muted-foreground">No products found</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* EDIT DIALOG */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
//           <div className="flex flex-col gap-4 py-4">
//             <div><Label>Product Name</Label>
//               <Input value={editName} onChange={e => setEditName(e.target.value)} />
//             </div>
//             <div><Label>Category</Label>
//               <Select value={editCategory} onValueChange={setEditCategory}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   {categories.filter(c => c !== "All").map(c => (
//                     <SelectItem key={c} value={c}>{c}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><Label>Purchase Price</Label>
//                 <Input type="number" value={editPurchasePrice} onChange={e => setEditPurchasePrice(e.target.value)} />
//               </div>
//               <div><Label>Selling Price</Label>
//                 <Input type="number" value={editSellingPrice} onChange={e => setEditSellingPrice(e.target.value)} />
//               </div>
//             </div>
//             <div><Label>Stock Quantity</Label>
//               <Input type="number" value={editStock} onChange={e => setEditStock(e.target.value)} />
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
//           <DialogHeader><DialogTitle>Delete Product</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <p className="text-sm text-muted-foreground mb-6">
//               Are you sure you want to delete this product? This action cannot be undone.
//             </p>
//             <div className="flex gap-2">
//               <Button variant="destructive" onClick={deleteProduct} className="flex-1">Yes, Delete</Button>
//               <Button variant="outline" onClick={() => setDeleteOpen(false)} className="flex-1">Cancel</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>

//     </div>
//   )
// }



///aravind

// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
// import { Button } from "@/app/components/ui/button"
// import { Input } from "@/app/components/ui/input"
// import { Badge } from "@/app/components/ui/badge"
// import {
//   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
// } from "@/app/components/ui/select"
// import {
//   Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
// } from "@/app/components/ui/table"
// import {
//   Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
// } from "@/app/components/ui/dialog"
// import { Label } from "@/app/components/ui/label"
// import { Plus, Search, Package, Pencil, Trash2 } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// const categories = ["All", "Medicine", "Grocery", "Electronics", "Stationery"]

// type Product = {
//   _id: string
//   name: string
//   category: string
//   purchasePrice: number
//   sellingPrice: number
//   stock: number
//   status: string
// }

// export function InventoryTable() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [search, setSearch] = useState("")
//   const [category, setCategory] = useState("All")

//   const [addOpen, setAddOpen] = useState(false)
//   const [name, setName] = useState("")
//   const [productCategory, setProductCategory] = useState("")
//   const [purchasePrice, setPurchasePrice] = useState("")
//   const [sellingPrice, setSellingPrice] = useState("")
//   const [stock, setStock] = useState("")

//   const [editOpen, setEditOpen] = useState(false)
//   const [editProduct, setEditProduct] = useState<Product | null>(null)
//   const [editName, setEditName] = useState("")
//   const [editCategory, setEditCategory] = useState("")
//   const [editPurchasePrice, setEditPurchasePrice] = useState("")
//   const [editSellingPrice, setEditSellingPrice] = useState("")
//   const [editStock, setEditStock] = useState("")

//   const [deleteId, setDeleteId] = useState<string | null>(null)
//   const [deleteOpen, setDeleteOpen] = useState(false)

//   useEffect(() => { fetchProducts() }, [])

//   const fetchProducts = async () => {
//     try {
//       const res = await authFetch("/api/products") // ✅
//       const data = await res.json()
//       setProducts(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error("Error fetching products:", error)
//       setProducts([])
//     }
//   }

//   const computeStatus = (stockVal: number) => {
//     if (stockVal === 0) return "Out of Stock"
//     if (stockVal < 10) return "Low Stock"
//     return "In Stock"
//   }

//   const addProduct = async () => {
//     if (!name || !productCategory || !purchasePrice || !sellingPrice || !stock) {
//       alert("Please fill all fields"); return
//     }
//     try {
//       const stockNum = Number(stock)
//       const res = await authFetch("/api/products", { // ✅
//         method: "POST",
//         body: JSON.stringify({
//           name,
//           category: productCategory,
//           purchasePrice: Number(purchasePrice),
//           sellingPrice: Number(sellingPrice),
//           stock: stockNum,
//           status: computeStatus(stockNum),
//         }),
//       })
//       const newProduct = await res.json()
//       setProducts([...products, newProduct])
//       setName(""); setProductCategory(""); setPurchasePrice(""); setSellingPrice(""); setStock("")
//       setAddOpen(false)
//     } catch (error) {
//       console.error("Error adding product:", error)
//     }
//   }

//   const openEdit = (p: Product) => {
//     setEditProduct(p)
//     setEditName(p.name)
//     setEditCategory(p.category)
//     setEditPurchasePrice(String(p.purchasePrice))
//     setEditSellingPrice(String(p.sellingPrice))
//     setEditStock(String(p.stock))
//     setEditOpen(true)
//   }

//   const saveEdit = async () => {
//     if (!editProduct) return
//     if (!editName || !editCategory || !editPurchasePrice || !editSellingPrice || !editStock) {
//       alert("Please fill all fields"); return
//     }
//     try {
//       const stockNum = Number(editStock)
//       const res = await authFetch(`/api/products/${editProduct._id}`, { // ✅
//         method: "PUT",
//         body: JSON.stringify({
//           name: editName,
//           category: editCategory,
//           purchasePrice: Number(editPurchasePrice),
//           sellingPrice: Number(editSellingPrice),
//           stock: stockNum,
//           status: computeStatus(stockNum),
//         }),
//       })
//       if (!res.ok) { alert("Failed to update product"); return }
//       const updated = await res.json()
//       setProducts(products.map(p => p._id === updated._id ? updated : p))
//       setEditOpen(false)
//       setEditProduct(null)
//     } catch (error) {
//       console.error("Error updating product:", error)
//     }
//   }

//   const confirmDelete = (id: string) => {
//     setDeleteId(id)
//     setDeleteOpen(true)
//   }

//   const deleteProduct = async () => {
//     if (!deleteId) return
//     try {
//       const res = await authFetch(`/api/products/${deleteId}`, { method: "DELETE" }) // ✅
//       if (!res.ok) { alert("Failed to delete product"); return }
//       setProducts(products.filter(p => p._id !== deleteId))
//       setDeleteOpen(false)
//       setDeleteId(null)
//     } catch (error) {
//       console.error("Error deleting product:", error)
//     }
//   }

//   const filtered = products.filter((p) => {
//     const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
//     const matchesCategory = category === "All" || p.category === category
//     return matchesSearch && matchesCategory
//   })

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const statusColor = (status: string) => {
//     if (status === "In Stock") return "bg-green-100 text-green-700 border-green-200"
//     if (status === "Low Stock") return "bg-yellow-100 text-yellow-700 border-yellow-200"
//     return "bg-red-100 text-red-700 border-red-200"
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <CardTitle className="text-base">Products ({filtered.length})</CardTitle>

//             <Dialog open={addOpen} onOpenChange={setAddOpen}>
//               <DialogTrigger asChild>
//                 <Button size="sm"><Plus className="size-4 mr-1" />Add Product</Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
//                 <div className="flex flex-col gap-4 py-4">
//                   <div><Label>Product Name</Label>
//                     <Input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
//                   </div>
//                   <div><Label>Category</Label>
//                     <Select onValueChange={setProductCategory} value={productCategory}>
//                       <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
//                       <SelectContent>
//                         {categories.filter(c => c !== "All").map(c => (
//                           <SelectItem key={c} value={c}>{c}</SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div><Label>Purchase Price</Label>
//                       <Input placeholder="Purchase Price" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
//                     </div>
//                     <div><Label>Selling Price</Label>
//                       <Input placeholder="Selling Price" type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
//                     </div>
//                   </div>
//                   <div><Label>Stock Quantity</Label>
//                     <Input placeholder="Stock Quantity" type="number" value={stock} onChange={e => setStock(e.target.value)} />
//                   </div>
//                   <Button onClick={addProduct}>Add Product</Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="flex flex-col gap-3 sm:flex-row mb-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//                 className="pl-9"
//               />
//             </div>
//             <Select value={category} onValueChange={setCategory}>
//               <SelectTrigger className="sm:w-[180px]"><SelectValue /></SelectTrigger>
//               <SelectContent>
//                 {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
//               </SelectContent>
//             </Select>
//           </div>

//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Product</TableHead>
//                 <TableHead className="hidden sm:table-cell">Category</TableHead>
//                 <TableHead className="text-right">Purchase</TableHead>
//                 <TableHead className="text-right">Selling</TableHead>
//                 <TableHead className="text-center">Stock</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filtered.map(p => (
//                 <TableRow key={p._id}>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex size-8 items-center justify-center rounded-md bg-muted">
//                         <Package className="size-4 text-muted-foreground" />
//                       </div>
//                       <span className="font-medium text-foreground">{p.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell">
//                     <Badge variant="secondary">{p.category}</Badge>
//                   </TableCell>
//                   <TableCell className="text-right text-muted-foreground">
//                     {formatCurrency(p.purchasePrice)}
//                   </TableCell>
//                   <TableCell className="text-right font-medium text-foreground">
//                     {formatCurrency(p.sellingPrice)}
//                   </TableCell>
//                   <TableCell className="text-center">{p.stock}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge>
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center justify-center gap-1">
//                       <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
//                         <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
//                       </Button>
//                       <Button variant="ghost" size="icon" onClick={() => confirmDelete(p._id)}>
//                         <Trash2 className="size-4 text-red-400 hover:text-red-600" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           {filtered.length === 0 && (
//             <div className="py-8 text-center">
//               <Package className="mx-auto size-10 text-muted-foreground/50" />
//               <p className="mt-2 text-sm text-muted-foreground">No products found</p>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* EDIT DIALOG */}
//       <Dialog open={editOpen} onOpenChange={setEditOpen}>
//         <DialogContent>
//           <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
//           <div className="flex flex-col gap-4 py-4">
//             <div><Label>Product Name</Label>
//               <Input value={editName} onChange={e => setEditName(e.target.value)} />
//             </div>
//             <div><Label>Category</Label>
//               <Select value={editCategory} onValueChange={setEditCategory}>
//                 <SelectTrigger><SelectValue /></SelectTrigger>
//                 <SelectContent>
//                   {categories.filter(c => c !== "All").map(c => (
//                     <SelectItem key={c} value={c}>{c}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div><Label>Purchase Price</Label>
//                 <Input type="number" value={editPurchasePrice} onChange={e => setEditPurchasePrice(e.target.value)} />
//               </div>
//               <div><Label>Selling Price</Label>
//                 <Input type="number" value={editSellingPrice} onChange={e => setEditSellingPrice(e.target.value)} />
//               </div>
//             </div>
//             <div><Label>Stock Quantity</Label>
//               <Input type="number" value={editStock} onChange={e => setEditStock(e.target.value)} />
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
//           <DialogHeader><DialogTitle>Delete Product</DialogTitle></DialogHeader>
//           <div className="py-4">
//             <p className="text-sm text-muted-foreground mb-6">
//               Are you sure you want to delete this product? This action cannot be undone.
//             </p>
//             <div className="flex gap-2">
//               <Button variant="destructive" onClick={deleteProduct} className="flex-1">Yes, Delete</Button>
//               <Button variant="outline" onClick={() => setDeleteOpen(false)} className="flex-1">Cancel</Button>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


////jay

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence ,Variants } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/app/components/ui/table"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/app/components/ui/dialog"
import { Label } from "@/app/components/ui/label"
import { Plus, Search, Package, Pencil, Trash2, Boxes, TrendingUp, AlertTriangle, XCircle } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"

const categories = ["All", "Medicine", "Grocery", "Electronics", "Stationery"]

type Product = {
  _id: string
  name: string
  category: string
  purchasePrice: number
  sellingPrice: number
  stock: number
  status: string
}

// ─── Animation Variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.06,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2 },
  },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.2 } },
} as const

const rowVariant:Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
} as const

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  index,
}: {
  icon: React.ElementType
  label: string
  value: number
  color: string
  index: number
}) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="visible"
      className={`relative overflow-hidden rounded  border p-2.5 flex items-center gap-4 bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm ${color}`}
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-current/10">
        <Icon className="size-3 text-current" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-current/60">{label}</p>
        <motion.p
          key={value}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold text-current"
        >
          {value}
        </motion.p>
      </div>
      {/* decorative blob */}
      <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-current opacity-[0.06] blur-2xl" />
    </motion.div>
  )
}

// ─── Field Row Helper ──────────────────────────────────────────────────────────
function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function InventoryTable() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [stock, setStock] = useState("")

  const [editOpen, setEditOpen] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [editName, setEditName] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editPurchasePrice, setEditPurchasePrice] = useState("")
  const [editSellingPrice, setEditSellingPrice] = useState("")
  const [editStock, setEditStock] = useState("")

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    try {
      const res = await authFetch("/api/products")
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    }
  }

  const computeStatus = (stockVal: number) => {
    if (stockVal === 0) return "Out of Stock"
    if (stockVal < 10) return "Low Stock"
    return "In Stock"
  }

  const addProduct = async () => {
    if (!name || !productCategory || !purchasePrice || !sellingPrice || !stock) {
      alert("Please fill all fields"); return
    }
    try {
      const stockNum = Number(stock)
      const res = await authFetch("/api/products", {
        method: "POST",
        body: JSON.stringify({
          name,
          category: productCategory,
          purchasePrice: Number(purchasePrice),
          sellingPrice: Number(sellingPrice),
          stock: stockNum,
          status: computeStatus(stockNum),
        }),
      })
      const newProduct = await res.json()
      setProducts([...products, newProduct])
      setName(""); setProductCategory(""); setPurchasePrice(""); setSellingPrice(""); setStock("")
      setAddOpen(false)
    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setEditName(p.name)
    setEditCategory(p.category)
    setEditPurchasePrice(String(p.purchasePrice))
    setEditSellingPrice(String(p.sellingPrice))
    setEditStock(String(p.stock))
    setEditOpen(true)
  }

  const saveEdit = async () => {
    if (!editProduct) return
    if (!editName || !editCategory || !editPurchasePrice || !editSellingPrice || !editStock) {
      alert("Please fill all fields"); return
    }
    try {
      const stockNum = Number(editStock)
      const res = await authFetch(`/api/products/${editProduct._id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: editName,
          category: editCategory,
          purchasePrice: Number(editPurchasePrice),
          sellingPrice: Number(editSellingPrice),
          stock: stockNum,
          status: computeStatus(stockNum),
        }),
      })
      if (!res.ok) { alert("Failed to update product"); return }
      const updated = await res.json()
      setProducts(products.map(p => p._id === updated._id ? updated : p))
      setEditOpen(false)
      setEditProduct(null)
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const confirmDelete = (id: string) => {
    setDeleteId(id)
    setDeleteOpen(true)
  }

  const deleteProduct = async () => {
    if (!deleteId) return
    try {
      const res = await authFetch(`/api/products/${deleteId}`, { method: "DELETE" })
      if (!res.ok) { alert("Failed to delete product"); return }
      setProducts(products.filter(p => p._id !== deleteId))
      setDeleteOpen(false)
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const filtered = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || p.category === category
    return matchesSearch && matchesCategory
  })

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

  const inStock = products.filter(p => p.status === "In Stock").length
  const lowStock = products.filter(p => p.status === "Low Stock").length
  const outOfStock = products.filter(p => p.status === "Out of Stock").length

  const statusConfig: Record<string, { cls: string; dot: string }> = {
    "In Stock":     { cls: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800", dot: "bg-emerald-500" },
    "Low Stock":    { cls: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",           dot: "bg-amber-500" },
    "Out of Stock": { cls: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",                       dot: "bg-red-500" },
  }

  // ── shared dialog field styles ─────────────────────────────────────────────
  const inputCls =
    "h-10 rounded-xl border border-border/60 bg-muted/40 text-sm ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/60 placeholder:text-muted-foreground/50"

  return (
    <div className="flex flex-col gap-4 ">
      {/* ── Stat Strip ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard index={0} icon={Boxes}         label="Total"     value={products.length} color="text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700" />
        <StatCard index={1} icon={TrendingUp}    label="In Stock"  value={inStock}         color="text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" />
        <StatCard index={2} icon={AlertTriangle} label="Low Stock" value={lowStock}        color="text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800" />
        <StatCard index={3} icon={XCircle}       label="Out"       value={outOfStock}      color="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800" />
      </div>

      {/* ── Main Card ───────────────────────────────────────────────────────── */}
      <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible">
        <Card className="overflow-hidden rounded-sm border border-zinc-200 bg-white/70 dark:bg-white/5 shadow-xl shadow-black/5 backdrop-blur-sm">
          <CardHeader className=" border-b border-border/40">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-lg font-bold tracking-tight">Inventory</CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {/* ── Add Product Dialog ────────────────────────────────────── */}
              <Dialog open={addOpen} onOpenChange={setAddOpen} >
                <DialogTrigger asChild>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      size="sm"
                      className="gap-1.5 rounded bg-[#F2A119] text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/40 hover:brightness-110 transition-all"
                    >
                      <Plus className="size-4" />
                      Add Product
                    </Button>
                  </motion.div>
                </DialogTrigger>
                <DialogContent className="rounded border border-border/50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-2xl sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Add New Product</DialogTitle>
                    <p className="text-xs text-muted-foreground">Fill in the details below to add a new product to your inventory.</p>
                  </DialogHeader>
                  <motion.div
                    variants={scaleIn}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-4 pt-2"
                  >
                    <FieldRow label="Product Name">
                      <Input className={inputCls} placeholder="e.g. Paracetamol 500mg" value={name} onChange={e => setName(e.target.value)} />
                    </FieldRow>
                    <FieldRow label="Category">
                      <Select onValueChange={setProductCategory} value={productCategory}>
                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select category" /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {categories.filter(c => c !== "All").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </FieldRow>
                    <div className="grid grid-cols-2 gap-3">
                      <FieldRow label="Purchase Price">
                        <Input className={inputCls} placeholder="₹0.00" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
                      </FieldRow>
                      <FieldRow label="Selling Price">
                        <Input className={inputCls} placeholder="₹0.00" type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
                      </FieldRow>
                    </div>
                    <FieldRow label="Stock Quantity">
                      <Input className={inputCls} placeholder="0" type="number" value={stock} onChange={e => setStock(e.target.value)} />
                    </FieldRow>
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={addProduct}
                        className="w-full rounded  text-white shadow-md hover:brightness-110 transition-all"
                      >
                        Add Product
                      </Button>
                    </motion.div>
                  </motion.div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>

          <CardContent className="pt-2">
            {/* ── Filters ─────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3 sm:flex-row mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                <Input
                  placeholder="Search products…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 h-10 rounded border border-border/60 bg-muted/30 text-sm focus-visible:ring-2 focus-visible:ring-primary/40 transition-all"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-10 sm:w-[170px] rounded border border-border/60 bg-muted/30 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded">
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* ── Table ───────────────────────────────────────────────────── */}
            <div className="rounded-xl border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Product</TableHead>
                    <TableHead className="hidden sm:table-cell font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Category</TableHead>
                    <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Purchase</TableHead>
                    <TableHead className="text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Selling</TableHead>
                    <TableHead className="text-center font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Stock</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Status</TableHead>
                    <TableHead className="text-center font-semibold text-xs uppercase tracking-wider text-muted-foreground py-3">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence mode="popLayout">
                    {filtered.map((p, i) => {
                      const sc = statusConfig[p.status] ?? statusConfig["In Stock"]
                      return (
                        <motion.tr
                          key={p._id}
                          variants={rowVariant}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom={i}
                          layout
                          className="group border-b border-border/30 hover:bg-muted/30 transition-colors duration-150"
                        >
                          <TableCell className="py-3.5">
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ rotate: 10, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 border border-indigo-100 dark:border-indigo-800/40"
                              >
                                <Package className="size-4 text-indigo-500" />
                              </motion.div>
                              <span className="font-semibold text-sm text-foreground leading-tight">{p.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell py-3.5">
                            <Badge variant="secondary" className="rounded-lg text-xs font-medium px-2.5 py-0.5">{p.category}</Badge>
                          </TableCell>
                          <TableCell className="text-right py-3.5 text-sm text-muted-foreground">
                            {formatCurrency(p.purchasePrice)}
                          </TableCell>
                          <TableCell className="text-right py-3.5">
                            <span className="text-sm font-semibold text-foreground">{formatCurrency(p.sellingPrice)}</span>
                          </TableCell>
                          <TableCell className="text-center py-3.5">
                            <span className="text-sm font-medium tabular-nums">{p.stock}</span>
                          </TableCell>
                          <TableCell className="py-3.5">
                            <Badge variant="outline" className={`rounded-lg text-xs font-medium px-2.5 py-0.5 gap-1.5 flex items-center w-fit ${sc.cls}`}>
                              <span className={`inline-block size-1.5 rounded-full ${sc.dot}`} />
                              {p.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3.5">
                            <div className="flex items-center justify-center gap-1">
                              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => openEdit(p)}
                                  className="size-8 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                                >
                                  <Pencil className="size-3.5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => confirmDelete(p._id)}
                                  className="size-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                                >
                                  <Trash2 className="size-3.5 text-muted-foreground group-hover:text-red-500 transition-colors" />
                                </Button>
                              </motion.div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      )
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>

              {/* ── Empty State ────────────────────────────────────────────── */}
              <AnimatePresence>
                {filtered.length === 0 && (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center gap-3 py-14"
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                      className="flex size-14 items-center justify-center rounded-2xl bg-muted/60"
                    >
                      <Package className="size-7 text-muted-foreground/40" />
                    </motion.div>
                    <p className="text-sm font-medium text-muted-foreground">No products found</p>
                    <p className="text-xs text-muted-foreground/60">Try adjusting your search or filter</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ── EDIT DIALOG ─────────────────────────────────────────────────────── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="rounded-2xl border border-border/50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Edit Product</DialogTitle>
            <p className="text-xs text-muted-foreground">Update the product details below.</p>
          </DialogHeader>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" className="flex flex-col gap-4 pt-2">
            <FieldRow label="Product Name">
              <Input className={inputCls} value={editName} onChange={e => setEditName(e.target.value)} />
            </FieldRow>
            <FieldRow label="Category">
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                <SelectContent className="rounded-xl">
                  {categories.filter(c => c !== "All").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </FieldRow>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Purchase Price">
                <Input className={inputCls} type="number" value={editPurchasePrice} onChange={e => setEditPurchasePrice(e.target.value)} />
              </FieldRow>
              <FieldRow label="Selling Price">
                <Input className={inputCls} type="number" value={editSellingPrice} onChange={e => setEditSellingPrice(e.target.value)} />
              </FieldRow>
            </div>
            <FieldRow label="Stock Quantity">
              <Input className={inputCls} type="number" value={editStock} onChange={e => setEditStock(e.target.value)} />
            </FieldRow>
            <div className="flex gap-2 pt-1">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
                <Button onClick={saveEdit} className="w-full rounded   text-white shadow-md hover:brightness-110 transition-all">
                  Save Changes
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
                <Button variant="outline" onClick={() => setEditOpen(false)} className="w-full rounded-xl border-border/60 hover:bg-muted/50 transition-all">
                  Cancel
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* ── DELETE DIALOG ───────────────────────────────────────────────────── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="rounded-2xl border border-border/50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-2xl sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Delete Product</DialogTitle>
          </DialogHeader>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" className="py-2">
            <div className="flex flex-col items-center gap-4 py-4">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex size-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20"
              >
                <Trash2 className="size-7 text-red-500" />
              </motion.div>
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                Are you sure you want to delete this product?<br />
                <span className="font-medium text-foreground">This action cannot be undone.</span>
              </p>
            </div>
            <div className="flex gap-2 pt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
                <Button
                  variant="destructive"
                  onClick={deleteProduct}
                  className="w-full rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md hover:brightness-110 transition-all"
                >
                  Yes, Delete
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="flex-1">
                <Button variant="outline" onClick={() => setDeleteOpen(false)} className="w-full rounded-xl border-border/60 hover:bg-muted/50 transition-all">
                  Cancel
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  )
}