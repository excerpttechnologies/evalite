// import { NextResponse } from "next/server"
// import dbConnect from "@/app/lib/mongodb"
// import Purchase from "@/app/models/Purchase"
// import Product from "@/app/models/Product"

// export async function POST(req: Request) {

//   await dbConnect()

//   const body = await req.json()

//   const purchase = await Purchase.create(body)

//   // Increase stock
//   await Product.findByIdAndUpdate(body.product, {
//     $inc: { stock: body.quantity }
//   })

//   return NextResponse.json(purchase)
// }

// export async function GET() {

//   await dbConnect()

//   const purchases = await Purchase.find()
//     .populate("supplier")
//     .populate("product")

//   return NextResponse.json(purchases)
// }











import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Purchase from "@/app/models/Purchase"
import Product from "@/app/models/Product"

export async function POST(req: Request) {

  try {

    await dbConnect()

    const body = await req.json()

    const purchase = await Purchase.create(body)

    // increase stock
    await Product.findByIdAndUpdate(body.product, {
      $inc: { stock: body.quantity }
    })

    return NextResponse.json(purchase)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to create purchase" },
      { status: 500 }
    )

  }

}

export async function GET() {

  try {

    await dbConnect()

    const purchases = await Purchase.find()
      .populate("supplier")
      .populate("product")

    return NextResponse.json(purchases)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch purchases" },
      { status: 500 }
    )

  }

}