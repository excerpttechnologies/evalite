import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import EWayBill from "@/app/models/EWayBill"
import Sale from "@/app/models/Sale"
import { getUserFromToken } from "@/app/lib/authMiddleware"

// ── GET all E-Way Bills for user ──────────────────────────
export async function GET(req: NextRequest) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")
  const query: any = { userId: auth.user.id }
  if (status) query.status = status

  const bills = await EWayBill.find(query).sort({ createdAt: -1 })
  return NextResponse.json(bills)
}

// ── POST create new E-Way Bill ────────────────────────────
export async function POST(req: NextRequest) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const body = await req.json()

  // If invoiceId provided, auto-fill from sale
  if (body.invoiceId) {
    const sale = await Sale.findOne({ _id: body.invoiceId, userId: auth.user.id })
    if (!sale) return NextResponse.json({ error: "Invoice not found" }, { status: 404 })

    // Auto-fill invoice details if not provided
    body.docNumber    = body.docNumber    || sale.invoiceNumber || sale._id.toString()
    body.docDate      = body.docDate      || new Date(sale.createdAt).toLocaleDateString("en-IN")
    body.totalValue   = body.totalValue   || sale.totalAmount || 0
    body.cgstValue    = body.cgstValue    || sale.cgst || 0
    body.sgstValue    = body.sgstValue    || sale.sgst || 0
    body.igstValue    = body.igstValue    || sale.igst || 0
    body.invoiceNumber = sale.invoiceNumber || sale._id.toString()

    // Auto-fill customer as "To" details if available
    if (sale.customerName && !body.toTradeName) {
      body.toTradeName = sale.customerName
    }
    if (sale.customerGSTIN && !body.toGSTIN) {
      body.toGSTIN = sale.customerGSTIN
    }
  }

  // Calculate totals from items if provided
  if (body.items && body.items.length > 0) {
    body.totalValue = body.items.reduce((s: number, i: any) => s + (i.taxableValue || 0), 0)
    body.cgstValue  = body.items.reduce((s: number, i: any) => s + ((i.taxableValue * i.cgstRate) / 100 || 0), 0)
    body.sgstValue  = body.items.reduce((s: number, i: any) => s + ((i.taxableValue * i.sgstRate) / 100 || 0), 0)
    body.igstValue  = body.items.reduce((s: number, i: any) => s + ((i.taxableValue * i.igstRate) / 100 || 0), 0)
  }

  // Set status based on completeness
  const isComplete = body.fromGSTIN && body.toGSTIN && body.vehicleNumber &&
    body.items?.length > 0 && body.distance > 0
  body.status = isComplete ? "ready" : "draft"

  const bill = await EWayBill.create({ ...body, userId: auth.user.id })
  return NextResponse.json(bill, { status: 201 })
}