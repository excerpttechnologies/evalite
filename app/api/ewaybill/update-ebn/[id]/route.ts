import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import EWayBill from "@/app/models/EWayBill"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const { id } = await params  // ✅ Next.js 15 — must await params

  const { ebn, validUpto } = await req.json()

  if (!ebn) return NextResponse.json({ error: "EBN is required" }, { status: 400 })

  // EBN is always exactly 12 digits
  if (!/^\d{12}$/.test(ebn)) {
    return NextResponse.json({ error: "EBN must be exactly 12 digits" }, { status: 400 })
  }

  const bill = await EWayBill.findOneAndUpdate(
    { _id: id, userId: auth.user.id },
    {
      ebn,
      status: "active",
      ebnGeneratedAt: new Date(),
      validUpto: validUpto ? new Date(validUpto) : undefined,
    },
    { new: true }
  )
  if (!bill) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(bill)
}