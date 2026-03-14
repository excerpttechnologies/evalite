import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
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

    const sales = await Sale.find({ userId, date: { $gte: startDate, $lte: endDate } })
      .populate("customer", "name gstin")
      .populate("product", "name")
      .sort({ date: -1 })

    const register = sales.map((s, idx) => {
      const taxableValue = s.taxableValue || (s.total - (s.cgst + s.sgst + s.igst)) || s.price * s.quantity || 0
      const cgst  = s.cgst  || (s.gstRate ? (taxableValue * s.gstRate) / 200 : 0)
      const sgst  = s.sgst  || cgst
      const igst  = s.igst  || 0
      const totalTax = cgst + sgst + igst

      return {
        srNo:          idx + 1,
        invoiceNumber: s.invoiceNumber || `INV-${String(idx + 1).padStart(4, "0")}`,
        date:          s.date,
        customerName:  s.customer?.name || "—",
        customerGSTIN: s.customer?.gstin || "—",
        productName:   s.product?.name || "—",
        quantity:      s.quantity || 0,
        unitPrice:     s.price || 0,
        taxableValue:  taxableValue,
        cgst:          parseFloat(cgst.toFixed(2)),
        sgst:          parseFloat(sgst.toFixed(2)),
        igst:          parseFloat(igst.toFixed(2)),
        totalTax:      parseFloat(totalTax.toFixed(2)),
        invoiceTotal:  s.total || 0,
        paymentStatus: s.paymentStatus || "paid",
        paymentMode:   s.paymentMode || "cash",
      }
    })

    const totals = {
      taxableValue: register.reduce((s, r) => s + r.taxableValue, 0),
      cgst:         register.reduce((s, r) => s + r.cgst, 0),
      sgst:         register.reduce((s, r) => s + r.sgst, 0),
      igst:         register.reduce((s, r) => s + r.igst, 0),
      totalTax:     register.reduce((s, r) => s + r.totalTax, 0),
      invoiceTotal: register.reduce((s, r) => s + r.invoiceTotal, 0),
    }

    return NextResponse.json({ register, totals })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch sales register" }, { status: 500 })
  }
}