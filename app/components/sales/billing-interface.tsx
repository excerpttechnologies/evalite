

// "use client"

// import { useState, useEffect, useRef } from "react"
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
// import { Plus, Trash2, FileText, Download, History, RefreshCw } from "lucide-react"

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

// type SaleRecord = {
//   _id: string
//   customer: { _id: string; name: string } | null
//   product: { _id: string; name: string } | null
//   quantity: number
//   price: number
//   total: number
//   date: string
// }

// export function BillingInterface() {

//   const [products, setProducts] = useState<Product[]>([])
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
//   const [discount, setDiscount] = useState("0")
//   const [gstRate, setGstRate] = useState("18")

//   // Sales history state
//   const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([])
//   const [loadingHistory, setLoadingHistory] = useState(false)
//   const [showHistory, setShowHistory] = useState(false)

//   // Last saved invoice state (for PDF)
//   const [lastInvoice, setLastInvoice] = useState<{
//     customer: Customer | null
//     items: InvoiceItem[]
//     discount: number
//     gstRate: number
//     subtotal: number
//     discountAmount: number
//     gstAmount: number
//     grandTotal: number
//     date: string
//   } | null>(null)

//   const printRef = useRef<HTMLDivElement>(null)

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

//   const fetchSalesHistory = async () => {
//     setLoadingHistory(true)
//     try {
//       const res = await fetch("/api/sales")
//       const data = await res.json()
//       setSalesHistory(data)
//       setShowHistory(true)
//     } catch (err) {
//       console.error(err)
//       alert("Failed to load sales history")
//     } finally {
//       setLoadingHistory(false)
//     }
//   }

//   const addItem = () => {
//     const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1
//     setInvoiceItems([
//       ...invoiceItems,
//       { id: newId, productId: "", name: "", quantity: 1, price: 0, total: 0 }
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
//           return { ...item, quantity: qty, total: qty * item.price }
//         }
//         return item
//       })
//     )
//   }

//   const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)
//   const discountAmount = Number(discount) || 0
//   const gstAmount = Math.round(((subtotal - discountAmount) * Number(gstRate)) / 100)
//   const grandTotal = subtotal - discountAmount + gstAmount

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//     }).format(amount)
//   }

//   const formatDate = (dateStr: string) => {
//     return new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "2-digit", month: "short", year: "numeric",
//       hour: "2-digit", minute: "2-digit"
//     })
//   }

//   const saveInvoice = async () => {
//     if (!selectedCustomer) { alert("Select customer"); return }
//     if (invoiceItems.length === 0) { alert("Add at least one product"); return }
//     for (const item of invoiceItems) {
//       if (!item.productId) { alert("Please select product for all rows"); return }
//     }

//     const res = await fetch("/api/sales", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         customer: selectedCustomer,
//         items: invoiceItems.map(i => ({
//           product: i.productId,
//           quantity: i.quantity,
//           price: i.price
//         }))
//       })
//     })

//     const data = await res.json()
//     if (!res.ok) { alert(data.error || "Invoice failed"); return }

//     // Save invoice snapshot for PDF
//     const customerObj = customers.find(c => c._id === selectedCustomer) || null
//     setLastInvoice({
//       customer: customerObj,
//       items: [...invoiceItems],
//       discount: Number(discount),
//       gstRate: Number(gstRate),
//       subtotal,
//       discountAmount,
//       gstAmount,
//       grandTotal,
//       date: new Date().toLocaleString("en-IN")
//     })

//     alert("Invoice saved successfully")
//     setInvoiceItems([])

//     // Refresh history if it's open
//     if (showHistory) fetchSalesHistory()
//   }

//   const downloadInvoicePDF = () => {
//     if (!lastInvoice) {
//       alert("No invoice to download. Please generate an invoice first.")
//       return
//     }

//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//         <head>
//           <title>Invoice - EvaLite</title>
//           <style>
//             * { margin: 0; padding: 0; box-sizing: border-box; }
//             body { font-family: Arial, sans-serif; padding: 40px; color: #333; font-size: 14px; }
//             .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
//             .store-name { font-size: 28px; font-weight: bold; color: #f59e0b; }
//             .store-sub { font-size: 12px; color: #666; margin-top: 4px; }
//             .invoice-title { font-size: 22px; font-weight: bold; text-align: right; }
//             .invoice-meta { text-align: right; font-size: 12px; color: #666; margin-top: 4px; }
//             .divider { border: none; border-top: 2px solid #f59e0b; margin: 20px 0; }
//             .bill-to { margin-bottom: 24px; }
//             .bill-to h4 { font-size: 11px; text-transform: uppercase; color: #666; letter-spacing: 1px; margin-bottom: 4px; }
//             .bill-to p { font-size: 16px; font-weight: 600; }
//             table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
//             thead { background: #f59e0b; color: white; }
//             th { padding: 10px 12px; text-align: left; font-size: 12px; text-transform: uppercase; }
//             td { padding: 10px 12px; border-bottom: 1px solid #eee; }
//             tbody tr:nth-child(even) { background: #fafafa; }
//             .summary { margin-left: auto; width: 280px; }
//             .summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
//             .summary-row.total { font-weight: bold; font-size: 16px; border-top: 2px solid #333; padding-top: 10px; margin-top: 4px; }
//             .footer { margin-top: 40px; text-align: center; font-size: 11px; color: #999; }
//           </style>
//         </head>
//         <body>
//           <div class="header">
//             <div>
//               <div class="store-name">EvaLite</div>
//               <div class="store-sub">Your trusted store</div>
//             </div>
//             <div>
//               <div class="invoice-title">INVOICE</div>
//               <div class="invoice-meta">Date: ${lastInvoice.date}</div>
//             </div>
//           </div>
//           <hr class="divider"/>
//           <div class="bill-to">
//             <h4>Bill To</h4>
//             <p>${lastInvoice.customer?.name || "—"}</p>
//           </div>
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Product</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${lastInvoice.items.map((item, idx) => `
//                 <tr>
//                   <td>${idx + 1}</td>
//                   <td>${item.name}</td>
//                   <td>${item.quantity}</td>
//                   <td>${formatCurrency(item.price)}</td>
//                   <td>${formatCurrency(item.total)}</td>
//                 </tr>
//               `).join("")}
//             </tbody>
//           </table>
//           <div class="summary">
//             <div class="summary-row"><span>Subtotal</span><span>${formatCurrency(lastInvoice.subtotal)}</span></div>
//             <div class="summary-row"><span>Discount</span><span>-${formatCurrency(lastInvoice.discountAmount)}</span></div>
//             <div class="summary-row"><span>GST (${lastInvoice.gstRate}%)</span><span>${formatCurrency(lastInvoice.gstAmount)}</span></div>
//             <div class="summary-row total"><span>Grand Total</span><span>${formatCurrency(lastInvoice.grandTotal)}</span></div>
//           </div>
//           <div class="footer">Thank you for your business! — EvaLite</div>
//         </body>
//       </html>
//     `

//     const printWindow = window.open("", "_blank")
//     if (!printWindow) { alert("Allow popups to download invoice PDF"); return }
//     printWindow.document.write(printContent)
//     printWindow.document.close()
//     printWindow.focus()
//     setTimeout(() => {
//       printWindow.print()
//       printWindow.close()
//     }, 500)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       {/* Main Billing Grid */}
//       <div className="grid gap-4 lg:grid-cols-5">

//         {/* Left Side */}
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader>
//               <CardTitle>New Invoice</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-4">

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Select Customer</Label>
//                   <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Choose customer" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {customers.map(c => (
//                         <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <div className="flex justify-between mb-3">
//                   <h3 className="text-sm font-medium">Items</h3>
//                   <Button size="sm" onClick={addItem}>
//                     <Plus className="size-4 mr-1" />
//                     Add Item
//                   </Button>
//                 </div>

//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Product</TableHead>
//                       <TableHead>Qty</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Total</TableHead>
//                       <TableHead></TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {invoiceItems.map(item => (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <Select
//                             value={item.productId}
//                             onValueChange={v => updateItem(item.id, "productId", v)}
//                           >
//                             <SelectTrigger>
//                               <SelectValue placeholder="Select product" />
//                             </SelectTrigger>
//                             <SelectContent>
//                               {products.map(p => (
//                                 <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>
//                               ))}
//                             </SelectContent>
//                           </Select>
//                         </TableCell>
//                         <TableCell>
//                           <Input
//                             type="number"
//                             value={item.quantity}
//                             onChange={e => updateItem(item.id, "quantity", e.target.value)}
//                           />
//                         </TableCell>
//                         <TableCell>{formatCurrency(item.price)}</TableCell>
//                         <TableCell>{formatCurrency(item.total)}</TableCell>
//                         <TableCell>
//                           <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                             <Trash2 className="size-4 text-red-500" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               <Separator />

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Discount (₹)</Label>
//                   <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
//                 </div>
//                 <div>
//                   <Label>GST %</Label>
//                   <Input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
//                 </div>
//               </div>

//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side - Summary */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Invoice Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="flex flex-col gap-3">

//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>{formatCurrency(subtotal)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount</span>
//                 <span>-{formatCurrency(discountAmount)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>GST ({gstRate}%)</span>
//                 <span>{formatCurrency(gstAmount)}</span>
//               </div>

//               <Separator />

//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>{formatCurrency(grandTotal)}</span>
//               </div>

//               <Button onClick={saveInvoice} className="mt-4">
//                 <FileText className="size-4 mr-2" />
//                 Generate Invoice
//               </Button>

//               <Button
//                 variant="outline"
//                 onClick={downloadInvoicePDF}
//                 disabled={!lastInvoice}
//                 className="flex gap-2"
//               >
//                 <Download className="size-4" />
//                 Download Invoice PDF
//               </Button>

//               {!lastInvoice && (
//                 <p className="text-xs text-muted-foreground text-center">
//                   Generate an invoice first to enable PDF download
//                 </p>
//               )}

//             </CardContent>
//           </Card>
//         </div>

//       </div>

//       {/* Sales History Section */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <History className="size-5 text-muted-foreground" />
//             <h2 className="text-lg font-semibold">Sales History</h2>
//           </div>
//           <div className="flex gap-2">
//             {showHistory && (
//               <Button variant="ghost" size="sm" onClick={fetchSalesHistory} disabled={loadingHistory}>
//                 <RefreshCw className={`size-4 mr-1 ${loadingHistory ? "animate-spin" : ""}`} />
//                 Refresh
//               </Button>
//             )}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={showHistory ? () => setShowHistory(false) : fetchSalesHistory}
//               disabled={loadingHistory}
//             >
//               {loadingHistory ? "Loading..." : showHistory ? "Hide History" : "View History"}
//             </Button>
//           </div>
//         </div>

//         {showHistory && (
//           <Card>
//             <CardContent className="pt-4">
//               {salesHistory.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-8">No sales records found.</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Product</TableHead>
//                       <TableHead className="text-right">Qty</TableHead>
//                       <TableHead className="text-right">Price</TableHead>
//                       <TableHead className="text-right">Total</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {salesHistory.map(sale => (
//                       <TableRow key={sale._id}>
//                         <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
//                           {formatDate(sale.date)}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {sale.customer?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell>
//                           {sale.product?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell className="text-right">{sale.quantity}</TableCell>
//                         <TableCell className="text-right">{formatCurrency(sale.price)}</TableCell>
//                         <TableCell className="text-right font-semibold">{formatCurrency(sale.total)}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}

//               {/* Summary footer */}
//               {salesHistory.length > 0 && (
//                 <div className="flex justify-between items-center mt-4 pt-4 border-t">
//                   <span className="text-sm text-muted-foreground">
//                     {salesHistory.length} record{salesHistory.length !== 1 ? "s" : ""}
//                   </span>
//                   <div className="font-bold">
//                     Total Revenue: {formatCurrency(salesHistory.reduce((sum, s) => sum + s.total, 0))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>

//     </div>
//   )
// }











// "use client"

// import { useState, useEffect, useRef } from "react"
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
// import { Plus, Trash2, FileText, Download, History, RefreshCw } from "lucide-react"

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

// type SaleRecord = {
//   _id: string
//   customer: { _id: string; name: string } | null
//   product: { _id: string; name: string } | null
//   quantity: number
//   price: number
//   total: number
//   date: string
// }

// export function BillingInterface() {

//   const [products, setProducts] = useState<Product[]>([])
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
//   const [discount, setDiscount] = useState("0")
//   const [gstRate, setGstRate] = useState("18")

//   const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([])
//   const [loadingHistory, setLoadingHistory] = useState(false)
//   const [showHistory, setShowHistory] = useState(false)

//   const [lastInvoice, setLastInvoice] = useState<{
//     customer: Customer | null
//     items: InvoiceItem[]
//     discount: number
//     gstRate: number
//     subtotal: number
//     discountAmount: number
//     gstAmount: number
//     grandTotal: number
//     date: string
//   } | null>(null)

//   const printRef = useRef<HTMLDivElement>(null)

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

//   const fetchSalesHistory = async () => {
//     setLoadingHistory(true)
//     try {
//       const res = await fetch("/api/sales")
//       const data = await res.json()
//       setSalesHistory(data)
//       setShowHistory(true)
//     } catch (err) {
//       console.error(err)
//       alert("Failed to load sales history")
//     } finally {
//       setLoadingHistory(false)
//     }
//   }

//   const addItem = () => {
//     const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1
//     setInvoiceItems([...invoiceItems, { id: newId, productId: "", name: "", quantity: 1, price: 0, total: 0 }])
//   }

//   const removeItem = (id: number) => {
//     setInvoiceItems(invoiceItems.filter(i => i.id !== id))
//   }

//   const updateItem = (id: number, field: string, value: string | number) => {
//     setInvoiceItems(invoiceItems.map(item => {
//       if (item.id !== id) return item
//       if (field === "productId") {
//         const product = products.find(p => p._id === value)
//         if (product) return { ...item, productId: product._id, name: product.name, price: product.sellingPrice, total: item.quantity * product.sellingPrice }
//       }
//       if (field === "quantity") {
//         const qty = Number(value)
//         return { ...item, quantity: qty, total: qty * item.price }
//       }
//       return item
//     }))
//   }

//   const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)
//   const discountAmount = Number(discount) || 0
//   const gstAmount = Math.round(((subtotal - discountAmount) * Number(gstRate)) / 100)
//   const grandTotal = subtotal - discountAmount + gstAmount

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const formatDate = (dateStr: string) =>
//     new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

//   const saveInvoice = async () => {
//     if (!selectedCustomer) { alert("Select customer"); return }
//     if (invoiceItems.length === 0) { alert("Add at least one product"); return }
//     for (const item of invoiceItems) {
//       if (!item.productId) { alert("Please select product for all rows"); return }
//     }

//     const res = await fetch("/api/sales", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         customer: selectedCustomer,
//         items: invoiceItems.map(i => ({ product: i.productId, quantity: i.quantity, price: i.price }))
//       })
//     })

//     const data = await res.json()
//     if (!res.ok) { alert(data.error || "Invoice failed"); return }

//     const customerObj = customers.find(c => c._id === selectedCustomer) || null
//     setLastInvoice({
//       customer: customerObj,
//       items: [...invoiceItems],
//       discount: Number(discount),
//       gstRate: Number(gstRate),
//       subtotal,
//       discountAmount,
//       gstAmount,
//       grandTotal,
//       date: new Date().toLocaleString("en-IN")
//     })

//     alert("Invoice saved successfully")
//     setInvoiceItems([])
//     if (showHistory) fetchSalesHistory()
//   }

//   // ── PDF helpers ──

//   const buildSingleSalePDF = (sale: SaleRecord) => `
//     <!DOCTYPE html><html><head><title>Sale Receipt</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//       .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
//       .store{font-size:24px;font-weight:bold;color:#f59e0b}
//       .store-sub{font-size:11px;color:#666;margin-top:3px}
//       .title{font-size:20px;font-weight:bold;text-align:right}
//       .meta{font-size:11px;color:#666;text-align:right;margin-top:3px}
//       hr{border:none;border-top:2px solid #f59e0b;margin:16px 0}
//       .bill-to h4{font-size:10px;text-transform:uppercase;color:#999;letter-spacing:1px;margin-bottom:4px}
//       .bill-to p{font-size:15px;font-weight:600}
//       table{width:100%;border-collapse:collapse;margin:20px 0}
//       thead{background:#f59e0b;color:white}
//       th{padding:9px 12px;text-align:left;font-size:11px;text-transform:uppercase}
//       td{padding:9px 12px;border-bottom:1px solid #eee}
//       tbody tr:nth-child(even){background:#fafafa}
//       .summary{margin-left:auto;width:260px;margin-top:8px}
//       .row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px}
//       .row.total{font-weight:bold;font-size:15px;border-top:2px solid #333;padding-top:8px;margin-top:4px}
//       .footer{margin-top:36px;text-align:center;font-size:10px;color:#aaa}
//     </style></head><body>
//     <div class="header">
//       <div><div class="store">EvaLite</div><div class="store-sub">Your trusted store</div></div>
//       <div><div class="title">SALE RECEIPT</div><div class="meta">Date: ${formatDate(sale.date)}</div></div>
//     </div>
//     <hr/>
//     <div class="bill-to"><h4>Customer</h4><p>${sale.customer?.name || "—"}</p></div>
//     <table>
//       <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
//       <tbody>
//         <tr>
//           <td>${sale.product?.name || "—"}</td>
//           <td>${sale.quantity}</td>
//           <td>${formatCurrency(sale.price)}</td>
//           <td>${formatCurrency(sale.total)}</td>
//         </tr>
//       </tbody>
//     </table>
//     <div class="summary">
//       <div class="row total"><span>Total</span><span>${formatCurrency(sale.total)}</span></div>
//     </div>
//     <div class="footer">Thank you for your business! — EvaLite</div>
//     </body></html>`

//   const buildAllSalesPDF = (sales: SaleRecord[]) => {
//     const totalRevenue = sales.reduce((s, r) => s + r.total, 0)
//     const rows = sales.map((sale, idx) => `
//       <tr>
//         <td>${idx + 1}</td>
//         <td>${formatDate(sale.date)}</td>
//         <td>${sale.customer?.name || "—"}</td>
//         <td>${sale.product?.name || "—"}</td>
//         <td style="text-align:center">${sale.quantity}</td>
//         <td style="text-align:right">${formatCurrency(sale.price)}</td>
//         <td style="text-align:right;font-weight:600">${formatCurrency(sale.total)}</td>
//       </tr>`).join("")

//     return `<!DOCTYPE html><html><head><title>All Sales - EvaLite</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:36px;color:#333;font-size:13px}
//       .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
//       .store{font-size:24px;font-weight:bold;color:#f59e0b}
//       .store-sub{font-size:11px;color:#666;margin-top:3px}
//       .title{font-size:18px;font-weight:bold;text-align:right}
//       .meta{font-size:11px;color:#666;text-align:right;margin-top:3px}
//       hr{border:none;border-top:2px solid #f59e0b;margin:14px 0}
//       table{width:100%;border-collapse:collapse;margin-top:12px}
//       thead{background:#f59e0b;color:white}
//       th{padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase}
//       td{padding:8px 10px;border-bottom:1px solid #eee;font-size:12px}
//       tbody tr:nth-child(even){background:#fafafa}
//       .summary{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:2px solid #f59e0b}
//       .total-label{font-size:13px;color:#666}
//       .total-val{font-size:18px;font-weight:bold;color:#333}
//       .footer{margin-top:32px;text-align:center;font-size:10px;color:#aaa}
//     </style></head><body>
//     <div class="header">
//       <div><div class="store">EvaLite</div><div class="store-sub">Your trusted store</div></div>
//       <div><div class="title">SALES HISTORY REPORT</div><div class="meta">Generated: ${new Date().toLocaleString("en-IN")}</div></div>
//     </div>
//     <hr/>
//     <table>
//       <thead><tr><th>#</th><th>Date</th><th>Customer</th><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Total</th></tr></thead>
//       <tbody>${rows}</tbody>
//     </table>
//     <div class="summary">
//       <span class="total-label">${sales.length} record${sales.length !== 1 ? "s" : ""}</span>
//       <div><span class="total-label">Total Revenue: </span><span class="total-val">${formatCurrency(totalRevenue)}</span></div>
//     </div>
//     <div class="footer">EvaLite — Sales Report</div>
//     </body></html>`
//   }

//   const openPrintWindow = (html: string) => {
//     const w = window.open("", "_blank")
//     if (!w) { alert("Allow popups to download PDF"); return }
//     w.document.write(html)
//     w.document.close()
//     w.focus()
//     setTimeout(() => { w.print(); w.close() }, 500)
//   }

//   const downloadInvoicePDF = () => {
//     if (!lastInvoice) { alert("Generate an invoice first"); return }
//     const html = `
//       <!DOCTYPE html><html><head><title>Invoice - EvaLite</title>
//       <style>
//         *{margin:0;padding:0;box-sizing:border-box}
//         body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//         .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px}
//         .store{font-size:28px;font-weight:bold;color:#f59e0b}
//         .store-sub{font-size:12px;color:#666;margin-top:4px}
//         .title{font-size:22px;font-weight:bold;text-align:right}
//         .meta{text-align:right;font-size:12px;color:#666;margin-top:4px}
//         hr{border:none;border-top:2px solid #f59e0b;margin:20px 0}
//         .bill-to{margin-bottom:24px}
//         .bill-to h4{font-size:11px;text-transform:uppercase;color:#666;letter-spacing:1px;margin-bottom:4px}
//         .bill-to p{font-size:16px;font-weight:600}
//         table{width:100%;border-collapse:collapse;margin-bottom:24px}
//         thead{background:#f59e0b;color:white}
//         th{padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase}
//         td{padding:10px 12px;border-bottom:1px solid #eee}
//         tbody tr:nth-child(even){background:#fafafa}
//         .summary{margin-left:auto;width:280px}
//         .row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px}
//         .row.total{font-weight:bold;font-size:16px;border-top:2px solid #333;padding-top:10px;margin-top:4px}
//         .footer{margin-top:40px;text-align:center;font-size:11px;color:#999}
//       </style></head><body>
//       <div class="header">
//         <div><div class="store">EvaLite</div><div class="store-sub">Your trusted store</div></div>
//         <div><div class="title">INVOICE</div><div class="meta">Date: ${lastInvoice.date}</div></div>
//       </div>
//       <hr/>
//       <div class="bill-to"><h4>Bill To</h4><p>${lastInvoice.customer?.name || "—"}</p></div>
//       <table>
//         <thead><tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
//         <tbody>
//           ${lastInvoice.items.map((item, idx) => `
//             <tr><td>${idx + 1}</td><td>${item.name}</td><td>${item.quantity}</td><td>${formatCurrency(item.price)}</td><td>${formatCurrency(item.total)}</td></tr>
//           `).join("")}
//         </tbody>
//       </table>
//       <div class="summary">
//         <div class="row"><span>Subtotal</span><span>${formatCurrency(lastInvoice.subtotal)}</span></div>
//         <div class="row"><span>Discount</span><span>-${formatCurrency(lastInvoice.discountAmount)}</span></div>
//         <div class="row"><span>GST (${lastInvoice.gstRate}%)</span><span>${formatCurrency(lastInvoice.gstAmount)}</span></div>
//         <div class="row total"><span>Grand Total</span><span>${formatCurrency(lastInvoice.grandTotal)}</span></div>
//       </div>
//       <div class="footer">Thank you for your business! — EvaLite</div>
//       </body></html>`
//     openPrintWindow(html)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       {/* Main Billing Grid */}
//       <div className="grid gap-4 lg:grid-cols-5">

//         {/* Left Side */}
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader><CardTitle>New Invoice</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-4">

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Select Customer</Label>
//                   <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
//                     <SelectTrigger><SelectValue placeholder="Choose customer" /></SelectTrigger>
//                     <SelectContent>
//                       {customers.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <div className="flex justify-between mb-3">
//                   <h3 className="text-sm font-medium">Items</h3>
//                   <Button size="sm" onClick={addItem}><Plus className="size-4 mr-1" />Add Item</Button>
//                 </div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Product</TableHead>
//                       <TableHead>Qty</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Total</TableHead>
//                       <TableHead></TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {invoiceItems.map(item => (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <Select value={item.productId} onValueChange={v => updateItem(item.id, "productId", v)}>
//                             <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
//                             <SelectContent>
//                               {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                             </SelectContent>
//                           </Select>
//                         </TableCell>
//                         <TableCell>
//                           <Input type="number" value={item.quantity} onChange={e => updateItem(item.id, "quantity", e.target.value)} />
//                         </TableCell>
//                         <TableCell>{formatCurrency(item.price)}</TableCell>
//                         <TableCell>{formatCurrency(item.total)}</TableCell>
//                         <TableCell>
//                           <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                             <Trash2 className="size-4 text-red-500" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               <Separator />

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Discount (₹)</Label>
//                   <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
//                 </div>
//                 <div>
//                   <Label>GST %</Label>
//                   <Input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
//                 </div>
//               </div>

//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader><CardTitle>Invoice Summary</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-3">
//               <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
//               <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(discountAmount)}</span></div>
//               <div className="flex justify-between"><span>GST ({gstRate}%)</span><span>{formatCurrency(gstAmount)}</span></div>
//               <Separator />
//               <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(grandTotal)}</span></div>
//               <Button onClick={saveInvoice} className="mt-4">
//                 <FileText className="size-4 mr-2" />Generate Invoice
//               </Button>
//               <Button variant="outline" onClick={downloadInvoicePDF} disabled={!lastInvoice} className="flex gap-2">
//                 <Download className="size-4" />Download Invoice PDF
//               </Button>
//               {!lastInvoice && (
//                 <p className="text-xs text-muted-foreground text-center">Generate an invoice first to enable PDF download</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//       </div>

//       {/* Sales History */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <History className="size-5 text-muted-foreground" />
//             <h2 className="text-lg font-semibold">Sales History</h2>
//           </div>
//           <div className="flex gap-2">
//             {showHistory && salesHistory.length > 0 && (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => openPrintWindow(buildAllSalesPDF(salesHistory))}
//                 className="flex gap-1.5 text-green-700 border-green-300 hover:bg-green-50"
//               >
//                 <Download className="size-4" />
//                 Download All
//               </Button>
//             )}
//             {showHistory && (
//               <Button variant="ghost" size="sm" onClick={fetchSalesHistory} disabled={loadingHistory}>
//                 <RefreshCw className={`size-4 mr-1 ${loadingHistory ? "animate-spin" : ""}`} />
//                 Refresh
//               </Button>
//             )}
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={showHistory ? () => setShowHistory(false) : fetchSalesHistory}
//               disabled={loadingHistory}
//             >
//               {loadingHistory ? "Loading..." : showHistory ? "Hide History" : "View History"}
//             </Button>
//           </div>
//         </div>

//         {showHistory && (
//           <Card>
//             <CardContent className="pt-4">
//               {salesHistory.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-8">No sales records found.</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Product</TableHead>
//                       <TableHead className="text-right">Qty</TableHead>
//                       <TableHead className="text-right">Price</TableHead>
//                       <TableHead className="text-right">Total</TableHead>
//                       <TableHead className="text-center">Receipt</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {salesHistory.map(sale => (
//                       <TableRow key={sale._id}>
//                         <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
//                           {formatDate(sale.date)}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {sale.customer?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell>
//                           {sale.product?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell className="text-right">{sale.quantity}</TableCell>
//                         <TableCell className="text-right">{formatCurrency(sale.price)}</TableCell>
//                         <TableCell className="text-right font-semibold">{formatCurrency(sale.total)}</TableCell>
//                         <TableCell className="text-center">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             title="Download receipt"
//                             onClick={() => openPrintWindow(buildSingleSalePDF(sale))}
//                           >
//                             <Download className="size-4 text-muted-foreground hover:text-foreground" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}

//               {salesHistory.length > 0 && (
//                 <div className="flex justify-between items-center mt-4 pt-4 border-t">
//                   <span className="text-sm text-muted-foreground">
//                     {salesHistory.length} record{salesHistory.length !== 1 ? "s" : ""}
//                   </span>
//                   <div className="font-bold">
//                     Total Revenue: {formatCurrency(salesHistory.reduce((sum, s) => sum + s.total, 0))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>

//     </div>
//   )
// }




//aravind

// "use client"

// import { useState, useEffect, useRef } from "react"
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
// import { Plus, Trash2, FileText, Download, History, RefreshCw } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch" // ✅

// type Product = { _id: string; name: string; sellingPrice: number }
// type Customer = { _id: string; name: string }
// type InvoiceItem = { id: number; productId: string; name: string; quantity: number; price: number; total: number }
// type SaleRecord = {
//   _id: string
//   customer: { _id: string; name: string } | null
//   product: { _id: string; name: string } | null
//   quantity: number
//   price: number
//   total: number
//   date: string
// }

// export function BillingInterface() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
//   const [discount, setDiscount] = useState("0")
//   const [gstRate, setGstRate] = useState("18")

//   const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([])
//   const [loadingHistory, setLoadingHistory] = useState(false)
//   const [showHistory, setShowHistory] = useState(false)

//   const [lastInvoice, setLastInvoice] = useState<{
//     customer: Customer | null
//     items: InvoiceItem[]
//     discount: number
//     gstRate: number
//     subtotal: number
//     discountAmount: number
//     gstAmount: number
//     grandTotal: number
//     date: string
//   } | null>(null)

//   const printRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     fetchProducts()
//     fetchCustomers()
//   }, [])

//   const fetchProducts = async () => {
//     const res = await authFetch("/api/products") // ✅
//     const data = await res.json()
//     setProducts(data)
//   }

//   const fetchCustomers = async () => {
//     const res = await authFetch("/api/customers") // ✅
//     const data = await res.json()
//     setCustomers(data)
//   }

//   const fetchSalesHistory = async () => {
//     setLoadingHistory(true)
//     try {
//       const res = await authFetch("/api/sales") // ✅
//       const data = await res.json()
//       setSalesHistory(data)
//       setShowHistory(true)
//     } catch (err) {
//       console.error(err)
//       alert("Failed to load sales history")
//     } finally {
//       setLoadingHistory(false)
//     }
//   }

//   const addItem = () => {
//     const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1
//     setInvoiceItems([...invoiceItems, { id: newId, productId: "", name: "", quantity: 1, price: 0, total: 0 }])
//   }

//   const removeItem = (id: number) => {
//     setInvoiceItems(invoiceItems.filter(i => i.id !== id))
//   }

//   const updateItem = (id: number, field: string, value: string | number) => {
//     setInvoiceItems(invoiceItems.map(item => {
//       if (item.id !== id) return item
//       if (field === "productId") {
//         const product = products.find(p => p._id === value)
//         if (product) return { ...item, productId: product._id, name: product.name, price: product.sellingPrice, total: item.quantity * product.sellingPrice }
//       }
//       if (field === "quantity") {
//         const qty = Number(value)
//         return { ...item, quantity: qty, total: qty * item.price }
//       }
//       return item
//     }))
//   }

//   const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)
//   const discountAmount = Number(discount) || 0
//   const gstAmount = Math.round(((subtotal - discountAmount) * Number(gstRate)) / 100)
//   const grandTotal = subtotal - discountAmount + gstAmount

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const formatDate = (dateStr: string) =>
//     new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

//   const saveInvoice = async () => {
//     if (!selectedCustomer) { alert("Select customer"); return }
//     if (invoiceItems.length === 0) { alert("Add at least one product"); return }
//     for (const item of invoiceItems) {
//       if (!item.productId) { alert("Please select product for all rows"); return }
//     }

//     const res = await authFetch("/api/sales", { // ✅
//       method: "POST",
//       body: JSON.stringify({
//         customer: selectedCustomer,
//         items: invoiceItems.map(i => ({ product: i.productId, quantity: i.quantity, price: i.price }))
//       })
//     })

//     const data = await res.json()
//     if (!res.ok) { alert(data.error || "Invoice failed"); return }

//     const customerObj = customers.find(c => c._id === selectedCustomer) || null
//     setLastInvoice({
//       customer: customerObj,
//       items: [...invoiceItems],
//       discount: Number(discount),
//       gstRate: Number(gstRate),
//       subtotal,
//       discountAmount,
//       gstAmount,
//       grandTotal,
//       date: new Date().toLocaleString("en-IN")
//     })

//     alert("Invoice saved successfully")
//     setInvoiceItems([])
//     if (showHistory) fetchSalesHistory()
//   }

//   // ── PDF helpers ──
//   const buildSingleSalePDF = (sale: SaleRecord) => `
//     <!DOCTYPE html><html><head><title>Sale Receipt</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//       .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
//       .store{font-size:24px;font-weight:bold;color:#f59e0b}
//       .store-sub{font-size:11px;color:#666;margin-top:3px}
//       .title{font-size:20px;font-weight:bold;text-align:right}
//       .meta{font-size:11px;color:#666;text-align:right;margin-top:3px}
//       hr{border:none;border-top:2px solid #f59e0b;margin:16px 0}
//       .bill-to h4{font-size:10px;text-transform:uppercase;color:#999;letter-spacing:1px;margin-bottom:4px}
//       .bill-to p{font-size:15px;font-weight:600}
//       table{width:100%;border-collapse:collapse;margin:20px 0}
//       thead{background:#f59e0b;color:white}
//       th{padding:9px 12px;text-align:left;font-size:11px;text-transform:uppercase}
//       td{padding:9px 12px;border-bottom:1px solid #eee}
//       tbody tr:nth-child(even){background:#fafafa}
//       .summary{margin-left:auto;width:260px;margin-top:8px}
//       .row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px}
//       .row.total{font-weight:bold;font-size:15px;border-top:2px solid #333;padding-top:8px;margin-top:4px}
//       .footer{margin-top:36px;text-align:center;font-size:10px;color:#aaa}
//     </style></head><body>
//     <div class="header">
//       <div><div class="store">EvaLite</div><div class="store-sub">Your trusted store</div></div>
//       <div><div class="title">SALE RECEIPT</div><div class="meta">Date: ${formatDate(sale.date)}</div></div>
//     </div>
//     <hr/>
//     <div class="bill-to"><h4>Customer</h4><p>${sale.customer?.name || "—"}</p></div>
//     <table>
//       <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
//       <tbody>
//         <tr>
//           <td>${sale.product?.name || "—"}</td>
//           <td>${sale.quantity}</td>
//           <td>${formatCurrency(sale.price)}</td>
//           <td>${formatCurrency(sale.total)}</td>
//         </tr>
//       </tbody>
//     </table>
//     <div class="summary">
//       <div class="row total"><span>Total</span><span>${formatCurrency(sale.total)}</span></div>
//     </div>
//     <div class="footer">Thank you for your business! — EvaLite</div>
//     </body></html>`

//   const buildAllSalesPDF = (sales: SaleRecord[]) => {
//     const totalRevenue = sales.reduce((s, r) => s + r.total, 0)
//     const rows = sales.map((sale, idx) => `
//       <tr>
//         <td>${idx + 1}</td>
//         <td>${formatDate(sale.date)}</td>
//         <td>${sale.customer?.name || "—"}</td>
//         <td>${sale.product?.name || "—"}</td>
//         <td style="text-align:center">${sale.quantity}</td>
//         <td style="text-align:right">${formatCurrency(sale.price)}</td>
//         <td style="text-align:right;font-weight:600">${formatCurrency(sale.total)}</td>
//       </tr>`).join("")

//     return `<!DOCTYPE html><html><head><title>All Sales - EvaLite</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:36px;color:#333;font-size:13px}
//       .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
//       .store{font-size:24px;font-weight:bold;color:#f59e0b}
//       .store-sub{font-size:11px;color:#666;margin-top:3px}
//       .title{font-size:18px;font-weight:bold;text-align:right}
//       .meta{font-size:11px;color:#666;text-align:right;margin-top:3px}
//       hr{border:none;border-top:2px solid #f59e0b;margin:14px 0}
//       table{width:100%;border-collapse:collapse;margin-top:12px}
//       thead{background:#f59e0b;color:white}
//       th{padding:8px 10px;text-align:left;font-size:11px;text-transform:uppercase}
//       td{padding:8px 10px;border-bottom:1px solid #eee;font-size:12px}
//       tbody tr:nth-child(even){background:#fafafa}
//       .summary{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:2px solid #f59e0b}
//       .total-label{font-size:13px;color:#666}
//       .total-val{font-size:18px;font-weight:bold;color:#333}
//       .footer{margin-top:32px;text-align:center;font-size:10px;color:#aaa}
//     </style></head><body>
//     <div class="header">
//       <div><div class="store">EvaLite</div><div class="store-sub">Your trusted store</div></div>
//       <div><div class="title">SALES HISTORY REPORT</div><div class="meta">Generated: ${new Date().toLocaleString("en-IN")}</div></div>
//     </div>
//     <hr/>
//     <table>
//       <thead><tr><th>#</th><th>Date</th><th>Customer</th><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Total</th></tr></thead>
//       <tbody>${rows}</tbody>
//     </table>
//     <div class="summary">
//       <span class="total-label">${sales.length} record${sales.length !== 1 ? "s" : ""}</span>
//       <div><span class="total-label">Total Revenue: </span><span class="total-val">${formatCurrency(totalRevenue)}</span></div>
//     </div>
//     <div class="footer">EvaLite — Sales Report</div>
//     </body></html>`
//   }

//   const openPrintWindow = (html: string) => {
//     const w = window.open("", "_blank")
//     if (!w) { alert("Allow popups to download PDF"); return }
//     w.document.write(html)
//     w.document.close()
//     w.focus()
//     setTimeout(() => { w.print(); w.close() }, 500)
//   }

//   const downloadInvoicePDF = () => {
//     if (!lastInvoice) { alert("Generate an invoice first"); return }
//     const html = `
//       <!DOCTYPE html><html><head><title>Invoice - EvaLite</title>
//       <style>
//         *{margin:0;padding:0;box-sizing:border-box}
//         body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//         .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:30px}
//         .store{font-size:28px;font-weight:bold;color:#f59e0b}
//         .store-sub{font-size:12px;color:#666;margin-top:4px}
//         .title{font-size:22px;font-weight:bold;text-align:right}
//         .meta{text-align:right;font-size:12px;color:#666;margin-top:4px}
//         hr{border:none;border-top:2px solid #f59e0b;margin:20px 0}
//         .bill-to{margin-bottom:24px}
//         .bill-to h4{font-size:11px;text-transform:uppercase;color:#666;letter-spacing:1px;margin-bottom:4px}
//         .bill-to p{font-size:16px;font-weight:600}
//         table{width:100%;border-collapse:collapse;margin-bottom:24px}
//         thead{background:#f59e0b;color:white}
//         th{padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase}
//         td{padding:10px 12px;border-bottom:1px solid #eee}
//         tbody tr:nth-child(even){background:#fafafa}
//         .summary{margin-left:auto;width:280px}
//         .row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px}
//         .row.total{font-weight:bold;font-size:16px;border-top:2px solid #333;padding-top:10px;margin-top:4px}
//         .footer{margin-top:40px;text-align:center;font-size:11px;color:#999}
//       </style></head><body>
//       <div class="header">
//         <div><div class="store">EvaLite</div><div class="store-sub">Your trusted store</div></div>
//         <div><div class="title">INVOICE</div><div class="meta">Date: ${lastInvoice.date}</div></div>
//       </div>
//       <hr/>
//       <div class="bill-to"><h4>Bill To</h4><p>${lastInvoice.customer?.name || "—"}</p></div>
//       <table>
//         <thead><tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
//         <tbody>
//           ${lastInvoice.items.map((item, idx) => `
//             <tr><td>${idx + 1}</td><td>${item.name}</td><td>${item.quantity}</td><td>${formatCurrency(item.price)}</td><td>${formatCurrency(item.total)}</td></tr>
//           `).join("")}
//         </tbody>
//       </table>
//       <div class="summary">
//         <div class="row"><span>Subtotal</span><span>${formatCurrency(lastInvoice.subtotal)}</span></div>
//         <div class="row"><span>Discount</span><span>-${formatCurrency(lastInvoice.discountAmount)}</span></div>
//         <div class="row"><span>GST (${lastInvoice.gstRate}%)</span><span>${formatCurrency(lastInvoice.gstAmount)}</span></div>
//         <div class="row total"><span>Grand Total</span><span>${formatCurrency(lastInvoice.grandTotal)}</span></div>
//       </div>
//       <div class="footer">Thank you for your business! — EvaLite</div>
//       </body></html>`
//     openPrintWindow(html)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       {/* Main Billing Grid */}
//       <div className="grid gap-4 lg:grid-cols-5">

//         {/* Left Side */}
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader><CardTitle>New Invoice</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-4">
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Select Customer</Label>
//                   <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
//                     <SelectTrigger><SelectValue placeholder="Choose customer" /></SelectTrigger>
//                     <SelectContent>
//                       {customers.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <div className="flex justify-between mb-3">
//                   <h3 className="text-sm font-medium">Items</h3>
//                   <Button size="sm" onClick={addItem}><Plus className="size-4 mr-1" />Add Item</Button>
//                 </div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Product</TableHead>
//                       <TableHead>Qty</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Total</TableHead>
//                       <TableHead></TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {invoiceItems.map(item => (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <Select value={item.productId} onValueChange={v => updateItem(item.id, "productId", v)}>
//                             <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
//                             <SelectContent>
//                               {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                             </SelectContent>
//                           </Select>
//                         </TableCell>
//                         <TableCell>
//                           <Input type="number" value={item.quantity} onChange={e => updateItem(item.id, "quantity", e.target.value)} />
//                         </TableCell>
//                         <TableCell>{formatCurrency(item.price)}</TableCell>
//                         <TableCell>{formatCurrency(item.total)}</TableCell>
//                         <TableCell>
//                           <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                             <Trash2 className="size-4 text-red-500" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               <Separator />

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Discount (₹)</Label>
//                   <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
//                 </div>
//                 <div>
//                   <Label>GST %</Label>
//                   <Input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader><CardTitle>Invoice Summary</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-3">
//               <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
//               <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(discountAmount)}</span></div>
//               <div className="flex justify-between"><span>GST ({gstRate}%)</span><span>{formatCurrency(gstAmount)}</span></div>
//               <Separator />
//               <div className="flex justify-between font-bold text-lg"><span>Total</span><span>{formatCurrency(grandTotal)}</span></div>
//               <Button onClick={saveInvoice} className="mt-4">
//                 <FileText className="size-4 mr-2" />Generate Invoice
//               </Button>
//               <Button variant="outline" onClick={downloadInvoicePDF} disabled={!lastInvoice} className="flex gap-2">
//                 <Download className="size-4" />Download Invoice PDF
//               </Button>
//               {!lastInvoice && (
//                 <p className="text-xs text-muted-foreground text-center">Generate an invoice first to enable PDF download</p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Sales History */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <History className="size-5 text-muted-foreground" />
//             <h2 className="text-lg font-semibold">Sales History</h2>
//           </div>
//           <div className="flex gap-2">
//             {showHistory && salesHistory.length > 0 && (
//               <Button
//                 variant="outline" size="sm"
//                 onClick={() => openPrintWindow(buildAllSalesPDF(salesHistory))}
//                 className="flex gap-1.5 text-green-700 border-green-300 hover:bg-green-50"
//               >
//                 <Download className="size-4" />Download All
//               </Button>
//             )}
//             {showHistory && (
//               <Button variant="ghost" size="sm" onClick={fetchSalesHistory} disabled={loadingHistory}>
//                 <RefreshCw className={`size-4 mr-1 ${loadingHistory ? "animate-spin" : ""}`} />Refresh
//               </Button>
//             )}
//             <Button
//               variant="outline" size="sm"
//               onClick={showHistory ? () => setShowHistory(false) : fetchSalesHistory}
//               disabled={loadingHistory}
//             >
//               {loadingHistory ? "Loading..." : showHistory ? "Hide History" : "View History"}
//             </Button>
//           </div>
//         </div>

//         {showHistory && (
//           <Card>
//             <CardContent className="pt-4">
//               {salesHistory.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-8">No sales records found.</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Product</TableHead>
//                       <TableHead className="text-right">Qty</TableHead>
//                       <TableHead className="text-right">Price</TableHead>
//                       <TableHead className="text-right">Total</TableHead>
//                       <TableHead className="text-center">Receipt</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {salesHistory.map(sale => (
//                       <TableRow key={sale._id}>
//                         <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
//                           {formatDate(sale.date)}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {sale.customer?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell>
//                           {sale.product?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell className="text-right">{sale.quantity}</TableCell>
//                         <TableCell className="text-right">{formatCurrency(sale.price)}</TableCell>
//                         <TableCell className="text-right font-semibold">{formatCurrency(sale.total)}</TableCell>
//                         <TableCell className="text-center">
//                           <Button variant="ghost" size="icon" onClick={() => openPrintWindow(buildSingleSalePDF(sale))}>
//                             <Download className="size-4 text-muted-foreground hover:text-foreground" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//               {salesHistory.length > 0 && (
//                 <div className="flex justify-between items-center mt-4 pt-4 border-t">
//                   <span className="text-sm text-muted-foreground">
//                     {salesHistory.length} record{salesHistory.length !== 1 ? "s" : ""}
//                   </span>
//                   <div className="font-bold">
//                     Total Revenue: {formatCurrency(salesHistory.reduce((sum, s) => sum + s.total, 0))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }





//aravind updated nvoice 

// "use client"

// import { useState, useEffect, useRef } from "react"
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
// import { Plus, Trash2, FileText, Download, History, RefreshCw } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch"

// type Product = { _id: string; name: string; sellingPrice: number }
// type Customer = { _id: string; name: string }
// type InvoiceItem = { id: number; productId: string; name: string; quantity: number; price: number; total: number }
// type SaleRecord = {
//   _id: string
//   customer: { _id: string; name: string } | null
//   product: { _id: string; name: string } | null
//   quantity: number
//   price: number
//   total: number
//   date: string
// }

// // ✅ Template type
// type UserTemplate = {
//   logoPath: string
//   templatePath: string
//   headerText: string
//   footerText: string
//   templateStyle: string
// }

// export function BillingInterface() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
//   const [discount, setDiscount] = useState("0")
//   const [gstRate, setGstRate] = useState("18")

//   const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([])
//   const [loadingHistory, setLoadingHistory] = useState(false)
//   const [showHistory, setShowHistory] = useState(false)

//   // ✅ User template state
//   const [userTemplate, setUserTemplate] = useState<UserTemplate | null>(null)

//   const [lastInvoice, setLastInvoice] = useState<{
//     customer: Customer | null
//     items: InvoiceItem[]
//     discount: number
//     gstRate: number
//     subtotal: number
//     discountAmount: number
//     gstAmount: number
//     grandTotal: number
//     date: string
//   } | null>(null)

//   const printRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     fetchProducts()
//     fetchCustomers()
//     fetchUserTemplate() // ✅ fetch template on load
//   }, [])

//   // ✅ Fetch this user's template from DB
//   const fetchUserTemplate = async () => {
//     try {
//       const res = await authFetch("/api/user/template")
//       const data = await res.json()
//       if (data && data.headerText) {
//         setUserTemplate(data)
//       }
//     } catch (err) {
//       console.error("Template fetch error:", err)
//     }
//   }

//   const fetchProducts = async () => {
//     const res = await authFetch("/api/products")
//     const data = await res.json()
//     setProducts(Array.isArray(data) ? data : [])
//   }

//   const fetchCustomers = async () => {
//     const res = await authFetch("/api/customers")
//     const data = await res.json()
//     setCustomers(Array.isArray(data) ? data : [])
//   }

//   const fetchSalesHistory = async () => {
//     setLoadingHistory(true)
//     try {
//       const res = await authFetch("/api/sales")
//       const data = await res.json()
//       setSalesHistory(Array.isArray(data) ? data : [])
//       setShowHistory(true)
//     } catch (err) {
//       console.error(err)
//       alert("Failed to load sales history")
//     } finally {
//       setLoadingHistory(false)
//     }
//   }

//   const addItem = () => {
//     const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1
//     setInvoiceItems([...invoiceItems, { id: newId, productId: "", name: "", quantity: 1, price: 0, total: 0 }])
//   }

//   const removeItem = (id: number) => {
//     setInvoiceItems(invoiceItems.filter(i => i.id !== id))
//   }

//   const updateItem = (id: number, field: string, value: string | number) => {
//     setInvoiceItems(invoiceItems.map(item => {
//       if (item.id !== id) return item
//       if (field === "productId") {
//         const product = products.find(p => p._id === value)
//         if (product) return { ...item, productId: product._id, name: product.name, price: product.sellingPrice, total: item.quantity * product.sellingPrice }
//       }
//       if (field === "quantity") {
//         const qty = Number(value)
//         return { ...item, quantity: qty, total: qty * item.price }
//       }
//       return item
//     }))
//   }

//   const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)
//   const discountAmount = Number(discount) || 0
//   const gstAmount = Math.round(((subtotal - discountAmount) * Number(gstRate)) / 100)
//   const grandTotal = subtotal - discountAmount + gstAmount

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const formatDate = (dateStr: string) =>
//     new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "2-digit", month: "short", year: "numeric",
//       hour: "2-digit", minute: "2-digit"
//     })

//   const saveInvoice = async () => {
//     if (!selectedCustomer) { alert("Select customer"); return }
//     if (invoiceItems.length === 0) { alert("Add at least one product"); return }
//     for (const item of invoiceItems) {
//       if (!item.productId) { alert("Please select product for all rows"); return }
//     }

//     const res = await authFetch("/api/sales", {
//       method: "POST",
//       body: JSON.stringify({
//         customer: selectedCustomer,
//         items: invoiceItems.map(i => ({ product: i.productId, quantity: i.quantity, price: i.price }))
//       })
//     })

//     const data = await res.json()
//     if (!res.ok) { alert(data.error || "Invoice failed"); return }

//     const customerObj = customers.find(c => c._id === selectedCustomer) || null
//     setLastInvoice({
//       customer: customerObj,
//       items: [...invoiceItems],
//       discount: Number(discount),
//       gstRate: Number(gstRate),
//       subtotal,
//       discountAmount,
//       gstAmount,
//       grandTotal,
//       date: new Date().toLocaleString("en-IN")
//     })

//     alert("Invoice saved successfully")
//     setInvoiceItems([])
//     if (showHistory) fetchSalesHistory()
//   }

//   // ✅ Get template colors based on style
//   const getTemplateColors = (style: string) => {
//     switch (style) {
//       case "Modern":       return { primary: "#6366f1", secondary: "#e0e7ff", text: "#1e1b4b" }
//       case "Minimal":      return { primary: "#18181b", secondary: "#f4f4f5", text: "#18181b" }
//       case "Professional": return { primary: "#0f172a", secondary: "#e2e8f0", text: "#0f172a" }
//       default:             return { primary: "#f59e0b", secondary: "#fef3c7", text: "#78350f" } // Classic
//     }
//   }

//   // ✅ Build header HTML using admin-set logo + headerText
//   const buildTemplateHeader = (template: UserTemplate | null, title: string, date: string) => {
//     const colors = getTemplateColors(template?.templateStyle || "Classic")
//     const logoHtml = template?.logoPath
//       ? `<img src="${window.location.origin}${template.logoPath}" style="height:60px;object-fit:contain;" alt="logo"/>`
//       : `<div style="font-size:26px;font-weight:bold;color:${colors.primary}">EvaLite</div>`

//     const headerLines = template?.headerText
//       ? template.headerText.split("\n").map((line, i) =>
//           i === 0
//             ? `<div style="font-size:15px;font-weight:bold;color:${colors.text}">${line}</div>`
//             : `<div style="font-size:11px;color:#666;margin-top:2px">${line}</div>`
//         ).join("")
//       : `<div style="font-size:11px;color:#666;margin-top:3px">Your trusted store</div>`

//     return `
//       <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px">
//         <div style="display:flex;align-items:center;gap:12px">
//           ${logoHtml}
//           <div>${headerLines}</div>
//         </div>
//         <div style="text-align:right">
//           <div style="font-size:22px;font-weight:bold;color:${colors.primary}">${title}</div>
//           <div style="font-size:11px;color:#666;margin-top:4px">${date}</div>
//         </div>
//       </div>
//       <hr style="border:none;border-top:2px solid ${colors.primary};margin:16px 0"/>
//     `
//   }

//   // ✅ Build footer HTML using admin-set footerText
//   const buildTemplateFooter = (template: UserTemplate | null) => {
//     const footerLines = template?.footerText
//       ? template.footerText.split("\n").map(line =>
//           `<div>${line}</div>`
//         ).join("")
//       : `<div>Thank you for your business!</div>`

//     return `
//       <div style="margin-top:36px;padding-top:16px;border-top:1px solid #eee;text-align:center;font-size:10px;color:#aaa">
//         ${footerLines}
//       </div>
//     `
//   }

//   // ✅ Get table header style based on template
//   const getTableStyle = (template: UserTemplate | null) => {
//     const colors = getTemplateColors(template?.templateStyle || "Classic")
//     return `
//       thead { background: ${colors.primary}; color: white; }
//       th { padding: 9px 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
//       td { padding: 9px 12px; border-bottom: 1px solid #eee; }
//       tbody tr:nth-child(even) { background: ${colors.secondary}; }
//     `
//   }

//   // ✅ Updated buildSingleSalePDF — uses template
//   const buildSingleSalePDF = (sale: SaleRecord) => `
//     <!DOCTYPE html><html><head><title>Sale Receipt</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//       table{width:100%;border-collapse:collapse;margin:20px 0}
//       ${getTableStyle(userTemplate)}
//       .summary{margin-left:auto;width:260px;margin-top:8px}
//       .row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px}
//       .row.total{font-weight:bold;font-size:15px;border-top:2px solid #333;padding-top:8px;margin-top:4px}
//     </style></head><body>
//     ${buildTemplateHeader(userTemplate, "SALE RECEIPT", `Date: ${formatDate(sale.date)}`)}
//     <div style="margin-bottom:16px">
//       <div style="font-size:10px;text-transform:uppercase;color:#999;letter-spacing:1px;margin-bottom:4px">Customer</div>
//       <div style="font-size:15px;font-weight:600">${sale.customer?.name || "—"}</div>
//     </div>
//     <table>
//       <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
//       <tbody>
//         <tr>
//           <td>${sale.product?.name || "—"}</td>
//           <td>${sale.quantity}</td>
//           <td>${formatCurrency(sale.price)}</td>
//           <td>${formatCurrency(sale.total)}</td>
//         </tr>
//       </tbody>
//     </table>
//     <div class="summary">
//       <div class="row total"><span>Total</span><span>${formatCurrency(sale.total)}</span></div>
//     </div>
//     ${buildTemplateFooter(userTemplate)}
//     </body></html>`

//   // ✅ Updated buildAllSalesPDF — uses template
//   const buildAllSalesPDF = (sales: SaleRecord[]) => {
//     const totalRevenue = sales.reduce((s, r) => s + r.total, 0)
//     const rows = sales.map((sale, idx) => `
//       <tr>
//         <td>${idx + 1}</td>
//         <td>${formatDate(sale.date)}</td>
//         <td>${sale.customer?.name || "—"}</td>
//         <td>${sale.product?.name || "—"}</td>
//         <td style="text-align:center">${sale.quantity}</td>
//         <td style="text-align:right">${formatCurrency(sale.price)}</td>
//         <td style="text-align:right;font-weight:600">${formatCurrency(sale.total)}</td>
//       </tr>`).join("")

//     return `<!DOCTYPE html><html><head><title>All Sales - EvaLite</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:36px;color:#333;font-size:13px}
//       table{width:100%;border-collapse:collapse;margin-top:12px}
//       ${getTableStyle(userTemplate)}
//       th{padding:8px 10px;font-size:11px}
//       td{padding:8px 10px;font-size:12px}
//       .summary{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:2px solid #eee}
//     </style></head><body>
//     ${buildTemplateHeader(userTemplate, "SALES HISTORY REPORT", `Generated: ${new Date().toLocaleString("en-IN")}`)}
//     <table>
//       <thead>
//         <tr><th>#</th><th>Date</th><th>Customer</th><th>Product</th>
//         <th style="text-align:center">Qty</th>
//         <th style="text-align:right">Price</th>
//         <th style="text-align:right">Total</th></tr>
//       </thead>
//       <tbody>${rows}</tbody>
//     </table>
//     <div class="summary">
//       <span style="font-size:13px;color:#666">${sales.length} record${sales.length !== 1 ? "s" : ""}</span>
//       <div>
//         <span style="font-size:13px;color:#666">Total Revenue: </span>
//         <span style="font-size:18px;font-weight:bold">${formatCurrency(totalRevenue)}</span>
//       </div>
//     </div>
//     ${buildTemplateFooter(userTemplate)}
//     </body></html>`
//   }

//   const openPrintWindow = (html: string) => {
//     const w = window.open("", "_blank")
//     if (!w) { alert("Allow popups to download PDF"); return }
//     w.document.write(html)
//     w.document.close()
//     w.focus()
//     setTimeout(() => { w.print(); w.close() }, 500)
//   }

//   // ✅ Updated downloadInvoicePDF — uses template
//   const downloadInvoicePDF = () => {
//     if (!lastInvoice) { alert("Generate an invoice first"); return }
//     const colors = getTemplateColors(userTemplate?.templateStyle || "Classic")

//     const html = `
//       <!DOCTYPE html><html><head><title>Invoice - EvaLite</title>
//       <style>
//         *{margin:0;padding:0;box-sizing:border-box}
//         body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//         table{width:100%;border-collapse:collapse;margin-bottom:24px}
//         ${getTableStyle(userTemplate)}
//         th{padding:10px 12px;font-size:12px}
//         td{padding:10px 12px}
//         .bill-to{margin-bottom:24px}
//         .bill-to h4{font-size:11px;text-transform:uppercase;color:#666;letter-spacing:1px;margin-bottom:4px}
//         .bill-to p{font-size:16px;font-weight:600}
//         .summary{margin-left:auto;width:280px}
//         .row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px}
//         .row.total{font-weight:bold;font-size:16px;border-top:2px solid ${colors.primary};padding-top:10px;margin-top:4px}
//       </style></head><body>
//       ${buildTemplateHeader(userTemplate, "INVOICE", `Date: ${lastInvoice.date}`)}
//       <div class="bill-to">
//         <h4>Bill To</h4>
//         <p>${lastInvoice.customer?.name || "—"}</p>
//       </div>
//       <table>
//         <thead>
//           <tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
//         </thead>
//         <tbody>
//           ${lastInvoice.items.map((item, idx) => `
//             <tr>
//               <td>${idx + 1}</td>
//               <td>${item.name}</td>
//               <td>${item.quantity}</td>
//               <td>${formatCurrency(item.price)}</td>
//               <td>${formatCurrency(item.total)}</td>
//             </tr>
//           `).join("")}
//         </tbody>
//       </table>
//       <div class="summary">
//         <div class="row"><span>Subtotal</span><span>${formatCurrency(lastInvoice.subtotal)}</span></div>
//         <div class="row"><span>Discount</span><span>-${formatCurrency(lastInvoice.discountAmount)}</span></div>
//         <div class="row"><span>GST (${lastInvoice.gstRate}%)</span><span>${formatCurrency(lastInvoice.gstAmount)}</span></div>
//         <div class="row total"><span>Grand Total</span><span>${formatCurrency(lastInvoice.grandTotal)}</span></div>
//       </div>
//       ${buildTemplateFooter(userTemplate)}
//       </body></html>`
//     openPrintWindow(html)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       {/* ✅ Show template status banner */}
//       {userTemplate ? (
//         <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
//           ✅ Your invoice template is set — PDFs will use your logo, header and footer
//         </div>
//       ) : (
//         <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
//           ⚠️ No template set yet — contact admin to set your invoice template
//         </div>
//       )}

//       {/* Main Billing Grid */}
//       <div className="grid gap-4 lg:grid-cols-5">

//         {/* Left Side */}
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader><CardTitle>New Invoice</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-4">
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Select Customer</Label>
//                   <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
//                     <SelectTrigger><SelectValue placeholder="Choose customer" /></SelectTrigger>
//                     <SelectContent>
//                       {customers.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <div className="flex justify-between mb-3">
//                   <h3 className="text-sm font-medium">Items</h3>
//                   <Button size="sm" onClick={addItem}>
//                     <Plus className="size-4 mr-1" />Add Item
//                   </Button>
//                 </div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Product</TableHead>
//                       <TableHead>Qty</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Total</TableHead>
//                       <TableHead></TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {invoiceItems.map(item => (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <Select value={item.productId} onValueChange={v => updateItem(item.id, "productId", v)}>
//                             <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
//                             <SelectContent>
//                               {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                             </SelectContent>
//                           </Select>
//                         </TableCell>
//                         <TableCell>
//                           <Input type="number" value={item.quantity} onChange={e => updateItem(item.id, "quantity", e.target.value)} />
//                         </TableCell>
//                         <TableCell>{formatCurrency(item.price)}</TableCell>
//                         <TableCell>{formatCurrency(item.total)}</TableCell>
//                         <TableCell>
//                           <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                             <Trash2 className="size-4 text-red-500" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               <Separator />

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Discount (₹)</Label>
//                   <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
//                 </div>
//                 <div>
//                   <Label>GST %</Label>
//                   <Input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader><CardTitle>Invoice Summary</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-3">
//               <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
//               <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(discountAmount)}</span></div>
//               <div className="flex justify-between"><span>GST ({gstRate}%)</span><span>{formatCurrency(gstAmount)}</span></div>
//               <Separator />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span><span>{formatCurrency(grandTotal)}</span>
//               </div>
//               <Button onClick={saveInvoice} className="mt-4">
//                 <FileText className="size-4 mr-2" />Generate Invoice
//               </Button>
//               <Button variant="outline" onClick={downloadInvoicePDF} disabled={!lastInvoice} className="flex gap-2">
//                 <Download className="size-4" />Download Invoice PDF
//               </Button>
//               {!lastInvoice && (
//                 <p className="text-xs text-muted-foreground text-center">
//                   Generate an invoice first to enable PDF download
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Sales History */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <History className="size-5 text-muted-foreground" />
//             <h2 className="text-lg font-semibold">Sales History</h2>
//           </div>
//           <div className="flex gap-2">
//             {showHistory && salesHistory.length > 0 && (
//               <Button
//                 variant="outline" size="sm"
//                 onClick={() => openPrintWindow(buildAllSalesPDF(salesHistory))}
//                 className="flex gap-1.5 text-green-700 border-green-300 hover:bg-green-50"
//               >
//                 <Download className="size-4" />Download All
//               </Button>
//             )}
//             {showHistory && (
//               <Button variant="ghost" size="sm" onClick={fetchSalesHistory} disabled={loadingHistory}>
//                 <RefreshCw className={`size-4 mr-1 ${loadingHistory ? "animate-spin" : ""}`} />Refresh
//               </Button>
//             )}
//             <Button
//               variant="outline" size="sm"
//               onClick={showHistory ? () => setShowHistory(false) : fetchSalesHistory}
//               disabled={loadingHistory}
//             >
//               {loadingHistory ? "Loading..." : showHistory ? "Hide History" : "View History"}
//             </Button>
//           </div>
//         </div>

//         {showHistory && (
//           <Card>
//             <CardContent className="pt-4">
//               {salesHistory.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-8">No sales records found.</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Product</TableHead>
//                       <TableHead className="text-right">Qty</TableHead>
//                       <TableHead className="text-right">Price</TableHead>
//                       <TableHead className="text-right">Total</TableHead>
//                       <TableHead className="text-center">Receipt</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {salesHistory.map(sale => (
//                       <TableRow key={sale._id}>
//                         <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
//                           {formatDate(sale.date)}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {sale.customer?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell>
//                           {sale.product?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell className="text-right">{sale.quantity}</TableCell>
//                         <TableCell className="text-right">{formatCurrency(sale.price)}</TableCell>
//                         <TableCell className="text-right font-semibold">{formatCurrency(sale.total)}</TableCell>
//                         <TableCell className="text-center">
//                           <Button variant="ghost" size="icon" onClick={() => openPrintWindow(buildSingleSalePDF(sale))}>
//                             <Download className="size-4 text-muted-foreground hover:text-foreground" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//               {salesHistory.length > 0 && (
//                 <div className="flex justify-between items-center mt-4 pt-4 border-t">
//                   <span className="text-sm text-muted-foreground">
//                     {salesHistory.length} record{salesHistory.length !== 1 ? "s" : ""}
//                   </span>
//                   <div className="font-bold">
//                     Total Revenue: {formatCurrency(salesHistory.reduce((sum, s) => sum + s.total, 0))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }



//aravind  updated



// "use client"

// import { useState, useEffect, useRef } from "react"
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
// import { Plus, Trash2, FileText, Download, History, RefreshCw } from "lucide-react"
// import { authFetch } from "@/app/lib/authFetch"

// type Product = { _id: string; name: string; sellingPrice: number }
// type Customer = { _id: string; name: string }
// type InvoiceItem = { id: number; productId: string; name: string; quantity: number; price: number; total: number }
// type SaleRecord = {
//   _id: string
//   customer: { _id: string; name: string } | null
//   product: { _id: string; name: string } | null
//   quantity: number
//   price: number
//   total: number
//   date: string
// }

// // ✅ Template type
// type UserTemplate = {
//   logoPath: string
//   templatePath: string
//   headerText: string
//   footerText: string
//   templateStyle: string
// }

// export function BillingInterface() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [customers, setCustomers] = useState<Customer[]>([])
//   const [selectedCustomer, setSelectedCustomer] = useState("")
//   const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
//   const [discount, setDiscount] = useState("0")
//   const [gstRate, setGstRate] = useState("18")

//   const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([])
//   const [loadingHistory, setLoadingHistory] = useState(false)
//   const [showHistory, setShowHistory] = useState(false)

//   // ✅ User template state
//   const [userTemplate, setUserTemplate] = useState<UserTemplate | null>(null)

//   const [lastInvoice, setLastInvoice] = useState<{
//     customer: Customer | null
//     items: InvoiceItem[]
//     discount: number
//     gstRate: number
//     subtotal: number
//     discountAmount: number
//     gstAmount: number
//     grandTotal: number
//     date: string
//   } | null>(null)

//   const printRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     fetchProducts()
//     fetchCustomers()
//     fetchUserTemplate()
//   }, [])

//   // ✅ Fetch this user's template from DB
//   const fetchUserTemplate = async () => {
//     try {
//       const res = await authFetch("/api/user/template")
//       const data = await res.json()
//       if (data && data.headerText) {
//         setUserTemplate(data)
//       }
//     } catch (err) {
//       console.error("Template fetch error:", err)
//     }
//   }

//   // ✅ Get full absolute URL for images (fixes logo in print window)
//   const getAbsoluteUrl = (path: string) => {
//     if (!path) return ""
//     if (path.startsWith("http")) return path
//     return `${window.location.origin}${path}`
//   }

//   const fetchProducts = async () => {
//     const res = await authFetch("/api/products")
//     const data = await res.json()
//     setProducts(Array.isArray(data) ? data : [])
//   }

//   const fetchCustomers = async () => {
//     const res = await authFetch("/api/customers")
//     const data = await res.json()
//     setCustomers(Array.isArray(data) ? data : [])
//   }

//   const fetchSalesHistory = async () => {
//     setLoadingHistory(true)
//     try {
//       const res = await authFetch("/api/sales")
//       const data = await res.json()
//       setSalesHistory(Array.isArray(data) ? data : [])
//       setShowHistory(true)
//     } catch (err) {
//       console.error(err)
//       alert("Failed to load sales history")
//     } finally {
//       setLoadingHistory(false)
//     }
//   }

//   const addItem = () => {
//     const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1
//     setInvoiceItems([...invoiceItems, { id: newId, productId: "", name: "", quantity: 1, price: 0, total: 0 }])
//   }

//   const removeItem = (id: number) => {
//     setInvoiceItems(invoiceItems.filter(i => i.id !== id))
//   }

//   const updateItem = (id: number, field: string, value: string | number) => {
//     setInvoiceItems(invoiceItems.map(item => {
//       if (item.id !== id) return item
//       if (field === "productId") {
//         const product = products.find(p => p._id === value)
//         if (product) return { ...item, productId: product._id, name: product.name, price: product.sellingPrice, total: item.quantity * product.sellingPrice }
//       }
//       if (field === "quantity") {
//         const qty = Number(value)
//         return { ...item, quantity: qty, total: qty * item.price }
//       }
//       return item
//     }))
//   }

//   const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0)
//   const discountAmount = Number(discount) || 0
//   const gstAmount = Math.round(((subtotal - discountAmount) * Number(gstRate)) / 100)
//   const grandTotal = subtotal - discountAmount + gstAmount

//   const formatCurrency = (amount: number) =>
//     new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

//   const formatDate = (dateStr: string) =>
//     new Date(dateStr).toLocaleDateString("en-IN", {
//       day: "2-digit", month: "short", year: "numeric",
//       hour: "2-digit", minute: "2-digit"
//     })

//   const saveInvoice = async () => {
//     if (!selectedCustomer) { alert("Select customer"); return }
//     if (invoiceItems.length === 0) { alert("Add at least one product"); return }
//     for (const item of invoiceItems) {
//       if (!item.productId) { alert("Please select product for all rows"); return }
//     }

//     const res = await authFetch("/api/sales", {
//       method: "POST",
//       body: JSON.stringify({
//         customer: selectedCustomer,
//         items: invoiceItems.map(i => ({ product: i.productId, quantity: i.quantity, price: i.price }))
//       })
//     })

//     const data = await res.json()
//     if (!res.ok) { alert(data.error || "Invoice failed"); return }

//     const customerObj = customers.find(c => c._id === selectedCustomer) || null
//     setLastInvoice({
//       customer: customerObj,
//       items: [...invoiceItems],
//       discount: Number(discount),
//       gstRate: Number(gstRate),
//       subtotal,
//       discountAmount,
//       gstAmount,
//       grandTotal,
//       date: new Date().toLocaleString("en-IN")
//     })

//     alert("Invoice saved successfully")
//     setInvoiceItems([])
//     if (showHistory) fetchSalesHistory()
//   }

//   // ============================
//   // ✅ TEMPLATE COLOR SYSTEM
//   // ============================
//   const getTemplateColors = (style: string) => {
//     switch (style) {
//       case "Modern":       return { primary: "#6366f1", secondary: "#e0e7ff", accent: "#4f46e5", light: "#f5f3ff", text: "#1e1b4b" }
//       case "Minimal":      return { primary: "#18181b", secondary: "#f4f4f5", accent: "#52525b", light: "#fafafa", text: "#18181b" }
//       case "Professional": return { primary: "#0f4c81", secondary: "#e8f0fe", accent: "#1a56db", light: "#eff6ff", text: "#0f172a" }
//       default:             return { primary: "#f59e0b", secondary: "#fef3c7", accent: "#d97706", light: "#fffbeb", text: "#78350f" }
//     }
//   }

//   // ============================
//   // ✅ TEMPLATE HEADER BUILDER
//   // ============================
//   const buildTemplateHeader = (template: UserTemplate | null, title: string, date: string) => {
//     const colors = getTemplateColors(template?.templateStyle || "Classic")
//     const logoUrl = template?.logoPath ? getAbsoluteUrl(template.logoPath) : ""

//     const logoHtml = logoUrl
//       ? `<img src="${logoUrl}" style="height:64px;width:auto;object-fit:contain;display:block;" alt="logo" />`
//       : ""

//     const headerLines = template?.headerText
//       ? template.headerText.split("\n")
//       : ["EvaLite", "Your trusted store"]

//     const companyName = headerLines[0] || "EvaLite"
//     const companyDetails = headerLines.slice(1).join("<br/>")
//     const style = template?.templateStyle || "Classic"

//     if (style === "Modern") {
//       return `
//         <div style="background:${colors.primary};margin:-40px -40px 0 -40px;padding:28px 40px 24px 40px;">
//           <div style="display:flex;justify-content:space-between;align-items:center;">
//             <div style="display:flex;align-items:center;gap:16px;">
//               ${logoUrl
//                 ? `<div style="background:white;padding:8px;border-radius:8px;">${logoHtml}</div>`
//                 : `<div style="font-size:28px;font-weight:900;color:white;letter-spacing:-1px">${companyName}</div>`
//               }
//               <div>
//                 <div style="font-size:18px;font-weight:700;color:white;">${companyName}</div>
//                 <div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:3px;line-height:1.6">${companyDetails}</div>
//               </div>
//             </div>
//             <div style="text-align:right;">
//               <div style="font-size:26px;font-weight:800;color:white;letter-spacing:2px;">${title}</div>
//               <div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;">${date}</div>
//             </div>
//           </div>
//         </div>
//         <div style="height:6px;background:${colors.accent};margin:0 -40px 32px -40px;"></div>
//       `
//     }

//     if (style === "Minimal") {
//       return `
//         <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #e4e4e7;">
//           <div style="display:flex;align-items:center;gap:12px;">
//             ${logoHtml}
//             <div>
//               <div style="font-size:20px;font-weight:800;color:#18181b;letter-spacing:-0.5px">${companyName}</div>
//               <div style="font-size:10px;color:#71717a;margin-top:2px;line-height:1.6">${companyDetails}</div>
//             </div>
//           </div>
//           <div style="text-align:right;">
//             <div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#a1a1aa;">${title}</div>
//             <div style="font-size:11px;color:#a1a1aa;margin-top:4px;">${date}</div>
//           </div>
//         </div>
//       `
//     }

//     if (style === "Professional") {
//       return `
//         <div style="background:${colors.primary};margin:-40px -40px 0 -40px;padding:20px 40px;">
//           <div style="display:flex;justify-content:space-between;align-items:center;">
//             <div style="display:flex;align-items:center;gap:14px;">
//               ${logoUrl
//                 ? `<div style="background:white;padding:6px 10px;border-radius:4px;">${logoHtml}</div>`
//                 : `<div style="font-size:24px;font-weight:900;color:white;">${companyName}</div>`
//               }
//               <div>
//                 <div style="font-size:16px;font-weight:700;color:white;">${companyName}</div>
//                 <div style="font-size:10px;color:rgba(255,255,255,0.7);margin-top:2px;line-height:1.6">${companyDetails}</div>
//               </div>
//             </div>
//             <div style="text-align:right;">
//               <div style="font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;">${title}</div>
//               <div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:3px;">${date}</div>
//             </div>
//           </div>
//         </div>
//         <div style="background:${colors.accent};height:4px;margin:0 -40px;"></div>
//         <div style="background:${colors.light};margin:0 -40px;padding:10px 40px 14px 40px;border-bottom:1px solid ${colors.secondary};margin-bottom:24px;">
//           <div style="font-size:22px;font-weight:800;color:${colors.primary};">${title}</div>
//           <div style="font-size:11px;color:#64748b;margin-top:2px;">${date}</div>
//         </div>
//       `
//     }

//     // Classic (default)
//     return `
//       <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
//         <div style="display:flex;align-items:center;gap:14px;">
//           ${logoHtml}
//           <div>
//             <div style="font-size:24px;font-weight:800;color:${colors.primary};">${companyName}</div>
//             <div style="font-size:11px;color:#666;margin-top:3px;line-height:1.6">${companyDetails}</div>
//           </div>
//         </div>
//         <div style="text-align:right;">
//           <div style="font-size:22px;font-weight:700;color:#333;">${title}</div>
//           <div style="font-size:11px;color:#888;margin-top:4px;">${date}</div>
//         </div>
//       </div>
//       <hr style="border:none;border-top:3px solid ${colors.primary};margin:0 0 24px 0;"/>
//     `
//   }

//   // ============================
//   // ✅ TEMPLATE FOOTER BUILDER
//   // ============================
//   const buildTemplateFooter = (template: UserTemplate | null) => {
//     const colors = getTemplateColors(template?.templateStyle || "Classic")
//     const style = template?.templateStyle || "Classic"

//     const footerLines = template?.footerText
//       ? template.footerText.split("\n").map(l => `<div>${l}</div>`).join("")
//       : "<div>Thank you for your business!</div>"

//     if (style === "Modern") {
//       return `
//         <div style="background:${colors.primary};margin:32px -40px -40px -40px;padding:20px 40px;text-align:center;color:white;">
//           <div style="font-size:11px;line-height:1.8;opacity:0.85;">${footerLines}</div>
//         </div>
//       `
//     }

//     if (style === "Minimal") {
//       return `
//         <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e4e4e7;text-align:center;font-size:10px;color:#a1a1aa;line-height:1.8;">
//           ${footerLines}
//         </div>
//       `
//     }

//     if (style === "Professional") {
//       return `
//         <div style="background:${colors.light};border:1px solid ${colors.secondary};border-radius:6px;padding:14px 20px;margin-top:28px;text-align:center;font-size:10px;color:#475569;line-height:1.8;">
//           ${footerLines}
//         </div>
//       `
//     }

//     // Classic
//     return `
//       <div style="margin-top:36px;padding-top:14px;border-top:2px solid ${colors.secondary};text-align:center;font-size:10px;color:#aaa;line-height:1.8;">
//         ${footerLines}
//       </div>
//     `
//   }

//   // ============================
//   // ✅ TABLE STYLE BUILDER
//   // ============================
//   const getTableStyle = (template: UserTemplate | null) => {
//     const colors = getTemplateColors(template?.templateStyle || "Classic")
//     const style = template?.templateStyle || "Classic"

//     if (style === "Minimal") {
//       return `
//         thead { background: #18181b; color: white; }
//         th { padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
//         td { padding: 10px 12px; border-bottom: 1px solid #f4f4f5; font-size: 12px; }
//         tbody tr:nth-child(even) { background: #fafafa; }
//       `
//     }

//     if (style === "Professional") {
//       return `
//         thead { background: ${colors.primary}; color: white; }
//         th { padding: 10px 14px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
//         td { padding: 10px 14px; border-bottom: 1px solid ${colors.secondary}; font-size: 12px; }
//         tbody tr:nth-child(even) { background: ${colors.light}; }
//       `
//     }

//     if (style === "Modern") {
//       return `
//         thead { background: ${colors.accent}; color: white; }
//         th { padding: 10px 14px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
//         td { padding: 10px 14px; border-bottom: 1px solid ${colors.secondary}; font-size: 12px; }
//         tbody tr:nth-child(even) { background: ${colors.light}; }
//       `
//     }

//     // Classic
//     return `
//       thead { background: ${colors.primary}; color: white; }
//       th { padding: 9px 12px; text-align: left; font-size: 11px; text-transform: uppercase; }
//       td { padding: 9px 12px; border-bottom: 1px solid #eee; font-size: 13px; }
//       tbody tr:nth-child(even) { background: ${colors.secondary}; }
//     `
//   }

//   // ============================
//   // ✅ PDF BUILDERS
//   // ============================
//   const buildSingleSalePDF = (sale: SaleRecord) => `
//     <!DOCTYPE html><html><head><title>Sale Receipt</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//       table{width:100%;border-collapse:collapse;margin:20px 0}
//       ${getTableStyle(userTemplate)}
//       .summary{margin-left:auto;width:260px;margin-top:8px}
//       .row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px}
//       .row.total{font-weight:bold;font-size:15px;border-top:2px solid #333;padding-top:8px;margin-top:4px}
//     </style></head><body>
//     ${buildTemplateHeader(userTemplate, "SALE RECEIPT", `Date: ${formatDate(sale.date)}`)}
//     <div style="margin-bottom:16px">
//       <div style="font-size:10px;text-transform:uppercase;color:#999;letter-spacing:1px;margin-bottom:4px">Customer</div>
//       <div style="font-size:15px;font-weight:600">${sale.customer?.name || "—"}</div>
//     </div>
//     <table>
//       <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>
//       <tbody>
//         <tr>
//           <td>${sale.product?.name || "—"}</td>
//           <td>${sale.quantity}</td>
//           <td>${formatCurrency(sale.price)}</td>
//           <td>${formatCurrency(sale.total)}</td>
//         </tr>
//       </tbody>
//     </table>
//     <div class="summary">
//       <div class="row total"><span>Total</span><span>${formatCurrency(sale.total)}</span></div>
//     </div>
//     ${buildTemplateFooter(userTemplate)}
//     </body></html>`

//   const buildAllSalesPDF = (sales: SaleRecord[]) => {
//     const totalRevenue = sales.reduce((s, r) => s + r.total, 0)
//     const rows = sales.map((sale, idx) => `
//       <tr>
//         <td>${idx + 1}</td>
//         <td>${formatDate(sale.date)}</td>
//         <td>${sale.customer?.name || "—"}</td>
//         <td>${sale.product?.name || "—"}</td>
//         <td style="text-align:center">${sale.quantity}</td>
//         <td style="text-align:right">${formatCurrency(sale.price)}</td>
//         <td style="text-align:right;font-weight:600">${formatCurrency(sale.total)}</td>
//       </tr>`).join("")

//     return `<!DOCTYPE html><html><head><title>All Sales - EvaLite</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:13px}
//       table{width:100%;border-collapse:collapse;margin-top:12px}
//       ${getTableStyle(userTemplate)}
//       th{padding:8px 10px;font-size:11px}
//       td{padding:8px 10px;font-size:12px}
//       .summary{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:2px solid #eee}
//     </style></head><body>
//     ${buildTemplateHeader(userTemplate, "SALES HISTORY REPORT", `Generated: ${new Date().toLocaleString("en-IN")}`)}
//     <table>
//       <thead>
//         <tr>
//           <th>#</th><th>Date</th><th>Customer</th><th>Product</th>
//           <th style="text-align:center">Qty</th>
//           <th style="text-align:right">Price</th>
//           <th style="text-align:right">Total</th>
//         </tr>
//       </thead>
//       <tbody>${rows}</tbody>
//     </table>
//     <div class="summary">
//       <span style="font-size:13px;color:#666">${sales.length} record${sales.length !== 1 ? "s" : ""}</span>
//       <div>
//         <span style="font-size:13px;color:#666">Total Revenue: </span>
//         <span style="font-size:18px;font-weight:bold">${formatCurrency(totalRevenue)}</span>
//       </div>
//     </div>
//     ${buildTemplateFooter(userTemplate)}
//     </body></html>`
//   }

//   const openPrintWindow = (html: string) => {
//     const w = window.open("", "_blank")
//     if (!w) { alert("Allow popups to download PDF"); return }
//     w.document.write(html)
//     w.document.close()
//     w.focus()
//     setTimeout(() => { w.print(); w.close() }, 500)
//   }

//   const downloadInvoicePDF = () => {
//     if (!lastInvoice) { alert("Generate an invoice first"); return }
//     const colors = getTemplateColors(userTemplate?.templateStyle || "Classic")

//     const html = `
//       <!DOCTYPE html><html><head><title>Invoice - EvaLite</title>
//       <style>
//         *{margin:0;padding:0;box-sizing:border-box}
//         body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}
//         table{width:100%;border-collapse:collapse;margin-bottom:24px}
//         ${getTableStyle(userTemplate)}
//         th{padding:10px 12px;font-size:12px}
//         td{padding:10px 12px}
//         .bill-to{margin-bottom:24px}
//         .bill-to h4{font-size:11px;text-transform:uppercase;color:#666;letter-spacing:1px;margin-bottom:4px}
//         .bill-to p{font-size:16px;font-weight:600}
//         .summary{margin-left:auto;width:280px}
//         .row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px}
//         .row.total{font-weight:bold;font-size:16px;border-top:2px solid ${colors.primary};padding-top:10px;margin-top:4px}
//       </style></head><body>
//       ${buildTemplateHeader(userTemplate, "INVOICE", `Date: ${lastInvoice.date}`)}
//       <div class="bill-to">
//         <h4>Bill To</h4>
//         <p>${lastInvoice.customer?.name || "—"}</p>
//       </div>
//       <table>
//         <thead>
//           <tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
//         </thead>
//         <tbody>
//           ${lastInvoice.items.map((item, idx) => `
//             <tr>
//               <td>${idx + 1}</td>
//               <td>${item.name}</td>
//               <td>${item.quantity}</td>
//               <td>${formatCurrency(item.price)}</td>
//               <td>${formatCurrency(item.total)}</td>
//             </tr>
//           `).join("")}
//         </tbody>
//       </table>
//       <div class="summary">
//         <div class="row"><span>Subtotal</span><span>${formatCurrency(lastInvoice.subtotal)}</span></div>
//         <div class="row"><span>Discount</span><span>-${formatCurrency(lastInvoice.discountAmount)}</span></div>
//         <div class="row"><span>GST (${lastInvoice.gstRate}%)</span><span>${formatCurrency(lastInvoice.gstAmount)}</span></div>
//         <div class="row total"><span>Grand Total</span><span>${formatCurrency(lastInvoice.grandTotal)}</span></div>
//       </div>
//       ${buildTemplateFooter(userTemplate)}
//       </body></html>`
//     openPrintWindow(html)
//   }

//   return (
//     <div className="flex flex-col gap-6">

//       {/* ✅ Template status banner */}
//       {userTemplate ? (
//         <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
//           ✅ Your invoice template is set — PDFs will use your logo, header and footer
//         </div>
//       ) : (
//         <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2">
//           ⚠️ No template set yet — contact admin to set your invoice template
//         </div>
//       )}

//       {/* Main Billing Grid */}
//       <div className="grid gap-4 lg:grid-cols-5">

//         {/* Left Side */}
//         <div className="lg:col-span-3">
//           <Card>
//             <CardHeader><CardTitle>New Invoice</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-4">
//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Select Customer</Label>
//                   <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
//                     <SelectTrigger><SelectValue placeholder="Choose customer" /></SelectTrigger>
//                     <SelectContent>
//                       {customers.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <Separator />

//               <div>
//                 <div className="flex justify-between mb-3">
//                   <h3 className="text-sm font-medium">Items</h3>
//                   <Button size="sm" onClick={addItem}>
//                     <Plus className="size-4 mr-1" />Add Item
//                   </Button>
//                 </div>
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Product</TableHead>
//                       <TableHead>Qty</TableHead>
//                       <TableHead>Price</TableHead>
//                       <TableHead>Total</TableHead>
//                       <TableHead></TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {invoiceItems.map(item => (
//                       <TableRow key={item.id}>
//                         <TableCell>
//                           <Select value={item.productId} onValueChange={v => updateItem(item.id, "productId", v)}>
//                             <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
//                             <SelectContent>
//                               {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
//                             </SelectContent>
//                           </Select>
//                         </TableCell>
//                         <TableCell>
//                           <Input type="number" value={item.quantity} onChange={e => updateItem(item.id, "quantity", e.target.value)} />
//                         </TableCell>
//                         <TableCell>{formatCurrency(item.price)}</TableCell>
//                         <TableCell>{formatCurrency(item.total)}</TableCell>
//                         <TableCell>
//                           <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
//                             <Trash2 className="size-4 text-red-500" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>

//               <Separator />

//               <div className="grid sm:grid-cols-2 gap-4">
//                 <div>
//                   <Label>Discount (₹)</Label>
//                   <Input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
//                 </div>
//                 <div>
//                   <Label>GST %</Label>
//                   <Input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Side */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader><CardTitle>Invoice Summary</CardTitle></CardHeader>
//             <CardContent className="flex flex-col gap-3">
//               <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
//               <div className="flex justify-between"><span>Discount</span><span>-{formatCurrency(discountAmount)}</span></div>
//               <div className="flex justify-between"><span>GST ({gstRate}%)</span><span>{formatCurrency(gstAmount)}</span></div>
//               <Separator />
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span><span>{formatCurrency(grandTotal)}</span>
//               </div>
//               <Button onClick={saveInvoice} className="mt-4">
//                 <FileText className="size-4 mr-2" />Generate Invoice
//               </Button>
//               <Button variant="outline" onClick={downloadInvoicePDF} disabled={!lastInvoice} className="flex gap-2">
//                 <Download className="size-4" />Download Invoice PDF
//               </Button>
//               {!lastInvoice && (
//                 <p className="text-xs text-muted-foreground text-center">
//                   Generate an invoice first to enable PDF download
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Sales History */}
//       <div>
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-2">
//             <History className="size-5 text-muted-foreground" />
//             <h2 className="text-lg font-semibold">Sales History</h2>
//           </div>
//           <div className="flex gap-2">
//             {showHistory && salesHistory.length > 0 && (
//               <Button
//                 variant="outline" size="sm"
//                 onClick={() => openPrintWindow(buildAllSalesPDF(salesHistory))}
//                 className="flex gap-1.5 text-green-700 border-green-300 hover:bg-green-50"
//               >
//                 <Download className="size-4" />Download All
//               </Button>
//             )}
//             {showHistory && (
//               <Button variant="ghost" size="sm" onClick={fetchSalesHistory} disabled={loadingHistory}>
//                 <RefreshCw className={`size-4 mr-1 ${loadingHistory ? "animate-spin" : ""}`} />Refresh
//               </Button>
//             )}
//             <Button
//               variant="outline" size="sm"
//               onClick={showHistory ? () => setShowHistory(false) : fetchSalesHistory}
//               disabled={loadingHistory}
//             >
//               {loadingHistory ? "Loading..." : showHistory ? "Hide History" : "View History"}
//             </Button>
//           </div>
//         </div>

//         {showHistory && (
//           <Card>
//             <CardContent className="pt-4">
//               {salesHistory.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-8">No sales records found.</p>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Date</TableHead>
//                       <TableHead>Customer</TableHead>
//                       <TableHead>Product</TableHead>
//                       <TableHead className="text-right">Qty</TableHead>
//                       <TableHead className="text-right">Price</TableHead>
//                       <TableHead className="text-right">Total</TableHead>
//                       <TableHead className="text-center">Receipt</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {salesHistory.map(sale => (
//                       <TableRow key={sale._id}>
//                         <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
//                           {formatDate(sale.date)}
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {sale.customer?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell>
//                           {sale.product?.name || <span className="text-muted-foreground italic">Deleted</span>}
//                         </TableCell>
//                         <TableCell className="text-right">{sale.quantity}</TableCell>
//                         <TableCell className="text-right">{formatCurrency(sale.price)}</TableCell>
//                         <TableCell className="text-right font-semibold">{formatCurrency(sale.total)}</TableCell>
//                         <TableCell className="text-center">
//                           <Button variant="ghost" size="icon" onClick={() => openPrintWindow(buildSingleSalePDF(sale))}>
//                             <Download className="size-4 text-muted-foreground hover:text-foreground" />
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//               {salesHistory.length > 0 && (
//                 <div className="flex justify-between items-center mt-4 pt-4 border-t">
//                   <span className="text-sm text-muted-foreground">
//                     {salesHistory.length} record{salesHistory.length !== 1 ? "s" : ""}
//                   </span>
//                   <div className="font-bold">
//                     Total Revenue: {formatCurrency(salesHistory.reduce((sum, s) => sum + s.total, 0))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   )
// }



////jay 

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Plus, Trash2, FileText, Download, History, RefreshCw, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react"
import { authFetch } from "@/app/lib/authFetch"
import toast, { Toaster } from "react-hot-toast"

// ── Types ──────────────────────────────────────────────────────────────────
type Product    = { _id: string; name: string; sellingPrice: number }
type Customer   = { _id: string; name: string }
type InvoiceItem = { id: number; productId: string; name: string; quantity: number; price: number; total: number }
type SaleRecord = {
  _id: string
  customer: { _id: string; name: string } | null
  product:  { _id: string; name: string } | null
  quantity: number; price: number; total: number; date: string
}
type UserTemplate = {
  logoPath: string; templatePath: string; headerText: string; footerText: string; templateStyle: string
}

// ── Animation variants ────────────────────────────────────────────────────
const fadeUp   = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }
const fadeIn   = { hidden: { opacity: 0 },          show: { opacity: 1 } }
const slideDown= { hidden: { opacity: 0, height: 0 }, show: { opacity: 1, height: "auto" } }

// ── Tiny design primitives ────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "2px solid #F2A119" }} className="pl-2.5 mb-3">
      <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">{children}</p>
    </div>
  )
}

function FlatInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700
        text-zinc-900 dark:text-zinc-100 text-sm px-3 py-2 outline-none
        focus:border-[#F2A119] focus:ring-0 transition-colors placeholder:text-zinc-400
        ${props.className ?? ""}`}
    />
  )
}

function FlatBtn({
  children, onClick, disabled, variant = "primary", className = "", size = "md",
}: {
  children: React.ReactNode; onClick?: () => void; disabled?: boolean
  variant?: "primary" | "outline" | "ghost" | "danger"; className?: string; size?: "sm" | "md"
}) {
  const base = "inline-flex items-center gap-1.5 font-medium tracking-wide transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed select-none"
  const sz   = size === "sm" ? "text-[11px] px-3 py-1.5" : "text-xs px-4 py-2.5"
  const v = {
    primary: "bg-[#F2A119] text-white hover:bg-[#d4890f] active:scale-[0.98]",
    outline: "border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98]",
    ghost:   "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 active:scale-[0.97]",
    danger:  "text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 active:scale-[0.97]",
  }[variant]
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sz} ${v} ${className}`}
    >
      {children}
    </motion.button>
  )
}

// ── INR formatter ─────────────────────────────────────────────────────────
const INR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n)

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })

// ── Main Component ────────────────────────────────────────────────────────
export function BillingInterface() {
  const [products,         setProducts]         = useState<Product[]>([])
  const [customers,        setCustomers]         = useState<Customer[]>([])
  const [selectedCustomer, setSelectedCustomer]  = useState("")
  const [invoiceItems,     setInvoiceItems]      = useState<InvoiceItem[]>([])
  const [discount,         setDiscount]          = useState("0")
  const [gstRate,          setGstRate]           = useState("18")
  const [salesHistory,     setSalesHistory]      = useState<SaleRecord[]>([])
  const [loadingHistory,   setLoadingHistory]    = useState(false)
  const [showHistory,      setShowHistory]       = useState(false)
  const [userTemplate,     setUserTemplate]      = useState<UserTemplate | null>(null)
  const [saving,           setSaving]            = useState(false)
  const [lastInvoice, setLastInvoice] = useState<{
    customer: Customer | null; items: InvoiceItem[]; discount: number; gstRate: number
    subtotal: number; discountAmount: number; gstAmount: number; grandTotal: number; date: string
  } | null>(null)

  useEffect(() => {
    fetchProducts(); fetchCustomers(); fetchUserTemplate()
  }, [])

  const fetchUserTemplate = async () => {
    try {
      const res  = await authFetch("/api/user/template")
      const data = await res.json()
      if (data?.headerText) setUserTemplate(data)
    } catch (err) { console.error("Template fetch error:", err) }
  }

  const getAbsoluteUrl = (path: string) => {
    if (!path) return ""
    if (path.startsWith("http")) return path
    return `${window.location.origin}${path}`
  }

  const fetchProducts = async () => {
    const res = await authFetch("/api/products")
    const d   = await res.json()
    setProducts(Array.isArray(d) ? d : [])
  }

  const fetchCustomers = async () => {
    const res = await authFetch("/api/customers")
    const d   = await res.json()
    setCustomers(Array.isArray(d) ? d : [])
  }

  const fetchSalesHistory = async () => {
    setLoadingHistory(true)
    try {
      const res = await authFetch("/api/sales")
      const d   = await res.json()
      setSalesHistory(Array.isArray(d) ? d : [])
      setShowHistory(true)
    } catch (err) { console.error(err); toast.error("Failed to load sales history") }
    finally { setLoadingHistory(false) }
  }

  const addItem = () => {
    const newId = Math.max(0, ...invoiceItems.map(i => i.id)) + 1
    setInvoiceItems([...invoiceItems, { id: newId, productId: "", name: "", quantity: 1, price: 0, total: 0 }])
  }

  const removeItem = (id: number) => setInvoiceItems(invoiceItems.filter(i => i.id !== id))

  const updateItem = (id: number, field: string, value: string | number) => {
    setInvoiceItems(invoiceItems.map(item => {
      if (item.id !== id) return item
      if (field === "productId") {
        const p = products.find(p => p._id === value)
        if (p) return { ...item, productId: p._id, name: p.name, price: p.sellingPrice, total: item.quantity * p.sellingPrice }
      }
      if (field === "quantity") {
        const qty = Number(value)
        return { ...item, quantity: qty, total: qty * item.price }
      }
      return item
    }))
  }

  const subtotal       = invoiceItems.reduce((s, i) => s + i.total, 0)
  const discountAmount = Number(discount) || 0
  const gstAmount      = Math.round(((subtotal - discountAmount) * Number(gstRate)) / 100)
  const grandTotal     = subtotal - discountAmount + gstAmount

  const saveInvoice = async () => {
    if (!selectedCustomer)    { toast.error("Please select a customer"); return }
    if (!invoiceItems.length) { toast.error("Add at least one product"); return }
    for (const item of invoiceItems) if (!item.productId) { toast.error("Select a product for all rows"); return }

    setSaving(true)
    const res  = await authFetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({ customer: selectedCustomer, items: invoiceItems.map(i => ({ product: i.productId, quantity: i.quantity, price: i.price })) })
    })
    const data = await res.json()
    setSaving(false)

    if (!res.ok) { toast.error(data.error || "Invoice failed"); return }

    const customerObj = customers.find(c => c._id === selectedCustomer) || null
    setLastInvoice({ customer: customerObj, items: [...invoiceItems], discount: Number(discount), gstRate: Number(gstRate), subtotal, discountAmount, gstAmount, grandTotal, date: new Date().toLocaleString("en-IN") })

    toast.success(`Invoice saved · ${INR(grandTotal)}`)
    setInvoiceItems([])
    if (showHistory) fetchSalesHistory()
  }

  // ── Template helpers (unchanged logic) ───────────────────────────────
  const getTemplateColors = (style: string) => {
    switch (style) {
      case "Modern":       return { primary: "#6366f1", secondary: "#e0e7ff", accent: "#4f46e5", light: "#f5f3ff", text: "#1e1b4b" }
      case "Minimal":      return { primary: "#18181b", secondary: "#f4f4f5", accent: "#52525b", light: "#fafafa", text: "#18181b" }
      case "Professional": return { primary: "#0f4c81", secondary: "#e8f0fe", accent: "#1a56db", light: "#eff6ff", text: "#0f172a" }
      default:             return { primary: "#f59e0b", secondary: "#fef3c7", accent: "#d97706", light: "#fffbeb", text: "#78350f" }
    }
  }

  const buildTemplateHeader = (template: UserTemplate | null, title: string, date: string) => {
    const colors    = getTemplateColors(template?.templateStyle || "Classic")
    const logoUrl   = template?.logoPath ? getAbsoluteUrl(template.logoPath) : ""
    const logoHtml  = logoUrl ? `<img src="${logoUrl}" style="height:64px;width:auto;object-fit:contain;display:block;" alt="logo" />` : ""
    const headerLines = template?.headerText ? template.headerText.split("\n") : ["EvaLite", "Your trusted store"]
    const companyName    = headerLines[0] || "EvaLite"
    const companyDetails = headerLines.slice(1).join("<br/>")
    const style = template?.templateStyle || "Classic"

    if (style === "Modern") return `<div style="background:${colors.primary};margin:-40px -40px 0 -40px;padding:28px 40px 24px 40px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="display:flex;align-items:center;gap:16px;">${logoUrl?`<div style="background:white;padding:8px;border-radius:8px;">${logoHtml}</div>`:`<div style="font-size:28px;font-weight:900;color:white;letter-spacing:-1px">${companyName}</div>`}<div><div style="font-size:18px;font-weight:700;color:white;">${companyName}</div><div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:3px;line-height:1.6">${companyDetails}</div></div></div><div style="text-align:right;"><div style="font-size:26px;font-weight:800;color:white;letter-spacing:2px;">${title}</div><div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:4px;">${date}</div></div></div></div><div style="height:6px;background:${colors.accent};margin:0 -40px 32px -40px;"></div>`
    if (style === "Minimal") return `<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #e4e4e7;"><div style="display:flex;align-items:center;gap:12px;">${logoHtml}<div><div style="font-size:20px;font-weight:800;color:#18181b;letter-spacing:-0.5px">${companyName}</div><div style="font-size:10px;color:#71717a;margin-top:2px;line-height:1.6">${companyDetails}</div></div></div><div style="text-align:right;"><div style="font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#a1a1aa;">${title}</div><div style="font-size:11px;color:#a1a1aa;margin-top:4px;">${date}</div></div></div>`
    if (style === "Professional") return `<div style="background:${colors.primary};margin:-40px -40px 0 -40px;padding:20px 40px;"><div style="display:flex;justify-content:space-between;align-items:center;"><div style="display:flex;align-items:center;gap:14px;">${logoUrl?`<div style="background:white;padding:6px 10px;border-radius:4px;">${logoHtml}</div>`:`<div style="font-size:24px;font-weight:900;color:white;">${companyName}</div>`}<div><div style="font-size:16px;font-weight:700;color:white;">${companyName}</div><div style="font-size:10px;color:rgba(255,255,255,0.7);margin-top:2px;line-height:1.6">${companyDetails}</div></div></div><div style="text-align:right;"><div style="font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;">${title}</div><div style="font-size:11px;color:rgba(255,255,255,0.6);margin-top:3px;">${date}</div></div></div></div><div style="background:${colors.accent};height:4px;margin:0 -40px;"></div><div style="background:${colors.light};margin:0 -40px;padding:10px 40px 14px 40px;border-bottom:1px solid ${colors.secondary};margin-bottom:24px;"><div style="font-size:22px;font-weight:800;color:${colors.primary};">${title}</div><div style="font-size:11px;color:#64748b;margin-top:2px;">${date}</div></div>`
    return `<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;"><div style="display:flex;align-items:center;gap:14px;">${logoHtml}<div><div style="font-size:24px;font-weight:800;color:${colors.primary};">${companyName}</div><div style="font-size:11px;color:#666;margin-top:3px;line-height:1.6">${companyDetails}</div></div></div><div style="text-align:right;"><div style="font-size:22px;font-weight:700;color:#333;">${title}</div><div style="font-size:11px;color:#888;margin-top:4px;">${date}</div></div></div><hr style="border:none;border-top:3px solid ${colors.primary};margin:0 0 24px 0;"/>`
  }

  const buildTemplateFooter = (template: UserTemplate | null) => {
    const colors = getTemplateColors(template?.templateStyle || "Classic")
    const style  = template?.templateStyle || "Classic"
    const footerLines = template?.footerText ? template.footerText.split("\n").map(l => `<div>${l}</div>`).join("") : "<div>Thank you for your business!</div>"
    if (style === "Modern")       return `<div style="background:${colors.primary};margin:32px -40px -40px -40px;padding:20px 40px;text-align:center;color:white;"><div style="font-size:11px;line-height:1.8;opacity:0.85;">${footerLines}</div></div>`
    if (style === "Minimal")      return `<div style="margin-top:32px;padding-top:16px;border-top:1px solid #e4e4e7;text-align:center;font-size:10px;color:#a1a1aa;line-height:1.8;">${footerLines}</div>`
    if (style === "Professional") return `<div style="background:${colors.light};border:1px solid ${colors.secondary};border-radius:6px;padding:14px 20px;margin-top:28px;text-align:center;font-size:10px;color:#475569;line-height:1.8;">${footerLines}</div>`
    return `<div style="margin-top:36px;padding-top:14px;border-top:2px solid ${colors.secondary};text-align:center;font-size:10px;color:#aaa;line-height:1.8;">${footerLines}</div>`
  }

  const getTableStyle = (template: UserTemplate | null) => {
    const colors = getTemplateColors(template?.templateStyle || "Classic")
    const style  = template?.templateStyle || "Classic"
    if (style === "Minimal")      return `thead{background:#18181b;color:white;}th{padding:10px 12px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;}td{padding:10px 12px;border-bottom:1px solid #f4f4f5;font-size:12px;}tbody tr:nth-child(even){background:#fafafa;}`
    if (style === "Professional") return `thead{background:${colors.primary};color:white;}th{padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.5px;}td{padding:10px 14px;border-bottom:1px solid ${colors.secondary};font-size:12px;}tbody tr:nth-child(even){background:${colors.light};}`
    if (style === "Modern")       return `thead{background:${colors.accent};color:white;}th{padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:1px;}td{padding:10px 14px;border-bottom:1px solid ${colors.secondary};font-size:12px;}tbody tr:nth-child(even){background:${colors.light};}`
    return `thead{background:${colors.primary};color:white;}th{padding:9px 12px;text-align:left;font-size:11px;text-transform:uppercase;}td{padding:9px 12px;border-bottom:1px solid #eee;font-size:13px;}tbody tr:nth-child(even){background:${colors.secondary};}`
  }

  const buildSingleSalePDF = (sale: SaleRecord) => `<!DOCTYPE html><html><head><title>Sale Receipt</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}table{width:100%;border-collapse:collapse;margin:20px 0}${getTableStyle(userTemplate)}.summary{margin-left:auto;width:260px;margin-top:8px}.row{display:flex;justify-content:space-between;padding:5px 0;font-size:13px}.row.total{font-weight:bold;font-size:15px;border-top:2px solid #333;padding-top:8px;margin-top:4px}</style></head><body>${buildTemplateHeader(userTemplate,"SALE RECEIPT",`Date: ${fmtDate(sale.date)}`)}<div style="margin-bottom:16px"><div style="font-size:10px;text-transform:uppercase;color:#999;letter-spacing:1px;margin-bottom:4px">Customer</div><div style="font-size:15px;font-weight:600">${sale.customer?.name||"—"}</div></div><table><thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody><tr><td>${sale.product?.name||"—"}</td><td>${sale.quantity}</td><td>${INR(sale.price)}</td><td>${INR(sale.total)}</td></tr></tbody></table><div class="summary"><div class="row total"><span>Total</span><span>${INR(sale.total)}</span></div></div>${buildTemplateFooter(userTemplate)}</body></html>`

  const buildAllSalesPDF = (sales: SaleRecord[]) => {
    const totalRevenue = sales.reduce((s, r) => s + r.total, 0)
    const rows = sales.map((sale, idx) => `<tr><td>${idx+1}</td><td>${fmtDate(sale.date)}</td><td>${sale.customer?.name||"—"}</td><td>${sale.product?.name||"—"}</td><td style="text-align:center">${sale.quantity}</td><td style="text-align:right">${INR(sale.price)}</td><td style="text-align:right;font-weight:600">${INR(sale.total)}</td></tr>`).join("")
    return `<!DOCTYPE html><html><head><title>All Sales</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:13px}table{width:100%;border-collapse:collapse;margin-top:12px}${getTableStyle(userTemplate)}th{padding:8px 10px;font-size:11px}td{padding:8px 10px;font-size:12px}.summary{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:2px solid #eee}</style></head><body>${buildTemplateHeader(userTemplate,"SALES HISTORY REPORT",`Generated: ${new Date().toLocaleString("en-IN")}`)}<table><thead><tr><th>#</th><th>Date</th><th>Customer</th><th>Product</th><th style="text-align:center">Qty</th><th style="text-align:right">Price</th><th style="text-align:right">Total</th></tr></thead><tbody>${rows}</tbody></table><div class="summary"><span style="font-size:13px;color:#666">${sales.length} record${sales.length!==1?"s":""}</span><div><span style="font-size:13px;color:#666">Total Revenue: </span><span style="font-size:18px;font-weight:bold">${INR(totalRevenue)}</span></div></div>${buildTemplateFooter(userTemplate)}</body></html>`
  }

  const openPrintWindow = (html: string) => {
    const w = window.open("", "_blank")
    if (!w) { toast.error("Allow popups to download PDF"); return }
    w.document.write(html); w.document.close(); w.focus()
    setTimeout(() => { w.print(); w.close() }, 500)
  }

  const downloadInvoicePDF = () => {
    if (!lastInvoice) { toast.error("Generate an invoice first"); return }
    const colors = getTemplateColors(userTemplate?.templateStyle || "Classic")
    const html = `<!DOCTYPE html><html><head><title>Invoice</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;padding:40px;color:#333;font-size:14px}table{width:100%;border-collapse:collapse;margin-bottom:24px}${getTableStyle(userTemplate)}th{padding:10px 12px;font-size:12px}td{padding:10px 12px}.bill-to{margin-bottom:24px}.bill-to h4{font-size:11px;text-transform:uppercase;color:#666;letter-spacing:1px;margin-bottom:4px}.bill-to p{font-size:16px;font-weight:600}.summary{margin-left:auto;width:280px}.row{display:flex;justify-content:space-between;padding:6px 0;font-size:14px}.row.total{font-weight:bold;font-size:16px;border-top:2px solid ${colors.primary};padding-top:10px;margin-top:4px}</style></head><body>${buildTemplateHeader(userTemplate,"INVOICE",`Date: ${lastInvoice.date}`)}<div class="bill-to"><h4>Bill To</h4><p>${lastInvoice.customer?.name||"—"}</p></div><table><thead><tr><th>#</th><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${lastInvoice.items.map((item,idx)=>`<tr><td>${idx+1}</td><td>${item.name}</td><td>${item.quantity}</td><td>${INR(item.price)}</td><td>${INR(item.total)}</td></tr>`).join("")}</tbody></table><div class="summary"><div class="row"><span>Subtotal</span><span>${INR(lastInvoice.subtotal)}</span></div><div class="row"><span>Discount</span><span>-${INR(lastInvoice.discountAmount)}</span></div><div class="row"><span>GST (${lastInvoice.gstRate}%)</span><span>${INR(lastInvoice.gstAmount)}</span></div><div class="row total"><span>Grand Total</span><span>${INR(lastInvoice.grandTotal)}</span></div></div>${buildTemplateFooter(userTemplate)}</body></html>`
    openPrintWindow(html)
  }

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <motion.div
      variants={{ show: { transition: { staggerChildren: 0.07 } } }}
      initial="hidden" animate="show"
      className="flex flex-col gap-3"
    >
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3500,
          style: {
            borderRadius: 0,
            border: "1px solid #e4e4e7",
            background: "#fff",
            color: "#18181b",
            fontSize: "12px",
            fontWeight: 500,
            padding: "10px 14px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            maxWidth: "320px",
          },
          success: {
            iconTheme: { primary: "#1D9E75", secondary: "#fff" },
            style: { borderLeft: "3px solid #1D9E75" },
          },
          error: {
            iconTheme: { primary: "#E24B4A", secondary: "#fff" },
            style: { borderLeft: "3px solid #E24B4A" },
            duration: 4500,
          },
        }}
      />

      {/* Template banner */}
      <motion.div variants={fadeUp} transition={{ duration: 0.3 }}>
        {userTemplate ? (
          <div className="flex items-center gap-2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 size={13} className="text-[#1D9E75] shrink-0" />
            <span>Invoice template active — PDFs will use your logo, header and footer</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-500">
            <AlertTriangle size={13} className="text-[#BA7517] shrink-0" />
            <span>No template set — contact admin to configure your invoice template</span>
          </div>
        )}
      </motion.div>

      {/* Main grid */}
      <div className="grid gap-2.5 lg:grid-cols-5">

        {/* ── Left: New Invoice ── */}
        <motion.div variants={fadeUp} transition={{ duration: 0.35 }} className="lg:col-span-3">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 shadow rounded dark:border-zinc-800">

            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
              <SectionLabel>New Invoice</SectionLabel>
            </div>

            <div className="px-4 py-4 flex flex-col gap-4">

              {/* Customer */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5 font-medium">Customer</p>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger className="rounded-none border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm h-9 focus:ring-0 focus:border-[#F2A119]">
                    <SelectValue placeholder="Choose customer" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none">
                    {customers.map(c => <SelectItem key={c._id} value={c._id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Divider */}
              <div className="border-t border-zinc-100 dark:border-zinc-800" />

              {/* Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Line Items</p>
                  <FlatBtn size="sm" onClick={addItem}>
                    <Plus size={12} /> Add Item
                  </FlatBtn>
                </div>

                {/* Table header */}
                <div className="grid grid-cols-12 gap-2 mb-1">
                  {["Product", "Qty", "Price", "Total", ""].map((h, i) => (
                    <div
                      key={i}
                      className={`text-[9px] uppercase tracking-widest text-zinc-400 font-semibold pb-1 border-b border-zinc-100 dark:border-zinc-800
                        ${i === 0 ? "col-span-5" : i === 1 ? "col-span-2" : i === 2 ? "col-span-2 text-right" : i === 3 ? "col-span-2 text-right" : "col-span-1"}`}
                    >
                      {h}
                    </div>
                  ))}
                </div>

                <AnimatePresence initial={false}>
                  {invoiceItems.length === 0 && (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="py-6 text-center text-xs text-zinc-400 dark:text-zinc-600 border border-dashed border-zinc-200 dark:border-zinc-700 mt-2"
                    >
                      No items yet — click <span className="text-[#F2A119]">Add Item</span>
                    </motion.div>
                  )}

                  {invoiceItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-12 gap-2 items-center py-1.5 border-b border-zinc-50 dark:border-zinc-800/50"
                    >
                      <div className="col-span-5">
                        <Select value={item.productId} onValueChange={v => updateItem(item.id, "productId", v)}>
                          <SelectTrigger className="rounded-none border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 h-8 text-xs focus:ring-0 focus:border-[#F2A119]">
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            {products.map(p => <SelectItem key={p._id} value={p._id}>{p.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <FlatInput
                          type="number" value={item.quantity} min={1}
                          onChange={e => updateItem(item.id, "quantity", e.target.value)}
                          className="h-8 text-center"
                        />
                      </div>
                      <div className="col-span-2 text-right text-xs text-zinc-500 tabular-nums pr-1">{INR(item.price)}</div>
                      <div className="col-span-2 text-right text-xs font-medium text-zinc-800 dark:text-zinc-200 tabular-nums">{INR(item.total)}</div>
                      <div className="col-span-1 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={13} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Discount & GST */}
              <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5 font-medium">Discount (₹)</p>
                    <FlatInput type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1.5 font-medium">GST %</p>
                    <FlatInput type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right: Summary ── */}
        <motion.div variants={fadeUp} transition={{ duration: 0.4 }} className="lg:col-span-2">
          <div className="bg-white dark:bg-zinc-900 border rounded shadow border-zinc-200 dark:border-zinc-800 h-full flex flex-col">

            <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
              <SectionLabel>Invoice Summary</SectionLabel>
            </div>

            <div className="px-4 py-4 flex flex-col gap-2 flex-1">

              {/* Line rows */}
              {[
                { label: "Subtotal",          value: INR(subtotal),        muted: true  },
                { label: `Discount`,          value: `− ${INR(discountAmount)}`, muted: true  },
                { label: `GST (${gstRate}%)`, value: INR(gstAmount),       muted: true  },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>{r.label}</span>
                  <span className="tabular-nums">{r.value}</span>
                </div>
              ))}

              <div className="border-t border-zinc-200 dark:border-zinc-700 my-1" />

              {/* Grand total */}
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">Grand Total</span>
                <motion.span
                  key={grandTotal}
                  initial={{ opacity: 0.4, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tabular-nums"
                >
                  {INR(grandTotal)}
                </motion.span>
              </div>

              <div className="flex-1" />

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <FlatBtn
                  onClick={saveInvoice}
                  disabled={saving}
                  className="w-full justify-center py-3"
                >
                  {saving ? (
                    <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                      Saving…
                    </motion.span>
                  ) : (
                    <><FileText size={13} /> Generate Invoice</>
                  )}
                </FlatBtn>

                <FlatBtn
                  variant="outline"
                  onClick={downloadInvoicePDF}
                  disabled={!lastInvoice}
                  className="w-full justify-center"
                >
                  <Download size={13} /> Download PDF
                </FlatBtn>

                <AnimatePresence>
                  {!lastInvoice && (
                    <motion.p
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-[10px] text-zinc-400 text-center"
                    >
                      Generate an invoice first to enable PDF
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Sales History ── */}
      <motion.div variants={fadeUp} transition={{ duration: 0.45 }}>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-100 rounded shadow dark:border-zinc-800">

          {/* History header */}
          <div className="flex items-center justify-between px-4 py-3 border-b  border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <History size={13} className="text-zinc-400" />
              <SectionLabel>Sales History</SectionLabel>
            </div>
            <div className="flex items-center gap-2">
              <AnimatePresence>
                {showHistory && salesHistory.length > 0 && (
                  <motion.div initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                    <FlatBtn
                      size="sm" variant="outline"
                      onClick={() => openPrintWindow(buildAllSalesPDF(salesHistory))}
                      className="text-[#1D9E75] border-[#1D9E75]/40 hover:bg-[#1D9E75]/5"
                    >
                      <Download size={11} /> Export All
                    </FlatBtn>
                  </motion.div>
                )}
              </AnimatePresence>

              {showHistory && (
                <FlatBtn size="sm" variant="ghost" onClick={fetchSalesHistory} disabled={loadingHistory}>
                  <motion.span animate={loadingHistory ? { rotate: 360 } : {}} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                    <RefreshCw size={11} />
                  </motion.span>
                </FlatBtn>
              )}

              <FlatBtn
                size="sm" variant="outline"
                onClick={showHistory ? () => setShowHistory(false) : fetchSalesHistory}
                disabled={loadingHistory}
              >
                {loadingHistory ? "Loading…" : showHistory
                  ? <><ChevronUp size={11} /> Hide</>
                  : <><ChevronDown size={11} /> View History</>
                }
              </FlatBtn>
            </div>
          </div>

          <AnimatePresence>
            {showHistory && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                {salesHistory.length === 0 ? (
                  <div className="py-12 text-center text-xs text-zinc-400">No sales records found.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-zinc-100 dark:border-zinc-800">
                          {["Date", "Customer", "Product", "Qty", "Price", "Total", ""].map((h, i) => (
                            <th key={i} className={`px-4 py-2 text-[9px] uppercase tracking-widest font-semibold text-zinc-400
                              ${i >= 3 && i <= 5 ? "text-right" : i === 6 ? "text-center" : "text-left"}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {salesHistory.map((sale, idx) => (
                            <motion.tr
                              key={sale._id}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03, duration: 0.2 }}
                              className="border-b border-zinc-50 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                            >
                              <td className="px-4 py-2.5 text-zinc-400 whitespace-nowrap tabular-nums">{fmtDate(sale.date)}</td>
                              <td className="px-4 py-2.5 font-medium text-zinc-700 dark:text-zinc-300">{sale.customer?.name || <em className="text-zinc-300 not-italic">Deleted</em>}</td>
                              <td className="px-4 py-2.5 text-zinc-500">{sale.product?.name || <em className="text-zinc-300 not-italic">Deleted</em>}</td>
                              <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">{sale.quantity}</td>
                              <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">{INR(sale.price)}</td>
                              <td className="px-4 py-2.5 text-right tabular-nums font-semibold text-zinc-800 dark:text-zinc-200">
                                <span style={{ borderLeft: "2px solid #1D9E75" }} className="pl-2">{INR(sale.total)}</span>
                              </td>
                              <td className="px-4 py-2.5 text-center">
                                <motion.button
                                  whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                                  onClick={() => openPrintWindow(buildSingleSalePDF(sale))}
                                  className="text-zinc-300 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors p-1"
                                >
                                  <Download size={12} />
                                </motion.button>
                              </td>
                            </motion.tr>
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>

                    {/* Footer totals */}
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                      className="flex justify-between items-center px-4 py-3 border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
                        {salesHistory.length} record{salesHistory.length !== 1 ? "s" : ""}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400">Total Revenue</span>
                        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums text-sm">
                          {INR(salesHistory.reduce((s, r) => s + r.total, 0))}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

    </motion.div>
  )
}