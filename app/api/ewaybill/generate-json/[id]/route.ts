import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import EWayBill from "@/app/models/EWayBill"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect()
  const auth = getUserFromToken(req)
  if ("error" in auth) return auth.error

  const { id } = await params  // ✅ Next.js 15 — must await params

  const bill = await EWayBill.findOne({ _id: id, userId: auth.user.id })
  if (!bill) return NextResponse.json({ error: "Not found" }, { status: 404 })

  // ── Build NIC-compliant JSON ──────────────────────────
  const nicJson = {
    supplyType:    bill.supplyType,
    subSupplyType: bill.subSupplyType,
    docType:       bill.docType,
    docNo:         bill.docNumber,
    docDate:       bill.docDate,
    fromGstin:     bill.fromGSTIN,
    fromTrdName:   bill.fromTradeName,
    fromAddr1:     bill.fromAddress1,
    fromAddr2:     bill.fromAddress2 || "",
    fromPlace:     "",
    fromPincode:   Number(bill.fromPincode) || 0,
    fromStateCode: Number(bill.fromStateCode) || 0,
    toGstin:       bill.toGSTIN,
    toTrdName:     bill.toTradeName,
    toAddr1:       bill.toAddress1,
    toAddr2:       bill.toAddress2 || "",
    toPlace:       "",
    toPincode:     Number(bill.toPincode) || 0,
    toStateCode:   Number(bill.toStateCode) || 0,
    totalValue:    bill.totalValue,
    cgstValue:     bill.cgstValue,
    sgstValue:     bill.sgstValue,
    igstValue:     bill.igstValue,
    cessValue:     bill.cessValue || 0,
    cessNonAdvolValue: 0,
    otherValue:    0,
    totInvValue:   bill.totalValue + bill.cgstValue + bill.sgstValue + bill.igstValue + (bill.cessValue || 0),
    transMode:     bill.transportMode,
    transDistance: bill.distance,
    transporterName: bill.transporterName || "",
    transporterId:   bill.transporterId   || "",
    transDocNo:    "",
    transDocDate:  "",
    vehicleNo:     bill.vehicleNumber || "",
    vehicleType:   bill.vehicleType   || "R",
    itemList: bill.items.map((item: any, idx: number) => ({
      itemNo:        idx + 1,
      productName:   item.productName,
      productDesc:   item.productName,
      hsnCode:       item.hsnCode,
      qtyUnit:       item.unit || "NOS",
      quantity:      item.quantity,
      taxableAmount: item.taxableValue,
      sgstRate:      item.sgstRate  || 0,
      cgstRate:      item.cgstRate  || 0,
      igstRate:      item.igstRate  || 0,
      cessRate:      item.cessRate  || 0,
      cessNonAdvolRate: 0,
    }))
  }

  // Update status to ready if still draft
  if (bill.status === "draft") {
    await EWayBill.findByIdAndUpdate(id, { status: "ready" })
  }

  return NextResponse.json({ nicJson, bill })
}