
// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Product from "@/app/models/Product"

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect()

//     const body = await req.json()

//     const status =
//       Number(body.stock) === 0
//         ? "Out of Stock"
//         : Number(body.stock) < 10
//         ? "Low Stock"
//         : "In Stock"

//     const updated = await Product.findByIdAndUpdate(
//       params.id,
//       { ...body, status },
//       { new: true }
//     )

//     if (!updated) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 })
//     }

//     return NextResponse.json(updated)

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
//   }
// }

// export async function DELETE(
//   _req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     await dbConnect()

//     const deleted = await Product.findByIdAndDelete(params.id)

//     if (!deleted) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true })

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
//   }
// }








// app/api/products/[id]/route.ts

// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Product from "@/app/models/Product"

// export async function PUT(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await dbConnect()

//     const { id } = await params   // ← Next.js 15: params is a Promise
//     const body = await req.json()

//     const status =
//       Number(body.stock) === 0
//         ? "Out of Stock"
//         : Number(body.stock) < 10
//         ? "Low Stock"
//         : "In Stock"

//     const updated = await Product.findByIdAndUpdate(
//       id,
//       { ...body, status },
//       { new: true }
//     )

//     if (!updated) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 })
//     }

//     return NextResponse.json(updated)

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
//   }
// }

// export async function DELETE(
//   _req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     await dbConnect()

//     const { id } = await params   // ← Next.js 15: params is a Promise

//     const deleted = await Product.findByIdAndDelete(id)

//     if (!deleted) {
//       return NextResponse.json({ error: "Product not found" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true })

//   } catch (error) {
//     console.error(error)
//     return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
//   }
// }





//aravind

import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Product from "@/app/models/Product"
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

    const status =
      Number(body.stock) === 0
        ? "Out of Stock"
        : Number(body.stock) < 10
        ? "Low Stock"
        : "In Stock"

    // ✅ only update if it belongs to this user
    const updated = await Product.findOneAndUpdate(
      { _id: id, userId },
      { ...body, status },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updated)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
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
    const deleted = await Product.findOneAndDelete({ _id: id, userId })

    if (!deleted) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}