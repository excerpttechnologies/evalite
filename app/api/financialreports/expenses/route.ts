import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
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
    const startDate = new Date(`${year}-04-01T00:00:00.000Z`)
    const endDate   = new Date(`${year + 1}-03-31T23:59:59.999Z`)

    const expenses = await Expense.find({ userId, date: { $gte: startDate, $lte: endDate } })
      .sort({ date: -1 })

    const report = expenses.map((e, idx) => ({
      srNo:        idx + 1,
      date:        e.date,
      category:    e.category || "General",
      description: e.title || e.note || "—",
      vendor:      e.vendor || "—",
      paymentMode: e.paymentMode || "cash",
      amount:      e.amount || 0,
      gstAmount:   e.gstAmount || 0,
      total:       (e.amount || 0) + (e.gstAmount || 0),
    }))

    // ✅ Category wise breakdown
    const byCategory: Record<string, number> = {}
    report.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + e.amount
    })

    const totals = {
      amount:    report.reduce((s, r) => s + r.amount, 0),
      gstAmount: report.reduce((s, r) => s + r.gstAmount, 0),
      total:     report.reduce((s, r) => s + r.total, 0),
    }

    return NextResponse.json({ report, totals, byCategory })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}