import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import EWayBill from "@/app/models/EWayBill"
import { getUserFromToken } from "@/app/lib/authMiddleware"

// ── GET single E-Way Bill ─────────────────────────────────
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const { id } = await params  // ✅ Next.js 15 — must await params

  const bill = await EWayBill.findOne({ _id: id, userId: auth.user.id }).lean()
  if (!bill) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(bill)
}

// ── PUT update E-Way Bill ─────────────────────────────────
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const { id } = await params  // ✅ Next.js 15 — must await params
  const body = await req.json()

  if (body.items && body.items.length > 0) {
    body.totalValue = body.items.reduce((s: number, i: any) => s + (i.taxableValue || 0), 0)
    body.cgstValue  = body.items.reduce((s: number, i: any) => s + ((i.taxableValue * i.cgstRate) / 100 || 0), 0)
    body.sgstValue  = body.items.reduce((s: number, i: any) => s + ((i.taxableValue * i.sgstRate) / 100 || 0), 0)
    body.igstValue  = body.items.reduce((s: number, i: any) => s + ((i.taxableValue * i.igstRate) / 100 || 0), 0)
  }

  const isComplete = body.fromGSTIN && body.toGSTIN && body.vehicleNumber &&
    body.items?.length > 0 && body.distance > 0
  if (body.status !== "active" && body.status !== "cancelled") {
    body.status = isComplete ? "ready" : "draft"
  }

  const bill = await EWayBill.findOneAndUpdate(
    { _id: id, userId: auth.user.id },
    { $set: body },
    { new: true }
  )
  if (!bill) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(bill)
}

// ── DELETE E-Way Bill ─────────────────────────────────────
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const { id } = await params  // ✅ Next.js 15 — must await params

  const bill = await EWayBill.findOne({ _id: id, userId: auth.user.id })
  if (!bill) return NextResponse.json({ error: "Not found" }, { status: 404 })
  if (bill.status === "active") {
    return NextResponse.json({ error: "Cannot delete an active E-Way Bill. Cancel it first." }, { status: 400 })
  }

  await EWayBill.deleteOne({ _id: id, userId: auth.user.id })
  return NextResponse.json({ success: true })
}