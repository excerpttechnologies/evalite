import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
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

    const [sales, purchases] = await Promise.all([
      Sale.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Purchase.find({ userId, date: { $gte: startDate, $lte: endDate } }),
    ])

    // ✅ GST collected on sales
    const salesTaxableValue = sales.reduce((s, r) => {
      const tv = r.taxableValue || (r.price * r.quantity) || 0
      return s + tv
    }, 0)

    const cgstCollected = sales.reduce((s, r) => {
      const tv = r.taxableValue || (r.price * r.quantity) || 0
      return s + (r.cgst || (r.gstRate ? tv * r.gstRate / 200 : 0))
    }, 0)

    const sgstCollected = sales.reduce((s, r) => {
      const tv = r.taxableValue || (r.price * r.quantity) || 0
      return s + (r.sgst || (r.gstRate ? tv * r.gstRate / 200 : 0))
    }, 0)

    const igstCollected = sales.reduce((s, r) => s + (r.igst || 0), 0)

    const totalGSTCollected = cgstCollected + sgstCollected + igstCollected

    // ✅ GST paid on purchases
    const purchaseTaxableValue = purchases.reduce((s, r) => {
      const tv = r.taxableValue || (r.price * r.quantity) || 0
      return s + tv
    }, 0)

    const cgstPaid = purchases.reduce((s, r) => {
      const tv = r.taxableValue || (r.price * r.quantity) || 0
      return s + (r.cgst || (r.gstRate ? tv * r.gstRate / 200 : 0))
    }, 0)

    const sgstPaid = purchases.reduce((s, r) => {
      const tv = r.taxableValue || (r.price * r.quantity) || 0
      return s + (r.sgst || (r.gstRate ? tv * r.gstRate / 200 : 0))
    }, 0)

    const igstPaid = purchases.reduce((s, r) => s + (r.igst || 0), 0)

    const totalGSTPaid = cgstPaid + sgstPaid + igstPaid

    // ✅ Monthly GST for chart
    const monthlyGST: Record<string, { collected: number; paid: number }> = {}
    sales.forEach(s => {
      const month = new Date(s.date).toLocaleString("en-IN", { month: "short", year: "2-digit" })
      if (!monthlyGST[month]) monthlyGST[month] = { collected: 0, paid: 0 }
      const tv = s.taxableValue || s.price * s.quantity || 0
      monthlyGST[month].collected += s.cgst + s.sgst + s.igst || (s.gstRate ? tv * s.gstRate / 100 : 0)
    })
    purchases.forEach(p => {
      const month = new Date(p.date).toLocaleString("en-IN", { month: "short", year: "2-digit" })
      if (!monthlyGST[month]) monthlyGST[month] = { collected: 0, paid: 0 }
      const tv = p.taxableValue || p.price * p.quantity || 0
      monthlyGST[month].paid += p.cgst + p.sgst + p.igst || (p.gstRate ? tv * p.gstRate / 100 : 0)
    })

    return NextResponse.json({
      // Sales GST
      salesTaxableValue:   parseFloat(salesTaxableValue.toFixed(2)),
      cgstCollected:       parseFloat(cgstCollected.toFixed(2)),
      sgstCollected:       parseFloat(sgstCollected.toFixed(2)),
      igstCollected:       parseFloat(igstCollected.toFixed(2)),
      totalGSTCollected:   parseFloat(totalGSTCollected.toFixed(2)),
      // Purchase GST
      purchaseTaxableValue: parseFloat(purchaseTaxableValue.toFixed(2)),
      cgstPaid:            parseFloat(cgstPaid.toFixed(2)),
      sgstPaid:            parseFloat(sgstPaid.toFixed(2)),
      igstPaid:            parseFloat(igstPaid.toFixed(2)),
      totalGSTPaid:        parseFloat(totalGSTPaid.toFixed(2)),
      // Net
      netGSTPayable:       parseFloat((totalGSTCollected - totalGSTPaid).toFixed(2)),
      monthlyGST,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch GST summary" }, { status: 500 })
  }
}