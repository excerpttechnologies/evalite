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

    const [sales, purchases, expenses, products] = await Promise.all([
      Sale.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Purchase.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Expense.find({ userId, date: { $gte: startDate, $lte: endDate } }),
      Product.find({ userId }),
    ])

    // ✅ Assets
    const totalSales       = sales.reduce((s, r) => s + (r.total || 0), 0)
    const totalPurchases   = purchases.reduce((s, r) => s + (r.total || r.price * r.quantity || 0), 0)
    const totalExpenses    = expenses.reduce((s, r) => s + (r.amount || 0), 0)

    const cashInHand       = totalSales - totalPurchases - totalExpenses
    const accountsReceivable = sales
      .filter(s => s.paymentStatus !== "paid")
      .reduce((s, r) => s + (r.total || 0), 0)

    const inventoryValue   = products.reduce((s, p) => s + ((p.stock || 0) * (p.purchasePrice || 0)), 0)

    // ✅ Liabilities
    const accountsPayable  = purchases
      .filter(p => p.paymentStatus !== "paid")
      .reduce((s, r) => s + (r.total || r.price * r.quantity || 0), 0)

    const cgstCollected    = sales.reduce((s, r) => {
      const tv = r.taxableValue || r.price * r.quantity || 0
      return s + (r.cgst || (r.gstRate ? tv * r.gstRate / 200 : 0))
    }, 0)
    const sgstCollected    = sales.reduce((s, r) => {
      const tv = r.taxableValue || r.price * r.quantity || 0
      return s + (r.sgst || (r.gstRate ? tv * r.gstRate / 200 : 0))
    }, 0)
    const gstPaid          = purchases.reduce((s, r) => {
      const tv = r.taxableValue || r.price * r.quantity || 0
      return s + (r.cgst || 0) + (r.sgst || 0) + (r.igst || 0) || (r.gstRate ? tv * r.gstRate / 100 : 0)
    }, 0)
    const gstPayable       = cgstCollected + sgstCollected - gstPaid

    // ✅ Equity
    const grossProfit      = totalSales - totalPurchases
    const netProfit        = grossProfit - totalExpenses

    const totalAssets      = Math.max(cashInHand, 0) + accountsReceivable + inventoryValue
    const totalLiabilities = accountsPayable + Math.max(gstPayable, 0)
    const ownerEquity      = totalAssets - totalLiabilities

    return NextResponse.json({
      assets: {
        cashInHand:          parseFloat(Math.max(cashInHand, 0).toFixed(2)),
        accountsReceivable:  parseFloat(accountsReceivable.toFixed(2)),
        inventoryValue:      parseFloat(inventoryValue.toFixed(2)),
        totalAssets:         parseFloat(totalAssets.toFixed(2)),
      },
      liabilities: {
        accountsPayable:     parseFloat(accountsPayable.toFixed(2)),
        gstPayable:          parseFloat(Math.max(gstPayable, 0).toFixed(2)),
        totalLiabilities:    parseFloat(totalLiabilities.toFixed(2)),
      },
      equity: {
        retainedEarnings:    parseFloat(netProfit.toFixed(2)),
        ownerEquity:         parseFloat(ownerEquity.toFixed(2)),
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch balance sheet" }, { status: 500 })
  }
}