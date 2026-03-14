import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Sale from "@/app/models/Sale"
import Purchase from "@/app/models/Purchase"
import Expense from "@/app/models/Expense"
import Product from "@/app/models/Product"
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

    const [sales, purchases, expenses] = await Promise.all([
      Sale.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Purchase.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Expense.find({ userId, date: { $gte: startDate, $lte: endDate } }),
    ])

    const totalRevenue   = sales.reduce((s, r) => s + (r.total || 0), 0)
    const cogs           = purchases.reduce((s, r) => s + (r.total || r.price * r.quantity || 0), 0)
    const grossProfit    = totalRevenue - cogs
    const totalExpenses  = expenses.reduce((s, r) => s + (r.amount || 0), 0)
    const netProfitBeforeTax = grossProfit - totalExpenses
    const taxRate        = 0.30
    const taxAmount      = netProfitBeforeTax > 0 ? netProfitBeforeTax * taxRate : 0
    const netProfitAfterTax  = netProfitBeforeTax - taxAmount

    // ✅ Expense breakdown by category
    const expenseByCategory: Record<string, number> = {}
    expenses.forEach(e => {
      const cat = e.category || "Other"
      expenseByCategory[cat] = (expenseByCategory[cat] || 0) + (e.amount || 0)
    })

    // ✅ Monthly revenue for chart
    const monthlyRevenue: Record<string, number> = {}
    sales.forEach(s => {
      const month = new Date(s.date).toLocaleString("en-IN", { month: "short", year: "2-digit" })
      monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (s.total || 0)
    })

    return NextResponse.json({
      totalRevenue,
      cogs,
      grossProfit,
      grossMargin: totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(2) : "0",
      totalExpenses,
      netProfitBeforeTax,
      taxAmount,
      netProfitAfterTax,
      expenseByCategory,
      monthlyRevenue,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch P&L" }, { status: 500 })
  }
}