// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Supplier from "@/app/models/Supplier"

// export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     await dbConnect()
//     const { id } = await params
//     const body = await req.json()

//     const updated = await Supplier.findByIdAndUpdate(id, body, { new: true })
//     return NextResponse.json(updated)
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 })
//   }
// }

// export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     await dbConnect()
//     const { id } = await params

//     await Supplier.findByIdAndDelete(id)
//     return NextResponse.json({ success: true })
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to delete supplier" }, { status: 500 })
//   }
// }



//aravind

import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Supplier from "@/app/models/Supplier"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const { id } = await params
    const body = await req.json()

    // ✅ only update if it belongs to this user
    const updated = await Supplier.findOneAndUpdate(
      { _id: id, userId },
      { ...body },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    }

    return NextResponse.json(updated)

  } catch (error) {
    return NextResponse.json({ error: "Failed to update supplier" }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const { id } = await params

    // ✅ only delete if it belongs to this user
    const deleted = await Supplier.findOneAndDelete({ _id: id, userId })

    if (!deleted) {
      return NextResponse.json({ error: "Supplier not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    return NextResponse.json({ error: "Failed to delete supplier" }, { status: 500 })
  }
}