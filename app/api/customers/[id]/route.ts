// // app/api/customers/[id]/route.ts
// // Create folder: app/api/customers/[id]/
// // Create file:   app/api/customers/[id]/route.ts

// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Customer from "@/app/models/Customer"

// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await dbConnect()

//     const { id } = await params
//     const body = await req.json()

//     const updated = await Customer.findByIdAndUpdate(
//       id,
//       { ...body },
//       { new: true }
//     )

//     if (!updated) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 })
//     }

//     return NextResponse.json(updated)

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
//   }
// }

// export async function DELETE(
//   _req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await dbConnect()

//     const { id } = await params

//     const deleted = await Customer.findByIdAndDelete(id)

//     if (!deleted) {
//       return NextResponse.json({ error: "Customer not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true })

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 })
//   }
// }


//aravind

import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Customer from "@/app/models/Customer"
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
    const updated = await Customer.findOneAndUpdate(
      { _id: id, userId },
      { ...body },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json(updated)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
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
    const deleted = await Customer.findOneAndDelete({ _id: id, userId })

    if (!deleted) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 })
  }
}