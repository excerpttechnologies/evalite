


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



//aravind

"use client"

import { useState, useEffect } from "react"
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
import { Plus, Search, Package, Pencil, Trash2 } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch" // ✅

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
      const res = await authFetch("/api/products") // ✅
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
      const res = await authFetch("/api/products", { // ✅
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
      const res = await authFetch(`/api/products/${editProduct._id}`, { // ✅
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
      const res = await authFetch(`/api/products/${deleteId}`, { method: "DELETE" }) // ✅
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

  const statusColor = (status: string) => {
    if (status === "In Stock") return "bg-green-100 text-green-700 border-green-200"
    if (status === "Low Stock") return "bg-yellow-100 text-yellow-700 border-yellow-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-base">Products ({filtered.length})</CardTitle>

            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="size-4 mr-1" />Add Product</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                  <div><Label>Product Name</Label>
                    <Input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div><Label>Category</Label>
                    <Select onValueChange={setProductCategory} value={productCategory}>
                      <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                      <SelectContent>
                        {categories.filter(c => c !== "All").map(c => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Purchase Price</Label>
                      <Input placeholder="Purchase Price" type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} />
                    </div>
                    <div><Label>Selling Price</Label>
                      <Input placeholder="Selling Price" type="number" value={sellingPrice} onChange={e => setSellingPrice(e.target.value)} />
                    </div>
                  </div>
                  <div><Label>Stock Quantity</Label>
                    <Input placeholder="Stock Quantity" type="number" value={stock} onChange={e => setStock(e.target.value)} />
                  </div>
                  <Button onClick={addProduct}>Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-3 sm:flex-row mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="text-right">Purchase</TableHead>
                <TableHead className="text-right">Selling</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p._id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                        <Package className="size-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(p.purchasePrice)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(p.sellingPrice)}
                  </TableCell>
                  <TableCell className="text-center">{p.stock}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor(p.status)}>{p.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="size-4 text-muted-foreground hover:text-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => confirmDelete(p._id)}>
                        <Trash2 className="size-4 text-red-400 hover:text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <div className="py-8 text-center">
              <Package className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No products found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* EDIT DIALOG */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div><Label>Product Name</Label>
              <Input value={editName} onChange={e => setEditName(e.target.value)} />
            </div>
            <div><Label>Category</Label>
              <Select value={editCategory} onValueChange={setEditCategory}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c !== "All").map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Purchase Price</Label>
                <Input type="number" value={editPurchasePrice} onChange={e => setEditPurchasePrice(e.target.value)} />
              </div>
              <div><Label>Selling Price</Label>
                <Input type="number" value={editSellingPrice} onChange={e => setEditSellingPrice(e.target.value)} />
              </div>
            </div>
            <div><Label>Stock Quantity</Label>
              <Input type="number" value={editStock} onChange={e => setEditStock(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button onClick={saveEdit} className="flex-1">Save Changes</Button>
              <Button variant="outline" onClick={() => setEditOpen(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM DIALOG */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Product</DialogTitle></DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button variant="destructive" onClick={deleteProduct} className="flex-1">Yes, Delete</Button>
              <Button variant="outline" onClick={() => setDeleteOpen(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}