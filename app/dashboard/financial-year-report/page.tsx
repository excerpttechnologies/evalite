// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { authFetch } from "@/app/lib/authFetch"
// import {
//   TrendingUp, TrendingDown, IndianRupee, FileText, ShoppingCart,
//   Receipt, BarChart3, Users, Truck, Download, Printer,
//   ChevronDown, RefreshCw, AlertCircle, CheckCircle2
// } from "lucide-react"

// // ─── Types ────────────────────────────────────────────────
// type Summary = {
//   fy: string; totalSales: number; totalPurchases: number
//   totalExpenses: number; totalGSTCollected: number; totalGSTPaid: number
//   netGSTPayable: number; totalReceived: number; totalPaid: number
//   grossProfit: number; netProfit: number
//   salesCount: number; purchasesCount: number; expensesCount: number
// }
// type PL = {
//   totalRevenue: number; cogs: number; grossProfit: number; grossMargin: string
//   totalExpenses: number; netProfitBeforeTax: number; taxAmount: number; netProfitAfterTax: number
//   expenseByCategory: Record<string, number>
// }
// type BalanceSheet = {
//   assets: { cashInHand: number; accountsReceivable: number; inventoryValue: number; totalAssets: number }
//   liabilities: { accountsPayable: number; gstPayable: number; totalLiabilities: number }
//   equity: { retainedEarnings: number; ownerEquity: number }
// }
// type SaleRow = {
//   srNo: number; invoiceNumber: string; date: string; customerName: string
//   customerGSTIN: string; productName: string; quantity: number; unitPrice: number
//   taxableValue: number; cgst: number; sgst: number; igst: number
//   totalTax: number; invoiceTotal: number; paymentStatus: string; paymentMode: string
// }
// type PurchaseRow = {
//   srNo: number; billNumber: string; date: string; supplierName: string
//   supplierGSTIN: string; productName: string; quantity: number; unitPrice: number
//   taxableValue: number; cgst: number; sgst: number; igst: number
//   totalTax: number; billTotal: number; paymentStatus: string
// }
// type ExpenseRow = {
//   srNo: number; date: string; category: string; description: string
//   vendor: string; paymentMode: string; amount: number; gstAmount: number; total: number
// }
// type GSTSummary = {
//   cgstCollected: number; sgstCollected: number; igstCollected: number; totalGSTCollected: number
//   cgstPaid: number; sgstPaid: number; igstPaid: number; totalGSTPaid: number; netGSTPayable: number
// }
// type Outstanding = {
//   customerOutstanding: { name: string; totalInvoices: number; amountPaid: number; outstanding: number }[]
//   supplierOutstanding: { name: string; totalBills: number; amountPaid: number; outstanding: number }[]
//   totalCustomerOutstanding: number; totalSupplierOutstanding: number
// }

// // ─── Helpers ──────────────────────────────────────────────
// const fmt = (n: number) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0)

// const fmtDate = (d: string) =>
//   new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

// const currentFY = () => {
//   const now = new Date()
//   return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
// }

// const fyOptions = () => {
//   const cy = currentFY()
//   return [cy, cy - 1, cy - 2, cy - 3].map(y => ({
//     value: y,
//     label: `FY ${y}–${y + 1}`,
//   }))
// }

// const TABS = ["Summary", "P&L", "Balance Sheet", "Sales Register", "Purchase Register", "Expenses", "GST Summary", "Outstanding"] as const
// type Tab = typeof TABS[number]

// // ─── Component ────────────────────────────────────────────
// export default function FinancialYearPage() {
//   const [year, setYear] = useState(currentFY())
//   const [activeTab, setActiveTab] = useState<Tab>("Summary")
//   const [loading, setLoading] = useState(false)

//   const [summary, setSummary] = useState<Summary | null>(null)
//   const [pl, setPL] = useState<PL | null>(null)
//   const [bs, setBS] = useState<BalanceSheet | null>(null)
//   const [salesReg, setSalesReg] = useState<{ register: SaleRow[]; totals: any } | null>(null)
//   const [purReg, setPurReg] = useState<{ register: PurchaseRow[]; totals: any } | null>(null)
//   const [expRep, setExpRep] = useState<{ report: ExpenseRow[]; totals: any; byCategory: any } | null>(null)
//   const [gst, setGST] = useState<GSTSummary | null>(null)
//   const [out, setOut] = useState<Outstanding | null>(null)

//   const fetchAll = useCallback(async () => {
//     setLoading(true)
//     try {
//       const q = `?year=${year}`
//       // ✅ New — matches your folder name
//       const [s, p, b, sr, pr, er, g, o] = await Promise.all([
//         authFetch(`/api/financialreports/financial-year-summary${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/profit-loss${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/balance-sheet${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/sales-register${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/purchase-register${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/expenses${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/gst-summary${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/outstanding${q}`).then(r => r.json()),
//       ])
//       setSummary(s); setPL(p); setBS(b)
//       setSalesReg(sr); setPurReg(pr); setExpRep(er)
//       setGST(g); setOut(o)
//     } catch (e) {
//       console.error(e)
//     } finally {
//       setLoading(false)
//     }
//   }, [year])

//   useEffect(() => { fetchAll() }, [fetchAll])

//   // ─── Print ──────────────────────────────────────────────
//   const handlePrint = () => window.print()

//   // ─── CSV Export ─────────────────────────────────────────
//   const downloadCSV = (rows: any[], filename: string) => {
//     if (!rows.length) return
//     const keys = Object.keys(rows[0])
//     const csv = [keys.join(","), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? "")).join(","))].join("\n")
//     const blob = new Blob([csv], { type: "text/csv" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a"); a.href = url; a.download = filename; a.click()
//     URL.revokeObjectURL(url)
//   }

//   // ─── ZIP Export ─────────────────────────────────────────
//   const downloadZIP = async () => {
//     const zip: Record<string, string> = {
//       "sales.json": JSON.stringify(salesReg?.register || [], null, 2),
//       "purchases.json": JSON.stringify(purReg?.register || [], null, 2),
//       "expenses.json": JSON.stringify(expRep?.report || [], null, 2),
//       "gst.json": JSON.stringify(gst || {}, null, 2),
//       "outstanding.json": JSON.stringify(out || {}, null, 2),
//       "summary.json": JSON.stringify(summary || {}, null, 2),
//     }
//     for (const [name, content] of Object.entries(zip)) {
//       const blob = new Blob([content], { type: "application/json" })
//       const url = URL.createObjectURL(blob)
//       const a = document.createElement("a"); a.href = url; a.download = name; a.click()
//       URL.revokeObjectURL(url)
//       await new Promise(r => setTimeout(r, 200))
//     }
//   }

//   // ─── Summary Card ────────────────────────────────────────
//   const SummaryCard = ({ label, value, icon: Icon, color, sub }: any) => (
//     <div className={`rounded-xl border bg-white p-4 shadow-sm flex items-start gap-3`}>
//       <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
//         <Icon className="size-4 text-white" />
//       </div>
//       <div className="min-w-0">
//         <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
//         <p className="text-lg font-bold text-gray-900 mt-0.5">{fmt(value)}</p>
//         {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
//       </div>
//     </div>
//   )

//   // ─── Table wrapper ───────────────────────────────────────
//   const ScrollTable = ({ children }: { children: React.ReactNode }) => (
//     <div className="overflow-x-auto rounded-lg border border-gray-200">
//       <table className="min-w-full text-xs">{children}</table>
//     </div>
//   )

//   const TH = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
//     <th className={`bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap border-b ${right ? "text-right" : "text-left"}`}>
//       {children}
//     </th>
//   )

//   const TD = ({ children, right, bold, green, red }: any) => (
//     <td className={`px-3 py-2 border-b border-gray-100 whitespace-nowrap
//       ${right ? "text-right" : "text-left"}
//       ${bold ? "font-semibold" : ""}
//       ${green ? "text-green-600" : red ? "text-red-500" : "text-gray-700"}`}>
//       {children}
//     </td>
//   )

//   const StatusBadge = ({ status }: { status: string }) => {
//     const map: Record<string, string> = {
//       paid: "bg-green-100 text-green-700",
//       unpaid: "bg-red-100 text-red-600",
//       partial: "bg-yellow-100 text-yellow-700",
//     }
//     return <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>
//   }

//   // ─── Render tabs ─────────────────────────────────────────
//   const renderTab = () => {
//     if (loading) return (
//       <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
//         <RefreshCw className="size-8 animate-spin" />
//         <p className="text-sm">Loading {activeTab}...</p>
//       </div>
//     )

//     switch (activeTab) {

//       // ── Summary ──
//       case "Summary": return (
//         <div className="flex flex-col gap-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             <SummaryCard label="Total Sales" value={summary?.totalSales} icon={TrendingUp} color="bg-green-500" sub={`${summary?.salesCount} invoices`} />
//             <SummaryCard label="Total Purchases" value={summary?.totalPurchases} icon={ShoppingCart} color="bg-blue-500" sub={`${summary?.purchasesCount} bills`} />
//             <SummaryCard label="Total Expenses" value={summary?.totalExpenses} icon={Receipt} color="bg-orange-500" sub={`${summary?.expensesCount} entries`} />
//             <SummaryCard label="Net Profit/Loss" value={summary?.netProfit} icon={BarChart3} color={summary?.netProfit >= 0 ? "bg-emerald-600" : "bg-red-500"} />
//             <SummaryCard label="GST Collected" value={summary?.totalGSTCollected} icon={IndianRupee} color="bg-violet-500" />
//             <SummaryCard label="GST Paid" value={summary?.totalGSTPaid} icon={IndianRupee} color="bg-pink-500" />
//             <SummaryCard label="Net GST Payable" value={summary?.netGSTPayable} icon={AlertCircle} color="bg-amber-500" />
//             <SummaryCard label="Amount Received" value={summary?.totalReceived} icon={CheckCircle2} color="bg-teal-500" />
//           </div>

//           {/* Profit meter */}
//           {summary && (
//             <div className="rounded-xl border bg-white p-5 shadow-sm">
//               <h3 className="font-semibold text-gray-800 mb-4">Financial Overview — FY {year}–{year + 1}</h3>
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div className="rounded-lg bg-green-50 p-4">
//                   <p className="text-xs text-gray-500">Total Revenue</p>
//                   <p className="text-xl font-bold text-green-600 mt-1">{fmt(summary.totalSales)}</p>
//                 </div>
//                 <div className="rounded-lg bg-red-50 p-4">
//                   <p className="text-xs text-gray-500">Total Cost</p>
//                   <p className="text-xl font-bold text-red-500 mt-1">{fmt(summary.totalPurchases + summary.totalExpenses)}</p>
//                 </div>
//                 <div className={`rounded-lg p-4 ${summary.netProfit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
//                   <p className="text-xs text-gray-500">Net {summary.netProfit >= 0 ? "Profit" : "Loss"}</p>
//                   <p className={`text-xl font-bold mt-1 ${summary.netProfit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
//                     {fmt(Math.abs(summary.netProfit))}
//                   </p>
//                 </div>
//               </div>
//               {/* Simple bar */}
//               <div className="mt-4">
//                 <div className="flex justify-between text-xs text-gray-500 mb-1">
//                   <span>Revenue</span>
//                   <span>Cost Ratio: {summary.totalSales > 0 ? (((summary.totalPurchases + summary.totalExpenses) / summary.totalSales) * 100).toFixed(1) : 0}%</span>
//                 </div>
//                 <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
//                   <div
//                     className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
//                     style={{ width: `${Math.min(100, summary.totalSales > 0 ? (summary.netProfit / summary.totalSales) * 100 : 0)}%` }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )

//       // ── P&L ──
//       case "P&L": return pl ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-gray-50 px-5 py-3 border-b">
//               <h3 className="font-semibold text-gray-800">Profit & Loss Statement</h3>
//               <p className="text-xs text-gray-500">1 Apr {year} — 31 Mar {year + 1}</p>
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {[
//                 { label: "Total Revenue", value: pl.totalRevenue, indent: false, green: true },
//                 { label: "Cost of Goods Sold", value: pl.cogs, indent: true, red: true },
//                 { label: "Gross Profit", value: pl.grossProfit, indent: false, bold: true, border: true },
//                 { label: `Gross Margin`, value: null, indent: true, note: `${pl.grossMargin}%` },
//                 { label: "Total Operating Expenses", value: pl.totalExpenses, indent: true, red: true },
//                 { label: "Net Profit Before Tax", value: pl.netProfitBeforeTax, indent: false, bold: true, border: true },
//                 { label: "Estimated Tax (30%)", value: pl.taxAmount, indent: true, red: true },
//                 { label: "Net Profit After Tax", value: pl.netProfitAfterTax, indent: false, bold: true, big: true, border: true },
//               ].map((row, i) => (
//                 <div key={i} className={`flex justify-between items-center py-2.5 ${row.border ? "border-t-2 border-gray-300 mt-1" : "border-b border-gray-50"}`}>
//                   <span className={`text-sm ${row.indent ? "pl-4 text-gray-500" : "text-gray-800"} ${row.bold ? "font-semibold" : ""}`}>
//                     {row.label}
//                   </span>
//                   {row.note
//                     ? <span className="text-sm text-blue-600 font-medium">{row.note}</span>
//                     : <span className={`text-sm font-medium ${row.green ? "text-green-600" : row.red ? "text-red-500" : row.big ? (row.value >= 0 ? "text-emerald-600" : "text-red-500") : "text-gray-800"} ${row.bold ? "font-bold" : ""}`}>
//                       {fmt(row.value)}
//                     </span>
//                   }
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-gray-50 px-5 py-3 border-b">
//               <h3 className="font-semibold text-gray-800">Expense Breakdown by Category</h3>
//             </div>
//             <div className="p-5">
//               {Object.entries(pl.expenseByCategory).length === 0
//                 ? <p className="text-sm text-gray-400 text-center py-8">No expense data</p>
//                 : Object.entries(pl.expenseByCategory)
//                   .sort((a, b) => b[1] - a[1])
//                   .map(([cat, amt]) => (
//                     <div key={cat} className="mb-3">
//                       <div className="flex justify-between text-sm mb-1">
//                         <span className="text-gray-700">{cat}</span>
//                         <span className="font-medium text-gray-800">{fmt(amt)}</span>
//                       </div>
//                       <div className="h-2 w-full rounded-full bg-gray-100">
//                         <div
//                           className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
//                           style={{ width: `${pl.totalExpenses > 0 ? (amt / pl.totalExpenses) * 100 : 0}%` }}
//                         />
//                       </div>
//                     </div>
//                   ))
//               }
//             </div>
//           </div>
//         </div>
//       ) : null

//       // ── Balance Sheet ──
//       case "Balance Sheet": return bs ? (
//         <div className="grid md:grid-cols-3 gap-6">
//           {/* Assets */}
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-green-50 px-5 py-3 border-b border-green-100">
//               <h3 className="font-semibold text-green-800">Assets</h3>
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {[
//                 { label: "Cash in Hand", value: bs.assets.cashInHand },
//                 { label: "Accounts Receivable", value: bs.assets.accountsReceivable },
//                 { label: "Inventory Value", value: bs.assets.inventoryValue },
//               ].map((row, i) => (
//                 <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                   <span className="text-gray-600">{row.label}</span>
//                   <span className="font-medium text-gray-800">{fmt(row.value)}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between py-3 border-t-2 border-green-300 mt-1 text-sm">
//                 <span className="font-bold text-green-800">Total Assets</span>
//                 <span className="font-bold text-green-700">{fmt(bs.assets.totalAssets)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Liabilities */}
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-red-50 px-5 py-3 border-b border-red-100">
//               <h3 className="font-semibold text-red-800">Liabilities</h3>
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {[
//                 { label: "Accounts Payable", value: bs.liabilities.accountsPayable },
//                 { label: "GST Payable", value: bs.liabilities.gstPayable },
//               ].map((row, i) => (
//                 <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                   <span className="text-gray-600">{row.label}</span>
//                   <span className="font-medium text-red-600">{fmt(row.value)}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between py-3 border-t-2 border-red-300 mt-1 text-sm">
//                 <span className="font-bold text-red-800">Total Liabilities</span>
//                 <span className="font-bold text-red-600">{fmt(bs.liabilities.totalLiabilities)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Equity */}
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-blue-50 px-5 py-3 border-b border-blue-100">
//               <h3 className="font-semibold text-blue-800">Equity</h3>
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {[
//                 { label: "Retained Earnings", value: bs.equity.retainedEarnings },
//               ].map((row, i) => (
//                 <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                   <span className="text-gray-600">{row.label}</span>
//                   <span className={`font-medium ${row.value >= 0 ? "text-blue-600" : "text-red-500"}`}>{fmt(row.value)}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between py-3 border-t-2 border-blue-300 mt-1 text-sm">
//                 <span className="font-bold text-blue-800">Owner Equity</span>
//                 <span className={`font-bold ${bs.equity.ownerEquity >= 0 ? "text-blue-700" : "text-red-500"}`}>{fmt(bs.equity.ownerEquity)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null

//       // ── Sales Register ──
//       case "Sales Register": return salesReg ? (
//         <div className="flex flex-col gap-3">
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-500">{salesReg.register.length} invoices</p>
//             <button onClick={() => downloadCSV(salesReg.register, `sales-register-FY${year}.csv`)}
//               className="flex items-center gap-1.5 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">
//               <Download className="size-3" />Download CSV
//             </button>
//           </div>
//           <ScrollTable>
//             <thead>
//               <tr>
//                 <TH>#</TH><TH>Invoice</TH><TH>Date</TH><TH>Customer</TH><TH>GSTIN</TH>
//                 <TH>Product</TH><TH right>Qty</TH><TH right>Price</TH><TH right>Taxable</TH>
//                 <TH right>CGST</TH><TH right>SGST</TH><TH right>IGST</TH>
//                 <TH right>Tax</TH><TH right>Total</TH><TH>Status</TH><TH>Mode</TH>
//               </tr>
//             </thead>
//             <tbody>
//               {salesReg.register.map(r => (
//                 <tr key={r.srNo} className="hover:bg-gray-50">
//                   <TD>{r.srNo}</TD>
//                   <TD><span className="font-mono text-blue-600">{r.invoiceNumber}</span></TD>
//                   <TD>{fmtDate(r.date)}</TD>
//                   <TD bold>{r.customerName}</TD>
//                   <TD><span className="text-gray-400 font-mono text-[10px]">{r.customerGSTIN}</span></TD>
//                   <TD>{r.productName}</TD>
//                   <TD right>{r.quantity}</TD>
//                   <TD right>{fmt(r.unitPrice)}</TD>
//                   <TD right>{fmt(r.taxableValue)}</TD>
//                   <TD right>{fmt(r.cgst)}</TD>
//                   <TD right>{fmt(r.sgst)}</TD>
//                   <TD right>{fmt(r.igst)}</TD>
//                   <TD right bold>{fmt(r.totalTax)}</TD>
//                   <TD right bold green>{fmt(r.invoiceTotal)}</TD>
//                   <TD><StatusBadge status={r.paymentStatus} /></TD>
//                   <TD><span className="capitalize text-gray-500">{r.paymentMode}</span></TD>
//                 </tr>
//               ))}
//               {/* Totals row */}
//               <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
//                 <td colSpan={8} className="px-3 py-2 text-sm text-gray-600">TOTAL</td>
//                 <TD right bold>{fmt(salesReg.totals.taxableValue)}</TD>
//                 <TD right bold>{fmt(salesReg.totals.cgst)}</TD>
//                 <TD right bold>{fmt(salesReg.totals.sgst)}</TD>
//                 <TD right bold>{fmt(salesReg.totals.igst)}</TD>
//                 <TD right bold>{fmt(salesReg.totals.totalTax)}</TD>
//                 <TD right bold green>{fmt(salesReg.totals.invoiceTotal)}</TD>
//                 <td colSpan={2} />
//               </tr>
//             </tbody>
//           </ScrollTable>
//         </div>
//       ) : null

//       // ── Purchase Register ──
//       case "Purchase Register": return purReg ? (
//         <div className="flex flex-col gap-3">
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-500">{purReg.register.length} bills</p>
//             <button onClick={() => downloadCSV(purReg.register, `purchase-register-FY${year}.csv`)}
//               className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">
//               <Download className="size-3" />Download CSV
//             </button>
//           </div>
//           <ScrollTable>
//             <thead>
//               <tr>
//                 <TH>#</TH><TH>Bill No</TH><TH>Date</TH><TH>Supplier</TH><TH>GSTIN</TH>
//                 <TH>Product</TH><TH right>Qty</TH><TH right>Price</TH><TH right>Taxable</TH>
//                 <TH right>CGST</TH><TH right>SGST</TH><TH right>IGST</TH>
//                 <TH right>Tax</TH><TH right>Total</TH><TH>Status</TH>
//               </tr>
//             </thead>
//             <tbody>
//               {purReg.register.map(r => (
//                 <tr key={r.srNo} className="hover:bg-gray-50">
//                   <TD>{r.srNo}</TD>
//                   <TD><span className="font-mono text-blue-600">{r.billNumber}</span></TD>
//                   <TD>{fmtDate(r.date)}</TD>
//                   <TD bold>{r.supplierName}</TD>
//                   <TD><span className="text-gray-400 font-mono text-[10px]">{r.supplierGSTIN}</span></TD>
//                   <TD>{r.productName}</TD>
//                   <TD right>{r.quantity}</TD>
//                   <TD right>{fmt(r.unitPrice)}</TD>
//                   <TD right>{fmt(r.taxableValue)}</TD>
//                   <TD right>{fmt(r.cgst)}</TD>
//                   <TD right>{fmt(r.sgst)}</TD>
//                   <TD right>{fmt(r.igst)}</TD>
//                   <TD right bold>{fmt(r.totalTax)}</TD>
//                   <TD right bold red>{fmt(r.billTotal)}</TD>
//                   <TD><StatusBadge status={r.paymentStatus} /></TD>
//                 </tr>
//               ))}
//               <tr className="bg-gray-50 font-bold border-t-2 border-gray-300">
//                 <td colSpan={8} className="px-3 py-2 text-sm text-gray-600">TOTAL</td>
//                 <TD right bold>{fmt(purReg.totals.taxableValue)}</TD>
//                 <TD right bold>{fmt(purReg.totals.cgst)}</TD>
//                 <TD right bold>{fmt(purReg.totals.sgst)}</TD>
//                 <TD right bold>{fmt(purReg.totals.igst)}</TD>
//                 <TD right bold>{fmt(purReg.totals.totalTax)}</TD>
//                 <TD right bold red>{fmt(purReg.totals.billTotal)}</TD>
//                 <td />
//               </tr>
//             </tbody>
//           </ScrollTable>
//         </div>
//       ) : null

//       // ── Expenses ──
//       case "Expenses": return expRep ? (
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-500">{expRep.report.length} entries</p>
//             <button onClick={() => downloadCSV(expRep.report, `expenses-FY${year}.csv`)}
//               className="flex items-center gap-1.5 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600">
//               <Download className="size-3" />Download CSV
//             </button>
//           </div>
//           <ScrollTable>
//             <thead>
//               <tr>
//                 <TH>#</TH><TH>Date</TH><TH>Category</TH><TH>Description</TH>
//                 <TH>Vendor</TH><TH>Mode</TH><TH right>Amount</TH><TH right>GST</TH><TH right>Total</TH>
//               </tr>
//             </thead>
//             <tbody>
//               {expRep.report.map(r => (
//                 <tr key={r.srNo} className="hover:bg-gray-50">
//                   <TD>{r.srNo}</TD>
//                   <TD>{fmtDate(r.date)}</TD>
//                   <TD><span className="bg-orange-50 text-orange-700 text-[10px] px-2 py-0.5 rounded-full font-medium">{r.category}</span></TD>
//                   <TD>{r.description}</TD>
//                   <TD>{r.vendor}</TD>
//                   <TD><span className="capitalize text-gray-500">{r.paymentMode}</span></TD>
//                   <TD right>{fmt(r.amount)}</TD>
//                   <TD right>{fmt(r.gstAmount)}</TD>
//                   <TD right bold red>{fmt(r.total)}</TD>
//                 </tr>
//               ))}
//               <tr className="bg-gray-50 border-t-2 border-gray-300">
//                 <td colSpan={6} className="px-3 py-2 text-sm font-bold text-gray-600">TOTAL</td>
//                 <TD right bold>{fmt(expRep.totals.amount)}</TD>
//                 <TD right bold>{fmt(expRep.totals.gstAmount)}</TD>
//                 <TD right bold red>{fmt(expRep.totals.total)}</TD>
//               </tr>
//             </tbody>
//           </ScrollTable>
//         </div>
//       ) : null

//       // ── GST Summary ──
//       case "GST Summary": return gst ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-violet-50 px-5 py-3 border-b border-violet-100">
//               <h3 className="font-semibold text-violet-800">GST Collected (Output Tax)</h3>
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {[
//                 { label: "CGST Collected", value: gst.cgstCollected },
//                 { label: "SGST Collected", value: gst.sgstCollected },
//                 { label: "IGST Collected", value: gst.igstCollected },
//               ].map((r, i) => (
//                 <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                   <span className="text-gray-600">{r.label}</span>
//                   <span className="font-medium text-violet-600">{fmt(r.value)}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between py-3 border-t-2 border-violet-300 mt-1">
//                 <span className="font-bold text-violet-800">Total GST Collected</span>
//                 <span className="font-bold text-violet-700">{fmt(gst.totalGSTCollected)}</span>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-pink-50 px-5 py-3 border-b border-pink-100">
//               <h3 className="font-semibold text-pink-800">GST Paid (Input Tax Credit)</h3>
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {[
//                 { label: "CGST Paid", value: gst.cgstPaid },
//                 { label: "SGST Paid", value: gst.sgstPaid },
//                 { label: "IGST Paid", value: gst.igstPaid },
//               ].map((r, i) => (
//                 <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                   <span className="text-gray-600">{r.label}</span>
//                   <span className="font-medium text-pink-600">{fmt(r.value)}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between py-3 border-t-2 border-pink-300 mt-1">
//                 <span className="font-bold text-pink-800">Total GST Paid</span>
//                 <span className="font-bold text-pink-600">{fmt(gst.totalGSTPaid)}</span>
//               </div>
//             </div>
//           </div>

//           {/* Net GST */}
//           <div className="md:col-span-2 rounded-xl border-2 bg-white shadow-sm p-5 flex items-center justify-between"
//             style={{ borderColor: gst.netGSTPayable > 0 ? "#f59e0b" : "#10b981" }}>
//             <div>
//               <p className="text-sm text-gray-500">Net GST Payable to Government</p>
//               <p className="text-xs text-gray-400 mt-0.5">Output Tax − Input Tax Credit</p>
//             </div>
//             <div className="text-right">
//               <p className={`text-2xl font-bold ${gst.netGSTPayable > 0 ? "text-amber-600" : "text-emerald-600"}`}>
//                 {fmt(gst.netGSTPayable)}
//               </p>
//               <p className="text-xs text-gray-400 mt-0.5">{gst.netGSTPayable > 0 ? "Payable" : "Credit Available"}</p>
//             </div>
//           </div>
//         </div>
//       ) : null

//       // ── Outstanding ──
//       case "Outstanding": return out ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Customer Outstanding */}
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//                 <Users className="size-4 text-blue-500" />Customer Outstanding
//               </h3>
//               <span className="text-sm font-bold text-red-500">{fmt(out.totalCustomerOutstanding)}</span>
//             </div>
//             {out.customerOutstanding.length === 0
//               ? <p className="text-sm text-gray-400 text-center py-8 border rounded-lg">No outstanding dues ✅</p>
//               : <ScrollTable>
//                 <thead>
//                   <tr>
//                     <TH>Customer</TH><TH right>Invoices</TH><TH right>Paid</TH><TH right>Outstanding</TH>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {out.customerOutstanding.map((r, i) => (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <TD bold>{r.name}</TD>
//                       <TD right>{fmt(r.totalInvoices)}</TD>
//                       <TD right green>{fmt(r.amountPaid)}</TD>
//                       <TD right bold red>{fmt(r.outstanding)}</TD>
//                     </tr>
//                   ))}
//                 </tbody>
//               </ScrollTable>
//             }
//           </div>

//           {/* Supplier Outstanding */}
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//                 <Truck className="size-4 text-orange-500" />Supplier Outstanding
//               </h3>
//               <span className="text-sm font-bold text-red-500">{fmt(out.totalSupplierOutstanding)}</span>
//             </div>
//             {out.supplierOutstanding.length === 0
//               ? <p className="text-sm text-gray-400 text-center py-8 border rounded-lg">No outstanding dues ✅</p>
//               : <ScrollTable>
//                 <thead>
//                   <tr>
//                     <TH>Supplier</TH><TH right>Bills</TH><TH right>Paid</TH><TH right>Outstanding</TH>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {out.supplierOutstanding.map((r, i) => (
//                     <tr key={i} className="hover:bg-gray-50">
//                       <TD bold>{r.name}</TD>
//                       <TD right>{fmt(r.totalBills)}</TD>
//                       <TD right green>{fmt(r.amountPaid)}</TD>
//                       <TD right bold red>{fmt(r.outstanding)}</TD>
//                     </tr>
//                   ))}
//                 </tbody>
//               </ScrollTable>
//             }
//           </div>
//         </div>
//       ) : null

//       default: return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-5">

//         {/* ── Top Bar ── */}
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Financial Year Report</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Complete financial overview — Tally style</p>
//           </div>

//           <div className="flex items-center gap-2 flex-wrap">
//             {/* FY Selector */}
//             <div className="relative">
//               <select
//                 value={year}
//                 onChange={e => setYear(Number(e.target.value))}
//                 className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-gray-700 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {fyOptions().map(o => (
//                   <option key={o.value} value={o.value}>{o.label}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-2 top-2.5 size-4 text-gray-400 pointer-events-none" />
//             </div>

//             {/* Refresh */}
//             <button onClick={fetchAll} disabled={loading}
//               className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm">
//               <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
//             </button>

//             {/* Print */}
//             <button onClick={handlePrint}
//               className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm">
//               <Printer className="size-4" />Print
//             </button>

//             {/* Download ZIP */}
//             <button onClick={downloadZIP}
//               className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
//               <Download className="size-4" />Export All
//             </button>
//           </div>
//         </div>

//         {/* ── FY Badge ── */}
//         <div className="flex items-center gap-2 text-sm">
//           <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">
//             📅 FY {year}–{year + 1} &nbsp;|&nbsp; 1 Apr {year} → 31 Mar {year + 1}
//           </span>
//           {summary && (
//             <span className={`px-3 py-1 rounded-full font-medium border ${summary.netProfit >= 0 ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
//               {summary.netProfit >= 0 ? "✅ Profitable" : "⚠️ Loss"} — {fmt(Math.abs(summary.netProfit))}
//             </span>
//           )}
//         </div>

//         {/* ── Tabs ── */}
//         <div className="flex overflow-x-auto gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
//           {TABS.map(tab => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === tab
//                   ? "bg-blue-600 text-white shadow-sm"
//                   : "text-gray-600 hover:bg-gray-100"
//                 }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* ── Tab Content ── */}
//         <div className="min-h-[400px]">
//           {renderTab()}
//         </div>

//       </div>
//     </div>
//   )
// }






//aravind
// "use client"

// import * as XLSX from "xlsx";
// import { useState, useEffect, useCallback } from "react"
// import { authFetch } from "@/app/lib/authFetch"
// import {
//   TrendingUp, IndianRupee, ShoppingCart,
//   Receipt, BarChart3, Users, Truck, Download, Printer,
//   ChevronDown, RefreshCw, AlertCircle, CheckCircle2, Filter, X
// } from "lucide-react"

// type Summary = {
//   fy: string; totalSales: number; totalPurchases: number
//   totalExpenses: number; totalGSTCollected: number; totalGSTPaid: number
//   netGSTPayable: number; totalReceived: number; totalPaid: number
//   grossProfit: number; netProfit: number
//   salesCount: number; purchasesCount: number; expensesCount: number
// }
// type PL = {
//   totalRevenue: number; cogs: number; grossProfit: number; grossMargin: string
//   totalExpenses: number; netProfitBeforeTax: number; taxAmount: number; netProfitAfterTax: number
//   expenseByCategory: Record<string, number>
// }
// type BalanceSheet = {
//   assets: { cashInHand: number; accountsReceivable: number; inventoryValue: number; totalAssets: number }
//   liabilities: { accountsPayable: number; gstPayable: number; totalLiabilities: number }
//   equity: { retainedEarnings: number; ownerEquity: number }
// }
// type SaleRow = {
//   srNo: number; invoiceNumber: string; date: string; customerName: string
//   customerGSTIN: string; productName: string; quantity: number; unitPrice: number
//   taxableValue: number; cgst: number; sgst: number; igst: number
//   totalTax: number; invoiceTotal: number; paymentStatus: string; paymentMode: string
// }
// type PurchaseRow = {
//   srNo: number; billNumber: string; date: string; supplierName: string
//   supplierGSTIN: string; productName: string; quantity: number; unitPrice: number
//   taxableValue: number; cgst: number; sgst: number; igst: number
//   totalTax: number; billTotal: number; paymentStatus: string
// }
// type ExpenseRow = {
//   srNo: number; date: string; category: string; description: string
//   vendor: string; paymentMode: string; amount: number; gstAmount: number; total: number
// }
// type GSTSummary = {
//   cgstCollected: number; sgstCollected: number; igstCollected: number; totalGSTCollected: number
//   cgstPaid: number; sgstPaid: number; igstPaid: number; totalGSTPaid: number; netGSTPayable: number
// }
// type Outstanding = {
//   customerOutstanding: { name: string; totalInvoices: number; amountPaid: number; outstanding: number }[]
//   supplierOutstanding: { name: string; totalBills: number; amountPaid: number; outstanding: number }[]
//   totalCustomerOutstanding: number; totalSupplierOutstanding: number
// }

// const fmt = (n: number) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0)

// const fmtDate = (d: string) =>
//   new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

// const currentFY = () => {
//   const now = new Date()
//   return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
// }

// const fyOptions = () => {
//   const cy = currentFY()
//   return [cy, cy - 1, cy - 2, cy - 3].map(y => ({ value: y, label: `FY ${y}–${y + 1}` }))
// }

// const FY_MONTHS = [
//   { label: "April", value: 3 }, { label: "May", value: 4 }, { label: "June", value: 5 },
//   { label: "July", value: 6 }, { label: "August", value: 7 }, { label: "September", value: 8 },
//   { label: "October", value: 9 }, { label: "November", value: 10 }, { label: "December", value: 11 },
//   { label: "January", value: 0 }, { label: "February", value: 1 }, { label: "March", value: 2 },
// ]

// const TABS = ["Summary", "P&L", "Balance Sheet", "Sales Register", "Purchase Register", "Expenses", "GST Summary", "Outstanding"] as const
// type Tab = typeof TABS[number]

// export default function FinancialYearPage() {
//   const [year, setYear]           = useState(currentFY())
//   const [activeTab, setActiveTab] = useState<Tab>("Summary")
//   const [loading, setLoading]     = useState(false)
//   const [filterMonth, setFilterMonth] = useState<number | null>(null)

//   const [summary,  setSummary]  = useState<Summary | null>(null)
//   const [pl,       setPL]       = useState<PL | null>(null)
//   const [bs,       setBS]       = useState<BalanceSheet | null>(null)
//   const [salesReg, setSalesReg] = useState<{ register: SaleRow[]; totals: any } | null>(null)
//   const [purReg,   setPurReg]   = useState<{ register: PurchaseRow[]; totals: any } | null>(null)
//   const [expRep,   setExpRep]   = useState<{ report: ExpenseRow[]; totals: any; byCategory: any } | null>(null)
//   const [gst,      setGST]      = useState<GSTSummary | null>(null)
//   const [out,      setOut]       = useState<Outstanding | null>(null)

//   const fetchAll = useCallback(async () => {
//     setLoading(true)
//     try {
//       const q = `?year=${year}`
//       const [s, p, b, sr, pr, er, g, o] = await Promise.all([
//         authFetch(`/api/financialreports/financial-year-summary${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/profit-loss${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/balance-sheet${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/sales-register${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/purchase-register${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/expenses${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/gst-summary${q}`).then(r => r.json()),
//         authFetch(`/api/financialreports/outstanding${q}`).then(r => r.json()),
//       ])
//       setSummary(s); setPL(p); setBS(b)
//       setSalesReg(sr); setPurReg(pr); setExpRep(er)
//       setGST(g); setOut(o)
//     } catch (e) {
//       console.error(e)
//     } finally {
//       setLoading(false)
//     }
//   }, [year])

//   useEffect(() => { fetchAll() }, [fetchAll])

//   // ✅ Filter by month
//   const filterByMonth = <T extends { date: string }>(rows: T[]): T[] =>
//     filterMonth === null ? rows : rows.filter(r => new Date(r.date).getMonth() === filterMonth)

//   const filteredSales     = salesReg ? filterByMonth(salesReg.register)  : []
//   const filteredPurchases = purReg   ? filterByMonth(purReg.register)    : []
//   const filteredExpenses  = expRep   ? filterByMonth(expRep.report)      : []

//   const calcSaleTotals = (rows: SaleRow[]) => ({
//     taxableValue: rows.reduce((s, r) => s + r.taxableValue, 0),
//     cgst: rows.reduce((s, r) => s + r.cgst, 0),
//     sgst: rows.reduce((s, r) => s + r.sgst, 0),
//     igst: rows.reduce((s, r) => s + r.igst, 0),
//     totalTax: rows.reduce((s, r) => s + r.totalTax, 0),
//     invoiceTotal: rows.reduce((s, r) => s + r.invoiceTotal, 0),
//   })
//   const calcPurTotals = (rows: PurchaseRow[]) => ({
//     taxableValue: rows.reduce((s, r) => s + r.taxableValue, 0),
//     cgst: rows.reduce((s, r) => s + r.cgst, 0),
//     sgst: rows.reduce((s, r) => s + r.sgst, 0),
//     igst: rows.reduce((s, r) => s + r.igst, 0),
//     totalTax: rows.reduce((s, r) => s + r.totalTax, 0),
//     billTotal: rows.reduce((s, r) => s + r.billTotal, 0),
//   })
//   const calcExpTotals = (rows: ExpenseRow[]) => ({
//     amount: rows.reduce((s, r) => s + r.amount, 0),
//     gstAmount: rows.reduce((s, r) => s + r.gstAmount, 0),
//     total: rows.reduce((s, r) => s + r.total, 0),
//   })

//   const triggerDownload = (blob: Blob, filename: string) => {
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a"); a.href = url; a.download = filename; a.click()
//     URL.revokeObjectURL(url)
//   }

//   // ✅ CSV
//   const downloadCSV = (rows: any[], filename: string) => {
//     if (!rows.length) { alert("No data"); return }
//     const keys = Object.keys(rows[0])
//     const csv = [keys.join(","), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? "")).join(","))].join("\n")
//     triggerDownload(new Blob([csv], { type: "text/csv" }), filename)
//   }

//   // ✅ XML
//   const downloadXML = (rows: any[], rootTag: string, rowTag: string, filename: string) => {
//     if (!rows.length) { alert("No data"); return }
//     const esc = (v: any) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
//     const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootTag}>\n` +
//       rows.map(r => `  <${rowTag}>\n` + Object.entries(r).map(([k, v]) => `    <${k}>${esc(v)}</${k}>`).join("\n") + `\n  </${rowTag}>`).join("\n") +
//       `\n</${rootTag}>`
//     triggerDownload(new Blob([xml], { type: "application/xml" }), filename)
//   }

//   // ✅ Excel via SheetJS
//   const downloadExcel = async (rows: any[], sheetName: string, filename: string) => {
//     if (!rows.length) { alert("No data"); return }
//     try {
//       // const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs" as any)
//       const ws = XLSX.utils.json_to_sheet(rows)
//       const wb = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(wb, ws, sheetName)
//       XLSX.writeFile(wb, filename)
//     } catch {
//       downloadCSV(rows, filename.replace(".xlsx", ".csv"))
//     }
//   }

//   // ✅ PDF via print window
//   const downloadPDF = (title: string, rows: any[], columns: { key: string; label: string }[]) => {
//     if (!rows.length) { alert("No data"); return }
//     const monthLabel = filterMonth !== null ? ` — ${FY_MONTHS.find(m => m.value === filterMonth)?.label}` : ""
//     const html = `<!DOCTYPE html><html><head><title>${title}</title>
//     <style>
//       *{margin:0;padding:0;box-sizing:border-box}
//       body{font-family:Arial,sans-serif;padding:32px;color:#222;font-size:12px}
//       .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
//       .title{font-size:20px;font-weight:bold;color:#1d4ed8}
//       .sub{font-size:11px;color:#666;margin-top:3px}
//       .badge{background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600}
//       hr{border:none;border-top:2px solid #1d4ed8;margin:12px 0 16px}
//       table{width:100%;border-collapse:collapse}
//       thead{background:#1d4ed8;color:white}
//       th{padding:7px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px}
//       td{padding:7px 10px;border-bottom:1px solid #f1f5f9;font-size:11px}
//       tr:nth-child(even){background:#f8fafc}
//       .footer{margin-top:24px;text-align:center;font-size:9px;color:#aaa}
//       @media print{body{padding:16px}}
//     </style></head><body>
//     <div class="header">
//       <div><div class="title">${title}</div><div class="sub">FY ${year}–${year + 1}${monthLabel}</div></div>
//       <div class="badge">EvaLite ERP</div>
//     </div><hr/>
//     <table>
//       <thead><tr>${columns.map(c => `<th>${c.label}</th>`).join("")}</tr></thead>
//       <tbody>${rows.map(r => `<tr>${columns.map(c => `<td>${r[c.key] ?? "—"}</td>`).join("")}</tr>`).join("")}</tbody>
//     </table>
//     <div class="footer">Generated on ${new Date().toLocaleString("en-IN")} — EvaLite Financial Reports</div>
//     </body></html>`
//     const w = window.open("", "_blank")
//     if (!w) { alert("Allow popups"); return }
//     w.document.write(html); w.document.close(); w.focus()
//     setTimeout(() => { w.print(); w.close() }, 600)
//   }

//   // ✅ Export all JSON
//   const downloadZIP = async () => {
//     const files: Record<string, string> = {
//       "sales.json":       JSON.stringify(salesReg?.register || [], null, 2),
//       "purchases.json":   JSON.stringify(purReg?.register   || [], null, 2),
//       "expenses.json":    JSON.stringify(expRep?.report     || [], null, 2),
//       "gst.json":         JSON.stringify(gst     || {}, null, 2),
//       "outstanding.json": JSON.stringify(out     || {}, null, 2),
//       "summary.json":     JSON.stringify(summary || {}, null, 2),
//     }
//     for (const [name, content] of Object.entries(files)) {
//       triggerDownload(new Blob([content], { type: "application/json" }), name)
//       await new Promise(r => setTimeout(r, 200))
//     }
//   }

//   // ✅ Download buttons row
//   const DownloadBar = ({ rows, csvName, xmlRoot, xmlRow, pdfTitle, pdfCols, sheetName }: {
//     rows: any[]; csvName: string; xmlRoot: string; xmlRow: string
//     pdfTitle: string; pdfCols: { key: string; label: string }[]; sheetName: string
//   }) => (
//     <div className="flex flex-wrap gap-2">
//       <button onClick={() => downloadPDF(pdfTitle, rows, pdfCols)}
//         className="flex items-center gap-1.5 text-xs bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 font-medium">
//         <Download className="size-3" />PDF
//       </button>
//       <button onClick={() => downloadExcel(rows, sheetName, `${csvName}.xlsx`)}
//         className="flex items-center gap-1.5 text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 font-medium">
//         <Download className="size-3" />Excel
//       </button>
//       <button onClick={() => downloadCSV(rows, `${csvName}.csv`)}
//         className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium">
//         <Download className="size-3" />CSV
//       </button>
//       <button onClick={() => downloadXML(rows, xmlRoot, xmlRow, `${csvName}.xml`)}
//         className="flex items-center gap-1.5 text-xs bg-orange-500 text-white px-3 py-1.5 rounded-lg hover:bg-orange-600 font-medium">
//         <Download className="size-3" />XML
//       </button>
//     </div>
//   )

//   // ─── UI Components ─────────────────────────────────────
//   const SummaryCard = ({ label, value, icon: Icon, color, sub }: any) => (
//     <div className="rounded-xl border bg-white p-4 shadow-sm flex items-start gap-3">
//       <div className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
//         <Icon className="size-4 text-white" />
//       </div>
//       <div className="min-w-0">
//         <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
//         <p className="text-lg font-bold text-gray-900 mt-0.5">{fmt(value)}</p>
//         {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
//       </div>
//     </div>
//   )

//   const ScrollTable = ({ children }: { children: React.ReactNode }) => (
//     <div className="overflow-x-auto rounded-lg border border-gray-200">
//       <table className="min-w-full text-xs">{children}</table>
//     </div>
//   )

//   const TH = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
//     <th className={`bg-gray-50 px-3 py-2.5 text-xs font-semibold text-gray-600 uppercase tracking-wide whitespace-nowrap border-b ${right ? "text-right" : "text-left"}`}>
//       {children}
//     </th>
//   )

//   const TD = ({ children, right, bold, green, red }: any) => (
//     <td className={`px-3 py-2 border-b border-gray-100 whitespace-nowrap
//       ${right ? "text-right" : "text-left"}
//       ${bold ? "font-semibold" : ""}
//       ${green ? "text-green-600" : red ? "text-red-500" : "text-gray-700"}`}>
//       {children}
//     </td>
//   )

//   const StatusBadge = ({ status }: { status: string }) => {
//     const map: Record<string, string> = {
//       paid: "bg-green-100 text-green-700",
//       unpaid: "bg-red-100 text-red-600",
//       partial: "bg-yellow-100 text-yellow-700",
//     }
//     return <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${map[status] || "bg-gray-100 text-gray-600"}`}>{status}</span>
//   }

//   // ✅ Monthly filter bar
//   const MonthFilterBar = () => (
//     <div className="flex flex-wrap gap-1.5 items-center bg-white border border-gray-200 rounded-xl p-2 shadow-sm">
//       <span className="text-xs text-gray-500 font-medium px-1 flex items-center gap-1">
//         <Filter className="size-3" />Month:
//       </span>
//       <button onClick={() => setFilterMonth(null)}
//         className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${filterMonth === null ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
//         All
//       </button>
//       {FY_MONTHS.map(m => (
//         <button key={m.value} onClick={() => setFilterMonth(filterMonth === m.value ? null : m.value)}
//           className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${filterMonth === m.value ? "bg-blue-600 text-white" : "text-gray-500 hover:bg-gray-100"}`}>
//           {m.label.slice(0, 3)}
//         </button>
//       ))}
//     </div>
//   )

//   const monthName = filterMonth !== null ? FY_MONTHS.find(m => m.value === filterMonth)?.label : null

//   // ─── Tab Renderer ──────────────────────────────────────
//   const renderTab = () => {
//     if (loading) return (
//       <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
//         <RefreshCw className="size-8 animate-spin" />
//         <p className="text-sm">Loading {activeTab}...</p>
//       </div>
//     )

//     switch (activeTab) {

//       case "Summary": return (
//         <div className="flex flex-col gap-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//             <SummaryCard label="Total Sales"     value={summary?.totalSales}        icon={TrendingUp}   color="bg-green-500"  sub={`${summary?.salesCount} invoices`} />
//             <SummaryCard label="Total Purchases" value={summary?.totalPurchases}    icon={ShoppingCart} color="bg-blue-500"   sub={`${summary?.purchasesCount} bills`} />
//             <SummaryCard label="Total Expenses"  value={summary?.totalExpenses}     icon={Receipt}      color="bg-orange-500" sub={`${summary?.expensesCount} entries`} />
//             <SummaryCard label="Net Profit/Loss" value={summary?.netProfit}         icon={BarChart3}    color={summary?.netProfit >= 0 ? "bg-emerald-600" : "bg-red-500"} />
//             <SummaryCard label="GST Collected"   value={summary?.totalGSTCollected} icon={IndianRupee}  color="bg-violet-500" />
//             <SummaryCard label="GST Paid"        value={summary?.totalGSTPaid}      icon={IndianRupee}  color="bg-pink-500" />
//             <SummaryCard label="Net GST Payable" value={summary?.netGSTPayable}     icon={AlertCircle}  color="bg-amber-500" />
//             <SummaryCard label="Amount Received" value={summary?.totalReceived}     icon={CheckCircle2} color="bg-teal-500" />
//           </div>
//           {summary && (
//             <div className="rounded-xl border bg-white p-5 shadow-sm">
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="font-semibold text-gray-800">Financial Overview — FY {year}–{year + 1}</h3>
//                 <DownloadBar
//                   rows={[summary]}
//                   csvName={`summary-FY${year}`}
//                   xmlRoot="Summary" xmlRow="Data"
//                   pdfTitle="Financial Summary"
//                   sheetName="Summary"
//                   pdfCols={[
//                     { key: "fy", label: "FY" }, { key: "totalSales", label: "Sales" },
//                     { key: "totalPurchases", label: "Purchases" }, { key: "totalExpenses", label: "Expenses" },
//                     { key: "netProfit", label: "Net Profit" }, { key: "totalGSTCollected", label: "GST Collected" },
//                     { key: "netGSTPayable", label: "Net GST" },
//                   ]}
//                 />
//               </div>
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div className="rounded-lg bg-green-50 p-4">
//                   <p className="text-xs text-gray-500">Total Revenue</p>
//                   <p className="text-xl font-bold text-green-600 mt-1">{fmt(summary.totalSales)}</p>
//                 </div>
//                 <div className="rounded-lg bg-red-50 p-4">
//                   <p className="text-xs text-gray-500">Total Cost</p>
//                   <p className="text-xl font-bold text-red-500 mt-1">{fmt(summary.totalPurchases + summary.totalExpenses)}</p>
//                 </div>
//                 <div className={`rounded-lg p-4 ${summary.netProfit >= 0 ? "bg-emerald-50" : "bg-red-50"}`}>
//                   <p className="text-xs text-gray-500">Net {summary.netProfit >= 0 ? "Profit" : "Loss"}</p>
//                   <p className={`text-xl font-bold mt-1 ${summary.netProfit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
//                     {fmt(Math.abs(summary.netProfit))}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-4">
//                 <div className="flex justify-between text-xs text-gray-500 mb-1">
//                   <span>Profit Margin</span>
//                   <span>Cost Ratio: {summary.totalSales > 0 ? (((summary.totalPurchases + summary.totalExpenses) / summary.totalSales) * 100).toFixed(1) : 0}%</span>
//                 </div>
//                 <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
//                   <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all"
//                     style={{ width: `${Math.min(100, Math.max(0, summary.totalSales > 0 ? (summary.netProfit / summary.totalSales) * 100 : 0))}%` }} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )

//       case "P&L": return pl ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-gray-50 px-5 py-3 border-b flex justify-between items-center">
//               <div>
//                 <h3 className="font-semibold text-gray-800">Profit & Loss Statement</h3>
//                 <p className="text-xs text-gray-500">1 Apr {year} — 31 Mar {year + 1}</p>
//               </div>
//               <DownloadBar
//                 rows={[{
//                   "Total Revenue": pl.totalRevenue, "COGS": pl.cogs, "Gross Profit": pl.grossProfit,
//                   "Gross Margin %": pl.grossMargin, "Total Expenses": pl.totalExpenses,
//                   "Net Before Tax": pl.netProfitBeforeTax, "Tax (30%)": pl.taxAmount, "Net After Tax": pl.netProfitAfterTax
//                 }]}
//                 csvName={`pl-FY${year}`} xmlRoot="ProfitLoss" xmlRow="Row"
//                 pdfTitle="Profit & Loss Statement" sheetName="P&L"
//                 pdfCols={[
//                   { key: "Total Revenue", label: "Total Revenue" }, { key: "COGS", label: "COGS" },
//                   { key: "Gross Profit", label: "Gross Profit" }, { key: "Total Expenses", label: "Expenses" },
//                   { key: "Net Before Tax", label: "Net Before Tax" }, { key: "Net After Tax", label: "Net After Tax" }
//                 ]}
//               />
//             </div>
//             <div className="p-5 flex flex-col gap-0">
//               {([
//                 { label: "Total Revenue",           value: pl.totalRevenue,        green: true },
//                 { label: "Cost of Goods Sold",       value: pl.cogs,                indent: true, red: true },
//                 { label: "Gross Profit",             value: pl.grossProfit,         bold: true, border: true },
//                 { label: "Gross Margin",             value: null,                   indent: true, note: `${pl.grossMargin}%` },
//                 { label: "Total Operating Expenses", value: pl.totalExpenses,       indent: true, red: true },
//                 { label: "Net Profit Before Tax",    value: pl.netProfitBeforeTax,  bold: true, border: true },
//                 { label: "Estimated Tax (30%)",      value: pl.taxAmount,           indent: true, red: true },
//                 { label: "Net Profit After Tax",     value: pl.netProfitAfterTax,   bold: true, big: true, border: true },
//               ] as any[]).map((row, i) => (
//                 <div key={i} className={`flex justify-between items-center py-2.5 ${row.border ? "border-t-2 border-gray-300 mt-1" : "border-b border-gray-50"}`}>
//                   <span className={`text-sm ${row.indent ? "pl-4 text-gray-500" : "text-gray-800"} ${row.bold ? "font-semibold" : ""}`}>{row.label}</span>
//                   {row.note
//                     ? <span className="text-sm text-blue-600 font-medium">{row.note}</span>
//                     : <span className={`text-sm font-medium ${row.green ? "text-green-600" : row.red ? "text-red-500" : row.big ? (row.value >= 0 ? "text-emerald-600" : "text-red-500") : "text-gray-800"} ${row.bold ? "font-bold" : ""}`}>
//                         {fmt(row.value)}
//                       </span>
//                   }
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
//             <div className="bg-gray-50 px-5 py-3 border-b">
//               <h3 className="font-semibold text-gray-800">Expense Breakdown by Category</h3>
//             </div>
//             <div className="p-5">
//               {Object.entries(pl.expenseByCategory).length === 0
//                 ? <p className="text-sm text-gray-400 text-center py-8">No expense data</p>
//                 : Object.entries(pl.expenseByCategory).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
//                   <div key={cat} className="mb-3">
//                     <div className="flex justify-between text-sm mb-1">
//                       <span className="text-gray-700">{cat}</span>
//                       <span className="font-medium">{fmt(amt)}</span>
//                     </div>
//                     <div className="h-2 w-full rounded-full bg-gray-100">
//                       <div className="h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
//                         style={{ width: `${pl.totalExpenses > 0 ? (amt / pl.totalExpenses) * 100 : 0}%` }} />
//                     </div>
//                   </div>
//                 ))
//               }
//             </div>
//           </div>
//         </div>
//       ) : null

//       case "Balance Sheet": return bs ? (
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-end">
//             <DownloadBar
//               rows={[
//                 { Section: "Assets", Item: "Cash in Hand",          Amount: bs.assets.cashInHand },
//                 { Section: "Assets", Item: "Accounts Receivable",   Amount: bs.assets.accountsReceivable },
//                 { Section: "Assets", Item: "Inventory Value",       Amount: bs.assets.inventoryValue },
//                 { Section: "Assets", Item: "TOTAL ASSETS",          Amount: bs.assets.totalAssets },
//                 { Section: "Liabilities", Item: "Accounts Payable", Amount: bs.liabilities.accountsPayable },
//                 { Section: "Liabilities", Item: "GST Payable",      Amount: bs.liabilities.gstPayable },
//                 { Section: "Liabilities", Item: "TOTAL LIABILITIES",Amount: bs.liabilities.totalLiabilities },
//                 { Section: "Equity", Item: "Retained Earnings",     Amount: bs.equity.retainedEarnings },
//                 { Section: "Equity", Item: "OWNER EQUITY",          Amount: bs.equity.ownerEquity },
//               ]}
//               csvName={`balance-sheet-FY${year}`} xmlRoot="BalanceSheet" xmlRow="Item"
//               pdfTitle="Balance Sheet" sheetName="Balance Sheet"
//               pdfCols={[{ key: "Section", label: "Section" }, { key: "Item", label: "Item" }, { key: "Amount", label: "Amount (₹)" }]}
//             />
//           </div>
//           <div className="grid md:grid-cols-3 gap-6">
//             {[
//               { title: "Assets", color: "green", border: "border-green-300", bg: "bg-green-50", text: "text-green-800",
//                 rows: [
//                   { label: "Cash in Hand", value: bs.assets.cashInHand },
//                   { label: "Accounts Receivable", value: bs.assets.accountsReceivable },
//                   { label: "Inventory Value", value: bs.assets.inventoryValue },
//                 ],
//                 total: { label: "Total Assets", value: bs.assets.totalAssets }
//               },
//               { title: "Liabilities", color: "red", border: "border-red-300", bg: "bg-red-50", text: "text-red-800",
//                 rows: [
//                   { label: "Accounts Payable", value: bs.liabilities.accountsPayable },
//                   { label: "GST Payable", value: bs.liabilities.gstPayable },
//                 ],
//                 total: { label: "Total Liabilities", value: bs.liabilities.totalLiabilities }
//               },
//               { title: "Equity", color: "blue", border: "border-blue-300", bg: "bg-blue-50", text: "text-blue-800",
//                 rows: [{ label: "Retained Earnings", value: bs.equity.retainedEarnings }],
//                 total: { label: "Owner Equity", value: bs.equity.ownerEquity }
//               },
//             ].map(section => (
//               <div key={section.title} className="rounded-xl border bg-white shadow-sm overflow-hidden">
//                 <div className={`${section.bg} px-5 py-3 border-b`}>
//                   <h3 className={`font-semibold ${section.text}`}>{section.title}</h3>
//                 </div>
//                 <div className="p-5">
//                   {section.rows.map((r, i) => (
//                     <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                       <span className="text-gray-600">{r.label}</span>
//                       <span className="font-medium text-gray-800">{fmt(r.value)}</span>
//                     </div>
//                   ))}
//                   <div className={`flex justify-between py-3 border-t-2 ${section.border} mt-1 text-sm`}>
//                     <span className={`font-bold ${section.text}`}>{section.total.label}</span>
//                     <span className={`font-bold ${section.total.value >= 0 ? section.text : "text-red-500"}`}>{fmt(section.total.value)}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : null

//       case "Sales Register": return salesReg ? (
//         <div className="flex flex-col gap-3">
//           <MonthFilterBar />
//           <div className="flex flex-wrap justify-between items-center gap-2">
//             <p className="text-sm text-gray-500">
//               {filteredSales.length} invoices
//               {monthName && <span className="ml-2 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">{monthName}</span>}
//             </p>
//             <DownloadBar
//               rows={filteredSales} csvName={`sales-FY${year}${monthName ? `-${monthName}` : ""}`}
//               xmlRoot="SalesRegister" xmlRow="Sale" pdfTitle="Sales Register" sheetName="Sales"
//               pdfCols={[
//                 { key: "srNo", label: "#" }, { key: "invoiceNumber", label: "Invoice" }, { key: "date", label: "Date" },
//                 { key: "customerName", label: "Customer" }, { key: "productName", label: "Product" },
//                 { key: "quantity", label: "Qty" }, { key: "unitPrice", label: "Price" },
//                 { key: "taxableValue", label: "Taxable" }, { key: "cgst", label: "CGST" }, { key: "sgst", label: "SGST" },
//                 { key: "totalTax", label: "Tax" }, { key: "invoiceTotal", label: "Total" }, { key: "paymentStatus", label: "Status" },
//               ]}
//             />
//           </div>
//           <ScrollTable>
//             <thead>
//               <tr>
//                 <TH>#</TH><TH>Invoice</TH><TH>Date</TH><TH>Customer</TH><TH>GSTIN</TH>
//                 <TH>Product</TH><TH right>Qty</TH><TH right>Price</TH><TH right>Taxable</TH>
//                 <TH right>CGST</TH><TH right>SGST</TH><TH right>IGST</TH>
//                 <TH right>Tax</TH><TH right>Total</TH><TH>Status</TH><TH>Mode</TH>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredSales.map(r => (
//                 <tr key={r.srNo} className="hover:bg-gray-50">
//                   <TD>{r.srNo}</TD>
//                   <TD><span className="font-mono text-blue-600">{r.invoiceNumber}</span></TD>
//                   <TD>{fmtDate(r.date)}</TD><TD bold>{r.customerName}</TD>
//                   <TD><span className="text-gray-400 font-mono text-[10px]">{r.customerGSTIN}</span></TD>
//                   <TD>{r.productName}</TD><TD right>{r.quantity}</TD><TD right>{fmt(r.unitPrice)}</TD>
//                   <TD right>{fmt(r.taxableValue)}</TD><TD right>{fmt(r.cgst)}</TD>
//                   <TD right>{fmt(r.sgst)}</TD><TD right>{fmt(r.igst)}</TD>
//                   <TD right bold>{fmt(r.totalTax)}</TD><TD right bold green>{fmt(r.invoiceTotal)}</TD>
//                   <TD><StatusBadge status={r.paymentStatus} /></TD>
//                   <TD><span className="capitalize text-gray-500">{r.paymentMode}</span></TD>
//                 </tr>
//               ))}
//               {(() => { const t = calcSaleTotals(filteredSales); return (
//                 <tr className="bg-blue-50 border-t-2 border-blue-300">
//                   <td colSpan={8} className="px-3 py-2 text-sm font-bold text-blue-800">TOTAL — {filteredSales.length} records</td>
//                   <TD right bold>{fmt(t.taxableValue)}</TD><TD right bold>{fmt(t.cgst)}</TD>
//                   <TD right bold>{fmt(t.sgst)}</TD><TD right bold>{fmt(t.igst)}</TD>
//                   <TD right bold>{fmt(t.totalTax)}</TD><TD right bold green>{fmt(t.invoiceTotal)}</TD>
//                   <td colSpan={2} />
//                 </tr>
//               )})()}
//             </tbody>
//           </ScrollTable>
//         </div>
//       ) : null

//       case "Purchase Register": return purReg ? (
//         <div className="flex flex-col gap-3">
//           <MonthFilterBar />
//           <div className="flex flex-wrap justify-between items-center gap-2">
//             <p className="text-sm text-gray-500">
//               {filteredPurchases.length} bills
//               {monthName && <span className="ml-2 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">{monthName}</span>}
//             </p>
//             <DownloadBar
//               rows={filteredPurchases} csvName={`purchases-FY${year}${monthName ? `-${monthName}` : ""}`}
//               xmlRoot="PurchaseRegister" xmlRow="Purchase" pdfTitle="Purchase Register" sheetName="Purchases"
//               pdfCols={[
//                 { key: "srNo", label: "#" }, { key: "billNumber", label: "Bill No" }, { key: "date", label: "Date" },
//                 { key: "supplierName", label: "Supplier" }, { key: "productName", label: "Product" },
//                 { key: "quantity", label: "Qty" }, { key: "unitPrice", label: "Price" },
//                 { key: "taxableValue", label: "Taxable" }, { key: "cgst", label: "CGST" }, { key: "sgst", label: "SGST" },
//                 { key: "totalTax", label: "Tax" }, { key: "billTotal", label: "Total" }, { key: "paymentStatus", label: "Status" },
//               ]}
//             />
//           </div>
//           <ScrollTable>
//             <thead>
//               <tr>
//                 <TH>#</TH><TH>Bill No</TH><TH>Date</TH><TH>Supplier</TH><TH>GSTIN</TH>
//                 <TH>Product</TH><TH right>Qty</TH><TH right>Price</TH><TH right>Taxable</TH>
//                 <TH right>CGST</TH><TH right>SGST</TH><TH right>IGST</TH>
//                 <TH right>Tax</TH><TH right>Total</TH><TH>Status</TH>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPurchases.map(r => (
//                 <tr key={r.srNo} className="hover:bg-gray-50">
//                   <TD>{r.srNo}</TD>
//                   <TD><span className="font-mono text-blue-600">{r.billNumber}</span></TD>
//                   <TD>{fmtDate(r.date)}</TD><TD bold>{r.supplierName}</TD>
//                   <TD><span className="text-gray-400 font-mono text-[10px]">{r.supplierGSTIN}</span></TD>
//                   <TD>{r.productName}</TD><TD right>{r.quantity}</TD><TD right>{fmt(r.unitPrice)}</TD>
//                   <TD right>{fmt(r.taxableValue)}</TD><TD right>{fmt(r.cgst)}</TD>
//                   <TD right>{fmt(r.sgst)}</TD><TD right>{fmt(r.igst)}</TD>
//                   <TD right bold>{fmt(r.totalTax)}</TD><TD right bold red>{fmt(r.billTotal)}</TD>
//                   <TD><StatusBadge status={r.paymentStatus} /></TD>
//                 </tr>
//               ))}
//               {(() => { const t = calcPurTotals(filteredPurchases); return (
//                 <tr className="bg-blue-50 border-t-2 border-blue-300">
//                   <td colSpan={8} className="px-3 py-2 text-sm font-bold text-blue-800">TOTAL — {filteredPurchases.length} records</td>
//                   <TD right bold>{fmt(t.taxableValue)}</TD><TD right bold>{fmt(t.cgst)}</TD>
//                   <TD right bold>{fmt(t.sgst)}</TD><TD right bold>{fmt(t.igst)}</TD>
//                   <TD right bold>{fmt(t.totalTax)}</TD><TD right bold red>{fmt(t.billTotal)}</TD>
//                   <td />
//                 </tr>
//               )})()}
//             </tbody>
//           </ScrollTable>
//         </div>
//       ) : null

//       case "Expenses": return expRep ? (
//         <div className="flex flex-col gap-3">
//           <MonthFilterBar />
//           <div className="flex flex-wrap justify-between items-center gap-2">
//             <p className="text-sm text-gray-500">
//               {filteredExpenses.length} entries
//               {monthName && <span className="ml-2 bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">{monthName}</span>}
//             </p>
//             <DownloadBar
//               rows={filteredExpenses} csvName={`expenses-FY${year}${monthName ? `-${monthName}` : ""}`}
//               xmlRoot="Expenses" xmlRow="Expense" pdfTitle="Expense Report" sheetName="Expenses"
//               pdfCols={[
//                 { key: "srNo", label: "#" }, { key: "date", label: "Date" }, { key: "category", label: "Category" },
//                 { key: "description", label: "Description" }, { key: "vendor", label: "Vendor" },
//                 { key: "paymentMode", label: "Mode" }, { key: "amount", label: "Amount" },
//                 { key: "gstAmount", label: "GST" }, { key: "total", label: "Total" },
//               ]}
//             />
//           </div>
//           <ScrollTable>
//             <thead>
//               <tr>
//                 <TH>#</TH><TH>Date</TH><TH>Category</TH><TH>Description</TH>
//                 <TH>Vendor</TH><TH>Mode</TH><TH right>Amount</TH><TH right>GST</TH><TH right>Total</TH>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredExpenses.map(r => (
//                 <tr key={r.srNo} className="hover:bg-gray-50">
//                   <TD>{r.srNo}</TD><TD>{fmtDate(r.date)}</TD>
//                   <TD><span className="bg-orange-50 text-orange-700 text-[10px] px-2 py-0.5 rounded-full font-medium">{r.category}</span></TD>
//                   <TD>{r.description}</TD><TD>{r.vendor}</TD>
//                   <TD><span className="capitalize text-gray-500">{r.paymentMode}</span></TD>
//                   <TD right>{fmt(r.amount)}</TD><TD right>{fmt(r.gstAmount)}</TD>
//                   <TD right bold red>{fmt(r.total)}</TD>
//                 </tr>
//               ))}
//               {(() => { const t = calcExpTotals(filteredExpenses); return (
//                 <tr className="bg-blue-50 border-t-2 border-blue-300">
//                   <td colSpan={6} className="px-3 py-2 text-sm font-bold text-blue-800">TOTAL — {filteredExpenses.length} records</td>
//                   <TD right bold>{fmt(t.amount)}</TD>
//                   <TD right bold>{fmt(t.gstAmount)}</TD>
//                   <TD right bold red>{fmt(t.total)}</TD>
//                 </tr>
//               )})()}
//             </tbody>
//           </ScrollTable>
//         </div>
//       ) : null

//       case "GST Summary": return gst ? (
//         <div className="flex flex-col gap-4">
//           <div className="flex justify-end">
//             <DownloadBar
//               rows={[
//                 { Type: "Output", Description: "CGST Collected",    Amount: gst.cgstCollected },
//                 { Type: "Output", Description: "SGST Collected",    Amount: gst.sgstCollected },
//                 { Type: "Output", Description: "IGST Collected",    Amount: gst.igstCollected },
//                 { Type: "Output", Description: "Total GST Collected", Amount: gst.totalGSTCollected },
//                 { Type: "Input",  Description: "CGST Paid",         Amount: gst.cgstPaid },
//                 { Type: "Input",  Description: "SGST Paid",         Amount: gst.sgstPaid },
//                 { Type: "Input",  Description: "IGST Paid",         Amount: gst.igstPaid },
//                 { Type: "Input",  Description: "Total GST Paid",    Amount: gst.totalGSTPaid },
//                 { Type: "NET",    Description: "Net GST Payable",   Amount: gst.netGSTPayable },
//               ]}
//               csvName={`gst-summary-FY${year}`} xmlRoot="GSTSummary" xmlRow="Row"
//               pdfTitle="GST Summary" sheetName="GST"
//               pdfCols={[{ key: "Type", label: "Type" }, { key: "Description", label: "Description" }, { key: "Amount", label: "Amount (₹)" }]}
//             />
//           </div>
//           <div className="grid md:grid-cols-2 gap-6">
//             {[
//               { title: "GST Collected (Output Tax)", bg: "bg-violet-50", border: "border-violet-100", titleColor: "text-violet-800",
//                 rows: [
//                   { label: "CGST Collected", value: gst.cgstCollected, color: "text-violet-600" },
//                   { label: "SGST Collected", value: gst.sgstCollected, color: "text-violet-600" },
//                   { label: "IGST Collected", value: gst.igstCollected, color: "text-violet-600" },
//                 ],
//                 total: { label: "Total GST Collected", value: gst.totalGSTCollected, border: "border-violet-300", color: "text-violet-700 font-bold" }
//               },
//               { title: "GST Paid (Input Tax Credit)", bg: "bg-pink-50", border: "border-pink-100", titleColor: "text-pink-800",
//                 rows: [
//                   { label: "CGST Paid", value: gst.cgstPaid, color: "text-pink-600" },
//                   { label: "SGST Paid", value: gst.sgstPaid, color: "text-pink-600" },
//                   { label: "IGST Paid", value: gst.igstPaid, color: "text-pink-600" },
//                 ],
//                 total: { label: "Total GST Paid", value: gst.totalGSTPaid, border: "border-pink-300", color: "text-pink-600 font-bold" }
//               },
//             ].map(card => (
//               <div key={card.title} className="rounded-xl border bg-white shadow-sm overflow-hidden">
//                 <div className={`${card.bg} px-5 py-3 border-b ${card.border}`}>
//                   <h3 className={`font-semibold ${card.titleColor}`}>{card.title}</h3>
//                 </div>
//                 <div className="p-5">
//                   {card.rows.map((r, i) => (
//                     <div key={i} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
//                       <span className="text-gray-600">{r.label}</span>
//                       <span className={`font-medium ${r.color}`}>{fmt(r.value)}</span>
//                     </div>
//                   ))}
//                   <div className={`flex justify-between py-3 border-t-2 ${card.total.border} mt-1`}>
//                     <span className={`font-bold ${card.titleColor}`}>{card.total.label}</span>
//                     <span className={card.total.color}>{fmt(card.total.value)}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="md:col-span-2 rounded-xl border-2 bg-white shadow-sm p-5 flex items-center justify-between"
//               style={{ borderColor: gst.netGSTPayable > 0 ? "#f59e0b" : "#10b981" }}>
//               <div>
//                 <p className="text-sm text-gray-500">Net GST Payable to Government</p>
//                 <p className="text-xs text-gray-400 mt-0.5">Output Tax − Input Tax Credit</p>
//               </div>
//               <div className="text-right">
//                 <p className={`text-2xl font-bold ${gst.netGSTPayable > 0 ? "text-amber-600" : "text-emerald-600"}`}>{fmt(gst.netGSTPayable)}</p>
//                 <p className="text-xs text-gray-400 mt-0.5">{gst.netGSTPayable > 0 ? "Payable" : "Credit Available"}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : null

//       case "Outstanding": return out ? (
//         <div className="grid md:grid-cols-2 gap-6">
//           {[
//             { title: "Customer Outstanding", icon: Users, iconColor: "text-blue-500",
//               total: out.totalCustomerOutstanding, rows: out.customerOutstanding,
//               csvName: `customer-outstanding-FY${year}`,
//               xmlRoot: "CustomerOutstanding", xmlRow: "Customer",
//               pdfTitle: "Customer Outstanding", sheetName: "Customers",
//               cols: [{ key: "name", label: "Customer" }, { key: "totalInvoices", label: "Invoices" }, { key: "amountPaid", label: "Paid" }, { key: "outstanding", label: "Outstanding" }],
//               headers: ["Customer", "Invoices", "Paid", "Outstanding"],
//               keys: ["name", "totalInvoices", "amountPaid", "outstanding"] as const,
//             },
//             { title: "Supplier Outstanding", icon: Truck, iconColor: "text-orange-500",
//               total: out.totalSupplierOutstanding, rows: out.supplierOutstanding,
//               csvName: `supplier-outstanding-FY${year}`,
//               xmlRoot: "SupplierOutstanding", xmlRow: "Supplier",
//               pdfTitle: "Supplier Outstanding", sheetName: "Suppliers",
//               cols: [{ key: "name", label: "Supplier" }, { key: "totalBills", label: "Bills" }, { key: "amountPaid", label: "Paid" }, { key: "outstanding", label: "Outstanding" }],
//               headers: ["Supplier", "Bills", "Paid", "Outstanding"],
//               keys: ["name", "totalBills", "amountPaid", "outstanding"] as const,
//             },
//           ].map(section => (
//             <div key={section.title} className="flex flex-col gap-3">
//               <div className="flex items-center justify-between">
//                 <h3 className="font-semibold text-gray-800 flex items-center gap-2">
//                   <section.icon className={`size-4 ${section.iconColor}`} />{section.title}
//                 </h3>
//                 <span className="text-sm font-bold text-red-500">{fmt(section.total)}</span>
//               </div>
//               {section.rows.length === 0
//                 ? <p className="text-sm text-gray-400 text-center py-8 border rounded-lg">No outstanding dues ✅</p>
//                 : <>
//                     <DownloadBar rows={section.rows} csvName={section.csvName}
//                       xmlRoot={section.xmlRoot} xmlRow={section.xmlRow}
//                       pdfTitle={section.pdfTitle} sheetName={section.sheetName} pdfCols={section.cols} />
//                     <ScrollTable>
//                       <thead><tr>{section.headers.map(h => <TH key={h} right={h !== section.headers[0]}>{h}</TH>)}</tr></thead>
//                       <tbody>
//                         {section.rows.map((r: any, i: number) => (
//                           <tr key={i} className="hover:bg-gray-50">
//                             <TD bold>{r[section.keys[0]]}</TD>
//                             <TD right>{fmt(r[section.keys[1]])}</TD>
//                             <TD right green>{fmt(r[section.keys[2]])}</TD>
//                             <TD right bold red>{fmt(r[section.keys[3]])}</TD>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </ScrollTable>
//                   </>
//               }
//             </div>
//           ))}
//         </div>
//       ) : null

//       default: return null
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-5">

//         {/* Top Bar */}
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Financial Year Report</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Complete financial overview — Tally style</p>
//           </div>
//           <div className="flex items-center gap-2 flex-wrap">
//             <div className="relative">
//               <select value={year} onChange={e => { setYear(Number(e.target.value)); setFilterMonth(null) }}
//                 className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm font-medium text-gray-700 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
//                 {fyOptions().map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
//               </select>
//               <ChevronDown className="absolute right-2 top-2.5 size-4 text-gray-400 pointer-events-none" />
//             </div>
//             <button onClick={fetchAll} disabled={loading}
//               className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm">
//               <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
//             </button>
//             <button onClick={() => window.print()}
//               className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm">
//               <Printer className="size-4" />Print
//             </button>
//             <button onClick={downloadZIP}
//               className="flex items-center gap-1.5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
//               <Download className="size-4" />Export All
//             </button>
//           </div>
//         </div>

//         {/* FY Badge */}
//         <div className="flex items-center gap-2 text-sm flex-wrap">
//           <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-medium">
//             📅 FY {year}–{year + 1} &nbsp;|&nbsp; 1 Apr {year} → 31 Mar {year + 1}
//           </span>
//           {summary && (
//             <span className={`px-3 py-1 rounded-full font-medium border ${summary.netProfit >= 0 ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-600 border-red-200"}`}>
//               {summary.netProfit >= 0 ? "✅ Profitable" : "⚠️ Loss"} — {fmt(Math.abs(summary.netProfit))}
//             </span>
//           )}
//           {monthName && (
//             <span className="bg-blue-100 text-blue-700 border border-blue-300 px-3 py-1 rounded-full font-medium flex items-center gap-1">
//               <Filter className="size-3" />{monthName} filter active
//               <button onClick={() => setFilterMonth(null)} className="ml-1 hover:text-blue-900"><X className="size-3" /></button>
//             </span>
//           )}
//         </div>

//         {/* Tabs */}
//         <div className="flex overflow-x-auto gap-1 bg-white border border-gray-200 rounded-xl p-1 shadow-sm">
//           {TABS.map(tab => (
//             <button key={tab} onClick={() => setActiveTab(tab)}
//               className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeTab === tab ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:bg-gray-100"}`}>
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="min-h-[400px]">{renderTab()}</div>
//       </div>
//     </div>
//   )
// }


////jay

"use client"

import * as XLSX from "xlsx"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { authFetch } from "@/app/lib/authFetch"
import {
  TrendingUp, IndianRupee, ShoppingCart,
  Receipt, BarChart3, Users, Truck, Download, Printer,
  ChevronDown, RefreshCw, AlertCircle, CheckCircle2, Filter, X,
} from "lucide-react"

// ── Types (unchanged) ─────────────────────────────────────────────────────────
type Summary = {
  fy: string; totalSales: number; totalPurchases: number
  totalExpenses: number; totalGSTCollected: number; totalGSTPaid: number
  netGSTPayable: number; totalReceived: number; totalPaid: number
  grossProfit: number; netProfit: number
  salesCount: number; purchasesCount: number; expensesCount: number
}
type PL = {
  totalRevenue: number; cogs: number; grossProfit: number; grossMargin: string
  totalExpenses: number; netProfitBeforeTax: number; taxAmount: number; netProfitAfterTax: number
  expenseByCategory: Record<string, number>
}
type BalanceSheet = {
  assets: { cashInHand: number; accountsReceivable: number; inventoryValue: number; totalAssets: number }
  liabilities: { accountsPayable: number; gstPayable: number; totalLiabilities: number }
  equity: { retainedEarnings: number; ownerEquity: number }
}
type SaleRow = {
  srNo: number; invoiceNumber: string; date: string; customerName: string
  customerGSTIN: string; productName: string; quantity: number; unitPrice: number
  taxableValue: number; cgst: number; sgst: number; igst: number
  totalTax: number; invoiceTotal: number; paymentStatus: string; paymentMode: string
}
type PurchaseRow = {
  srNo: number; billNumber: string; date: string; supplierName: string
  supplierGSTIN: string; productName: string; quantity: number; unitPrice: number
  taxableValue: number; cgst: number; sgst: number; igst: number
  totalTax: number; billTotal: number; paymentStatus: string
}
type ExpenseRow = {
  srNo: number; date: string; category: string; description: string
  vendor: string; paymentMode: string; amount: number; gstAmount: number; total: number
}
type GSTSummary = {
  cgstCollected: number; sgstCollected: number; igstCollected: number; totalGSTCollected: number
  cgstPaid: number; sgstPaid: number; igstPaid: number; totalGSTPaid: number; netGSTPayable: number
}
type Outstanding = {
  customerOutstanding: { name: string; totalInvoices: number; amountPaid: number; outstanding: number }[]
  supplierOutstanding: { name: string; totalBills: number; amountPaid: number; outstanding: number }[]
  totalCustomerOutstanding: number; totalSupplierOutstanding: number
}

// ── Helpers (unchanged) ───────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0)

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

const currentFY = () => {
  const now = new Date()
  return now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1
}
const fyOptions = () => {
  const cy = currentFY()
  return [cy, cy - 1, cy - 2, cy - 3].map(y => ({ value: y, label: `FY ${y}–${y + 1}` }))
}
const FY_MONTHS = [
  { label: "April", value: 3 }, { label: "May", value: 4 }, { label: "June", value: 5 },
  { label: "July", value: 6 }, { label: "August", value: 7 }, { label: "September", value: 8 },
  { label: "October", value: 9 }, { label: "November", value: 10 }, { label: "December", value: 11 },
  { label: "January", value: 0 }, { label: "February", value: 1 }, { label: "March", value: 2 },
]
const TABS = ["Summary", "P&L", "Balance Sheet", "Sales Register", "Purchase Register", "Expenses", "GST Summary", "Outstanding"] as const
type Tab = typeof TABS[number]

// ── Animation variants ─────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const tabContent:Variants = {
  hidden: { opacity: 0, y: 10 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.18 } },
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
const PulseSkeleton = () => (
  <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} variants={fadeUp} className="h-20 rounded-sm bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
      ))}
    </div>
    <motion.div variants={fadeUp} className="h-48 rounded-sm bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
  </motion.div>
)

// ── UI atoms ──────────────────────────────────────────────────────────────────
const TH = ({ children, right }: { children: React.ReactNode; right?: boolean }) => (
  <th className={`bg-zinc-50 dark:bg-zinc-800 px-3 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider whitespace-nowrap border-b border-zinc-200 dark:border-zinc-700 ${right ? "text-right" : "text-left"}`}>
    {children}
  </th>
)
const TD = ({ children, right, bold, green, red }: any) => (
  <td className={`px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 whitespace-nowrap text-xs
    ${right ? "text-right" : "text-left"}
    ${bold   ? "font-semibold" : ""}
    ${green  ? "text-emerald-600" : red ? "text-red-500" : "text-zinc-700 dark:text-zinc-300"}`}>
    {children}
   </td>
)
const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    paid:    "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    unpaid:  "bg-red-50 text-red-600 ring-1 ring-red-200",
    partial: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  }
  return (
    <span className={`inline-block rounded-sm px-2 py-0.5 text-[10px] font-semibold capitalize ${map[status] || "bg-zinc-100 text-zinc-600"}`}>
      {status}
    </span>
  )
}
const ScrollTable = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm">
    <table className="min-w-full text-xs">{children}</table>
  </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
export default function FinancialYearPage() {
  const [year, setYear]             = useState(currentFY())
  const [activeTab, setActiveTab]   = useState<Tab>("Summary")
  const [loading, setLoading]       = useState(false)
  const [filterMonth, setFilterMonth] = useState<number | null>(null)

  const [summary,  setSummary]  = useState<Summary | null>(null)
  const [pl,       setPL]       = useState<PL | null>(null)
  const [bs,       setBS]       = useState<BalanceSheet | null>(null)
  const [salesReg, setSalesReg] = useState<{ register: SaleRow[]; totals: any } | null>(null)
  const [purReg,   setPurReg]   = useState<{ register: PurchaseRow[]; totals: any } | null>(null)
  const [expRep,   setExpRep]   = useState<{ report: ExpenseRow[]; totals: any; byCategory: any } | null>(null)
  const [gst,      setGST]      = useState<GSTSummary | null>(null)
  const [out,      setOut]      = useState<Outstanding | null>(null)

  // Add refs to prevent duplicate toast loading
  const hasLoadedRef = useRef(false)
  const currentYearRef = useRef(year)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const toastId = toast.loading(`Loading FY ${year}–${year + 1}…`)
    try {
      const q = `?year=${year}`
      const [s, p, b, sr, pr, er, g, o] = await Promise.all([
        authFetch(`/api/financialreports/financial-year-summary${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/profit-loss${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/balance-sheet${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/sales-register${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/purchase-register${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/expenses${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/gst-summary${q}`).then(r => r.json()),
        authFetch(`/api/financialreports/outstanding${q}`).then(r => r.json()),
      ])
      setSummary(s); setPL(p); setBS(b)
      setSalesReg(sr); setPurReg(pr); setExpRep(er)
      setGST(g); setOut(o)
      toast.success("Reports loaded", { id: toastId })
    } catch (e) {
      console.error(e)
      toast.error("Failed to load reports", { id: toastId })
    } finally {
      setLoading(false)
    }
  }, [year])

  useEffect(() => {
    // Only fetch if year changed or it's the initial load
    if (!hasLoadedRef.current || currentYearRef.current !== year) {
      hasLoadedRef.current = true
      currentYearRef.current = year
      fetchAll()
    }
  }, [year, fetchAll])

  // ── filter helpers (unchanged) ─────────────────────────────────────────────
  const filterByMonth = <T extends { date: string }>(rows: T[]): T[] =>
    filterMonth === null ? rows : rows.filter(r => new Date(r.date).getMonth() === filterMonth)

  const filteredSales     = salesReg ? filterByMonth(salesReg.register)  : []
  const filteredPurchases = purReg   ? filterByMonth(purReg.register)    : []
  const filteredExpenses  = expRep   ? filterByMonth(expRep.report)      : []

  const calcSaleTotals = (rows: SaleRow[]) => ({
    taxableValue: rows.reduce((s, r) => s + r.taxableValue, 0),
    cgst: rows.reduce((s, r) => s + r.cgst, 0),
    sgst: rows.reduce((s, r) => s + r.sgst, 0),
    igst: rows.reduce((s, r) => s + r.igst, 0),
    totalTax: rows.reduce((s, r) => s + r.totalTax, 0),
    invoiceTotal: rows.reduce((s, r) => s + r.invoiceTotal, 0),
  })
  const calcPurTotals = (rows: PurchaseRow[]) => ({
    taxableValue: rows.reduce((s, r) => s + r.taxableValue, 0),
    cgst: rows.reduce((s, r) => s + r.cgst, 0),
    sgst: rows.reduce((s, r) => s + r.sgst, 0),
    igst: rows.reduce((s, r) => s + r.igst, 0),
    totalTax: rows.reduce((s, r) => s + r.totalTax, 0),
    billTotal: rows.reduce((s, r) => s + r.billTotal, 0),
  })
  const calcExpTotals = (rows: ExpenseRow[]) => ({
    amount:    rows.reduce((s, r) => s + r.amount, 0),
    gstAmount: rows.reduce((s, r) => s + r.gstAmount, 0),
    total:     rows.reduce((s, r) => s + r.total, 0),
  })

  // ── download helpers (unchanged) ───────────────────────────────────────────
  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }
  const downloadCSV = (rows: any[], filename: string) => {
    if (!rows.length) { toast.error("No data to export"); return }
    const keys = Object.keys(rows[0])
    const csv = [keys.join(","), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? "")).join(","))].join("\n")
    triggerDownload(new Blob([csv], { type: "text/csv" }), filename)
    toast.success("CSV downloaded")
  }
  const downloadXML = (rows: any[], rootTag: string, rowTag: string, filename: string) => {
    if (!rows.length) { toast.error("No data to export"); return }
    const esc = (v: any) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootTag}>\n` +
      rows.map(r => `  <${rowTag}>\n` + Object.entries(r).map(([k, v]) => `    <${k}>${esc(v)}</${k}>`).join("\n") + `\n  </${rowTag}>`).join("\n") +
      `\n</${rootTag}>`
    triggerDownload(new Blob([xml], { type: "application/xml" }), filename)
    toast.success("XML downloaded")
  }
  const downloadExcel = async (rows: any[], sheetName: string, filename: string) => {
    if (!rows.length) { toast.error("No data to export"); return }
    try {
      const ws = XLSX.utils.json_to_sheet(rows)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, sheetName)
      XLSX.writeFile(wb, filename)
      toast.success("Excel downloaded")
    } catch {
      downloadCSV(rows, filename.replace(".xlsx", ".csv"))
    }
  }
  const downloadPDF = (title: string, rows: any[], columns: { key: string; label: string }[]) => {
    if (!rows.length) { toast.error("No data to export"); return }
    const monthLabel = filterMonth !== null ? ` — ${FY_MONTHS.find(m => m.value === filterMonth)?.label}` : ""
    const html = `<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      *{margin:0;padding:0;box-sizing:border-box}
      body{font-family:Arial,sans-serif;padding:32px;color:#111;font-size:12px}
      .header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
      .title{font-size:20px;font-weight:bold;color:#1d4ed8}
      .sub{font-size:11px;color:#666;margin-top:3px}
      .badge{background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;padding:3px 10px;border-radius:4px;font-size:10px;font-weight:600}
      hr{border:none;border-top:2px solid #1d4ed8;margin:12px 0 16px}
      table{width:100%;border-collapse:collapse}
      thead{background:#1d4ed8;color:white}
      th{padding:7px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.5px}
      td{padding:7px 10px;border-bottom:1px solid #f1f5f9;font-size:11px}
      tr:nth-child(even){background:#f8fafc}
      .footer{margin-top:24px;text-align:center;font-size:9px;color:#aaa}
      @media print{body{padding:16px}}
    </style></head><body>
    <div class="header">
      <div><div class="title">${title}</div><div class="sub">FY ${year}–${year + 1}${monthLabel}</div></div>
      <div class="badge">EvaLite ERP</div>
    </div><hr/>
    <table>
      <thead><tr>${columns.map(c => `<th>${c.label}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r => `<tr>${columns.map(c => `<td>${r[c.key] ?? "—"}</td>`).join("")}</tr>`).join("")}</tbody>
    </table>
    <div class="footer">Generated on ${new Date().toLocaleString("en-IN")} — EvaLite Financial Reports</div>
    </body></html>`
    const w = window.open("", "_blank")
    if (!w) { toast.error("Allow popups to export PDF"); return }
    w.document.write(html); w.document.close(); w.focus()
    setTimeout(() => { w.print(); w.close() }, 600)
  }
  const downloadZIP = async () => {
    const files: Record<string, string> = {
      "sales.json":       JSON.stringify(salesReg?.register || [], null, 2),
      "purchases.json":   JSON.stringify(purReg?.register   || [], null, 2),
      "expenses.json":    JSON.stringify(expRep?.report     || [], null, 2),
      "gst.json":         JSON.stringify(gst     || {}, null, 2),
      "outstanding.json": JSON.stringify(out     || {}, null, 2),
      "summary.json":     JSON.stringify(summary || {}, null, 2),
    }
    for (const [name, content] of Object.entries(files)) {
      triggerDownload(new Blob([content], { type: "application/json" }), name)
      await new Promise(r => setTimeout(r, 200))
    }
    toast.success("All files exported!")
  }

  // ── Download bar ───────────────────────────────────────────────────────────
  const DownloadBar = ({ rows, csvName, xmlRoot, xmlRow, pdfTitle, pdfCols, sheetName }: {
    rows: any[]; csvName: string; xmlRoot: string; xmlRow: string
    pdfTitle: string; pdfCols: { key: string; label: string }[]; sheetName: string
  }) => (
    <div className="flex flex-wrap gap-1.5">
      {[
        { label: "PDF",   color: "bg-red-500 hover:bg-red-600",         fn: () => downloadPDF(pdfTitle, rows, pdfCols) },
        { label: "Excel", color: "bg-emerald-600 hover:bg-emerald-700", fn: () => downloadExcel(rows, sheetName, `${csvName}.xlsx`) },
        { label: "CSV",   color: "bg-blue-600 hover:bg-blue-700",       fn: () => downloadCSV(rows, `${csvName}.csv`) },
        { label: "XML",   color: "bg-amber-500 hover:bg-amber-600",     fn: () => downloadXML(rows, xmlRoot, xmlRow, `${csvName}.xml`) },
      ].map(btn => (
        <motion.button key={btn.label} whileTap={{ scale: 0.94 }} onClick={btn.fn}
          className={`flex items-center gap-1 text-[10px] font-semibold text-white px-2.5 py-1.5 rounded-sm shadow-sm transition-colors ${btn.color}`}>
          <Download className="size-3" />{btn.label}
        </motion.button>
      ))}
    </div>
  )

  // ── Summary card ───────────────────────────────────────────────────────────
  const SummaryCard = ({ label, value, icon: Icon, color, sub }: any) => (
    <motion.div variants={fadeUp}
      className="rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-white dark:bg-zinc-900 p-3 flex items-start gap-3">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-sm ${color}`}>
        <Icon className="size-4 text-white" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-zinc-500 font-medium truncate">{label}</p>
        <p className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-0.5 tabular-nums">{fmt(value)}</p>
        {sub && <p className="text-[10px] text-zinc-400 mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  )

  // ── Month filter bar ───────────────────────────────────────────────────────
  const MonthFilterBar = () => (
    <div className="flex flex-wrap gap-1.5 items-center bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 rounded-sm p-2 shadow-sm">
      <span className="text-[10px] text-zinc-500 font-semibold px-1 flex items-center gap-1">
        <Filter className="size-3" />Month
      </span>
      {[{ label: "All", value: null as any }, ...FY_MONTHS].map(m => (
        <motion.button key={String(m.value)} whileTap={{ scale: 0.93 }}
          onClick={() => setFilterMonth(m.value === null ? null : (filterMonth === m.value ? null : m.value))}
          className={`px-2 py-1 rounded-sm text-[10px] font-semibold transition-all ${
            (m.value === null ? filterMonth === null : filterMonth === m.value)
              ? "bg-blue-600 text-white shadow-sm"
              : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}>
          {m.label === "All" ? "All" : m.label.slice(0, 3)}
        </motion.button>
      ))}
    </div>
  )

  const monthName = filterMonth !== null ? FY_MONTHS.find(m => m.value === filterMonth)?.label : null

  // ── Tab renderer ───────────────────────────────────────────────────────────
  const renderTab = () => {
    if (loading) return <PulseSkeleton />

    switch (activeTab) {

      // ── SUMMARY ────────────────────────────────────────────────────────────
      case "Summary": return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SummaryCard label="Total Sales"     value={summary?.totalSales}        icon={TrendingUp}   color="bg-emerald-500"  sub={`${summary?.salesCount} invoices`} />
            <SummaryCard label="Total Purchases" value={summary?.totalPurchases}    icon={ShoppingCart} color="bg-blue-500"     sub={`${summary?.purchasesCount} bills`} />
            <SummaryCard label="Total Expenses"  value={summary?.totalExpenses}     icon={Receipt}      color="bg-orange-500"   sub={`${summary?.expensesCount} entries`} />
            <SummaryCard label="Net Profit/Loss" value={summary?.netProfit}         icon={BarChart3}    color={(summary?.netProfit as number) >= 0 ? "bg-teal-600" : "bg-red-500"} />
            <SummaryCard label="GST Collected"   value={summary?.totalGSTCollected} icon={IndianRupee}  color="bg-violet-500" />
            <SummaryCard label="GST Paid"        value={summary?.totalGSTPaid}      icon={IndianRupee}  color="bg-pink-500" />
            <SummaryCard label="Net GST Payable" value={summary?.netGSTPayable}     icon={AlertCircle}  color="bg-amber-500" />
            <SummaryCard label="Amount Received" value={summary?.totalReceived}     icon={CheckCircle2} color="bg-sky-500" />
          </div>

          {summary && (
            <motion.div variants={fadeUp}
              className="rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-white dark:bg-zinc-900 p-3">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                <div>
                  <p className="text-sm font-bold text-zinc-800 dark:text-zinc-100">Financial Overview — FY {year}–{year + 1}</p>
                </div>
                <DownloadBar
                  rows={[summary]} csvName={`summary-FY${year}`} xmlRoot="Summary" xmlRow="Data"
                  pdfTitle="Financial Summary" sheetName="Summary"
                  pdfCols={[
                    { key: "fy", label: "FY" }, { key: "totalSales", label: "Sales" },
                    { key: "totalPurchases", label: "Purchases" }, { key: "totalExpenses", label: "Expenses" },
                    { key: "netProfit", label: "Net Profit" }, { key: "totalGSTCollected", label: "GST Collected" },
                    { key: "netGSTPayable", label: "Net GST" },
                  ]}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Total Revenue", value: summary.totalSales,                                         bg: "bg-emerald-50 dark:bg-emerald-900/20", val: "text-emerald-600" },
                  { label: "Total Cost",    value: summary.totalPurchases + summary.totalExpenses,             bg: "bg-red-50 dark:bg-red-900/20",         val: "text-red-500" },
                  { label: (summary.netProfit as number) >= 0 ? "Net Profit" : "Net Loss", value: Math.abs(summary.netProfit),
                    bg: (summary.netProfit as number) >= 0 ? "bg-teal-50 dark:bg-teal-900/20" : "bg-red-50 dark:bg-red-900/20",
                    val: (summary.netProfit as number) >= 0 ? "text-teal-600" : "text-red-500" },
                ].map((c, i) => (
                  <div key={i} className={`rounded-sm p-3 ${c.bg}`}>
                    <p className="text-[10px] text-zinc-500 font-medium">{c.label}</p>
                    <p className={`text-xl font-bold mt-1 tabular-nums ${c.val}`}>{fmt(c.value)}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                  <span>Profit margin</span>
                  <span>Cost ratio: {summary.totalSales > 0 ? (((summary.totalPurchases + summary.totalExpenses) / summary.totalSales) * 100).toFixed(1) : 0}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(0, summary.totalSales > 0 ? (summary.netProfit / summary.totalSales) * 100 : 0))}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )

      // ── P&L ───────────────────────────────────────────────────────────────
      case "P&L": return pl ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-3">
          <motion.div variants={fadeUp}
            className="rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-2 bg-zinc-50 dark:bg-zinc-800/50">
              <div>
                <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Profit & Loss Statement</p>
                <p className="text-[10px] text-zinc-400">1 Apr {year} — 31 Mar {year + 1}</p>
              </div>
              <DownloadBar
                rows={[{ "Total Revenue": pl.totalRevenue, "COGS": pl.cogs, "Gross Profit": pl.grossProfit,
                  "Gross Margin %": pl.grossMargin, "Total Expenses": pl.totalExpenses,
                  "Net Before Tax": pl.netProfitBeforeTax, "Tax (30%)": pl.taxAmount, "Net After Tax": pl.netProfitAfterTax }]}
                csvName={`pl-FY${year}`} xmlRoot="ProfitLoss" xmlRow="Row"
                pdfTitle="Profit & Loss Statement" sheetName="P&L"
                pdfCols={[
                  { key: "Total Revenue", label: "Total Revenue" }, { key: "COGS", label: "COGS" },
                  { key: "Gross Profit", label: "Gross Profit" }, { key: "Total Expenses", label: "Expenses" },
                  { key: "Net Before Tax", label: "Net Before Tax" }, { key: "Net After Tax", label: "Net After Tax" }
                ]}
              />
            </div>
            <div className="p-3 flex flex-col gap-0">
              {([
                { label: "Total Revenue",           value: pl.totalRevenue,        green: true },
                { label: "Cost of Goods Sold",      value: pl.cogs,                indent: true, red: true },
                { label: "Gross Profit",            value: pl.grossProfit,         bold: true, border: true },
                { label: "Gross Margin",            value: null,                   indent: true, note: `${pl.grossMargin}%` },
                { label: "Total Operating Expenses",value: pl.totalExpenses,       indent: true, red: true },
                { label: "Net Profit Before Tax",   value: pl.netProfitBeforeTax,  bold: true, border: true },
                { label: "Estimated Tax (30%)",     value: pl.taxAmount,           indent: true, red: true },
                { label: "Net Profit After Tax",    value: pl.netProfitAfterTax,   bold: true, big: true, border: true },
              ] as any[]).map((row, i) => (
                <div key={i} className={`flex justify-between items-center py-2 ${row.border ? "border-t-2 border-zinc-200 dark:border-zinc-700 mt-1" : "border-b border-zinc-50 dark:border-zinc-800/50"}`}>
                  <span className={`text-xs ${row.indent ? "pl-4 text-zinc-400" : "text-zinc-700 dark:text-zinc-300"} ${row.bold ? "font-bold" : ""}`}>{row.label}</span>
                  {row.note
                    ? <span className="text-xs text-blue-500 font-semibold">{row.note}</span>
                    : <span className={`text-xs font-medium tabular-nums
                        ${row.green ? "text-emerald-600" : row.red ? "text-red-500"
                          : row.big ? (row.value >= 0 ? "text-teal-600" : "text-red-500") : "text-zinc-800 dark:text-zinc-200"}
                        ${row.bold ? "font-bold" : ""}`}>
                        {fmt(row.value)}
                      </span>
                  }
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}
            className="rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
            <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-100">Expense by Category</p>
            </div>
            <div className="p-3">
              {Object.entries(pl.expenseByCategory).length === 0
                ? <p className="text-xs text-zinc-400 text-center py-8">No expense data</p>
                : Object.entries(pl.expenseByCategory).sort((a, b) => b[1] - a[1]).map(([cat, amt]) => (
                  <div key={cat} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-600 dark:text-zinc-300">{cat}</span>
                      <span className="font-semibold tabular-nums">{fmt(amt)}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <motion.div
                        className="h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-red-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${pl.totalExpenses > 0 ? (amt / pl.totalExpenses) * 100 : 0}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </motion.div>
        </motion.div>
      ) : null

      // ── BALANCE SHEET ─────────────────────────────────────────────────────
      case "Balance Sheet": return bs ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={fadeUp} className="flex justify-end">
            <DownloadBar
              rows={[
                { Section: "Assets",      Item: "Cash in Hand",           Amount: bs.assets.cashInHand },
                { Section: "Assets",      Item: "Accounts Receivable",    Amount: bs.assets.accountsReceivable },
                { Section: "Assets",      Item: "Inventory Value",        Amount: bs.assets.inventoryValue },
                { Section: "Assets",      Item: "TOTAL ASSETS",           Amount: bs.assets.totalAssets },
                { Section: "Liabilities", Item: "Accounts Payable",       Amount: bs.liabilities.accountsPayable },
                { Section: "Liabilities", Item: "GST Payable",            Amount: bs.liabilities.gstPayable },
                { Section: "Liabilities", Item: "TOTAL LIABILITIES",      Amount: bs.liabilities.totalLiabilities },
                { Section: "Equity",      Item: "Retained Earnings",      Amount: bs.equity.retainedEarnings },
                { Section: "Equity",      Item: "OWNER EQUITY",           Amount: bs.equity.ownerEquity },
              ]}
              csvName={`balance-sheet-FY${year}`} xmlRoot="BalanceSheet" xmlRow="Item"
              pdfTitle="Balance Sheet" sheetName="Balance Sheet"
              pdfCols={[{ key: "Section", label: "Section" }, { key: "Item", label: "Item" }, { key: "Amount", label: "Amount (₹)" }]}
            />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title: "Assets", accent: "bg-emerald-500", light: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200",
                rows: [
                  { label: "Cash in Hand",         value: bs.assets.cashInHand },
                  { label: "Accounts Receivable",  value: bs.assets.accountsReceivable },
                  { label: "Inventory Value",      value: bs.assets.inventoryValue },
                ],
                total: { label: "Total Assets", value: bs.assets.totalAssets }
              },
              { title: "Liabilities", accent: "bg-red-500", light: "bg-red-50 dark:bg-red-900/20", text: "text-red-700 dark:text-red-300", border: "border-red-200",
                rows: [
                  { label: "Accounts Payable", value: bs.liabilities.accountsPayable },
                  { label: "GST Payable",      value: bs.liabilities.gstPayable },
                ],
                total: { label: "Total Liabilities", value: bs.liabilities.totalLiabilities }
              },
              { title: "Equity", accent: "bg-blue-500", light: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200",
                rows: [{ label: "Retained Earnings", value: bs.equity.retainedEarnings }],
                total: { label: "Owner Equity", value: bs.equity.ownerEquity }
              },
            ].map(section => (
              <motion.div key={section.title} variants={fadeUp}
                className="rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
                <div className={`px-3 py-2.5 ${section.light} flex items-center gap-2`}>
                  <span className={`size-2 rounded-full ${section.accent}`} />
                  <p className={`text-xs font-bold ${section.text}`}>{section.title}</p>
                </div>
                <div className="p-3">
                  {section.rows.map((r, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-zinc-50 dark:border-zinc-800 text-xs">
                      <span className="text-zinc-500">{r.label}</span>
                      <span className="font-medium tabular-nums text-zinc-800 dark:text-zinc-200">{fmt(r.value)}</span>
                    </div>
                  ))}
                  <div className={`flex justify-between py-2.5 border-t-2 ${section.border} mt-1 text-xs`}>
                    <span className={`font-bold ${section.text}`}>{section.total.label}</span>
                    <span className={`font-bold tabular-nums ${section.text}`}>{fmt(section.total.value)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null

      // ── SALES REGISTER ────────────────────────────────────────────────────
      case "Sales Register": return salesReg ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}><MonthFilterBar /></motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-between items-center gap-2">
            <p className="text-xs text-zinc-500 font-medium">
              {filteredSales.length} invoices
              {monthName && <span className="ml-2 bg-blue-50 text-blue-600 ring-1 ring-blue-200 px-2 py-0.5 rounded-sm text-[10px] font-semibold">{monthName}</span>}
            </p>
            <DownloadBar
              rows={filteredSales} csvName={`sales-FY${year}${monthName ? `-${monthName}` : ""}`}
              xmlRoot="SalesRegister" xmlRow="Sale" pdfTitle="Sales Register" sheetName="Sales"
              pdfCols={[
                { key: "srNo", label: "#" }, { key: "invoiceNumber", label: "Invoice" }, { key: "date", label: "Date" },
                { key: "customerName", label: "Customer" }, { key: "productName", label: "Product" },
                { key: "quantity", label: "Qty" }, { key: "unitPrice", label: "Price" },
                { key: "taxableValue", label: "Taxable" }, { key: "cgst", label: "CGST" }, { key: "sgst", label: "SGST" },
                { key: "totalTax", label: "Tax" }, { key: "invoiceTotal", label: "Total" }, { key: "paymentStatus", label: "Status" },
              ]}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ScrollTable>
              <thead>
                <tr>
                  <TH>#</TH><TH>Invoice</TH><TH>Date</TH><TH>Customer</TH><TH>GSTIN</TH>
                  <TH>Product</TH><TH right>Qty</TH><TH right>Price</TH><TH right>Taxable</TH>
                  <TH right>CGST</TH><TH right>SGST</TH><TH right>IGST</TH>
                  <TH right>Tax</TH><TH right>Total</TH><TH>Status</TH><TH>Mode</TH>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map(r => (
                  <tr key={r.srNo} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <TD>{r.srNo}</TD>
                    <TD><span className="font-mono text-blue-500 text-[10px]">{r.invoiceNumber}</span></TD>
                    <TD>{fmtDate(r.date)}</TD><TD bold>{r.customerName}</TD>
                    <TD><span className="text-zinc-400 font-mono text-[10px]">{r.customerGSTIN}</span></TD>
                    <TD>{r.productName}</TD><TD right>{r.quantity}</TD><TD right>{fmt(r.unitPrice)}</TD>
                    <TD right>{fmt(r.taxableValue)}</TD><TD right>{fmt(r.cgst)}</TD>
                    <TD right>{fmt(r.sgst)}</TD><TD right>{fmt(r.igst)}</TD>
                    <TD right bold>{fmt(r.totalTax)}</TD><TD right bold green>{fmt(r.invoiceTotal)}</TD>
                    <TD><StatusBadge status={r.paymentStatus} /></TD>
                    <TD><span className="capitalize text-zinc-400">{r.paymentMode}</span></TD>
                   </tr>
                ))}
                {(() => { const t = calcSaleTotals(filteredSales); return (
                  <tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-300">
                    <td colSpan={8} className="px-3 py-2 text-xs font-bold text-blue-700">TOTAL — {filteredSales.length} records</td>
                    <TD right bold>{fmt(t.taxableValue)}</TD><TD right bold>{fmt(t.cgst)}</TD>
                    <TD right bold>{fmt(t.sgst)}</TD><TD right bold>{fmt(t.igst)}</TD>
                    <TD right bold>{fmt(t.totalTax)}</TD><TD right bold green>{fmt(t.invoiceTotal)}</TD>
                    <td colSpan={2} />
                  </tr>
                )})()}
              </tbody>
            </ScrollTable>
          </motion.div>
        </motion.div>
      ) : null

      // ── PURCHASE REGISTER ─────────────────────────────────────────────────
      case "Purchase Register": return purReg ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}><MonthFilterBar /></motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-between items-center gap-2">
            <p className="text-xs text-zinc-500 font-medium">
              {filteredPurchases.length} bills
              {monthName && <span className="ml-2 bg-blue-50 text-blue-600 ring-1 ring-blue-200 px-2 py-0.5 rounded-sm text-[10px] font-semibold">{monthName}</span>}
            </p>
            <DownloadBar
              rows={filteredPurchases} csvName={`purchases-FY${year}${monthName ? `-${monthName}` : ""}`}
              xmlRoot="PurchaseRegister" xmlRow="Purchase" pdfTitle="Purchase Register" sheetName="Purchases"
              pdfCols={[
                { key: "srNo", label: "#" }, { key: "billNumber", label: "Bill No" }, { key: "date", label: "Date" },
                { key: "supplierName", label: "Supplier" }, { key: "productName", label: "Product" },
                { key: "quantity", label: "Qty" }, { key: "unitPrice", label: "Price" },
                { key: "taxableValue", label: "Taxable" }, { key: "cgst", label: "CGST" }, { key: "sgst", label: "SGST" },
                { key: "totalTax", label: "Tax" }, { key: "billTotal", label: "Total" }, { key: "paymentStatus", label: "Status" },
              ]}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ScrollTable>
              <thead>
                <tr>
                  <TH>#</TH><TH>Bill No</TH><TH>Date</TH><TH>Supplier</TH><TH>GSTIN</TH>
                  <TH>Product</TH><TH right>Qty</TH><TH right>Price</TH><TH right>Taxable</TH>
                  <TH right>CGST</TH><TH right>SGST</TH><TH right>IGST</TH>
                  <TH right>Tax</TH><TH right>Total</TH><TH>Status</TH>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.map(r => (
                  <tr key={r.srNo} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <TD>{r.srNo}</TD>
                    <TD><span className="font-mono text-blue-500 text-[10px]">{r.billNumber}</span></TD>
                    <TD>{fmtDate(r.date)}</TD><TD bold>{r.supplierName}</TD>
                    <TD><span className="text-zinc-400 font-mono text-[10px]">{r.supplierGSTIN}</span></TD>
                    <TD>{r.productName}</TD><TD right>{r.quantity}</TD><TD right>{fmt(r.unitPrice)}</TD>
                    <TD right>{fmt(r.taxableValue)}</TD><TD right>{fmt(r.cgst)}</TD>
                    <TD right>{fmt(r.sgst)}</TD><TD right>{fmt(r.igst)}</TD>
                    <TD right bold>{fmt(r.totalTax)}</TD><TD right bold red>{fmt(r.billTotal)}</TD>
                    <TD><StatusBadge status={r.paymentStatus} /></TD>
                   </tr>
                ))}
                {(() => { const t = calcPurTotals(filteredPurchases); return (
                  <tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-300">
                    <td colSpan={8} className="px-3 py-2 text-xs font-bold text-blue-700">TOTAL — {filteredPurchases.length} records</td>
                    <TD right bold>{fmt(t.taxableValue)}</TD><TD right bold>{fmt(t.cgst)}</TD>
                    <TD right bold>{fmt(t.sgst)}</TD><TD right bold>{fmt(t.igst)}</TD>
                    <TD right bold>{fmt(t.totalTax)}</TD><TD right bold red>{fmt(t.billTotal)}</TD>
                    <td />
                  </tr>
                )})()}
              </tbody>
            </ScrollTable>
          </motion.div>
        </motion.div>
      ) : null

      // ── EXPENSES ──────────────────────────────────────────────────────────
      case "Expenses": return expRep ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={fadeUp}><MonthFilterBar /></motion.div>
          <motion.div variants={fadeUp} className="flex flex-wrap justify-between items-center gap-2">
            <p className="text-xs text-zinc-500 font-medium">
              {filteredExpenses.length} entries
              {monthName && <span className="ml-2 bg-blue-50 text-blue-600 ring-1 ring-blue-200 px-2 py-0.5 rounded-sm text-[10px] font-semibold">{monthName}</span>}
            </p>
            <DownloadBar
              rows={filteredExpenses} csvName={`expenses-FY${year}${monthName ? `-${monthName}` : ""}`}
              xmlRoot="Expenses" xmlRow="Expense" pdfTitle="Expense Report" sheetName="Expenses"
              pdfCols={[
                { key: "srNo", label: "#" }, { key: "date", label: "Date" }, { key: "category", label: "Category" },
                { key: "description", label: "Description" }, { key: "vendor", label: "Vendor" },
                { key: "paymentMode", label: "Mode" }, { key: "amount", label: "Amount" },
                { key: "gstAmount", label: "GST" }, { key: "total", label: "Total" },
              ]}
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <ScrollTable>
              <thead>
                <tr>
                  <TH>#</TH><TH>Date</TH><TH>Category</TH><TH>Description</TH>
                  <TH>Vendor</TH><TH>Mode</TH><TH right>Amount</TH><TH right>GST</TH><TH right>Total</TH>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map(r => (
                  <tr key={r.srNo} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <TD>{r.srNo}</TD><TD>{fmtDate(r.date)}</TD>
                    <TD>
                      <span className="bg-orange-50 text-orange-700 ring-1 ring-orange-200 text-[10px] px-2 py-0.5 rounded-sm font-semibold">
                        {r.category}
                      </span>
                    </TD>
                    <TD>{r.description}</TD><TD>{r.vendor}</TD>
                    <TD><span className="capitalize text-zinc-400">{r.paymentMode}</span></TD>
                    <TD right>{fmt(r.amount)}</TD><TD right>{fmt(r.gstAmount)}</TD>
                    <TD right bold red>{fmt(r.total)}</TD>
                   </tr>
                ))}
                {(() => { const t = calcExpTotals(filteredExpenses); return (
                  <tr className="bg-blue-50 dark:bg-blue-900/20 border-t-2 border-blue-300">
                    <td colSpan={6} className="px-3 py-2 text-xs font-bold text-blue-700">TOTAL — {filteredExpenses.length} records</td>
                    <TD right bold>{fmt(t.amount)}</TD>
                    <TD right bold>{fmt(t.gstAmount)}</TD>
                    <TD right bold red>{fmt(t.total)}</TD>
                   </tr>
                )})()}
              </tbody>
            </ScrollTable>
          </motion.div>
        </motion.div>
      ) : null

      // ── GST SUMMARY ───────────────────────────────────────────────────────
      case "GST Summary": return gst ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-3">
          <motion.div variants={fadeUp} className="flex justify-end">
            <DownloadBar
              rows={[
                { Type: "Output", Description: "CGST Collected",      Amount: gst.cgstCollected },
                { Type: "Output", Description: "SGST Collected",      Amount: gst.sgstCollected },
                { Type: "Output", Description: "IGST Collected",      Amount: gst.igstCollected },
                { Type: "Output", Description: "Total GST Collected", Amount: gst.totalGSTCollected },
                { Type: "Input",  Description: "CGST Paid",           Amount: gst.cgstPaid },
                { Type: "Input",  Description: "SGST Paid",           Amount: gst.sgstPaid },
                { Type: "Input",  Description: "IGST Paid",           Amount: gst.igstPaid },
                { Type: "Input",  Description: "Total GST Paid",      Amount: gst.totalGSTPaid },
                { Type: "NET",    Description: "Net GST Payable",     Amount: gst.netGSTPayable },
              ]}
              csvName={`gst-summary-FY${year}`} xmlRoot="GSTSummary" xmlRow="Row"
              pdfTitle="GST Summary" sheetName="GST"
              pdfCols={[{ key: "Type", label: "Type" }, { key: "Description", label: "Description" }, { key: "Amount", label: "Amount (₹)" }]}
            />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { title: "GST Collected (Output Tax)", light: "bg-violet-50 dark:bg-violet-900/20", text: "text-violet-700 dark:text-violet-300", accent: "bg-violet-500",
                rows: [
                  { label: "CGST Collected", value: gst.cgstCollected },
                  { label: "SGST Collected", value: gst.sgstCollected },
                  { label: "IGST Collected", value: gst.igstCollected },
                ],
                total: { label: "Total GST Collected", value: gst.totalGSTCollected, border: "border-violet-200" }
              },
              { title: "GST Paid (Input Tax Credit)", light: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-700 dark:text-pink-300", accent: "bg-pink-500",
                rows: [
                  { label: "CGST Paid", value: gst.cgstPaid },
                  { label: "SGST Paid", value: gst.sgstPaid },
                  { label: "IGST Paid", value: gst.igstPaid },
                ],
                total: { label: "Total GST Paid", value: gst.totalGSTPaid, border: "border-pink-200" }
              },
            ].map(card => (
              <motion.div key={card.title} variants={fadeUp}
                className="rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
                <div className={`px-3 py-2.5 ${card.light} flex items-center gap-2 border-b border-black/5`}>
                  <span className={`size-2 rounded-full ${card.accent}`} />
                  <p className={`text-xs font-bold ${card.text}`}>{card.title}</p>
                </div>
                <div className="p-3">
                  {card.rows.map((r, i) => (
                    <div key={i} className="flex justify-between py-2 border-b border-zinc-50 dark:border-zinc-800 text-xs">
                      <span className="text-zinc-500">{r.label}</span>
                      <span className={`font-semibold tabular-nums ${card.text}`}>{fmt(r.value)}</span>
                    </div>
                  ))}
                  <div className={`flex justify-between py-2.5 border-t-2 ${card.total.border} mt-1 text-xs`}>
                    <span className={`font-bold ${card.text}`}>{card.total.label}</span>
                    <span className={`font-bold tabular-nums ${card.text}`}>{fmt(card.total.value)}</span>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeUp}
              className="md:col-span-2 rounded-sm shadow-sm p-3 flex items-center justify-between ring-2"
              style={{
  borderColor: gst.netGSTPayable > 0 ? "#f59e0b" : "#10b981",
  border: `2px solid ${gst.netGSTPayable > 0 ? "#f59e0b" : "#10b981"}`,
  background:
    gst.netGSTPayable > 0
      ? "rgba(245,158,11,0.05)"
      : "rgba(16,185,129,0.05)"
}}>
              <div>
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Net GST Payable to Government</p>
                <p className="text-[10px] text-zinc-400 mt-0.5">Output Tax − Input Tax Credit</p>
              </div>
              <div className="text-right">
                <p className={`text-2xl font-bold tabular-nums ${gst.netGSTPayable > 0 ? "text-amber-500" : "text-emerald-500"}`}>
                  {fmt(gst.netGSTPayable)}
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">{gst.netGSTPayable > 0 ? "Payable" : "Credit Available"}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null

      // ── OUTSTANDING ───────────────────────────────────────────────────────
      case "Outstanding": return out ? (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-3">
          {[
            { title: "Customer Outstanding", icon: Users, iconColor: "text-blue-500",
              total: out.totalCustomerOutstanding, rows: out.customerOutstanding,
              csvName: `customer-outstanding-FY${year}`, xmlRoot: "CustomerOutstanding", xmlRow: "Customer",
              pdfTitle: "Customer Outstanding", sheetName: "Customers",
              cols: [{ key: "name", label: "Customer" }, { key: "totalInvoices", label: "Invoices" }, { key: "amountPaid", label: "Paid" }, { key: "outstanding", label: "Outstanding" }],
              headers: ["Customer", "Invoices", "Paid", "Outstanding"],
              keys: ["name", "totalInvoices", "amountPaid", "outstanding"] as const,
            },
            { title: "Supplier Outstanding", icon: Truck, iconColor: "text-orange-500",
              total: out.totalSupplierOutstanding, rows: out.supplierOutstanding,
              csvName: `supplier-outstanding-FY${year}`, xmlRoot: "SupplierOutstanding", xmlRow: "Supplier",
              pdfTitle: "Supplier Outstanding", sheetName: "Suppliers",
              cols: [{ key: "name", label: "Supplier" }, { key: "totalBills", label: "Bills" }, { key: "amountPaid", label: "Paid" }, { key: "outstanding", label: "Outstanding" }],
              headers: ["Supplier", "Bills", "Paid", "Outstanding"],
              keys: ["name", "totalBills", "amountPaid", "outstanding"] as const,
            },
          ].map(section => (
            <motion.div key={section.title} variants={fadeUp} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                  <section.icon className={`size-4 ${section.iconColor}`} />{section.title}
                </h3>
                <span className="text-sm font-bold text-red-500 tabular-nums">{fmt(section.total)}</span>
              </div>
              {section.rows.length === 0
                ? <p className="text-xs text-zinc-400 text-center py-8 rounded-sm ring-1 ring-black/5 dark:ring-white/10 shadow-sm">No outstanding dues ✅</p>
                : <>
                    <DownloadBar rows={section.rows} csvName={section.csvName}
                      xmlRoot={section.xmlRoot} xmlRow={section.xmlRow}
                      pdfTitle={section.pdfTitle} sheetName={section.sheetName} pdfCols={section.cols} />
                    <ScrollTable>
                      <thead><tr>{section.headers.map(h => <TH key={h} right={h !== section.headers[0]}>{h}</TH>)}</tr></thead>
                      <tbody>
                        {section.rows.map((r: any, i: number) => (
                          <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <TD bold>{r[section.keys[0]]}</TD>
                            <TD right>{fmt(r[section.keys[1]])}</TD>
                            <TD right green>{fmt(r[section.keys[2]])}</TD>
                            <TD right bold red>{fmt(r[section.keys[3]])}</TD>
                           </tr>
                        ))}
                      </tbody>
                    </ScrollTable>
                  </>
              }
            </motion.div>
          ))}
        </motion.div>
      ) : null

      default: return null
    }
  }

  // ── Page shell ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Toaster
        position="top-right"
        toastOptions={{
          style: { borderRadius: "0.25rem", fontSize: "0.8rem", fontWeight: 500, boxShadow: "0 4px 20px rgba(0,0,0,0.10)" },
        }}
      />

      <div className="max-w-screen-xl mx-auto px-4 py-5 flex flex-col gap-3">

        {/* ── Top bar ── */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">Financial Year Report</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Complete financial overview — Tally style</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* FY selector */}
            <div className="relative">
              <select value={year}
                onChange={e => { setYear(Number(e.target.value)); setFilterMonth(null) }}
                className="appearance-none bg-white dark:bg-zinc-900 ring-1 ring-black/10 dark:ring-white/10 rounded-sm pl-3 pr-7 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                {fyOptions().map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-2.5 size-3.5 text-zinc-400 pointer-events-none" />
            </div>

            {/* Refresh */}
            <motion.button whileTap={{ scale: 0.93 }} onClick={fetchAll} disabled={loading}
              className="flex items-center gap-1 bg-white dark:bg-zinc-900 ring-1 ring-black/10 dark:ring-white/10 text-zinc-600 dark:text-zinc-400 px-2.5 py-2 rounded-sm text-xs shadow-sm hover:bg-zinc-50 transition-colors">
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            </motion.button>

            {/* Print */}
            <motion.button whileTap={{ scale: 0.93 }} onClick={() => window.print()}
              className="flex items-center gap-1 bg-white dark:bg-zinc-900 ring-1 ring-black/10 dark:ring-white/10 text-zinc-600 dark:text-zinc-400 px-2.5 py-2 rounded-sm text-xs shadow-sm hover:bg-zinc-50 transition-colors">
              <Printer className="size-3.5" /><span>Print</span>
            </motion.button>

            {/* Export All */}
            <motion.button whileTap={{ scale: 0.93 }} onClick={downloadZIP}
              className="flex items-center gap-1  text-white px-3 py-2 rounded bg-amber-500 text-xs font-semibold shadow-sm transition-colors">
              <Download className="size-3.5" />Export All
            </motion.button>
          </div>
        </motion.div>

        {/* ── FY badge row ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex items-center gap-2 flex-wrap">
          <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 ring-1 ring-blue-200 dark:ring-blue-800 px-2.5 py-1 rounded-sm text-[10px] font-semibold">
            📅 FY {year}–{year + 1} &nbsp;|&nbsp; 1 Apr {year} → 31 Mar {year + 1}
          </span>
          {summary && (
            <span className={`px-2.5 py-1 rounded-sm text-[10px] font-semibold ring-1 ${
              summary.netProfit >= 0
                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 ring-emerald-200"
                : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 ring-red-200"
            }`}>
              {summary.netProfit >= 0 ? "✅ Profitable" : "⚠️ Loss"} — {fmt(Math.abs(summary.netProfit))}
            </span>
          )}
          {monthName && (
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 ring-1 ring-blue-300 px-2.5 py-1 rounded-sm text-[10px] font-semibold flex items-center gap-1">
              <Filter className="size-3" />{monthName} filter active
              <button onClick={() => setFilterMonth(null)} className="ml-1 hover:opacity-70 transition-opacity">
                <X className="size-3" />
              </button>
            </span>
          )}
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex overflow-x-auto gap-1 bg-white dark:bg-zinc-900 ring-1 ring-black/5 dark:ring-white/10 rounded-sm p-1 shadow-sm">
          {TABS.map(tab => (
            <motion.button key={tab} whileTap={{ scale: 0.94 }} onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-3 py-1.5 rounded-sm text-[11px] font-semibold transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-400"
              }`}>
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Tab content ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={tabContent} initial="hidden" animate="show" exit="exit"
            className="min-h-[400px]">
            {renderTab()}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}