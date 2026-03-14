


// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Purchase from "@/app/models/Purchase"
// import Product from "@/app/models/Product"
// import Supplier from "@/app/models/Supplier"

// export async function POST(req: Request) {

//   try {

//     await dbConnect()

//     const body = await req.json()

//     const purchase = await Purchase.create(body)

//     // ✅ Increase product stock
//     await Product.findByIdAndUpdate(body.product, {
//       $inc: { stock: body.quantity }
//     })

//     // ✅ Update supplier totalPurchases
//     const total = (body.quantity || 0) * (body.price || 0)
//     await Supplier.findByIdAndUpdate(body.supplier, {
//       $inc: { totalPurchases: total }
//     })

//     return NextResponse.json(purchase)

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Failed to create purchase" },
//       { status: 500 }
//     )

//   }

// }

// export async function GET() {

//   try {

//     await dbConnect()

//     const purchases = await Purchase.find()
//       .populate("supplier")
//       .populate("product")

//     return NextResponse.json(purchases)

//   } catch (error) {

//     console.error(error)

//     return NextResponse.json(
//       { error: "Failed to fetch purchases" },
//       { status: 500 }
//     )

//   }

// }




//aravind
import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Purchase from "@/app/models/Purchase"
import Product from "@/app/models/Product"
import Supplier from "@/app/models/Supplier"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function POST(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const body = await req.json()

    // ✅ save purchase with userId
    const purchase = await Purchase.create({ ...body, userId })

    // ✅ only update this user's product stock
    await Product.findOneAndUpdate(
      { _id: body.product, userId },
      { $inc: { stock: body.quantity } }
    )

    // ✅ only update this user's supplier
    const total = (body.quantity || 0) * (body.price || 0)
    await Supplier.findOneAndUpdate(
      { _id: body.supplier, userId },
      { $inc: { totalPurchases: total } }
    )

    return NextResponse.json(purchase)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create purchase" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    // ✅ only this user's purchases
    const purchases = await Purchase.find({ userId })
      .populate("supplier")
      .populate("product")

    return NextResponse.json(purchases)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 })
  }
}