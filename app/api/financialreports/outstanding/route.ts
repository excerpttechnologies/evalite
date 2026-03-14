import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
import Purchase from "@/app/models/Purchase"
import Customer from "@/app/models/Customer"
import Supplier from "@/app/models/Supplier"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    const { searchParams } = new URL(req.url)
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString())
    const startDate = new Date(`${year}-04-01T00:00:00.000Z`)
    const endDate   = new Date(`${year + 1}-03-31T23:59:59.999Z`)

    const [sales, purchases, customers, suppliers] = await Promise.all([
      Sale.find({ userId, date: { $gte: startDate, $lte: endDate } }).populate("customer", "name"),
      Purchase.find({ userId, date: { $gte: startDate, $lte: endDate } }).populate("supplier", "name"),
      Customer.find({ userId }),
      Supplier.find({ userId }),
    ])

    // ✅ Customer outstanding
    const customerMap: Record<string, { name: string; totalInvoices: number; amountPaid: number; outstanding: number }> = {}

    sales.forEach(s => {
      const cId   = s.customer?._id?.toString() || "unknown"
      const cName = s.customer?.name || "Unknown"
      if (!customerMap[cId]) customerMap[cId] = { name: cName, totalInvoices: 0, amountPaid: 0, outstanding: 0 }
      const total = s.total || 0
      customerMap[cId].totalInvoices += total
      if (s.paymentStatus === "paid") {
        customerMap[cId].amountPaid += total
      } else if (s.paymentStatus === "partial") {
        customerMap[cId].amountPaid += total * 0.5
        customerMap[cId].outstanding += total * 0.5
      } else {
        customerMap[cId].outstanding += total
      }
    })

    // ✅ Supplier outstanding
    const supplierMap: Record<string, { name: string; totalBills: number; amountPaid: number; outstanding: number }> = {}

    purchases.forEach(p => {
      const sId   = p.supplier?._id?.toString() || "unknown"
      const sName = p.supplier?.name || "Unknown"
      if (!supplierMap[sId]) supplierMap[sId] = { name: sName, totalBills: 0, amountPaid: 0, outstanding: 0 }
      const total = p.total || p.price * p.quantity || 0
      supplierMap[sId].totalBills += total
      if (p.paymentStatus === "paid") {
        supplierMap[sId].amountPaid += total
      } else if (p.paymentStatus === "partial") {
        supplierMap[sId].amountPaid += total * 0.5
        supplierMap[sId].outstanding += total * 0.5
      } else {
        supplierMap[sId].outstanding += total
      }
    })

    const customerOutstanding = Object.values(customerMap)
      .filter(c => c.outstanding > 0)
      .sort((a, b) => b.outstanding - a.outstanding)

    const supplierOutstanding = Object.values(supplierMap)
      .filter(s => s.outstanding > 0)
      .sort((a, b) => b.outstanding - a.outstanding)

    return NextResponse.json({
      customerOutstanding,
      supplierOutstanding,
      totalCustomerOutstanding: customerOutstanding.reduce((s, r) => s + r.outstanding, 0),
      totalSupplierOutstanding: supplierOutstanding.reduce((s, r) => s + r.outstanding, 0),
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch outstanding" }, { status: 500 })
  }
}