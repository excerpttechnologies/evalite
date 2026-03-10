// "use client"

// import { useState } from "react"
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
// import { products, formatCurrency } from "@/app/lib/mock-data"

// const categories = ["All", "Medicine", "Grocery", "Electronics", "Stationery"]

// export function InventoryTable() {
//   const [search, setSearch] = useState("")
//   const [category, setCategory] = useState("All")

//   const filtered = products.filter((p) => {
//     const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
//     const matchesCategory = category === "All" || p.category === category
//     return matchesSearch && matchesCategory
//   })

//   const statusColor = (status: string) => {
//     if (status === "In Stock") return "bg-success/10 text-success border-success/20 hover:bg-success/20"
//     if (status === "Low Stock") return "bg-warning/10 text-warning-foreground border-warning/20 hover:bg-warning/20"
//     return "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20"
//   }

//   return (
//     <div className="flex flex-col gap-4">
//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//             <CardTitle className="text-base">Products ({filtered.length})</CardTitle>
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
//                   <Input placeholder="Product Name" />
//                   <Select>
//                     <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
//                     <SelectContent>
//                       {categories.filter(c => c !== "All").map((c) => (
//                         <SelectItem key={c} value={c}>{c}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <div className="grid grid-cols-2 gap-4">
//                     <Input placeholder="Purchase Price" type="number" />
//                     <Input placeholder="Selling Price" type="number" />
//                   </div>
//                   <Input placeholder="Stock Quantity" type="number" />
//                   <Button>Add Product</Button>
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
//                   <SelectItem key={c} value={c}>{c}</SelectItem>
//                 ))}
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
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filtered.map((p) => (
//                 <TableRow key={p.id}>
//                   <TableCell>
//                     <div className="flex items-center gap-2">
//                       <div className="flex size-8 items-center justify-center rounded-md bg-muted">
//                         <Package className="size-4 text-muted-foreground" />
//                       </div>
//                       <span className="font-medium text-foreground">{p.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell className="hidden sm:table-cell">
//                     <Badge variant="secondary" className="font-normal">
//                       {p.category}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right text-muted-foreground">
//                     {formatCurrency(p.purchasePrice)}
//                   </TableCell>
//                   <TableCell className="text-right font-medium text-foreground">
//                     {formatCurrency(p.sellingPrice)}
//                   </TableCell>
//                   <TableCell className="text-center">{p.stock}</TableCell>
//                   <TableCell>
//                     <Badge variant="outline" className={statusColor(p.status)}>
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
//               <p className="mt-2 text-sm text-muted-foreground">No products found</p>
//             </div>
//           )}
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
import { Badge } from "@/app/components/ui/badge"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog"
import { Plus, Search, Package } from "lucide-react"

const categories = ["All", "Medicine", "Grocery", "Electronics", "Stationery"]

export function InventoryTable() {

  const [products, setProducts] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const [name, setName] = useState("")
  const [productCategory, setProductCategory] = useState("")
  const [purchasePrice, setPurchasePrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [stock, setStock] = useState("")

  // Fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

const fetchProducts = async () => {
  try {
    const res = await fetch("/api/products")
    const data = await res.json()

    if (Array.isArray(data)) {
      setProducts(data)
    } else {
      setProducts([])
      console.error("API returned error:", data)
    }

  } catch (error) {
    console.error("Error fetching products:", error)
    setProducts([])
  }
}

  // Add product
  const addProduct = async () => {
    try {

      const status =
        Number(stock) === 0
          ? "Out of Stock"
          : Number(stock) < 10
          ? "Low Stock"
          : "In Stock"

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category: productCategory,
          purchasePrice: Number(purchasePrice),
          sellingPrice: Number(sellingPrice),
          stock: Number(stock),
          status,
        }),
      })

      const newProduct = await res.json()

      setProducts([...products, newProduct])

      // reset form
      setName("")
      setProductCategory("")
      setPurchasePrice("")
      setSellingPrice("")
      setStock("")

    } catch (error) {
      console.error("Error adding product:", error)
    }
  }

  // Filter products
 const filtered = Array.isArray(products)
  ? products.filter((p) => {
      const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === "All" || p.category === category
      return matchesSearch && matchesCategory
    })
  : []
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount)
  }

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

            <CardTitle className="text-base">
              Products ({filtered.length})
            </CardTitle>

            <Dialog>

              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="size-4 mr-1" />
                  Add Product
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">

                  <Input
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Select onValueChange={setProductCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories
                        .filter((c) => c !== "All")
                        .map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <div className="grid grid-cols-2 gap-4">

                    <Input
                      placeholder="Purchase Price"
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                    />

                    <Input
                      placeholder="Selling Price"
                      type="number"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />

                  </div>

                  <Input
                    placeholder="Stock Quantity"
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />

                  <Button onClick={addProduct}>
                    Add Product
                  </Button>

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
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />

            </div>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="sm:w-[180px]">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>

          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Category
                </TableHead>
                <TableHead className="text-right">
                  Purchase
                </TableHead>
                <TableHead className="text-right">
                  Selling
                </TableHead>
                <TableHead className="text-center">
                  Stock
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>

              {filtered.map((p) => (
                <TableRow key={p._id}>

                  <TableCell>
                    <div className="flex items-center gap-2">

                      <div className="flex size-8 items-center justify-center rounded-md bg-muted">
                        <Package className="size-4 text-muted-foreground" />
                      </div>

                      <span className="font-medium text-foreground">
                        {p.name}
                      </span>

                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary">
                      {p.category}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(p.purchasePrice)}
                  </TableCell>

                  <TableCell className="text-right font-medium text-foreground">
                    {formatCurrency(p.sellingPrice)}
                  </TableCell>

                  <TableCell className="text-center">
                    {p.stock}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={statusColor(p.status)}
                    >
                      {p.status}
                    </Badge>
                  </TableCell>

                </TableRow>
              ))}

            </TableBody>

          </Table>

          {filtered.length === 0 && (
            <div className="py-8 text-center">
              <Package className="mx-auto size-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                No products found
              </p>
            </div>
          )}

        </CardContent>
      </Card>

    </div>
  )
}