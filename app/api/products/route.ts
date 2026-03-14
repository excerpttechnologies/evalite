// import { NextResponse } from "next/server"
// import dbConnect from '@/app/lib/mongodb';
// import Product from "@/app/models/Product"

// export async function GET() {
//   try {
//     await dbConnect()

// const products = await Product.find()
// return NextResponse.json(products || [])
//   } catch (error) {
//     console.error(error)

//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 }
//     )
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await dbConnect()

//     const body = await req.json()

//     const product = await Product.create(body)

//     return NextResponse.json(product)

//   } catch (error) {
//     console.error(error)

//     return NextResponse.json(
//       { error: "Failed to create product" },
//       { status: 500 }
//     )
//   }
// }





//aravind

import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Product from "@/app/models/Product"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const products = await Product.find({ userId }) // ✅ only this user's products
    return NextResponse.json(products || [])

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()
    const body = await req.json()
    const product = await Product.create({ ...body, userId }) // ✅ save with userId
    return NextResponse.json(product)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}