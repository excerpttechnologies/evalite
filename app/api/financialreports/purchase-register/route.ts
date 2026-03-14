import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Purchase from "@/app/models/Purchase"
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

    const purchases = await Purchase.find({ userId, date: { $gte: startDate, $lte: endDate } })
      .populate("supplier", "name gstin")
      .populate("product", "name")
      .sort({ date: -1 })

    const register = purchases.map((p, idx) => {
      const total        = p.total || p.price * p.quantity || 0
      const taxableValue = p.taxableValue || total || 0
      const cgst  = p.cgst  || (p.gstRate ? (taxableValue * p.gstRate) / 200 : 0)
      const sgst  = p.sgst  || cgst
      const igst  = p.igst  || 0
      const totalTax = cgst + sgst + igst

      return {
        srNo:          idx + 1,
        billNumber:    p.billNumber || `BILL-${String(idx + 1).padStart(4, "0")}`,
        date:          p.date,
        supplierName:  p.supplier?.name || "—",
        supplierGSTIN: p.supplier?.gstin || "—",
        productName:   p.product?.name || "—",
        quantity:      p.quantity || 0,
        unitPrice:     p.price || 0,
        taxableValue,
        cgst:          parseFloat(cgst.toFixed(2)),
        sgst:          parseFloat(sgst.toFixed(2)),
        igst:          parseFloat(igst.toFixed(2)),
        totalTax:      parseFloat(totalTax.toFixed(2)),
        billTotal:     total,
        paymentStatus: p.paymentStatus || "paid",
        paymentMode:   p.paymentMode || "cash",
      }
    })

    const totals = {
      taxableValue: register.reduce((s, r) => s + r.taxableValue, 0),
      cgst:         register.reduce((s, r) => s + r.cgst, 0),
      sgst:         register.reduce((s, r) => s + r.sgst, 0),
      igst:         register.reduce((s, r) => s + r.igst, 0),
      totalTax:     register.reduce((s, r) => s + r.totalTax, 0),
      billTotal:    register.reduce((s, r) => s + r.billTotal, 0),
    }

    return NextResponse.json({ register, totals })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch purchase register" }, { status: 500 })
  }
}