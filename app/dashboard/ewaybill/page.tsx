// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { authFetch } from "@/app/lib/authFetch"
// import {
//   Plus, FileText, Download, Truck, CheckCircle2, Clock,
//   AlertCircle, XCircle, ChevronDown, RefreshCw, X, Eye,
//   Link2, Edit2, Trash2, Key, ArrowRight, Copy, Check
// } from "lucide-react"

// // ─── Types ────────────────────────────────────────────────
// type EWayBill = {
//   _id: string
//   invoiceNumber?: string
//   docNumber: string
//   docDate: string
//   fromTradeName: string
//   toTradeName: string
//   totalValue: number
//   status: "draft" | "ready" | "submitted" | "active" | "cancelled"
//   ebn: string
//   validUpto?: string
//   transportMode: string
//   vehicleNumber: string
//   distance: number
//   createdAt: string
// }

// type Sale = {
//   _id: string
//   invoiceNumber: string
//   customerName: string
//   totalAmount: number
//   createdAt: string
//   cgst?: number
//   sgst?: number
//   igst?: number
//   customerGSTIN?: string
//   items?: any[]
// }

// type Item = {
//   productName: string; hsnCode: string; quantity: number; unit: string
//   taxableValue: number; cgstRate: number; sgstRate: number; igstRate: number; cessRate: number
// }

// const BLANK_FORM = {
//   invoiceId: "", invoiceNumber: "",
//   supplyType: "O", subSupplyType: "1", docType: "INV",
//   docNumber: "", docDate: "",
//   fromGSTIN: "", fromTradeName: "", fromAddress1: "", fromAddress2: "", fromPincode: "", fromStateCode: "",
//   toGSTIN: "", toTradeName: "", toAddress1: "", toAddress2: "", toPincode: "", toStateCode: "",
//   transporterName: "", transporterId: "", transportMode: "1",
//   vehicleType: "R", vehicleNumber: "", distance: "",
//   items: [] as Item[],
// }

// const BLANK_ITEM: Item = {
//   productName: "", hsnCode: "", quantity: 1, unit: "NOS",
//   taxableValue: 0, cgstRate: 9, sgstRate: 9, igstRate: 0, cessRate: 0,
// }

// const STATE_CODES: Record<string, string> = {
//   "1": "Jammu & Kashmir", "2": "Himachal Pradesh", "3": "Punjab", "4": "Chandigarh",
//   "5": "Uttarakhand", "6": "Haryana", "7": "Delhi", "8": "Rajasthan",
//   "9": "Uttar Pradesh", "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh",
//   "13": "Nagaland", "14": "Manipur", "15": "Mizoram", "16": "Tripura",
//   "17": "Meghalaya", "18": "Assam", "19": "West Bengal", "20": "Jharkhand",
//   "21": "Odisha", "22": "Chhattisgarh", "23": "Madhya Pradesh", "24": "Gujarat",
//   "26": "Dadra & Nagar Haveli", "27": "Maharashtra", "28": "Andhra Pradesh",
//   "29": "Karnataka", "30": "Goa", "31": "Lakshadweep", "32": "Kerala",
//   "33": "Tamil Nadu", "34": "Puducherry", "35": "Andaman & Nicobar",
//   "36": "Telangana", "37": "Andhra Pradesh (New)",
// }

// const TRANSPORT_MODES: Record<string, string> = {
//   "1": "Road", "2": "Rail", "3": "Air", "4": "Ship"
// }

// const SUPPLY_TYPES: Record<string, string> = {
//   "O": "Outward", "I": "Inward"
// }

// const SUB_SUPPLY_TYPES: Record<string, string> = {
//   "1": "Supply", "2": "Import", "3": "Export", "4": "Job Work",
//   "5": "For Own Use", "6": "Job Work Returns", "7": "Sales Return",
//   "8": "Others", "9": "SKD/CKD", "10": "Line Sales",
//   "11": "Recipient Not Known", "12": "Exhibition or Fairs",
// }

// const fmt = (n: number) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0)

// // ─── Status Badge ─────────────────────────────────────────
// const StatusBadge = ({ status }: { status: string }) => {
//   const map: Record<string, { color: string; icon: any; label: string }> = {
//     draft:     { color: "bg-gray-100 text-gray-600",    icon: Clock,        label: "Draft" },
//     ready:     { color: "bg-blue-100 text-blue-700",    icon: FileText,     label: "Ready" },
//     submitted: { color: "bg-yellow-100 text-yellow-700",icon: ArrowRight,   label: "Submitted" },
//     active:    { color: "bg-green-100 text-green-700",  icon: CheckCircle2, label: "Active" },
//     cancelled: { color: "bg-red-100 text-red-600",      icon: XCircle,      label: "Cancelled" },
//   }
//   const s = map[status] || map.draft
//   return (
//     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${s.color}`}>
//       <s.icon className="size-3" />{s.label}
//     </span>
//   )
// }

// // ─── Main Component ───────────────────────────────────────
// export default function EWayBillPage() {
//   const [bills,   setBills]   = useState<EWayBill[]>([])
//   const [sales,   setSales]   = useState<Sale[]>([])
//   const [loading, setLoading] = useState(false)
//   const [view,    setView]    = useState<"list" | "form" | "detail">("list")
//   const [editId,  setEditId]  = useState<string | null>(null)
//   const [detail,  setDetail]  = useState<any | null>(null)
//   const [filterStatus, setFilterStatus] = useState("all")

//   // Form state
//   const [form,    setForm]    = useState({ ...BLANK_FORM })
//   const [saving,  setSaving]  = useState(false)
//   const [ebnInput, setEbnInput] = useState("")
//   const [validUpto, setValidUpto] = useState("")
//   const [ebnSaving, setEbnSaving] = useState(false)
//   const [copied, setCopied] = useState(false)
//   const [nicJson, setNicJson] = useState<any>(null)
//   const [jsonLoading, setJsonLoading] = useState(false)

//   // ── Fetch ────────────────────────────────────────────────
//   const fetchBills = useCallback(async () => {
//     setLoading(true)
//     try {
//       const res = await authFetch("/api/ewaybill").then(r => r.json())
//       setBills(Array.isArray(res) ? res : [])
//     } catch { setBills([]) }
//     finally { setLoading(false) }
//   }, [])

//   const fetchSales = useCallback(async () => {
//     try {
//       const res = await authFetch("/api/sales").then(r => r.json())
//       setSales(Array.isArray(res) ? res : [])
//     } catch { setSales([]) }
//   }, [])

//   useEffect(() => { fetchBills(); fetchSales() }, [fetchBills, fetchSales])

//   // ── Auto-fill from invoice ───────────────────────────────
//   const handleInvoiceSelect = (invoiceId: string) => {
//     const sale = sales.find(s => s._id === invoiceId)
//     if (!sale) { setForm(f => ({ ...f, invoiceId: "" })); return }

//     const date = new Date(sale.createdAt)
//     const docDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`

//     // Build items from sale items or create one summary item
//     const autoItems: Item[] = sale.items?.length
//       ? sale.items.map((it: any) => ({
//           productName: it.name || it.productName || "",
//           hsnCode:     it.hsnCode || "",
//           quantity:    it.quantity || 1,
//           unit:        it.unit || "NOS",
//           taxableValue:it.taxableValue || it.price * it.quantity || 0,
//           cgstRate:    it.cgstRate || 9,
//           sgstRate:    it.sgstRate || 9,
//           igstRate:    it.igstRate || 0,
//           cessRate:    0,
//         }))
//       : [{
//           ...BLANK_ITEM,
//           productName: "As per Invoice",
//           taxableValue: sale.totalAmount || 0,
//         }]

//     setForm(f => ({
//       ...f,
//       invoiceId:    invoiceId,
//       invoiceNumber: sale.invoiceNumber,
//       docNumber:    sale.invoiceNumber || invoiceId,
//       docDate:      docDate,
//       toTradeName:  sale.customerName  || "",
//       toGSTIN:      sale.customerGSTIN || "",
//       items:        autoItems,
//     }))
//   }

//   // ── Item helpers ─────────────────────────────────────────
//   const addItem = () => setForm(f => ({ ...f, items: [...f.items, { ...BLANK_ITEM }] }))
//   const removeItem = (idx: number) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }))
//   const updateItem = (idx: number, field: keyof Item, val: any) =>
//     setForm(f => ({ ...f, items: f.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }))

//   // ── Computed totals ──────────────────────────────────────
//   const totals = {
//     taxable: form.items.reduce((s, i) => s + (Number(i.taxableValue) || 0), 0),
//     cgst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.cgstRate)) / 100 || 0), 0),
//     sgst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.sgstRate)) / 100 || 0), 0),
//     igst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.igstRate)) / 100 || 0), 0),
//   }
//   const grandTotal = totals.taxable + totals.cgst + totals.sgst + totals.igst

//   // ── Save ─────────────────────────────────────────────────
//   const handleSave = async () => {
//     if (!form.docNumber) { alert("Document number is required"); return }
//     if (!form.docDate)   { alert("Document date is required");   return }
//     if (form.items.length === 0) { alert("Add at least one item"); return }

//     setSaving(true)
//     try {
//       const url    = editId ? `/api/ewaybill/${editId}` : "/api/ewaybill"
//       const method = editId ? "PUT" : "POST"
//       const res    = await authFetch(url, { method, body: JSON.stringify(form) })
//       if (res.ok) {
//         await fetchBills()
//         setView("list")
//         setEditId(null)
//         setForm({ ...BLANK_FORM })
//       } else {
//         const err = await res.json()
//         alert(err.error || "Save failed")
//       }
//     } catch { alert("Network error") }
//     finally { setSaving(false) }
//   }

//   // ── Edit ─────────────────────────────────────────────────
//   const handleEdit = async (id: string) => {
//     const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
//     setForm({
//       invoiceId:    bill.invoiceId    || "",
//       invoiceNumber:bill.invoiceNumber|| "",
//       supplyType:   bill.supplyType   || "O",
//       subSupplyType:bill.subSupplyType|| "1",
//       docType:      bill.docType      || "INV",
//       docNumber:    bill.docNumber    || "",
//       docDate:      bill.docDate      || "",
//       fromGSTIN:    bill.fromGSTIN    || "",
//       fromTradeName:bill.fromTradeName|| "",
//       fromAddress1: bill.fromAddress1 || "",
//       fromAddress2: bill.fromAddress2 || "",
//       fromPincode:  bill.fromPincode  || "",
//       fromStateCode:bill.fromStateCode|| "",
//       toGSTIN:      bill.toGSTIN      || "",
//       toTradeName:  bill.toTradeName  || "",
//       toAddress1:   bill.toAddress1   || "",
//       toAddress2:   bill.toAddress2   || "",
//       toPincode:    bill.toPincode    || "",
//       toStateCode:  bill.toStateCode  || "",
//       transporterName:bill.transporterName|| "",
//       transporterId:  bill.transporterId  || "",
//       transportMode:  bill.transportMode  || "1",
//       vehicleType:    bill.vehicleType    || "R",
//       vehicleNumber:  bill.vehicleNumber  || "",
//       distance:       bill.distance?.toString() || "",
//       items: bill.items || [],
//     })
//     setEditId(id)
//     setView("form")
//   }

//   // ── Delete ───────────────────────────────────────────────
//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this E-Way Bill?")) return
//     const res = await authFetch(`/api/ewaybill/${id}`, { method: "DELETE" })
//     if (res.ok) fetchBills()
//     else { const e = await res.json(); alert(e.error) }
//   }

//   // ── View Detail ──────────────────────────────────────────
//   const handleView = async (id: string) => {
//     const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
//      bill._id = bill._id?.toString() || id
//     setDetail(bill)
//     setEbnInput(bill.ebn || "")
//     setValidUpto(bill.validUpto ? new Date(bill.validUpto).toISOString().split("T")[0] : "")
//     setNicJson(null)
//     setView("detail")
//   }

//   // ── Generate NIC JSON ────────────────────────────────────
//   const handleGenerateJson = async (id: string) => {
//     setJsonLoading(true)
//     try {
//       const res = await authFetch(`/api/ewaybill/generate-json/${id}`).then(r => r.json())
//       setNicJson(res.nicJson)
//       // Also refresh detail
//       const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
//       setDetail(bill)
//     } catch { alert("Failed to generate JSON") }
//     finally { setJsonLoading(false) }
//   }

//   // ── Download NIC JSON ────────────────────────────────────
//   const handleDownloadJson = () => {
//     if (!nicJson) return
//     const blob = new Blob([JSON.stringify(nicJson, null, 2)], { type: "application/json" })
//     const url  = URL.createObjectURL(blob)
//     const a    = document.createElement("a")
//     a.href     = url
//     a.download = `ewaybill-${detail?.docNumber || "export"}.json`
//     a.click()
//     URL.revokeObjectURL(url)
//   }

//   // ── Copy JSON ────────────────────────────────────────────
//   const handleCopyJson = () => {
//     if (!nicJson) return
//     navigator.clipboard.writeText(JSON.stringify(nicJson, null, 2))
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   // ── Save EBN ─────────────────────────────────────────────
//   const handleSaveEbn = async () => {
//     if (!ebnInput || !/^\d{12}$/.test(ebnInput)) {
//       alert("EBN must be exactly 12 digits")
//       return
//     }
//     setEbnSaving(true)
//     try {
//       const res = await authFetch(`/api/ewaybill/update-ebn/${detail._id}`, {
//         method: "POST",
//         body: JSON.stringify({ ebn: ebnInput, validUpto }),
//       })
//       if (res.ok) {
//         const updated = await res.json()
//         setDetail(updated)
//         fetchBills()
//         alert("EBN saved successfully! E-Way Bill is now Active ✅")
//       } else {
//         const e = await res.json()
//         alert(e.error)
//       }
//     } catch { alert("Network error") }
//     finally { setEbnSaving(false) }
//   }

//   // ── Filtered bills ───────────────────────────────────────
//   const filteredBills = filterStatus === "all"
//     ? bills
//     : bills.filter(b => b.status === filterStatus)

//   // ── Field component ──────────────────────────────────────
//   const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
//     <div className="flex flex-col gap-1">
//       <label className="text-xs font-medium text-gray-600">
//         {label}{required && <span className="text-red-500 ml-0.5">*</span>}
//       </label>
//       {children}
//     </div>
//   )

//   const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
//     <input {...props} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
//   )

//   const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
//     <select {...props} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" />
//   )

//   const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
//     <div className="col-span-full mt-2">
//       <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">{children}</h3>
//       {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
//       <hr className="mt-2 border-gray-200" />
//     </div>
//   )

//   // ════════════════════════════════════════════════════════
//   // ── DETAIL VIEW ─────────────────────────────────────────
//   // ════════════════════════════════════════════════════════
//   if (view === "detail" && detail) return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setView("list")} className="text-gray-400 hover:text-gray-600"><X className="size-5" /></button>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">E-Way Bill — {detail.docNumber}</h1>
//               <p className="text-xs text-gray-500 mt-0.5">Created {new Date(detail.createdAt).toLocaleDateString("en-IN")}</p>
//             </div>
//           </div>
//           <StatusBadge status={detail.status} />
//         </div>

//         {/* EBN Card — if active */}
//         {detail.status === "active" && detail.ebn && (
//           <div className="rounded-xl bg-green-50 border-2 border-green-300 p-5 flex items-center justify-between">
//             <div>
//               <p className="text-xs text-green-600 font-medium">E-Way Bill Number (EBN)</p>
//               <p className="text-3xl font-bold text-green-700 tracking-widest mt-1">{detail.ebn}</p>
//               {detail.validUpto && (
//                 <p className="text-xs text-green-600 mt-1">Valid upto: {new Date(detail.validUpto).toLocaleDateString("en-IN")}</p>
//               )}
//             </div>
//             <CheckCircle2 className="size-12 text-green-400" />
//           </div>
//         )}

//         {/* Details Grid */}
//         <div className="grid md:grid-cols-2 gap-4">
//           {/* Transaction */}
//           <div className="rounded-xl border bg-white p-4 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//               <FileText className="size-4 text-blue-500" />Transaction Details
//             </h3>
//             {[
//               { label: "Supply Type",     value: SUPPLY_TYPES[detail.supplyType] || detail.supplyType },
//               { label: "Sub Supply Type", value: SUB_SUPPLY_TYPES[detail.subSupplyType] || detail.subSupplyType },
//               { label: "Doc Type",        value: detail.docType },
//               { label: "Doc Number",      value: detail.docNumber },
//               { label: "Doc Date",        value: detail.docDate },
//               { label: "Invoice",         value: detail.invoiceNumber || "—" },
//             ].map((r, i) => (
//               <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                 <span className="text-gray-500">{r.label}</span>
//                 <span className="font-medium text-gray-800">{r.value}</span>
//               </div>
//             ))}
//           </div>

//           {/* Transport */}
//           <div className="rounded-xl border bg-white p-4 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//               <Truck className="size-4 text-orange-500" />Transport Details
//             </h3>
//             {[
//               { label: "Mode",        value: TRANSPORT_MODES[detail.transportMode] || detail.transportMode },
//               { label: "Vehicle No",  value: detail.vehicleNumber || "—" },
//               { label: "Transporter", value: detail.transporterName || "—" },
//               { label: "Distance",    value: `${detail.distance} KM` },
//             ].map((r, i) => (
//               <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                 <span className="text-gray-500">{r.label}</span>
//                 <span className="font-medium text-gray-800">{r.value}</span>
//               </div>
//             ))}
//           </div>

//           {/* From */}
//           <div className="rounded-xl border bg-white p-4 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-800 mb-3">📤 From (Consignor)</h3>
//             {[
//               { label: "Name",    value: detail.fromTradeName || "—" },
//               { label: "GSTIN",   value: detail.fromGSTIN     || "—" },
//               { label: "Address", value: [detail.fromAddress1, detail.fromAddress2].filter(Boolean).join(", ") || "—" },
//               { label: "Pincode", value: detail.fromPincode   || "—" },
//               { label: "State",   value: STATE_CODES[detail.fromStateCode] || detail.fromStateCode || "—" },
//             ].map((r, i) => (
//               <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                 <span className="text-gray-500">{r.label}</span>
//                 <span className="font-medium text-gray-800 text-right max-w-[55%]">{r.value}</span>
//               </div>
//             ))}
//           </div>

//           {/* To */}
//           <div className="rounded-xl border bg-white p-4 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-800 mb-3">📥 To (Consignee)</h3>
//             {[
//               { label: "Name",    value: detail.toTradeName || "—" },
//               { label: "GSTIN",   value: detail.toGSTIN     || "—" },
//               { label: "Address", value: [detail.toAddress1, detail.toAddress2].filter(Boolean).join(", ") || "—" },
//               { label: "Pincode", value: detail.toPincode   || "—" },
//               { label: "State",   value: STATE_CODES[detail.toStateCode] || detail.toStateCode || "—" },
//             ].map((r, i) => (
//               <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                 <span className="text-gray-500">{r.label}</span>
//                 <span className="font-medium text-gray-800 text-right max-w-[55%]">{r.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Value Summary */}
//         <div className="rounded-xl border bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-bold text-gray-800 mb-3">💰 Value Summary</h3>
//           <div className="grid grid-cols-4 gap-3 text-center">
//             {[
//               { label: "Taxable Value", value: detail.totalValue,  color: "text-gray-800" },
//               { label: "CGST",          value: detail.cgstValue,   color: "text-blue-600" },
//               { label: "SGST",          value: detail.sgstValue,   color: "text-purple-600" },
//               { label: "IGST",          value: detail.igstValue,   color: "text-orange-600" },
//             ].map((r, i) => (
//               <div key={i} className="rounded-lg bg-gray-50 p-3">
//                 <p className="text-[10px] text-gray-500">{r.label}</p>
//                 <p className={`text-sm font-bold mt-1 ${r.color}`}>{fmt(r.value)}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-3 flex justify-end">
//             <div className="bg-blue-50 rounded-lg px-4 py-2 text-right">
//               <p className="text-xs text-gray-500">Grand Total</p>
//               <p className="text-lg font-bold text-blue-700">
//                 {fmt(detail.totalValue + detail.cgstValue + detail.sgstValue + detail.igstValue)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ── STEP 1: Generate NIC JSON ── */}
//         {detail.status !== "active" && detail.status !== "cancelled" && (
//           <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="font-bold text-blue-800 flex items-center gap-2">
//                   <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
//                   Generate NIC Format JSON
//                 </h3>
//                 <p className="text-xs text-blue-600 mt-1">
//                   Download the JSON file and upload it to <strong>ewaybillgst.gov.in</strong> to generate your EBN
//                 </p>
//               </div>
//               <button onClick={() => detail?._id && handleGenerateJson(detail._id)} disabled={jsonLoading}
//                 className="shrink-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
//                 {jsonLoading ? <RefreshCw className="size-4 animate-spin" /> : <FileText className="size-4" />}
//                 Generate JSON
//               </button>
//             </div>

//             {nicJson && (
//               <div className="mt-4">
//                 <div className="bg-white rounded-lg border border-blue-200 p-3 max-h-48 overflow-y-auto">
//                   <pre className="text-[10px] text-gray-700 whitespace-pre-wrap">{JSON.stringify(nicJson, null, 2)}</pre>
//                 </div>
//                 <div className="flex gap-2 mt-3">
//                   <button onClick={handleDownloadJson}
//                     className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
//                     <Download className="size-4" />Download JSON
//                   </button>
//                   <button onClick={handleCopyJson}
//                     className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
//                     {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
//                     {copied ? "Copied!" : "Copy JSON"}
//                   </button>
//                   <a href="https://ewaybillgst.gov.in" target="_blank" rel="noopener noreferrer"
//                     className="flex items-center gap-1.5 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
//                     <ArrowRight className="size-4" />Open NIC Portal
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── STEP 2: Enter EBN ── */}
//         {(detail.status === "ready" || detail.status === "submitted") && (
//           <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
//             <h3 className="font-bold text-green-800 flex items-center gap-2 mb-3">
//               <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
//               Enter E-Way Bill Number (EBN)
//             </h3>
//             <p className="text-xs text-green-600 mb-3">
//               After uploading JSON to NIC portal, enter the 12-digit EBN you received here.
//             </p>
//             <div className="grid md:grid-cols-3 gap-3">
//               <div className="md:col-span-2">
//                 <label className="text-xs font-medium text-gray-600 mb-1 block">EBN (12 digits) *</label>
//                 <input
//                   value={ebnInput}
//                   onChange={e => setEbnInput(e.target.value.replace(/\D/g, "").slice(0, 12))}
//                   placeholder="e.g. 231234567890"
//                   maxLength={12}
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <p className="text-[10px] text-gray-400 mt-0.5">{ebnInput.length}/12 digits</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-gray-600 mb-1 block">Valid Upto (optional)</label>
//                 <input type="date" value={validUpto} onChange={e => setValidUpto(e.target.value)}
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>
//             </div>
//             <button onClick={handleSaveEbn} disabled={ebnSaving || ebnInput.length !== 12}
//               className="mt-3 flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
//               {ebnSaving ? <RefreshCw className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
//               Save EBN & Activate
//             </button>
//           </div>
//         )}

//         {/* ── API SLOT (Future GSP Integration) ── */}
//         <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 opacity-70">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-bold text-gray-600 flex items-center gap-2">
//                 <Key className="size-4" />
//                 🔌 API Slot — GSP Integration (Coming Soon)
//               </h3>
//               <p className="text-xs text-gray-500 mt-1">
//                 Connect your GSP credentials here to auto-generate EBN without visiting NIC portal.
//                 Supports Masters India, ClearTax, Karza, and other GSPs.
//               </p>
//             </div>
//             <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Locked</span>
//           </div>
//           <div className="mt-3 grid md:grid-cols-2 gap-3 opacity-50 pointer-events-none">
//             <div>
//               <label className="text-xs font-medium text-gray-500 mb-1 block">GSP Client ID</label>
//               <input disabled placeholder="Enter GSP Client ID" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-gray-500 mb-1 block">GSP Client Secret</label>
//               <input disabled placeholder="Enter GSP Client Secret" type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" />
//             </div>
//           </div>
//           <p className="text-[10px] text-gray-400 mt-2">
//             💡 To unlock: Register with a GSP provider and add your credentials to <code className="bg-gray-200 px-1 rounded">.env.local</code>
//           </p>
//         </div>

//       </div>
//     </div>
//   )

//   // ════════════════════════════════════════════════════════
//   // ── FORM VIEW ───────────────────────────────────────────
//   // ════════════════════════════════════════════════════════
//   if (view === "form") return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => { setView("list"); setEditId(null); setForm({ ...BLANK_FORM }) }}
//               className="text-gray-400 hover:text-gray-600"><X className="size-5" /></button>
//             <h1 className="text-xl font-bold text-gray-900">{editId ? "Edit E-Way Bill" : "New E-Way Bill"}</h1>
//           </div>
//           <button onClick={handleSave} disabled={saving}
//             className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
//             {saving ? <RefreshCw className="size-4 animate-spin" /> : null}
//             {saving ? "Saving..." : "Save E-Way Bill"}
//           </button>
//         </div>

//         <div className="rounded-xl border bg-white shadow-sm p-5 flex flex-col gap-5">

//           {/* ── Link to Invoice ── */}
//           <div className="col-span-full rounded-lg bg-blue-50 border border-blue-200 p-4">
//             <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-3">
//               <Link2 className="size-4" />Link to Existing Invoice (Auto-fill)
//             </h3>
//             <div className="grid md:grid-cols-2 gap-3">
//               <Field label="Select Invoice">
//                 <Select value={form.invoiceId} onChange={e => handleInvoiceSelect(e.target.value)}>
//                   <option value="">-- Select Invoice to Auto-fill --</option>
//                   {sales.map(s => (
//                     <option key={s._id} value={s._id}>
//                       {s.invoiceNumber || s._id.slice(-6)} — {s.customerName} — {fmt(s.totalAmount)}
//                     </option>
//                   ))}
//                 </Select>
//               </Field>
//               {form.invoiceNumber && (
//                 <div className="flex items-end">
//                   <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-700 font-medium">
//                     ✅ Linked to Invoice: {form.invoiceNumber}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ── Transaction Details ── */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>📋 Transaction Details</SectionTitle>

//             <Field label="Supply Type" required>
//               <Select value={form.supplyType} onChange={e => setForm(f => ({ ...f, supplyType: e.target.value }))}>
//                 {Object.entries(SUPPLY_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//               </Select>
//             </Field>

//             <Field label="Sub Supply Type" required>
//               <Select value={form.subSupplyType} onChange={e => setForm(f => ({ ...f, subSupplyType: e.target.value }))}>
//                 {Object.entries(SUB_SUPPLY_TYPES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>

//             <Field label="Document Type" required>
//               <Select value={form.docType} onChange={e => setForm(f => ({ ...f, docType: e.target.value }))}>
//                 <option value="INV">INV — Tax Invoice</option>
//                 <option value="CHL">CHL — Delivery Challan</option>
//                 <option value="BIL">BIL — Bill of Entry</option>
//                 <option value="BOE">BOE — Bill of Exchange</option>
//                 <option value="OTH">OTH — Others</option>
//               </Select>
//             </Field>

//             <Field label="Document Number" required>
//               <Input value={form.docNumber} onChange={e => setForm(f => ({ ...f, docNumber: e.target.value }))} placeholder="INV-2024-001" />
//             </Field>

//             <Field label="Document Date" required>
//               <Input value={form.docDate} onChange={e => setForm(f => ({ ...f, docDate: e.target.value }))} placeholder="DD/MM/YYYY" />
//             </Field>
//           </div>

//           {/* ── FROM ── */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>📤 From — Consignor (Your Details)</SectionTitle>

//             <Field label="GSTIN" required>
//               <Input value={form.fromGSTIN} onChange={e => setForm(f => ({ ...f, fromGSTIN: e.target.value.toUpperCase() }))} placeholder="29ABCDE1234F1Z5" maxLength={15} />
//             </Field>
//             <Field label="Trade Name" required>
//               <Input value={form.fromTradeName} onChange={e => setForm(f => ({ ...f, fromTradeName: e.target.value }))} placeholder="Your Business Name" />
//             </Field>
//             <Field label="Address Line 1">
//               <Input value={form.fromAddress1} onChange={e => setForm(f => ({ ...f, fromAddress1: e.target.value }))} placeholder="Door No, Street" />
//             </Field>
//             <Field label="Address Line 2">
//               <Input value={form.fromAddress2} onChange={e => setForm(f => ({ ...f, fromAddress2: e.target.value }))} placeholder="Area, Landmark" />
//             </Field>
//             <Field label="Pincode">
//               <Input value={form.fromPincode} onChange={e => setForm(f => ({ ...f, fromPincode: e.target.value }))} placeholder="560001" maxLength={6} />
//             </Field>
//             <Field label="State Code">
//               <Select value={form.fromStateCode} onChange={e => setForm(f => ({ ...f, fromStateCode: e.target.value }))}>
//                 <option value="">Select State</option>
//                 {Object.entries(STATE_CODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//           </div>

//           {/* ── TO ── */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>📥 To — Consignee (Customer Details)</SectionTitle>

//             <Field label="GSTIN" required>
//               <Input value={form.toGSTIN} onChange={e => setForm(f => ({ ...f, toGSTIN: e.target.value.toUpperCase() }))} placeholder="27ABCDE1234F1Z5" maxLength={15} />
//             </Field>
//             <Field label="Trade Name" required>
//               <Input value={form.toTradeName} onChange={e => setForm(f => ({ ...f, toTradeName: e.target.value }))} placeholder="Customer Business Name" />
//             </Field>
//             <Field label="Address Line 1">
//               <Input value={form.toAddress1} onChange={e => setForm(f => ({ ...f, toAddress1: e.target.value }))} placeholder="Door No, Street" />
//             </Field>
//             <Field label="Address Line 2">
//               <Input value={form.toAddress2} onChange={e => setForm(f => ({ ...f, toAddress2: e.target.value }))} placeholder="Area, Landmark" />
//             </Field>
//             <Field label="Pincode">
//               <Input value={form.toPincode} onChange={e => setForm(f => ({ ...f, toPincode: e.target.value }))} placeholder="400001" maxLength={6} />
//             </Field>
//             <Field label="State Code">
//               <Select value={form.toStateCode} onChange={e => setForm(f => ({ ...f, toStateCode: e.target.value }))}>
//                 <option value="">Select State</option>
//                 {Object.entries(STATE_CODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//           </div>

//           {/* ── ITEMS ── */}
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-bold text-gray-800">📦 Items / Goods</h3>
//               <button onClick={addItem} type="button"
//                 className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">
//                 <Plus className="size-3" />Add Item
//               </button>
//             </div>

//             {form.items.length === 0 && (
//               <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400">
//                 No items added. Click "Add Item" or link an invoice to auto-fill.
//               </div>
//             )}

//             {form.items.map((item, idx) => (
//               <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex flex-col gap-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs font-bold text-gray-600">Item #{idx + 1}</span>
//                   <button onClick={() => removeItem(idx)} type="button" className="text-red-400 hover:text-red-600">
//                     <Trash2 className="size-3.5" />
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   <Field label="Product Name">
//                     <Input value={item.productName} onChange={e => updateItem(idx, "productName", e.target.value)} placeholder="Product name" />
//                   </Field>
//                   <Field label="HSN Code">
//                     <Input value={item.hsnCode} onChange={e => updateItem(idx, "hsnCode", e.target.value)} placeholder="1234" maxLength={8} />
//                   </Field>
//                   <Field label="Quantity">
//                     <Input type="number" value={item.quantity} onChange={e => updateItem(idx, "quantity", Number(e.target.value))} min={0} />
//                   </Field>
//                   <Field label="Unit">
//                     <Select value={item.unit} onChange={e => updateItem(idx, "unit", e.target.value)}>
//                       {["NOS", "KGS", "MTR", "LTR", "BOX", "PCS", "SET", "OTH"].map(u => <option key={u}>{u}</option>)}
//                     </Select>
//                   </Field>
//                   <Field label="Taxable Value (₹)">
//                     <Input type="number" value={item.taxableValue} onChange={e => updateItem(idx, "taxableValue", Number(e.target.value))} min={0} />
//                   </Field>
//                   <Field label="CGST %">
//                     <Input type="number" value={item.cgstRate} onChange={e => updateItem(idx, "cgstRate", Number(e.target.value))} min={0} max={28} />
//                   </Field>
//                   <Field label="SGST %">
//                     <Input type="number" value={item.sgstRate} onChange={e => updateItem(idx, "sgstRate", Number(e.target.value))} min={0} max={28} />
//                   </Field>
//                   <Field label="IGST %">
//                     <Input type="number" value={item.igstRate} onChange={e => updateItem(idx, "igstRate", Number(e.target.value))} min={0} max={28} />
//                   </Field>
//                 </div>
//               </div>
//             ))}

//             {form.items.length > 0 && (
//               <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 flex justify-end gap-6 text-sm">
//                 <span className="text-gray-600">Taxable: <strong>{fmt(totals.taxable)}</strong></span>
//                 <span className="text-blue-600">CGST: <strong>{fmt(totals.cgst)}</strong></span>
//                 <span className="text-purple-600">SGST: <strong>{fmt(totals.sgst)}</strong></span>
//                 <span className="text-orange-600">IGST: <strong>{fmt(totals.igst)}</strong></span>
//                 <span className="text-gray-900 font-bold">Total: {fmt(grandTotal)}</span>
//               </div>
//             )}
//           </div>

//           {/* ── TRANSPORT ── */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>🚛 Transport Details</SectionTitle>

//             <Field label="Transport Mode" required>
//               <Select value={form.transportMode} onChange={e => setForm(f => ({ ...f, transportMode: e.target.value }))}>
//                 {Object.entries(TRANSPORT_MODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//             <Field label="Vehicle Number" required>
//               <Input value={form.vehicleNumber} onChange={e => setForm(f => ({ ...f, vehicleNumber: e.target.value.toUpperCase() }))} placeholder="KA01AB1234" />
//             </Field>
//             <Field label="Distance (KM)" required>
//               <Input type="number" value={form.distance} onChange={e => setForm(f => ({ ...f, distance: e.target.value }))} placeholder="100" min={0} />
//             </Field>
//             <Field label="Transporter Name">
//               <Input value={form.transporterName} onChange={e => setForm(f => ({ ...f, transporterName: e.target.value }))} placeholder="Transporter Co." />
//             </Field>
//             <Field label="Transporter GSTIN">
//               <Input value={form.transporterId} onChange={e => setForm(f => ({ ...f, transporterId: e.target.value.toUpperCase() }))} placeholder="29ABCDE1234F1Z5" maxLength={15} />
//             </Field>
//             <Field label="Vehicle Type">
//               <Select value={form.vehicleType} onChange={e => setForm(f => ({ ...f, vehicleType: e.target.value }))}>
//                 <option value="R">R — Regular</option>
//                 <option value="O">O — Over Dimensional Cargo</option>
//               </Select>
//             </Field>
//           </div>

//         </div>

//         {/* Save button bottom */}
//         <div className="flex justify-end gap-3">
//           <button onClick={() => { setView("list"); setEditId(null); setForm({ ...BLANK_FORM }) }}
//             className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
//             Cancel
//           </button>
//           <button onClick={handleSave} disabled={saving}
//             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
//             {saving ? <RefreshCw className="size-4 animate-spin" /> : null}
//             {saving ? "Saving..." : "Save E-Way Bill"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   // ════════════════════════════════════════════════════════
//   // ── LIST VIEW ───────────────────────────────────────────
//   // ════════════════════════════════════════════════════════
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-5">

//         {/* Top Bar */}
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">E-Way Bills</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Manage and track all your E-Way Bills</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={fetchBills} disabled={loading}
//               className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm">
//               <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
//             </button>
//             <button onClick={() => { setForm({ ...BLANK_FORM }); setEditId(null); setView("form") }}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
//               <Plus className="size-4" />New E-Way Bill
//             </button>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//           {[
//             { label: "All",       value: bills.length,                                    color: "bg-gray-100 text-gray-700",   key: "all"       },
//             { label: "Draft",     value: bills.filter(b => b.status === "draft").length,     color: "bg-gray-200 text-gray-700",   key: "draft"     },
//             { label: "Ready",     value: bills.filter(b => b.status === "ready").length,     color: "bg-blue-100 text-blue-700",   key: "ready"     },
//             { label: "Active",    value: bills.filter(b => b.status === "active").length,    color: "bg-green-100 text-green-700", key: "active"    },
//             { label: "Cancelled", value: bills.filter(b => b.status === "cancelled").length, color: "bg-red-100 text-red-600",     key: "cancelled" },
//           ].map(s => (
//             <button key={s.key} onClick={() => setFilterStatus(s.key)}
//               className={`rounded-xl p-3 text-center transition-all ${s.color} ${filterStatus === s.key ? "ring-2 ring-blue-500 ring-offset-1" : "hover:opacity-80"}`}>
//               <p className="text-xl font-bold">{s.value}</p>
//               <p className="text-xs font-medium mt-0.5">{s.label}</p>
//             </button>
//           ))}
//         </div>

//         {/* List */}
//         {loading ? (
//           <div className="flex items-center justify-center h-48 text-gray-400">
//             <RefreshCw className="size-6 animate-spin mr-2" />Loading...
//           </div>
//         ) : filteredBills.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
//             <FileText className="size-10" />
//             <p className="text-sm">No E-Way Bills found</p>
//             <button onClick={() => setView("form")}
//               className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//               <Plus className="size-3" />Create First E-Way Bill
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-2">
//             {filteredBills.map(bill => (
//               <div key={bill._id} className="rounded-xl border bg-white shadow-sm p-4 flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-4 min-w-0">
//                   <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
//                     <Truck className="size-5 text-blue-500" />
//                   </div>
//                   <div className="min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="font-bold text-sm text-gray-900">{bill.docNumber}</span>
//                       {bill.invoiceNumber && (
//                         <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
//                           INV: {bill.invoiceNumber}
//                         </span>
//                       )}
//                       <StatusBadge status={bill.status} />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-0.5 truncate">
//                       {bill.fromTradeName || "—"} → {bill.toTradeName || "—"}
//                     </p>
//                     <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
//                       <span>📅 {bill.docDate}</span>
//                       <span>🚛 {TRANSPORT_MODES[bill.transportMode]} · {bill.vehicleNumber || "—"}</span>
//                       <span>📏 {bill.distance} KM</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 shrink-0">
//                   <div className="text-right hidden md:block">
//                     <p className="text-xs text-gray-400">Total Value</p>
//                     <p className="font-bold text-sm text-gray-900">{fmt(bill.totalValue)}</p>
//                     {bill.ebn && (
//                       <p className="text-[10px] text-green-600 font-mono mt-0.5">EBN: {bill.ebn}</p>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <button onClick={() => handleView(bill._id)} title="View"
//                       className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
//                       <Eye className="size-4" />
//                     </button>
//                     {bill.status !== "active" && bill.status !== "cancelled" && (
//                       <button onClick={() => handleEdit(bill._id)} title="Edit"
//                         className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg">
//                         <Edit2 className="size-4" />
//                       </button>
//                     )}
//                     <button onClick={() => handleDelete(bill._id)} title="Delete"
//                       className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
//                       <Trash2 className="size-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Info box */}
//         <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-700">
//           <p className="font-bold mb-1">📌 How to use E-Way Bill:</p>
//           <p>1. Create new E-Way Bill (link to invoice for auto-fill) → 2. Click View → Generate JSON → 3. Upload JSON to <strong>ewaybillgst.gov.in</strong> → 4. Enter the 12-digit EBN back here → Bill becomes Active ✅</p>
//         </div>

//       </div>
//     </div>
//   )
// }








//aravind

// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { authFetch } from "@/app/lib/authFetch"
// import {
//   Plus, FileText, Download, Truck, CheckCircle2,
//   XCircle, RefreshCw, X, Eye,
//   Link2, Edit2, Trash2, Key, ArrowRight, Copy, Check
// } from "lucide-react"

// // ─── Types ────────────────────────────────────────────────
// type EWayBill = {
//   _id: string
//   invoiceNumber?: string
//   docNumber: string
//   docDate: string
//   fromTradeName: string
//   toTradeName: string
//   totalValue: number
//   status: "draft" | "ready" | "submitted" | "active" | "cancelled"
//   ebn: string
//   validUpto?: string
//   transportMode: string
//   vehicleNumber: string
//   distance: number
//   createdAt: string
// }

// type Sale = {
//   _id: string
//   invoiceNumber: string
//   customerName: string
//   totalAmount: number
//   createdAt: string
//   cgst?: number
//   sgst?: number
//   igst?: number
//   customerGSTIN?: string
//   items?: any[]
// }

// type Item = {
//   productName: string; hsnCode: string; quantity: number; unit: string
//   taxableValue: number; cgstRate: number; sgstRate: number; igstRate: number; cessRate: number
// }

// // ─── Constants ────────────────────────────────────────────
// const BLANK_FORM = {
//   invoiceId: "", invoiceNumber: "",
//   supplyType: "O", subSupplyType: "1", docType: "INV",
//   docNumber: "", docDate: "",
//   fromGSTIN: "", fromTradeName: "", fromAddress1: "", fromAddress2: "", fromPincode: "", fromStateCode: "",
//   toGSTIN: "", toTradeName: "", toAddress1: "", toAddress2: "", toPincode: "", toStateCode: "",
//   transporterName: "", transporterId: "", transportMode: "1",
//   vehicleType: "R", vehicleNumber: "", distance: "",
//   items: [] as Item[],
// }

// const BLANK_ITEM: Item = {
//   productName: "", hsnCode: "", quantity: 1, unit: "NOS",
//   taxableValue: 0, cgstRate: 9, sgstRate: 9, igstRate: 0, cessRate: 0,
// }

// const STATE_CODES: Record<string, string> = {
//   "1": "Jammu & Kashmir", "2": "Himachal Pradesh", "3": "Punjab", "4": "Chandigarh",
//   "5": "Uttarakhand", "6": "Haryana", "7": "Delhi", "8": "Rajasthan",
//   "9": "Uttar Pradesh", "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh",
//   "13": "Nagaland", "14": "Manipur", "15": "Mizoram", "16": "Tripura",
//   "17": "Meghalaya", "18": "Assam", "19": "West Bengal", "20": "Jharkhand",
//   "21": "Odisha", "22": "Chhattisgarh", "23": "Madhya Pradesh", "24": "Gujarat",
//   "26": "Dadra & Nagar Haveli", "27": "Maharashtra", "28": "Andhra Pradesh",
//   "29": "Karnataka", "30": "Goa", "31": "Lakshadweep", "32": "Kerala",
//   "33": "Tamil Nadu", "34": "Puducherry", "35": "Andaman & Nicobar",
//   "36": "Telangana", "37": "Andhra Pradesh (New)",
// }

// const TRANSPORT_MODES: Record<string, string> = {
//   "1": "Road", "2": "Rail", "3": "Air", "4": "Ship"
// }

// const SUPPLY_TYPES: Record<string, string> = {
//   "O": "Outward", "I": "Inward"
// }

// const SUB_SUPPLY_TYPES: Record<string, string> = {
//   "1": "Supply", "2": "Import", "3": "Export", "4": "Job Work",
//   "5": "For Own Use", "6": "Job Work Returns", "7": "Sales Return",
//   "8": "Others", "9": "SKD/CKD", "10": "Line Sales",
//   "11": "Recipient Not Known", "12": "Exhibition or Fairs",
// }

// const fmt = (n: number) =>
//   new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0)

// // ─────────────────────────────────────────────────────────
// // ✅ ALL UI COMPONENTS DEFINED OUTSIDE MAIN COMPONENT
// //    This is the fix for focus loss on every keystroke.
// //    When defined inside, React remounts them on every render.
// // ─────────────────────────────────────────────────────────

// const Field = ({ label, children, required }: {
//   label: string; children: React.ReactNode; required?: boolean
// }) => (
//   <div className="flex flex-col gap-1">
//     <label className="text-xs font-medium text-gray-600">
//       {label}{required && <span className="text-red-500 ml-0.5">*</span>}
//     </label>
//     {children}
//   </div>
// )

// const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
//   <input
//     {...props}
//     className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//   />
// )

// const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
//   <select
//     {...props}
//     className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//   />
// )

// const SectionTitle = ({ children, sub }: { children: React.ReactNode; sub?: string }) => (
//   <div className="col-span-full mt-2">
//     <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">{children}</h3>
//     {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
//     <hr className="mt-2 border-gray-200" />
//   </div>
// )

// const StatusBadge = ({ status }: { status: string }) => {
//   const map: Record<string, { color: string; label: string }> = {
//     draft:     { color: "bg-gray-100 text-gray-600",     label: "Draft"     },
//     ready:     { color: "bg-blue-100 text-blue-700",     label: "Ready"     },
//     submitted: { color: "bg-yellow-100 text-yellow-700", label: "Submitted" },
//     active:    { color: "bg-green-100 text-green-700",   label: "Active"    },
//     cancelled: { color: "bg-red-100 text-red-600",       label: "Cancelled" },
//   }
//   const s = map[status] || map.draft
//   return (
//     <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${s.color}`}>
//       {s.label}
//     </span>
//   )
// }

// // ─── Main Component ───────────────────────────────────────
// export default function EWayBillPage() {
//   const [bills,        setBills]        = useState<EWayBill[]>([])
//   const [sales,        setSales]        = useState<Sale[]>([])
//   const [loading,      setLoading]      = useState(false)
//   const [view,         setView]         = useState<"list" | "form" | "detail">("list")
//   const [editId,       setEditId]       = useState<string | null>(null)
//   const [detail,       setDetail]       = useState<any | null>(null)
//   const [filterStatus, setFilterStatus] = useState("all")
//   const [form,         setForm]         = useState({ ...BLANK_FORM })
//   const [saving,       setSaving]       = useState(false)
//   const [ebnInput,     setEbnInput]     = useState("")
//   const [validUpto,    setValidUpto]    = useState("")
//   const [ebnSaving,    setEbnSaving]    = useState(false)
//   const [copied,       setCopied]       = useState(false)
//   const [nicJson,      setNicJson]      = useState<any>(null)
//   const [jsonLoading,  setJsonLoading]  = useState(false)

//   // ── Fetch ────────────────────────────────────────────────
//   const fetchBills = useCallback(async () => {
//     setLoading(true)
//     try {
//       const res = await authFetch("/api/ewaybill").then(r => r.json())
//       setBills(Array.isArray(res) ? res : [])
//     } catch { setBills([]) }
//     finally { setLoading(false) }
//   }, [])

//   const fetchSales = useCallback(async () => {
//     try {
//       const res = await authFetch("/api/sales").then(r => r.json())
//       setSales(Array.isArray(res) ? res : [])
//     } catch { setSales([]) }
//   }, [])

//   useEffect(() => { fetchBills(); fetchSales() }, [fetchBills, fetchSales])

//   // ── Auto-fill from invoice ───────────────────────────────
//   const handleInvoiceSelect = (invoiceId: string) => {
//     const sale = sales.find(s => s._id === invoiceId)
//     if (!sale) { setForm(f => ({ ...f, invoiceId: "" })); return }

//     const date    = new Date(sale.createdAt)
//     const docDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`

//     const autoItems: Item[] = sale.items?.length
//       ? sale.items.map((it: any) => ({
//           productName:  it.name || it.productName || "",
//           hsnCode:      it.hsnCode    || "",
//           quantity:     it.quantity   || 1,
//           unit:         it.unit       || "NOS",
//           taxableValue: it.taxableValue || (it.price * it.quantity) || 0,
//           cgstRate:     it.cgstRate   || 9,
//           sgstRate:     it.sgstRate   || 9,
//           igstRate:     it.igstRate   || 0,
//           cessRate:     0,
//         }))
//       : [{ ...BLANK_ITEM, productName: "As per Invoice", taxableValue: sale.totalAmount || 0 }]

//     setForm(f => ({
//       ...f,
//       invoiceId:     invoiceId,
//       invoiceNumber: sale.invoiceNumber,
//       docNumber:     sale.invoiceNumber || invoiceId,
//       docDate,
//       toTradeName:   sale.customerName  || "",
//       toGSTIN:       sale.customerGSTIN || "",
//       items:         autoItems,
//     }))
//   }

//   // ── Item helpers ─────────────────────────────────────────
//   const addItem    = () => setForm(f => ({ ...f, items: [...f.items, { ...BLANK_ITEM }] }))
//   const removeItem = (idx: number) =>
//     setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }))
//   const updateItem = (idx: number, field: keyof Item, val: any) =>
//     setForm(f => ({ ...f, items: f.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }))

//   // ── Computed totals ──────────────────────────────────────
//   const totals = {
//     taxable: form.items.reduce((s, i) => s + (Number(i.taxableValue) || 0), 0),
//     cgst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.cgstRate)) / 100 || 0), 0),
//     sgst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.sgstRate)) / 100 || 0), 0),
//     igst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.igstRate)) / 100 || 0), 0),
//   }
//   const grandTotal = totals.taxable + totals.cgst + totals.sgst + totals.igst

//   // ── Save ─────────────────────────────────────────────────
//   const handleSave = async () => {
//     if (!form.docNumber)         { alert("Document number is required"); return }
//     if (!form.docDate)           { alert("Document date is required");   return }
//     if (form.items.length === 0) { alert("Add at least one item");       return }
//     setSaving(true)
//     try {
//       const url    = editId ? `/api/ewaybill/${editId}` : "/api/ewaybill"
//       const method = editId ? "PUT" : "POST"
//       const res    = await authFetch(url, { method, body: JSON.stringify(form) })
//       if (res.ok) {
//         await fetchBills()
//         setView("list"); setEditId(null); setForm({ ...BLANK_FORM })
//       } else {
//         const err = await res.json()
//         alert(err.error || "Save failed")
//       }
//     } catch { alert("Network error") }
//     finally { setSaving(false) }
//   }

//   // ── Edit ─────────────────────────────────────────────────
//   const handleEdit = async (id: string) => {
//     const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
//     setForm({
//       invoiceId:       bill.invoiceId       || "",
//       invoiceNumber:   bill.invoiceNumber   || "",
//       supplyType:      bill.supplyType      || "O",
//       subSupplyType:   bill.subSupplyType   || "1",
//       docType:         bill.docType         || "INV",
//       docNumber:       bill.docNumber       || "",
//       docDate:         bill.docDate         || "",
//       fromGSTIN:       bill.fromGSTIN       || "",
//       fromTradeName:   bill.fromTradeName   || "",
//       fromAddress1:    bill.fromAddress1    || "",
//       fromAddress2:    bill.fromAddress2    || "",
//       fromPincode:     bill.fromPincode     || "",
//       fromStateCode:   bill.fromStateCode   || "",
//       toGSTIN:         bill.toGSTIN         || "",
//       toTradeName:     bill.toTradeName     || "",
//       toAddress1:      bill.toAddress1      || "",
//       toAddress2:      bill.toAddress2      || "",
//       toPincode:       bill.toPincode       || "",
//       toStateCode:     bill.toStateCode     || "",
//       transporterName: bill.transporterName || "",
//       transporterId:   bill.transporterId   || "",
//       transportMode:   bill.transportMode   || "1",
//       vehicleType:     bill.vehicleType     || "R",
//       vehicleNumber:   bill.vehicleNumber   || "",
//       distance:        bill.distance?.toString() || "",
//       items:           bill.items           || [],
//     })
//     setEditId(id); setView("form")
//   }

//   // ── Delete ───────────────────────────────────────────────
//   const handleDelete = async (id: string) => {
//     if (!confirm("Delete this E-Way Bill?")) return
//     const res = await authFetch(`/api/ewaybill/${id}`, { method: "DELETE" })
//     if (res.ok) fetchBills()
//     else { const e = await res.json(); alert(e.error) }
//   }

//   // ── View Detail ──────────────────────────────────────────
//   const handleView = async (id: string) => {
//     const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
//     bill._id = bill._id?.toString() || id
//     setDetail(bill)
//     setEbnInput(bill.ebn || "")
//     setValidUpto(bill.validUpto ? new Date(bill.validUpto).toISOString().split("T")[0] : "")
//     setNicJson(null)
//     setView("detail")
//   }

//   // ── Generate NIC JSON ────────────────────────────────────
//   const handleGenerateJson = async (id: string) => {
//     setJsonLoading(true)
//     try {
//       const res  = await authFetch(`/api/ewaybill/generate-json/${id}`).then(r => r.json())
//       setNicJson(res.nicJson)
//       const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
//       bill._id   = bill._id?.toString() || id
//       setDetail(bill)
//     } catch { alert("Failed to generate JSON") }
//     finally { setJsonLoading(false) }
//   }

//   // ── Download JSON ────────────────────────────────────────
//   const handleDownloadJson = () => {
//     if (!nicJson) return
//     const blob = new Blob([JSON.stringify(nicJson, null, 2)], { type: "application/json" })
//     const url  = URL.createObjectURL(blob)
//     const a    = document.createElement("a")
//     a.href = url; a.download = `ewaybill-${detail?.docNumber || "export"}.json`; a.click()
//     URL.revokeObjectURL(url)
//   }

//   // ── Copy JSON ────────────────────────────────────────────
//   const handleCopyJson = () => {
//     if (!nicJson) return
//     navigator.clipboard.writeText(JSON.stringify(nicJson, null, 2))
//     setCopied(true); setTimeout(() => setCopied(false), 2000)
//   }

//   // ── Save EBN ─────────────────────────────────────────────
//   const handleSaveEbn = async () => {
//     if (!ebnInput || !/^\d{12}$/.test(ebnInput)) { alert("EBN must be exactly 12 digits"); return }
//     setEbnSaving(true)
//     try {
//       const res = await authFetch(`/api/ewaybill/update-ebn/${detail._id}`, {
//         method: "POST",
//         body: JSON.stringify({ ebn: ebnInput, validUpto }),
//       })
//       if (res.ok) {
//         const updated = await res.json()
//         setDetail(updated); fetchBills()
//         alert("EBN saved! E-Way Bill is now Active ✅")
//       } else { const e = await res.json(); alert(e.error) }
//     } catch { alert("Network error") }
//     finally { setEbnSaving(false) }
//   }

//   const filteredBills = filterStatus === "all" ? bills : bills.filter(b => b.status === filterStatus)

//   // ════════════════════════════════════════════════════════
//   // ── DETAIL VIEW ─────────────────────────────────────────
//   // ════════════════════════════════════════════════════════
//   if (view === "detail" && detail) return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => setView("list")} className="text-gray-400 hover:text-gray-600">
//               <X className="size-5" />
//             </button>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">E-Way Bill — {detail.docNumber}</h1>
//               <p className="text-xs text-gray-500 mt-0.5">Created {new Date(detail.createdAt).toLocaleDateString("en-IN")}</p>
//             </div>
//           </div>
//           <StatusBadge status={detail.status} />
//         </div>

//         {detail.status === "active" && detail.ebn && (
//           <div className="rounded-xl bg-green-50 border-2 border-green-300 p-5 flex items-center justify-between">
//             <div>
//               <p className="text-xs text-green-600 font-medium">E-Way Bill Number (EBN)</p>
//               <p className="text-3xl font-bold text-green-700 tracking-widest mt-1">{detail.ebn}</p>
//               {detail.validUpto && (
//                 <p className="text-xs text-green-600 mt-1">Valid upto: {new Date(detail.validUpto).toLocaleDateString("en-IN")}</p>
//               )}
//             </div>
//             <CheckCircle2 className="size-12 text-green-400" />
//           </div>
//         )}

//         <div className="grid md:grid-cols-2 gap-4">
//           <div className="rounded-xl border bg-white p-4 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//               <FileText className="size-4 text-blue-500" />Transaction Details
//             </h3>
//             {[
//               { label: "Supply Type",     value: SUPPLY_TYPES[detail.supplyType] || detail.supplyType },
//               { label: "Sub Supply Type", value: SUB_SUPPLY_TYPES[detail.subSupplyType] || detail.subSupplyType },
//               { label: "Doc Type",        value: detail.docType },
//               { label: "Doc Number",      value: detail.docNumber },
//               { label: "Doc Date",        value: detail.docDate },
//               { label: "Invoice",         value: detail.invoiceNumber || "—" },
//             ].map((r, i) => (
//               <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                 <span className="text-gray-500">{r.label}</span>
//                 <span className="font-medium text-gray-800">{r.value}</span>
//               </div>
//             ))}
//           </div>

//           <div className="rounded-xl border bg-white p-4 shadow-sm">
//             <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//               <Truck className="size-4 text-orange-500" />Transport Details
//             </h3>
//             {[
//               { label: "Mode",        value: TRANSPORT_MODES[detail.transportMode] || detail.transportMode },
//               { label: "Vehicle No",  value: detail.vehicleNumber   || "—" },
//               { label: "Transporter", value: detail.transporterName || "—" },
//               { label: "Distance",    value: `${detail.distance} KM` },
//             ].map((r, i) => (
//               <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                 <span className="text-gray-500">{r.label}</span>
//                 <span className="font-medium text-gray-800">{r.value}</span>
//               </div>
//             ))}
//           </div>

//           {[
//             { title: "📤 From (Consignor)", rows: [
//               { label: "Name",    value: detail.fromTradeName || "—" },
//               { label: "GSTIN",   value: detail.fromGSTIN     || "—" },
//               { label: "Address", value: [detail.fromAddress1, detail.fromAddress2].filter(Boolean).join(", ") || "—" },
//               { label: "Pincode", value: detail.fromPincode   || "—" },
//               { label: "State",   value: STATE_CODES[detail.fromStateCode] || detail.fromStateCode || "—" },
//             ]},
//             { title: "📥 To (Consignee)", rows: [
//               { label: "Name",    value: detail.toTradeName || "—" },
//               { label: "GSTIN",   value: detail.toGSTIN     || "—" },
//               { label: "Address", value: [detail.toAddress1, detail.toAddress2].filter(Boolean).join(", ") || "—" },
//               { label: "Pincode", value: detail.toPincode   || "—" },
//               { label: "State",   value: STATE_CODES[detail.toStateCode] || detail.toStateCode || "—" },
//             ]},
//           ].map(card => (
//             <div key={card.title} className="rounded-xl border bg-white p-4 shadow-sm">
//               <h3 className="text-sm font-bold text-gray-800 mb-3">{card.title}</h3>
//               {card.rows.map((r, i) => (
//                 <div key={i} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
//                   <span className="text-gray-500">{r.label}</span>
//                   <span className="font-medium text-gray-800 text-right max-w-[55%]">{r.value}</span>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <div className="rounded-xl border bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-bold text-gray-800 mb-3">💰 Value Summary</h3>
//           <div className="grid grid-cols-4 gap-3 text-center">
//             {[
//               { label: "Taxable Value", value: detail.totalValue, color: "text-gray-800"   },
//               { label: "CGST",          value: detail.cgstValue,  color: "text-blue-600"   },
//               { label: "SGST",          value: detail.sgstValue,  color: "text-purple-600" },
//               { label: "IGST",          value: detail.igstValue,  color: "text-orange-600" },
//             ].map((r, i) => (
//               <div key={i} className="rounded-lg bg-gray-50 p-3">
//                 <p className="text-[10px] text-gray-500">{r.label}</p>
//                 <p className={`text-sm font-bold mt-1 ${r.color}`}>{fmt(r.value)}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-3 flex justify-end">
//             <div className="bg-blue-50 rounded-lg px-4 py-2 text-right">
//               <p className="text-xs text-gray-500">Grand Total</p>
//               <p className="text-lg font-bold text-blue-700">
//                 {fmt(detail.totalValue + detail.cgstValue + detail.sgstValue + detail.igstValue)}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Step 1 — Generate JSON */}
//         {detail.status !== "active" && detail.status !== "cancelled" && (
//           <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h3 className="font-bold text-blue-800 flex items-center gap-2">
//                   <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
//                   Generate NIC Format JSON
//                 </h3>
//                 <p className="text-xs text-blue-600 mt-1">
//                   Download the JSON file and upload it to <strong>ewaybillgst.gov.in</strong> to generate your EBN
//                 </p>
//               </div>
//               <button onClick={() => detail?._id && handleGenerateJson(detail._id)} disabled={jsonLoading}
//                 className="shrink-0 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
//                 {jsonLoading ? <RefreshCw className="size-4 animate-spin" /> : <FileText className="size-4" />}
//                 Generate JSON
//               </button>
//             </div>
//             {nicJson && (
//               <div className="mt-4">
//                 <div className="bg-white rounded-lg border border-blue-200 p-3 max-h-48 overflow-y-auto">
//                   <pre className="text-[10px] text-gray-700 whitespace-pre-wrap">{JSON.stringify(nicJson, null, 2)}</pre>
//                 </div>
//                 <div className="flex gap-2 mt-3 flex-wrap">
//                   <button onClick={handleDownloadJson}
//                     className="flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
//                     <Download className="size-4" />Download JSON
//                   </button>
//                   <button onClick={handleCopyJson}
//                     className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
//                     {copied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
//                     {copied ? "Copied!" : "Copy JSON"}
//                   </button>
//                   <a href="https://ewaybillgst.gov.in" target="_blank" rel="noopener noreferrer"
//                     className="flex items-center gap-1.5 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600">
//                     <ArrowRight className="size-4" />Open NIC Portal
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Step 2 — Enter EBN */}
//         {(detail.status === "draft" || detail.status === "ready" || detail.status === "submitted") && (
//           <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
//             <h3 className="font-bold text-green-800 flex items-center gap-2 mb-3">
//               <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
//               Enter E-Way Bill Number (EBN)
//             </h3>
//             <p className="text-xs text-green-600 mb-3">
//               After uploading JSON to NIC portal, enter the 12-digit EBN you received here.
//             </p>
//             <div className="grid md:grid-cols-3 gap-3">
//               <div className="md:col-span-2">
//                 <label className="text-xs font-medium text-gray-600 mb-1 block">EBN (12 digits) *</label>
//                 <input
//                   value={ebnInput}
//                   onChange={e => setEbnInput(e.target.value.replace(/\D/g, "").slice(0, 12))}
//                   placeholder="e.g. 231234567890"
//                   maxLength={12}
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-green-500"
//                 />
//                 <p className="text-[10px] text-gray-400 mt-0.5">{ebnInput.length}/12 digits</p>
//               </div>
//               <div>
//                 <label className="text-xs font-medium text-gray-600 mb-1 block">Valid Upto (optional)</label>
//                 <input type="date" value={validUpto} onChange={e => setValidUpto(e.target.value)}
//                   className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
//               </div>
//             </div>
//             <button onClick={handleSaveEbn} disabled={ebnSaving || ebnInput.length !== 12}
//               className="mt-3 flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-50">
//               {ebnSaving ? <RefreshCw className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
//               Save EBN & Activate
//             </button>
//           </div>
//         )}

//         {/* API Slot */}
//         <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-5 opacity-70">
//           <div className="flex items-center justify-between">
//             <div>
//               <h3 className="font-bold text-gray-600 flex items-center gap-2">
//                 <Key className="size-4" />🔌 API Slot — GSP Integration (Coming Soon)
//               </h3>
//               <p className="text-xs text-gray-500 mt-1">
//                 Connect your GSP credentials here to auto-generate EBN without visiting NIC portal.
//               </p>
//             </div>
//             <span className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">Locked</span>
//           </div>
//           <div className="mt-3 grid md:grid-cols-2 gap-3 opacity-50 pointer-events-none">
//             <div>
//               <label className="text-xs font-medium text-gray-500 mb-1 block">GSP Client ID</label>
//               <input disabled placeholder="Enter GSP Client ID" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" />
//             </div>
//             <div>
//               <label className="text-xs font-medium text-gray-500 mb-1 block">GSP Client Secret</label>
//               <input disabled placeholder="Enter GSP Client Secret" type="password" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" />
//             </div>
//           </div>
//           <p className="text-[10px] text-gray-400 mt-2">
//             💡 To unlock: Register with a GSP provider and add credentials to <code className="bg-gray-200 px-1 rounded">.env.local</code>
//           </p>
//         </div>
//       </div>
//     </div>
//   )

//   // ════════════════════════════════════════════════════════
//   // ── FORM VIEW ───────────────────────────────────────────
//   // ════════════════════════════════════════════════════════
//   if (view === "form") return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-5">

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <button onClick={() => { setView("list"); setEditId(null); setForm({ ...BLANK_FORM }) }}
//               className="text-gray-400 hover:text-gray-600"><X className="size-5" /></button>
//             <h1 className="text-xl font-bold text-gray-900">{editId ? "Edit E-Way Bill" : "New E-Way Bill"}</h1>
//           </div>
//           <button onClick={handleSave} disabled={saving}
//             className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
//             {saving && <RefreshCw className="size-4 animate-spin" />}
//             {saving ? "Saving..." : "Save E-Way Bill"}
//           </button>
//         </div>

//         <div className="rounded-xl border bg-white shadow-sm p-5 flex flex-col gap-5">

//           {/* Invoice Link */}
//           <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
//             <h3 className="text-sm font-bold text-blue-800 flex items-center gap-2 mb-3">
//               <Link2 className="size-4" />Link to Existing Invoice (Auto-fill)
//             </h3>
//             <div className="grid md:grid-cols-2 gap-3">
//               <Field label="Select Invoice">
//                 <Select value={form.invoiceId} onChange={e => handleInvoiceSelect(e.target.value)}>
//                   <option value="">-- Select Invoice to Auto-fill --</option>
//                   {sales.map(s => (
//                     <option key={s._id} value={s._id}>
//                       {s.invoiceNumber || s._id.slice(-6)} — {s.customerName} — {fmt(s.totalAmount)}
//                     </option>
//                   ))}
//                 </Select>
//               </Field>
//               {form.invoiceNumber && (
//                 <div className="flex items-end">
//                   <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm text-blue-700 font-medium">
//                     ✅ Linked: {form.invoiceNumber}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Transaction Details */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>📋 Transaction Details</SectionTitle>
//             <Field label="Supply Type" required>
//               <Select value={form.supplyType} onChange={e => setForm(f => ({ ...f, supplyType: e.target.value }))}>
//                 {Object.entries(SUPPLY_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
//               </Select>
//             </Field>
//             <Field label="Sub Supply Type" required>
//               <Select value={form.subSupplyType} onChange={e => setForm(f => ({ ...f, subSupplyType: e.target.value }))}>
//                 {Object.entries(SUB_SUPPLY_TYPES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//             <Field label="Document Type" required>
//               <Select value={form.docType} onChange={e => setForm(f => ({ ...f, docType: e.target.value }))}>
//                 <option value="INV">INV — Tax Invoice</option>
//                 <option value="CHL">CHL — Delivery Challan</option>
//                 <option value="BIL">BIL — Bill of Entry</option>
//                 <option value="BOE">BOE — Bill of Exchange</option>
//                 <option value="OTH">OTH — Others</option>
//               </Select>
//             </Field>
//             <Field label="Document Number" required>
//               <Input value={form.docNumber} onChange={e => setForm(f => ({ ...f, docNumber: e.target.value }))} placeholder="INV-2024-001" />
//             </Field>
//             <Field label="Document Date" required>
//               <Input value={form.docDate} onChange={e => setForm(f => ({ ...f, docDate: e.target.value }))} placeholder="DD/MM/YYYY" />
//             </Field>
//           </div>

//           {/* FROM */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>📤 From — Consignor (Your Details)</SectionTitle>
//             <Field label="GSTIN" required>
//               <Input value={form.fromGSTIN} onChange={e => setForm(f => ({ ...f, fromGSTIN: e.target.value.toUpperCase() }))} placeholder="29ABCDE1234F1Z5" maxLength={15} />
//             </Field>
//             <Field label="Trade Name" required>
//               <Input value={form.fromTradeName} onChange={e => setForm(f => ({ ...f, fromTradeName: e.target.value }))} placeholder="Your Business Name" />
//             </Field>
//             <Field label="Address Line 1">
//               <Input value={form.fromAddress1} onChange={e => setForm(f => ({ ...f, fromAddress1: e.target.value }))} placeholder="Door No, Street" />
//             </Field>
//             <Field label="Address Line 2">
//               <Input value={form.fromAddress2} onChange={e => setForm(f => ({ ...f, fromAddress2: e.target.value }))} placeholder="Area, Landmark" />
//             </Field>
//             <Field label="Pincode">
//               <Input value={form.fromPincode} onChange={e => setForm(f => ({ ...f, fromPincode: e.target.value }))} placeholder="560001" maxLength={6} />
//             </Field>
//             <Field label="State Code">
//               <Select value={form.fromStateCode} onChange={e => setForm(f => ({ ...f, fromStateCode: e.target.value }))}>
//                 <option value="">Select State</option>
//                 {Object.entries(STATE_CODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//           </div>

//           {/* TO */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>📥 To — Consignee (Customer Details)</SectionTitle>
//             <Field label="GSTIN" required>
//               <Input value={form.toGSTIN} onChange={e => setForm(f => ({ ...f, toGSTIN: e.target.value.toUpperCase() }))} placeholder="27ABCDE1234F1Z5" maxLength={15} />
//             </Field>
//             <Field label="Trade Name" required>
//               <Input value={form.toTradeName} onChange={e => setForm(f => ({ ...f, toTradeName: e.target.value }))} placeholder="Customer Business Name" />
//             </Field>
//             <Field label="Address Line 1">
//               <Input value={form.toAddress1} onChange={e => setForm(f => ({ ...f, toAddress1: e.target.value }))} placeholder="Door No, Street" />
//             </Field>
//             <Field label="Address Line 2">
//               <Input value={form.toAddress2} onChange={e => setForm(f => ({ ...f, toAddress2: e.target.value }))} placeholder="Area, Landmark" />
//             </Field>
//             <Field label="Pincode">
//               <Input value={form.toPincode} onChange={e => setForm(f => ({ ...f, toPincode: e.target.value }))} placeholder="400001" maxLength={6} />
//             </Field>
//             <Field label="State Code">
//               <Select value={form.toStateCode} onChange={e => setForm(f => ({ ...f, toStateCode: e.target.value }))}>
//                 <option value="">Select State</option>
//                 {Object.entries(STATE_CODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//           </div>

//           {/* ITEMS */}
//           <div className="flex flex-col gap-3">
//             <div className="flex items-center justify-between">
//               <h3 className="text-sm font-bold text-gray-800">📦 Items / Goods</h3>
//               <button onClick={addItem} type="button"
//                 className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700">
//                 <Plus className="size-3" />Add Item
//               </button>
//             </div>
//             {form.items.length === 0 && (
//               <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-400">
//                 No items added. Click "Add Item" or link an invoice to auto-fill.
//               </div>
//             )}
//             {form.items.map((item, idx) => (
//               <div key={idx} className="border border-gray-200 rounded-lg p-3 bg-gray-50 flex flex-col gap-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs font-bold text-gray-600">Item #{idx + 1}</span>
//                   <button onClick={() => removeItem(idx)} type="button" className="text-red-400 hover:text-red-600">
//                     <Trash2 className="size-3.5" />
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   <Field label="Product Name">
//                     <Input value={item.productName} onChange={e => updateItem(idx, "productName", e.target.value)} placeholder="Product name" />
//                   </Field>
//                   <Field label="HSN Code">
//                     <Input value={item.hsnCode} onChange={e => updateItem(idx, "hsnCode", e.target.value)} placeholder="1234" maxLength={8} />
//                   </Field>
//                   <Field label="Quantity">
//                     <Input type="number" value={item.quantity} onChange={e => updateItem(idx, "quantity", Number(e.target.value))} min={0} />
//                   </Field>
//                   <Field label="Unit">
//                     <Select value={item.unit} onChange={e => updateItem(idx, "unit", e.target.value)}>
//                       {["NOS", "KGS", "MTR", "LTR", "BOX", "PCS", "SET", "OTH"].map(u => <option key={u}>{u}</option>)}
//                     </Select>
//                   </Field>
//                   <Field label="Taxable Value (₹)">
//                     <Input type="number" value={item.taxableValue} onChange={e => updateItem(idx, "taxableValue", Number(e.target.value))} min={0} />
//                   </Field>
//                   <Field label="CGST %">
//                     <Input type="number" value={item.cgstRate} onChange={e => updateItem(idx, "cgstRate", Number(e.target.value))} min={0} max={28} />
//                   </Field>
//                   <Field label="SGST %">
//                     <Input type="number" value={item.sgstRate} onChange={e => updateItem(idx, "sgstRate", Number(e.target.value))} min={0} max={28} />
//                   </Field>
//                   <Field label="IGST %">
//                     <Input type="number" value={item.igstRate} onChange={e => updateItem(idx, "igstRate", Number(e.target.value))} min={0} max={28} />
//                   </Field>
//                 </div>
//               </div>
//             ))}
//             {form.items.length > 0 && (
//               <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 flex justify-end gap-6 text-sm flex-wrap">
//                 <span className="text-gray-600">Taxable: <strong>{fmt(totals.taxable)}</strong></span>
//                 <span className="text-blue-600">CGST: <strong>{fmt(totals.cgst)}</strong></span>
//                 <span className="text-purple-600">SGST: <strong>{fmt(totals.sgst)}</strong></span>
//                 <span className="text-orange-600">IGST: <strong>{fmt(totals.igst)}</strong></span>
//                 <span className="text-gray-900 font-bold">Total: {fmt(grandTotal)}</span>
//               </div>
//             )}
//           </div>

//           {/* TRANSPORT */}
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <SectionTitle>🚛 Transport Details</SectionTitle>
//             <Field label="Transport Mode" required>
//               <Select value={form.transportMode} onChange={e => setForm(f => ({ ...f, transportMode: e.target.value }))}>
//                 {Object.entries(TRANSPORT_MODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
//               </Select>
//             </Field>
//             <Field label="Vehicle Number" required>
//               <Input value={form.vehicleNumber} onChange={e => setForm(f => ({ ...f, vehicleNumber: e.target.value.toUpperCase() }))} placeholder="KA01AB1234" />
//             </Field>
//             <Field label="Distance (KM)" required>
//               <Input type="number" value={form.distance} onChange={e => setForm(f => ({ ...f, distance: e.target.value }))} placeholder="100" min={0} />
//             </Field>
//             <Field label="Transporter Name">
//               <Input value={form.transporterName} onChange={e => setForm(f => ({ ...f, transporterName: e.target.value }))} placeholder="Transporter Co." />
//             </Field>
//             <Field label="Transporter GSTIN">
//               <Input value={form.transporterId} onChange={e => setForm(f => ({ ...f, transporterId: e.target.value.toUpperCase() }))} placeholder="29ABCDE1234F1Z5" maxLength={15} />
//             </Field>
//             <Field label="Vehicle Type">
//               <Select value={form.vehicleType} onChange={e => setForm(f => ({ ...f, vehicleType: e.target.value }))}>
//                 <option value="R">R — Regular</option>
//                 <option value="O">O — Over Dimensional Cargo</option>
//               </Select>
//             </Field>
//           </div>

//         </div>

//         <div className="flex justify-end gap-3">
//           <button onClick={() => { setView("list"); setEditId(null); setForm({ ...BLANK_FORM }) }}
//             className="px-5 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
//             Cancel
//           </button>
//           <button onClick={handleSave} disabled={saving}
//             className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
//             {saving && <RefreshCw className="size-4 animate-spin" />}
//             {saving ? "Saving..." : "Save E-Way Bill"}
//           </button>
//         </div>
//       </div>
//     </div>
//   )

//   // ════════════════════════════════════════════════════════
//   // ── LIST VIEW ───────────────────────────────────────────
//   // ════════════════════════════════════════════════════════
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-5">

//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">E-Way Bills</h1>
//             <p className="text-sm text-gray-500 mt-0.5">Manage and track all your E-Way Bills</p>
//           </div>
//           <div className="flex items-center gap-2">
//             <button onClick={fetchBills} disabled={loading}
//               className="flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 shadow-sm">
//               <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
//             </button>
//             <button onClick={() => { setForm({ ...BLANK_FORM }); setEditId(null); setView("form") }}
//               className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
//               <Plus className="size-4" />New E-Way Bill
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//           {[
//             { label: "All",       value: bills.length,                                      color: "bg-gray-100 text-gray-700",   key: "all"       },
//             { label: "Draft",     value: bills.filter(b => b.status === "draft").length,     color: "bg-gray-200 text-gray-700",   key: "draft"     },
//             { label: "Ready",     value: bills.filter(b => b.status === "ready").length,     color: "bg-blue-100 text-blue-700",   key: "ready"     },
//             { label: "Active",    value: bills.filter(b => b.status === "active").length,    color: "bg-green-100 text-green-700", key: "active"    },
//             { label: "Cancelled", value: bills.filter(b => b.status === "cancelled").length, color: "bg-red-100 text-red-600",     key: "cancelled" },
//           ].map(s => (
//             <button key={s.key} onClick={() => setFilterStatus(s.key)}
//               className={`rounded-xl p-3 text-center transition-all ${s.color} ${filterStatus === s.key ? "ring-2 ring-blue-500 ring-offset-1" : "hover:opacity-80"}`}>
//               <p className="text-xl font-bold">{s.value}</p>
//               <p className="text-xs font-medium mt-0.5">{s.label}</p>
//             </button>
//           ))}
//         </div>

//         {loading ? (
//           <div className="flex items-center justify-center h-48 text-gray-400">
//             <RefreshCw className="size-6 animate-spin mr-2" />Loading...
//           </div>
//         ) : filteredBills.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
//             <FileText className="size-10" />
//             <p className="text-sm">No E-Way Bills found</p>
//             <button onClick={() => setView("form")}
//               className="flex items-center gap-1.5 text-xs bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
//               <Plus className="size-3" />Create First E-Way Bill
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col gap-2">
//             {filteredBills.map(bill => (
//               <div key={bill._id} className="rounded-xl border bg-white shadow-sm p-4 flex items-center justify-between gap-3 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-4 min-w-0">
//                   <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
//                     <Truck className="size-5 text-blue-500" />
//                   </div>
//                   <div className="min-w-0">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <span className="font-bold text-sm text-gray-900">{bill.docNumber}</span>
//                       {bill.invoiceNumber && (
//                         <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-medium">
//                           INV: {bill.invoiceNumber}
//                         </span>
//                       )}
//                       <StatusBadge status={bill.status} />
//                     </div>
//                     <p className="text-xs text-gray-500 mt-0.5 truncate">
//                       {bill.fromTradeName || "—"} → {bill.toTradeName || "—"}
//                     </p>
//                     <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
//                       <span>📅 {bill.docDate}</span>
//                       <span>🚛 {TRANSPORT_MODES[bill.transportMode]} · {bill.vehicleNumber || "—"}</span>
//                       <span>📏 {bill.distance} KM</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3 shrink-0">
//                   <div className="text-right hidden md:block">
//                     <p className="text-xs text-gray-400">Total Value</p>
//                     <p className="font-bold text-sm text-gray-900">{fmt(bill.totalValue)}</p>
//                     {bill.ebn && <p className="text-[10px] text-green-600 font-mono mt-0.5">EBN: {bill.ebn}</p>}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <button onClick={() => handleView(bill._id)} title="View"
//                       className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
//                       <Eye className="size-4" />
//                     </button>
//                     {bill.status !== "active" && bill.status !== "cancelled" && (
//                       <button onClick={() => handleEdit(bill._id)} title="Edit"
//                         className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg">
//                         <Edit2 className="size-4" />
//                       </button>
//                     )}
//                     <button onClick={() => handleDelete(bill._id)} title="Delete"
//                       className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
//                       <Trash2 className="size-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-700">
//           <p className="font-bold mb-1">📌 How to use E-Way Bill:</p>
//           <p>1. Create new E-Way Bill (link to invoice for auto-fill) → 2. Click View → Generate JSON → 3. Upload JSON to <strong>ewaybillgst.gov.in</strong> → 4. Enter the 12-digit EBN back here → Bill becomes Active ✅</p>
//         </div>
//       </div>
//     </div>
//   )
// }



////jay

"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { authFetch } from "@/app/lib/authFetch"
import {
  Plus, FileText, Download, Truck, CheckCircle2,
  RefreshCw, X, Eye, Link2, Edit2, Trash2, Key,
  ArrowRight, Copy, Check, Zap, MapPin, Package,
  ChevronRight, Activity, AlertTriangle
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────
type EWayBill = {
  _id: string
  invoiceNumber?: string
  docNumber: string
  docDate: string
  fromTradeName: string
  toTradeName: string
  totalValue: number
  status: "draft" | "ready" | "submitted" | "active" | "cancelled"
  ebn: string
  validUpto?: string
  transportMode: string
  vehicleNumber: string
  distance: number
  createdAt: string
}
type Sale = {
  _id: string; invoiceNumber: string; customerName: string
  totalAmount: number; createdAt: string
  cgst?: number; sgst?: number; igst?: number
  customerGSTIN?: string; items?: any[]
}
type Item = {
  productName: string; hsnCode: string; quantity: number; unit: string
  taxableValue: number; cgstRate: number; sgstRate: number; igstRate: number; cessRate: number
}

// ─── Constants ────────────────────────────────────────────
const BLANK_FORM = {
  invoiceId: "", invoiceNumber: "",
  supplyType: "O", subSupplyType: "1", docType: "INV",
  docNumber: "", docDate: "",
  fromGSTIN: "", fromTradeName: "", fromAddress1: "", fromAddress2: "", fromPincode: "", fromStateCode: "",
  toGSTIN: "", toTradeName: "", toAddress1: "", toAddress2: "", toPincode: "", toStateCode: "",
  transporterName: "", transporterId: "", transportMode: "1",
  vehicleType: "R", vehicleNumber: "", distance: "",
  items: [] as Item[],
}
const BLANK_ITEM: Item = {
  productName: "", hsnCode: "", quantity: 1, unit: "NOS",
  taxableValue: 0, cgstRate: 9, sgstRate: 9, igstRate: 0, cessRate: 0,
}
const STATE_CODES: Record<string, string> = {
  "1": "Jammu & Kashmir", "2": "Himachal Pradesh", "3": "Punjab", "4": "Chandigarh",
  "5": "Uttarakhand", "6": "Haryana", "7": "Delhi", "8": "Rajasthan",
  "9": "Uttar Pradesh", "10": "Bihar", "11": "Sikkim", "12": "Arunachal Pradesh",
  "13": "Nagaland", "14": "Manipur", "15": "Mizoram", "16": "Tripura",
  "17": "Meghalaya", "18": "Assam", "19": "West Bengal", "20": "Jharkhand",
  "21": "Odisha", "22": "Chhattisgarh", "23": "Madhya Pradesh", "24": "Gujarat",
  "26": "Dadra & Nagar Haveli", "27": "Maharashtra", "28": "Andhra Pradesh",
  "29": "Karnataka", "30": "Goa", "31": "Lakshadweep", "32": "Kerala",
  "33": "Tamil Nadu", "34": "Puducherry", "35": "Andaman & Nicobar",
  "36": "Telangana", "37": "Andhra Pradesh (New)",
}
const TRANSPORT_MODES: Record<string, string> = { "1": "Road", "2": "Rail", "3": "Air", "4": "Ship" }
const SUPPLY_TYPES: Record<string, string> = { "O": "Outward", "I": "Inward" }
const SUB_SUPPLY_TYPES: Record<string, string> = {
  "1": "Supply", "2": "Import", "3": "Export", "4": "Job Work",
  "5": "For Own Use", "6": "Job Work Returns", "7": "Sales Return",
  "8": "Others", "9": "SKD/CKD", "10": "Line Sales",
  "11": "Recipient Not Known", "12": "Exhibition or Fairs",
}
const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n || 0)

// ─── Animation Variants ───────────────────────────────────
const sp = { type: "spring", stiffness: 400, damping: 30 } as const
const smoothSp = { type: "spring", stiffness: 300, damping: 28 } as const

const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } },
  exit:   { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.22, ease: "easeIn" } },
}
const cardReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.23, 1, 0.32, 1] } },
}
const staggerGrid: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}
const listItem: Variants = {
  hidden: { opacity: 0, x: -16, scale: 0.98 },
  show:   { opacity: 1, x: 0, scale: 1, transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] } },
  exit:   { opacity: 0, x: 20, scale: 0.97, transition: { duration: 0.18 } },
}
const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.18 } },
  exit:   { opacity: 0, transition: { duration: 0.18 } },
}
const modalPanel: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 28 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 380, damping: 26 } },
  exit:   { opacity: 0, scale: 0.92, y: 10, transition: { duration: 0.16 } },
}

// ─── Status config ────────────────────────────────────────
const SC: Record<string, { bg: string; text: string; ring: string; dot: string; label: string }> = {
  draft:     { bg: "bg-slate-100",  text: "text-slate-600",   ring: "ring-slate-200",   dot: "bg-slate-400",   label: "Draft"     },
  ready:     { bg: "bg-sky-50",     text: "text-sky-700",     ring: "ring-sky-200",     dot: "bg-sky-500",     label: "Ready"     },
  submitted: { bg: "bg-amber-50",   text: "text-amber-700",   ring: "ring-amber-200",   dot: "bg-amber-500",   label: "Submitted" },
  active:    { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", dot: "bg-emerald-500", label: "Active"    },
  cancelled: { bg: "bg-rose-50",    text: "text-rose-600",    ring: "ring-rose-200",    dot: "bg-rose-400",    label: "Cancelled" },
}

// ─── Stable UI Atoms (outside main component) ─────────────
const Field = ({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
      {label}{required && <span className="text-rose-400">*</span>}
    </label>
    {children}
  </div>
)

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#F2A119] focus:ring-2 focus:ring-[#F2A119]/20 transition-all duration-200 shadow-sm w-full"
  />
)

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className="rounded border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#F2A119] focus:ring-2 focus:ring-[#F2A119]/20 transition-all duration-200 shadow-sm cursor-pointer w-full"
  />
)

const SectionTitle = ({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) => (
  <div className="col-span-full mt-2 mb-1">
    <div className="flex items-center gap-2">
      {icon && <span className="text-[#F2A119]">{icon}</span>}
      <h3 className="text-xs font-bold text-slate-700 tracking-wide">{children}</h3>
    </div>
    <div className="mt-2 h-px bg-gradient-to-r from-[#F2A119]/30 via-slate-200 to-transparent" />
  </div>
)

const StatusBadge = ({ status }: { status: string }) => {
  const s = SC[status] || SC.draft
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ring-1 ${s.bg} ${s.text} ${s.ring}`}>
      <span className={`size-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white/80 backdrop-blur-sm border border-white/60 shadow-[0_2px_20px_rgba(0,0,0,0.06)] rounded ${className}`}>
    {children}
  </div>
)

const PrimaryBtn = ({ children, onClick, disabled, className = "" }: any) => (
  <motion.button
    onClick={onClick} disabled={disabled}
    whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(242,161,25,0.35)" }}
    whileTap={{ scale: 0.97 }}
    transition={sp}
    className={`flex items-center gap-2 bg-gradient-to-r from-[#F2A119] to-[#f0900a] text-white px-4 py-2 rounded text-xs font-bold shadow-md shadow-[#F2A119]/25 transition-opacity disabled:opacity-50 ${className}`}
  >
    {children}
  </motion.button>
)

const GhostBtn = ({ children, onClick, disabled, className = "" }: any) => (
  <motion.button
    onClick={onClick} disabled={disabled}
    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
    transition={sp}
    className={`flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded text-xs font-semibold shadow-sm hover:bg-slate-50 transition-colors disabled:opacity-50 ${className}`}
  >
    {children}
  </motion.button>
)

const IconBtn = ({ children, onClick, title, color = "text-slate-400 hover:text-slate-700 hover:bg-slate-100" }: any) => (
  <motion.button
    onClick={onClick} title={title}
    whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.88 }}
    transition={sp}
    className={`p-2 rounded-xl transition-colors ${color}`}
  >
    {children}
  </motion.button>
)

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-100">
    <Toaster position="top-right" toastOptions={{
      style: {
        borderRadius: "12px", fontSize: "0.78rem", fontWeight: 600,
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.8)",
        background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
      },
    }} />
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-4">{children}</div>
  </div>
)

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
    <span className="text-[11px] text-slate-400 font-medium">{label}</span>
    <span className="text-[11px] font-semibold text-slate-700 text-right max-w-[58%] leading-snug">{value}</span>
  </div>
)

const SkeletonRow = () => (
  <div className="rounded bg-white border border-slate-100 p-4 flex items-center gap-3 shadow-sm">
    <div className="size-10 rounded-xl bg-slate-100 animate-pulse shrink-0" />
    <div className="flex-1 flex flex-col gap-2">
      <div className="h-3 w-32 bg-slate-100 rounded-full animate-pulse" />
      <div className="h-2 w-48 bg-slate-100 rounded-full animate-pulse" />
    </div>
    <div className="h-3 w-16 bg-slate-100 rounded-full animate-pulse" />
  </div>
)

const DeleteModal = ({
  open, docNumber, onCancel, onConfirm, deleting,
}: {
  open: boolean; docNumber: string; onCancel: () => void; onConfirm: () => void; deleting: boolean
}) => (
  <AnimatePresence>
    {open && (
      <motion.div
        variants={modalBackdrop} initial="hidden" animate="show" exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}
        onClick={onCancel}
      >
        <motion.div
          variants={modalPanel} initial="hidden" animate="show" exit="exit"
          onClick={e => e.stopPropagation()}
          className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/60"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-rose-400 via-rose-500 to-red-500" />
          <div className="p-6 flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 20 }}
                className="shrink-0 size-11 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100"
              >
                <Trash2 className="size-5 text-rose-500" />
              </motion.div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Delete E-Way Bill?</h2>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Permanently delete{" "}
                  <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded-md">{docNumber}</span>.
                  This cannot be undone.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-rose-50 border border-rose-100 px-4 py-3 flex items-center gap-2.5">
              <AlertTriangle className="size-3.5 text-rose-400 shrink-0" />
              <p className="text-[11px] text-rose-600 font-medium">All data for this bill will be permanently lost.</p>
            </div>
            <div className="flex gap-2.5">
              <GhostBtn onClick={onCancel} disabled={deleting} className="flex-1 justify-center">Cancel</GhostBtn>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={onConfirm} disabled={deleting}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-rose-200 disabled:opacity-50 transition-opacity"
              >
                {deleting ? <RefreshCw className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
                {deleting ? "Deleting…" : "Yes, Delete"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
)

// ═════════════════════════════════════════════════════════
// ── MAIN COMPONENT
// ═════════════════════════════════════════════════════════
export default function EWayBillPage() {
  const [bills,        setBills]        = useState<EWayBill[]>([])
  const [sales,        setSales]        = useState<Sale[]>([])
  const [loading,      setLoading]      = useState(false)
  const [view,         setView]         = useState<"list" | "form" | "detail">("list")
  const [editId,       setEditId]       = useState<string | null>(null)
  const [detail,       setDetail]       = useState<any | null>(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [form,         setForm]         = useState({ ...BLANK_FORM })
  const [saving,       setSaving]       = useState(false)
  const [ebnInput,     setEbnInput]     = useState("")
  const [validUpto,    setValidUpto]    = useState("")
  const [ebnSaving,    setEbnSaving]    = useState(false)
  const [copied,       setCopied]       = useState(false)
  const [nicJson,      setNicJson]      = useState<any>(null)
  const [jsonLoading,  setJsonLoading]  = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; docNumber: string } | null>(null)
  const [deleting,     setDeleting]     = useState(false)

  const fetchBills = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authFetch("/api/ewaybill").then(r => r.json())
      setBills(Array.isArray(res) ? res : [])
    } catch { setBills([]) }
    finally { setLoading(false) }
  }, [])

  const fetchSales = useCallback(async () => {
    try {
      const res = await authFetch("/api/sales").then(r => r.json())
      setSales(Array.isArray(res) ? res : [])
    } catch { setSales([]) }
  }, [])

  useEffect(() => { fetchBills(); fetchSales() }, [fetchBills, fetchSales])

  const handleInvoiceSelect = (invoiceId: string) => {
    const sale = sales.find(s => s._id === invoiceId)
    if (!sale) { setForm(f => ({ ...f, invoiceId: "" })); return }
    const date    = new Date(sale.createdAt)
    const docDate = `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`
    const autoItems: Item[] = sale.items?.length
      ? sale.items.map((it: any) => ({
          productName: it.name || it.productName || "", hsnCode: it.hsnCode || "",
          quantity: it.quantity || 1, unit: it.unit || "NOS",
          taxableValue: it.taxableValue || (it.price * it.quantity) || 0,
          cgstRate: it.cgstRate || 9, sgstRate: it.sgstRate || 9, igstRate: it.igstRate || 0, cessRate: 0,
        }))
      : [{ ...BLANK_ITEM, productName: "As per Invoice", taxableValue: sale.totalAmount || 0 }]
    setForm(f => ({
      ...f, invoiceId, invoiceNumber: sale.invoiceNumber,
      docNumber: sale.invoiceNumber || invoiceId, docDate,
      toTradeName: sale.customerName || "", toGSTIN: sale.customerGSTIN || "", items: autoItems,
    }))
    toast.success(`Linked to ${sale.invoiceNumber}`)
  }

  const addItem    = () => setForm(f => ({ ...f, items: [...f.items, { ...BLANK_ITEM }] }))
  const removeItem = (idx: number) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }))
  const updateItem = (idx: number, field: keyof Item, val: any) =>
    setForm(f => ({ ...f, items: f.items.map((it, i) => i === idx ? { ...it, [field]: val } : it) }))

  const totals = {
    taxable: form.items.reduce((s, i) => s + (Number(i.taxableValue) || 0), 0),
    cgst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.cgstRate)) / 100 || 0), 0),
    sgst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.sgstRate)) / 100 || 0), 0),
    igst:    form.items.reduce((s, i) => s + ((Number(i.taxableValue) * Number(i.igstRate)) / 100 || 0), 0),
  }
  const grandTotal = totals.taxable + totals.cgst + totals.sgst + totals.igst

  const handleSave = async () => {
    if (!form.docNumber)         { toast.error("Document number is required"); return }
    if (!form.docDate)           { toast.error("Document date is required");   return }
    if (form.items.length === 0) { toast.error("Add at least one item");       return }
    setSaving(true)
    const tid = toast.loading(editId ? "Updating…" : "Saving…")
    try {
      const url    = editId ? `/api/ewaybill/${editId}` : "/api/ewaybill"
      const method = editId ? "PUT" : "POST"
      const res    = await authFetch(url, { method, body: JSON.stringify(form) })
      if (res.ok) {
        await fetchBills()
        setView("list"); setEditId(null); setForm({ ...BLANK_FORM })
        toast.success(editId ? "E-Way Bill updated" : "E-Way Bill created", { id: tid })
      } else {
        const err = await res.json()
        toast.error(err.error || "Save failed", { id: tid })
      }
    } catch { toast.error("Network error", { id: tid }) }
    finally { setSaving(false) }
  }

  const handleEdit = async (id: string) => {
    const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
    setForm({
      invoiceId: bill.invoiceId || "", invoiceNumber: bill.invoiceNumber || "",
      supplyType: bill.supplyType || "O", subSupplyType: bill.subSupplyType || "1",
      docType: bill.docType || "INV", docNumber: bill.docNumber || "", docDate: bill.docDate || "",
      fromGSTIN: bill.fromGSTIN || "", fromTradeName: bill.fromTradeName || "",
      fromAddress1: bill.fromAddress1 || "", fromAddress2: bill.fromAddress2 || "",
      fromPincode: bill.fromPincode || "", fromStateCode: bill.fromStateCode || "",
      toGSTIN: bill.toGSTIN || "", toTradeName: bill.toTradeName || "",
      toAddress1: bill.toAddress1 || "", toAddress2: bill.toAddress2 || "",
      toPincode: bill.toPincode || "", toStateCode: bill.toStateCode || "",
      transporterName: bill.transporterName || "", transporterId: bill.transporterId || "",
      transportMode: bill.transportMode || "1", vehicleType: bill.vehicleType || "R",
      vehicleNumber: bill.vehicleNumber || "", distance: bill.distance?.toString() || "",
      items: bill.items || [],
    })
    setEditId(id); setView("form")
  }

  const handleDelete = (id: string, docNumber: string) => setDeleteTarget({ id, docNumber })

  const confirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    const tid = toast.loading("Deleting…")
    try {
      const res = await authFetch(`/api/ewaybill/${deleteTarget.id}`, { method: "DELETE" })
      if (res.ok) { fetchBills(); toast.success("Deleted", { id: tid }) }
      else { const e = await res.json(); toast.error(e.error, { id: tid }) }
    } catch { toast.error("Network error", { id: tid }) }
    finally { setDeleting(false); setDeleteTarget(null) }
  }

  const handleView = async (id: string) => {
    const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
    bill._id = bill._id?.toString() || id
    setDetail(bill)
    setEbnInput(bill.ebn || "")
    setValidUpto(bill.validUpto ? new Date(bill.validUpto).toISOString().split("T")[0] : "")
    setNicJson(null); setView("detail")
  }

  const handleGenerateJson = async (id: string) => {
    setJsonLoading(true)
    const tid = toast.loading("Generating JSON…")
    try {
      const res  = await authFetch(`/api/ewaybill/generate-json/${id}`).then(r => r.json())
      setNicJson(res.nicJson)
      const bill = await authFetch(`/api/ewaybill/${id}`).then(r => r.json())
      bill._id   = bill._id?.toString() || id; setDetail(bill)
      toast.success("JSON generated!", { id: tid })
    } catch { toast.error("Failed to generate JSON", { id: tid }) }
    finally { setJsonLoading(false) }
  }

  const handleDownloadJson = () => {
    if (!nicJson) return
    const blob = new Blob([JSON.stringify(nicJson, null, 2)], { type: "application/json" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url; a.download = `ewaybill-${detail?.docNumber || "export"}.json`; a.click()
    URL.revokeObjectURL(url)
    toast.success("JSON downloaded")
  }

  const handleCopyJson = () => {
    if (!nicJson) return
    navigator.clipboard.writeText(JSON.stringify(nicJson, null, 2))
    setCopied(true); setTimeout(() => setCopied(false), 2000)
    toast.success("Copied!")
  }

  const handleSaveEbn = async () => {
    if (!ebnInput || !/^\d{12}$/.test(ebnInput)) { toast.error("EBN must be exactly 12 digits"); return }
    setEbnSaving(true)
    const tid = toast.loading("Saving EBN…")
    try {
      const res = await authFetch(`/api/ewaybill/update-ebn/${detail._id}`, {
        method: "POST", body: JSON.stringify({ ebn: ebnInput, validUpto }),
      })
      if (res.ok) {
        const updated = await res.json(); setDetail(updated); fetchBills()
        toast.success("EBN saved! Bill is now Active ✅", { id: tid })
      } else { const e = await res.json(); toast.error(e.error, { id: tid }) }
    } catch { toast.error("Network error", { id: tid }) }
    finally { setEbnSaving(false) }
  }

  const filteredBills = filterStatus === "all" ? bills : bills.filter(b => b.status === filterStatus)

  // ═══════════════════════════════════════════════════════
  // ── DETAIL VIEW
  // ═══════════════════════════════════════════════════════
  if (view === "detail" && detail) return (
    <Shell>
      <AnimatePresence mode="wait">
        <motion.div key="detail" variants={fadeSlideUp} initial="hidden" animate="show" exit="exit"
          className="flex flex-col gap-4">

          {/* Header */}
          <motion.div variants={cardReveal} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} transition={sp}
                onClick={() => setView("list")}
                className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 bg-white border border-slate-200 shadow-sm transition-colors"
              >
                <X className="size-4" />
              </motion.button>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-base font-bold text-slate-900 tracking-tight">{detail.docNumber}</h1>
                  <StatusBadge status={detail.status} />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  E-Way Bill · Created {new Date(detail.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Active EBN Banner */}
          <AnimatePresence>
            {detail.status === "active" && detail.ebn && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-5 flex items-center justify-between shadow-lg shadow-emerald-200"
              >
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10 pointer-events-none" />
                <div className="absolute -right-4 -bottom-6 size-20 rounded-full bg-white/10 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-[10px] text-emerald-100 font-bold uppercase tracking-widest">E-Way Bill Number (EBN)</p>
                  <p className="text-3xl font-black text-white tracking-[0.15em] mt-1 font-mono">{detail.ebn}</p>
                  {detail.validUpto && (
                    <p className="text-[10px] text-emerald-100 mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      Valid until {new Date(detail.validUpto).toLocaleDateString("en-IN")}
                    </p>
                  )}
                </div>
                <div className="relative z-10 bg-white/20 rounded-2xl p-3">
                  <CheckCircle2 className="size-8 text-white" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Cards */}
          <motion.div variants={staggerGrid} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-3">
            {[
              { title: "Transaction", icon: <FileText className="size-3.5" />, rows: [
                { label: "Supply Type",     value: SUPPLY_TYPES[detail.supplyType] || detail.supplyType },
                { label: "Sub Supply Type", value: SUB_SUPPLY_TYPES[detail.subSupplyType] || detail.subSupplyType },
                { label: "Doc Type",        value: detail.docType },
                { label: "Doc Number",      value: detail.docNumber },
                { label: "Doc Date",        value: detail.docDate },
                { label: "Invoice",         value: detail.invoiceNumber || "—" },
              ]},
              { title: "Transport", icon: <Truck className="size-3.5" />, rows: [
                { label: "Mode",        value: TRANSPORT_MODES[detail.transportMode] || detail.transportMode },
                { label: "Vehicle No",  value: detail.vehicleNumber   || "—" },
                { label: "Transporter", value: detail.transporterName || "—" },
                { label: "Distance",    value: `${detail.distance} KM` },
              ]},
              { title: "From (Consignor)", icon: <MapPin className="size-3.5" />, rows: [
                { label: "Name",    value: detail.fromTradeName || "—" },
                { label: "GSTIN",   value: detail.fromGSTIN     || "—" },
                { label: "Address", value: [detail.fromAddress1, detail.fromAddress2].filter(Boolean).join(", ") || "—" },
                { label: "Pincode", value: detail.fromPincode   || "—" },
                { label: "State",   value: STATE_CODES[detail.fromStateCode] || detail.fromStateCode || "—" },
              ]},
              { title: "To (Consignee)", icon: <MapPin className="size-3.5" />, rows: [
                { label: "Name",    value: detail.toTradeName || "—" },
                { label: "GSTIN",   value: detail.toGSTIN     || "—" },
                { label: "Address", value: [detail.toAddress1, detail.toAddress2].filter(Boolean).join(", ") || "—" },
                { label: "Pincode", value: detail.toPincode   || "—" },
                { label: "State",   value: STATE_CODES[detail.toStateCode] || detail.toStateCode || "—" },
              ]},
            ].map(card => (
              <motion.div key={card.title} variants={cardReveal}>
                <GlassCard className="p-4">
                  <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                    <span className="text-[#F2A119]">{card.icon}</span>{card.title}
                  </h3>
                  {card.rows.map((r, i) => <DetailRow key={i} label={r.label} value={r.value} />)}
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Value Summary */}
          <motion.div variants={cardReveal}>
            <GlassCard className="p-4">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Activity className="size-3.5 text-[#F2A119]" />Value Summary
              </h3>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: "Taxable", value: detail.totalValue, color: "text-slate-800",  bg: "bg-slate-50"  },
                  { label: "CGST",    value: detail.cgstValue,  color: "text-sky-700",    bg: "bg-sky-50"    },
                  { label: "SGST",    value: detail.sgstValue,  color: "text-violet-700", bg: "bg-violet-50" },
                  { label: "IGST",    value: detail.igstValue,  color: "text-orange-600", bg: "bg-orange-50" },
                ].map((r, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, ...smoothSp }}
                    className={`rounded-xl ${r.bg} p-3 text-center border border-white`}
                  >
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{r.label}</p>
                    <p className={`text-xs font-black mt-1 tabular-nums ${r.color}`}>{fmt(r.value)}</p>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-end">
                <div className="rounded-xl bg-gradient-to-r from-[#F2A119]/10 to-orange-50 border border-[#F2A119]/20 px-5 py-3 text-right">
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Grand Total</p>
                  <p className="text-xl font-black text-[#F2A119] tabular-nums mt-0.5">
                    {fmt(detail.totalValue + detail.cgstValue + detail.sgstValue + detail.igstValue)}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Step 1 — Generate JSON */}
          {detail.status !== "active" && detail.status !== "cancelled" && (
            <motion.div variants={cardReveal}>
              <GlassCard className="p-4 border-sky-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="size-7 rounded-xl bg-sky-600 flex items-center justify-center shrink-0 shadow-sm shadow-sky-200">
                      <span className="text-white text-[10px] font-black">1</span>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Generate NIC Format JSON</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Upload to <span className="font-bold text-sky-600">ewaybillgst.gov.in</span> to get your EBN
                      </p>
                    </div>
                  </div>
                  <PrimaryBtn onClick={() => detail?._id && handleGenerateJson(detail._id)} disabled={jsonLoading}
                    className="shrink-0 !from-sky-500 !to-sky-600 shadow-sky-200">
                    {jsonLoading ? <RefreshCw className="size-3.5 animate-spin" /> : <FileText className="size-3.5" />}
                    Generate
                  </PrimaryBtn>
                </div>
                <AnimatePresence>
                  {nicJson && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="bg-slate-900 rounded-xl p-3 max-h-40 overflow-y-auto">
                        <pre className="text-[10px] text-emerald-400 whitespace-pre-wrap font-mono">{JSON.stringify(nicJson, null, 2)}</pre>
                      </div>
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleDownloadJson}
                          className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm shadow-emerald-100 transition-colors">
                          <Download className="size-3.5" />Download
                        </motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleCopyJson}
                          className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm transition-colors hover:bg-slate-50">
                          {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                          {copied ? "Copied!" : "Copy JSON"}
                        </motion.button>
                        <a href="https://ewaybillgst.gov.in" target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-gradient-to-r from-[#F2A119] to-[#f0900a] text-white px-3 py-2 rounded-xl text-[11px] font-bold shadow-sm transition-colors">
                          <ArrowRight className="size-3.5" />Open NIC Portal
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </motion.div>
          )}

          {/* Step 2 — Enter EBN */}
          {(detail.status === "draft" || detail.status === "ready" || detail.status === "submitted") && (
            <motion.div variants={cardReveal}>
              <GlassCard className="p-4 border-emerald-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="size-7 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-sm shadow-emerald-200">
                    <span className="text-white text-[10px] font-black">2</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">Enter E-Way Bill Number (EBN)</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Enter the 12-digit EBN from the NIC portal</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">EBN (12 digits) *</label>
                    <input
                      value={ebnInput}
                      onChange={e => setEbnInput(e.target.value.replace(/\D/g, "").slice(0, 12))}
                      placeholder="231234567890"
                      maxLength={12}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-mono tracking-[0.2em] text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm placeholder:tracking-normal placeholder:text-sm placeholder:font-sans placeholder:text-slate-300"
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      <p className="text-[10px] text-slate-400">{ebnInput.length}/12</p>
                      <div className="flex gap-0.5">
                        {[...Array(12)].map((_, i) => (
                          <motion.div key={i}
                            animate={{ backgroundColor: i < ebnInput.length ? "#10b981" : "#e2e8f0" }}
                            transition={{ duration: 0.15 }}
                            className="h-0.5 w-2 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Valid Upto</label>
                    <input type="date" value={validUpto} onChange={e => setValidUpto(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-sm" />
                  </div>
                </div>
                <PrimaryBtn onClick={handleSaveEbn} disabled={ebnSaving || ebnInput.length !== 12}
                  className="mt-4 !from-emerald-500 !to-teal-500 shadow-emerald-200">
                  {ebnSaving ? <RefreshCw className="size-3.5 animate-spin" /> : <CheckCircle2 className="size-3.5" />}
                  Save EBN & Activate
                </PrimaryBtn>
              </GlassCard>
            </motion.div>
          )}

          {/* API Slot */}
          <motion.div variants={cardReveal}>
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/40 p-4 opacity-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Key className="size-4 text-slate-400" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-500">GSP API Integration</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Auto-generate EBN via GSP credentials</p>
                  </div>
                </div>
                <span className="bg-slate-200 text-slate-500 text-[10px] px-2.5 py-1 rounded-full font-bold">Coming Soon</span>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </AnimatePresence>
    </Shell>
  )

  // ═══════════════════════════════════════════════════════
  // ── FORM VIEW
  // ═══════════════════════════════════════════════════════
  if (view === "form") return (
    <Shell>
      <AnimatePresence mode="wait">
        <motion.div key="form" variants={fadeSlideUp} initial="hidden" animate="show" exit="exit"
          className="flex flex-col gap-4">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }} transition={sp}
                onClick={() => { setView("list"); setEditId(null); setForm({ ...BLANK_FORM }) }}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-700 shadow-sm transition-colors"
              >
                <X className="size-4" />
              </motion.button>
              <div>
                <h1 className="text-base font-bold text-slate-900 tracking-tight">
                  {editId ? "Edit E-Way Bill" : "New E-Way Bill"}
                </h1>
                <p className="text-[10px] text-slate-400 mt-0.5">Fill in the details below</p>
              </div>
            </div>
            <PrimaryBtn onClick={handleSave} disabled={saving}>
              {saving && <RefreshCw className="size-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save Bill"}
            </PrimaryBtn>
          </div>

          <GlassCard className="p-5 flex flex-col gap-6">

            {/* Invoice Link */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
              className="rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-100 p-4">
              <h3 className="text-xs font-bold text-sky-800 flex items-center gap-1.5 mb-3">
                <Link2 className="size-3.5" />Link to Existing Invoice
                <span className="text-[10px] font-normal text-sky-500 ml-1">— auto-fills form fields</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <Field label="Select Invoice">
                  <Select value={form.invoiceId} onChange={e => handleInvoiceSelect(e.target.value)}>
                    <option value="">-- Select Invoice to Auto-fill --</option>
                    {sales.map(s => (
                      <option key={s._id} value={s._id}>
                        {s.invoiceNumber || s._id.slice(-6)} — {s.customerName} — {fmt(s.totalAmount)}
                      </option>
                    ))}
                  </Select>
                </Field>
                {form.invoiceNumber && (
                  <div className="flex items-end">
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={sp}
                      className="flex items-center gap-2 bg-white border border-emerald-200 rounded-xl px-3 py-2.5 text-xs text-emerald-700 font-bold shadow-sm">
                      <CheckCircle2 className="size-3.5 text-emerald-500" />
                      Linked: {form.invoiceNumber}
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Transaction Details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <SectionTitle icon={<FileText className="size-3.5" />}>Transaction Details</SectionTitle>
              <Field label="Supply Type" required>
                <Select value={form.supplyType} onChange={e => setForm(f => ({ ...f, supplyType: e.target.value }))}>
                  {Object.entries(SUPPLY_TYPES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </Select>
              </Field>
              <Field label="Sub Supply Type" required>
                <Select value={form.subSupplyType} onChange={e => setForm(f => ({ ...f, subSupplyType: e.target.value }))}>
                  {Object.entries(SUB_SUPPLY_TYPES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
                </Select>
              </Field>
              <Field label="Document Type" required>
                <Select value={form.docType} onChange={e => setForm(f => ({ ...f, docType: e.target.value }))}>
                  <option value="INV">INV — Tax Invoice</option>
                  <option value="CHL">CHL — Delivery Challan</option>
                  <option value="BIL">BIL — Bill of Entry</option>
                  <option value="BOE">BOE — Bill of Exchange</option>
                  <option value="OTH">OTH — Others</option>
                </Select>
              </Field>
              <Field label="Document Number" required>
                <Input value={form.docNumber} onChange={e => setForm(f => ({ ...f, docNumber: e.target.value }))} placeholder="INV-2024-001" />
              </Field>
              <Field label="Document Date" required>
                <Input value={form.docDate} onChange={e => setForm(f => ({ ...f, docDate: e.target.value }))} placeholder="DD/MM/YYYY" />
              </Field>
            </div>

            {/* FROM */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <SectionTitle icon={<MapPin className="size-3.5" />}>From — Consignor</SectionTitle>
              <Field label="GSTIN" required>
                <Input value={form.fromGSTIN} onChange={e => setForm(f => ({ ...f, fromGSTIN: e.target.value.toUpperCase() }))} placeholder="29ABCDE1234F1Z5" maxLength={15} />
              </Field>
              <Field label="Trade Name" required>
                <Input value={form.fromTradeName} onChange={e => setForm(f => ({ ...f, fromTradeName: e.target.value }))} placeholder="Your Business Name" />
              </Field>
              <Field label="Address Line 1">
                <Input value={form.fromAddress1} onChange={e => setForm(f => ({ ...f, fromAddress1: e.target.value }))} placeholder="Door No, Street" />
              </Field>
              <Field label="Address Line 2">
                <Input value={form.fromAddress2} onChange={e => setForm(f => ({ ...f, fromAddress2: e.target.value }))} placeholder="Area, Landmark" />
              </Field>
              <Field label="Pincode">
                <Input value={form.fromPincode} onChange={e => setForm(f => ({ ...f, fromPincode: e.target.value }))} placeholder="560001" maxLength={6} />
              </Field>
              <Field label="State Code">
                <Select value={form.fromStateCode} onChange={e => setForm(f => ({ ...f, fromStateCode: e.target.value }))}>
                  <option value="">Select State</option>
                  {Object.entries(STATE_CODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
                </Select>
              </Field>
            </div>

            {/* TO */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <SectionTitle icon={<MapPin className="size-3.5" />}>To — Consignee</SectionTitle>
              <Field label="GSTIN" required>
                <Input value={form.toGSTIN} onChange={e => setForm(f => ({ ...f, toGSTIN: e.target.value.toUpperCase() }))} placeholder="27ABCDE1234F1Z5" maxLength={15} />
              </Field>
              <Field label="Trade Name" required>
                <Input value={form.toTradeName} onChange={e => setForm(f => ({ ...f, toTradeName: e.target.value }))} placeholder="Customer Business Name" />
              </Field>
              <Field label="Address Line 1">
                <Input value={form.toAddress1} onChange={e => setForm(f => ({ ...f, toAddress1: e.target.value }))} placeholder="Door No, Street" />
              </Field>
              <Field label="Address Line 2">
                <Input value={form.toAddress2} onChange={e => setForm(f => ({ ...f, toAddress2: e.target.value }))} placeholder="Area, Landmark" />
              </Field>
              <Field label="Pincode">
                <Input value={form.toPincode} onChange={e => setForm(f => ({ ...f, toPincode: e.target.value }))} placeholder="400001" maxLength={6} />
              </Field>
              <Field label="State Code">
                <Select value={form.toStateCode} onChange={e => setForm(f => ({ ...f, toStateCode: e.target.value }))}>
                  <option value="">Select State</option>
                  {Object.entries(STATE_CODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
                </Select>
              </Field>
            </div>

            {/* ITEMS */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="size-3.5 text-[#F2A119]" />
                  <h3 className="text-xs font-bold text-slate-700">Items / Goods</h3>
                  {form.items.length > 0 && (
                    <motion.span layout
                      className="bg-[#F2A119]/15 text-[#F2A119] text-[10px] font-black px-2 py-0.5 rounded-full">
                      {form.items.length}
                    </motion.span>
                  )}
                </div>
                <PrimaryBtn onClick={addItem} className="!py-2 !px-3 !text-[10px] !gap-1">
                  <Plus className="size-3" />Add Item
                </PrimaryBtn>
              </div>
              <div className="h-px bg-gradient-to-r from-[#F2A119]/30 via-slate-200 to-transparent" />

              {form.items.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 gap-2">
                  <Package className="size-8 text-slate-300" />
                  <p className="text-xs text-slate-400 font-medium">No items yet</p>
                  <p className="text-[10px] text-slate-300">Click "Add Item" or link an invoice to auto-fill</p>
                </motion.div>
              )}

              <AnimatePresence>
                {form.items.map((item, idx) => (
                  <motion.div key={idx}
                    variants={listItem} initial="hidden" animate="show" exit="exit" layout
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 flex flex-col gap-3"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Item #{idx + 1}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.88 }} onClick={() => removeItem(idx)} type="button"
                        className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors">
                        <Trash2 className="size-3.5" />
                      </motion.button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                      <Field label="Product Name">
                        <Input value={item.productName} onChange={e => updateItem(idx, "productName", e.target.value)} placeholder="Product name" />
                      </Field>
                      <Field label="HSN Code">
                        <Input value={item.hsnCode} onChange={e => updateItem(idx, "hsnCode", e.target.value)} placeholder="1234" maxLength={8} />
                      </Field>
                      <Field label="Quantity">
                        <Input type="number" value={item.quantity} onChange={e => updateItem(idx, "quantity", Number(e.target.value))} min={0} />
                      </Field>
                      <Field label="Unit">
                        <Select value={item.unit} onChange={e => updateItem(idx, "unit", e.target.value)}>
                          {["NOS", "KGS", "MTR", "LTR", "BOX", "PCS", "SET", "OTH"].map(u => <option key={u}>{u}</option>)}
                        </Select>
                      </Field>
                      <Field label="Taxable Value (₹)">
                        <Input type="number" value={item.taxableValue} onChange={e => updateItem(idx, "taxableValue", Number(e.target.value))} min={0} />
                      </Field>
                      <Field label="CGST %">
                        <Input type="number" value={item.cgstRate} onChange={e => updateItem(idx, "cgstRate", Number(e.target.value))} min={0} max={28} />
                      </Field>
                      <Field label="SGST %">
                        <Input type="number" value={item.sgstRate} onChange={e => updateItem(idx, "sgstRate", Number(e.target.value))} min={0} max={28} />
                      </Field>
                      <Field label="IGST %">
                        <Input type="number" value={item.igstRate} onChange={e => updateItem(idx, "igstRate", Number(e.target.value))} min={0} max={28} />
                      </Field>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {form.items.length > 0 && (
                <motion.div layout
                  className="rounded-xl bg-gradient-to-r from-[#F2A119]/8 to-orange-50 border border-[#F2A119]/20 p-3 flex justify-between items-center gap-4 flex-wrap">
                  {[
                    { l: "Taxable", v: totals.taxable, c: "text-slate-700"  },
                    { l: "CGST",    v: totals.cgst,    c: "text-sky-600"    },
                    { l: "SGST",    v: totals.sgst,    c: "text-violet-600" },
                    { l: "IGST",    v: totals.igst,    c: "text-orange-500" },
                  ].map(t => (
                    <div key={t.l} className="text-center">
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{t.l}</p>
                      <p className={`text-xs font-black tabular-nums mt-0.5 ${t.c}`}>{fmt(t.v)}</p>
                    </div>
                  ))}
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Total</p>
                    <p className="text-sm font-black text-[#F2A119] tabular-nums mt-0.5">{fmt(grandTotal)}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* TRANSPORT */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <SectionTitle icon={<Truck className="size-3.5" />}>Transport Details</SectionTitle>
              <Field label="Transport Mode" required>
                <Select value={form.transportMode} onChange={e => setForm(f => ({ ...f, transportMode: e.target.value }))}>
                  {Object.entries(TRANSPORT_MODES).map(([k, v]) => <option key={k} value={k}>{k} — {v}</option>)}
                </Select>
              </Field>
              <Field label="Vehicle Number" required>
                <Input value={form.vehicleNumber} onChange={e => setForm(f => ({ ...f, vehicleNumber: e.target.value.toUpperCase() }))} placeholder="KA01AB1234" />
              </Field>
              <Field label="Distance (KM)" required>
                <Input type="number" value={form.distance} onChange={e => setForm(f => ({ ...f, distance: e.target.value }))} placeholder="100" min={0} />
              </Field>
              <Field label="Transporter Name">
                <Input value={form.transporterName} onChange={e => setForm(f => ({ ...f, transporterName: e.target.value }))} placeholder="Transporter Co." />
              </Field>
              <Field label="Transporter GSTIN">
                <Input value={form.transporterId} onChange={e => setForm(f => ({ ...f, transporterId: e.target.value.toUpperCase() }))} placeholder="29ABCDE1234F1Z5" maxLength={15} />
              </Field>
              <Field label="Vehicle Type">
                <Select value={form.vehicleType} onChange={e => setForm(f => ({ ...f, vehicleType: e.target.value }))}>
                  <option value="R">R — Regular</option>
                  <option value="O">O — Over Dimensional Cargo</option>
                </Select>
              </Field>
            </div>
          </GlassCard>

          {/* Footer */}
          <div className="flex justify-end gap-2.5 pb-4">
            <GhostBtn onClick={() => { setView("list"); setEditId(null); setForm({ ...BLANK_FORM }) }}>Cancel</GhostBtn>
            <PrimaryBtn onClick={handleSave} disabled={saving}>
              {saving && <RefreshCw className="size-3.5 animate-spin" />}
              {saving ? "Saving…" : "Save E-Way Bill"}
            </PrimaryBtn>
          </div>
        </motion.div>
      </AnimatePresence>
    </Shell>
  )

  // ═══════════════════════════════════════════════════════
  // ── LIST VIEW
  // ═══════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50/20 to-slate-100">
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: "12px", fontSize: "0.78rem", fontWeight: 600,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.8)",
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
        },
      }} />
      <div className="max-w-screen-xl mx-auto px-4 py-6 flex flex-col gap-5">

        {/* ── Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 350, damping: 22 }}
              className="size-10 rounded-2xl bg-gradient-to-br from-[#F2A119] to-[#f0900a] flex items-center justify-center shadow-lg shadow-[#F2A119]/30"
            >
              <Truck className="size-4 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">E-Way Bills</h1>
              <p className="text-[11px] text-slate-400  font-medium">Manage and track all your E-Way Bills</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }} transition={sp}
              onClick={fetchBills} disabled={loading}
              className="p-2 rounded bg-white border border-slate-200 text-slate-400 hover:text-[#F2A119] shadow-sm transition-colors"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin text-[#F2A119]" : ""}`} />
            </motion.button>
            <PrimaryBtn onClick={() => { setForm({ ...BLANK_FORM }); setEditId(null); setView("form") }} >
              <Plus className="size-4" />New E-Way Bill
            </PrimaryBtn>
          </div>
        </motion.div>

        {/* ── Status Pills */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
          {[
            { label: "All",       value: bills.length,                                       key: "all",       grad: "from-slate-600 to-slate-700",   soft: "bg-white border-slate-200 text-slate-700"       },
            { label: "Draft",     value: bills.filter(b => b.status === "draft").length,     key: "draft",     grad: "from-slate-500 to-slate-600",   soft: "bg-white border-slate-200 text-slate-600"       },
            { label: "Ready",     value: bills.filter(b => b.status === "ready").length,     key: "ready",     grad: "from-sky-500 to-blue-600",      soft: "bg-white border-sky-100 text-sky-700"           },
            { label: "Active",    value: bills.filter(b => b.status === "active").length,    key: "active",    grad: "from-emerald-500 to-teal-500",  soft: "bg-white border-emerald-100 text-emerald-700"   },
            { label: "Cancelled", value: bills.filter(b => b.status === "cancelled").length, key: "cancelled", grad: "from-rose-500 to-red-600",      soft: "bg-white border-rose-100 text-rose-600"         },
          ].map((s, i) => {
            const isActive = filterStatus === s.key
            return (
              <motion.button key={s.key}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.96, y: 0 }}
                onClick={() => setFilterStatus(s.key)}
                className={`relative rounded p-2.5 text-center transition-all border overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-br ${s.grad} text-white border-transparent shadow-lg`
                    : `${s.soft} border shadow-sm hover:shadow-md`
                }`}
              >
                <p className="text-xl font-black tabular-nums">{s.value}</p>
                <p className={`text-[10px] font-bold mt-1 ${isActive ? "text-white/80" : ""}`}>{s.label}</p>
              </motion.button>
            )
          })}
        </div>

        {/* ── Bill List */}
        <div>
          {loading ? (
            <div className="flex flex-col gap-2.5">
              {[...Array(4)].map((_, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}>
                  <SkeletonRow />
                </motion.div>
              ))}
            </div>
          ) : filteredBills.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              transition={smoothSp}
              className="flex flex-col items-center justify-center py-20 gap-4 rounded border-2 border-dashed border-slate-200 bg-white/60"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                className="size-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center shadow-sm"
              >
                <FileText className="size-7 text-slate-300" />
              </motion.div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-400">No E-Way Bills found</p>
                <p className="text-xs text-slate-300 mt-1">
                  {filterStatus === "all" ? "Create your first bill to get started" : `No bills with status "${filterStatus}"`}
                </p>
              </div>
              <PrimaryBtn onClick={() => setView("form")}>
                <Plus className="size-3.5" />Create E-Way Bill
              </PrimaryBtn>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {filteredBills.map(bill => {
                  const sc = SC[bill.status] || SC.draft
                  return (
                    <motion.div key={bill._id}
                      variants={listItem} initial="hidden" animate="show" exit="exit" layout
                      whileHover={{  boxShadow: "0 5px 20px rgba(0,0,0,0.08)" }}
                      transition={{ layout: smoothSp }}
                      className="group bg-white/80 backdrop-blur-sm border border-white/60 rounded px-2.5 py-2 flex  items-center justify-between gap-3 shadow-sm hover:border-[#F2A119]/20 transition-all duration-200"
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`size-9 rounded-xl ${sc.bg} ${sc.ring} ring-1 flex items-center justify-center shrink-0`}>
                          <Truck className={`size-3 ${sc.text}`} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-sm text-slate-900">{bill.docNumber}</span>
                            {bill.invoiceNumber && (
                              <span className="text-[9px] bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-bold border border-sky-100">
                                INV: {bill.invoiceNumber}
                              </span>
                            )}
                            <StatusBadge status={bill.status} />
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate font-medium flex items-center gap-1">
                            <span>{bill.fromTradeName || "—"}</span>
                            <ChevronRight className="size-3 text-slate-300 shrink-0" />
                            <span>{bill.toTradeName || "—"}</span>
                          </p>
                          <div className="flex items-center gap-2.5 mt-1 text-[10px] text-slate-400 font-medium flex-wrap">
                            <span>📅 {bill.docDate}</span>
                            <span className="w-px h-3 bg-slate-200" />
                            <span>🚛 {TRANSPORT_MODES[bill.transportMode]} · {bill.vehicleNumber || "—"}</span>
                            <span className="w-px h-3 bg-slate-200" />
                            <span>{bill.distance} km</span>
                          </div>
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden md:block">
                          <p className="text-[10px] text-slate-400 font-medium">Total Value</p>
                          <p className="font-black text-sm text-slate-900 tabular-nums">{fmt(bill.totalValue)}</p>
                          {bill.ebn && (
                            <p className="text-[9px] text-emerald-600 font-mono mt-0.5 font-bold">{bill.ebn}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-0.5  transition-all duration-200">
                          <IconBtn onClick={() => handleView(bill._id)} title="View"
                            color="text-slate-400 hover:text-sky-600 hover:bg-sky-50">
                            <Eye className="size-3.5" />
                          </IconBtn>
                          {bill.status !== "active" && bill.status !== "cancelled" && (
                            <IconBtn onClick={() => handleEdit(bill._id)} title="Edit"
                              color="text-slate-400 hover:text-[#F2A119] hover:bg-orange-50">
                              <Edit2 className="size-3.5" />
                            </IconBtn>
                          )}
                          <IconBtn onClick={() => handleDelete(bill._id, bill.docNumber)} title="Delete"
                            color="text-slate-400 hover:text-rose-500 hover:bg-rose-50">
                            <Trash2 className="size-3.5" />
                          </IconBtn>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ── How to use */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded shadow bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="size-7 rounded-xl bg-gradient-to-br from-[#F2A119] to-[#f0900a] flex items-center justify-center shrink-0 shadow-sm shadow-[#F2A119]/25 mt-0.5">
              <Zap className="size-3.5 text-white" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-800 mb-1.5">How to use E-Way Bills</p>
              <div className="flex items-center gap-2 flex-wrap text-[11px] text-amber-700 font-medium">
                {["Create Bill", "Generate JSON", "Upload to NIC Portal", "Enter EBN → Active ✅"].map((step, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <span className="size-4 rounded-full bg-[#F2A119]/20 text-[#F2A119] text-[9px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                    {step}
                    {i < 3 && <ChevronRight className="size-3 text-amber-400 shrink-0" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <DeleteModal
        open={!!deleteTarget}
        docNumber={deleteTarget?.docNumber || ""}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        deleting={deleting}
      />
    </div>
  )
}