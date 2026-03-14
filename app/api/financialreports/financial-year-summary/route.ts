import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
import Purchase from "@/app/models/Purchase"
import Expense from "@/app/models/Expense"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    const { searchParams } = new URL(req.url)
    const year = parseInt(searchParams.get("year") || new Date().getFullYear().toString())

    // ✅ Financial year: April 1 to March 31
    const startDate = new Date(`${year}-04-01T00:00:00.000Z`)
    const endDate   = new Date(`${year + 1}-03-31T23:59:59.999Z`)

    const [sales, purchases, expenses] = await Promise.all([
      Sale.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Purchase.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Expense.find({ userId, date: { $gte: startDate, $lte: endDate } }),
    ])

    const totalSales       = sales.reduce((s, r) => s + (r.total || 0), 0)
    const totalPurchases   = purchases.reduce((s, r) => s + (r.total || r.price * r.quantity || 0), 0)
    const totalExpenses    = expenses.reduce((s, r) => s + (r.amount || 0), 0)

    const totalCGST        = sales.reduce((s, r) => s + (r.cgst || 0), 0)
    const totalSGST        = sales.reduce((s, r) => s + (r.sgst || 0), 0)
    const totalIGST        = sales.reduce((s, r) => s + (r.igst || 0), 0)
    const totalGSTCollected = totalCGST + totalSGST + totalIGST

    const totalGSTPaid     = purchases.reduce((s, r) => s + (r.cgst || 0) + (r.sgst || 0) + (r.igst || 0), 0)

    const paidSales        = sales.filter(s => s.paymentStatus === "paid")
    const totalReceived    = paidSales.reduce((s, r) => s + (r.total || 0), 0)

    const paidPurchases    = purchases.filter(p => p.paymentStatus === "paid")
    const totalPaid        = paidPurchases.reduce((s, r) => s + (r.total || r.price * r.quantity || 0), 0)

    const grossProfit      = totalSales - totalPurchases
    const netProfit        = grossProfit - totalExpenses

    return NextResponse.json({
      fy: `${year}-${year + 1}`,
      startDate, endDate,
      totalSales,
      totalPurchases,
      totalExpenses,
      totalGSTCollected,
      totalGSTPaid,
      netGSTPayable: totalGSTCollected - totalGSTPaid,
      totalReceived,
      totalPaid,
      grossProfit,
      netProfit,
      salesCount:     sales.length,
      purchasesCount: purchases.length,
      expensesCount:  expenses.length,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 })
  }
}