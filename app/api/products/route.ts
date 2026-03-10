import { NextResponse } from "next/server"
import dbConnect from '@/app/lib/mongodb';
import Product from "@/app/models/Product"

export async function GET() {
  try {
    await dbConnect()

const products = await Product.find()
return NextResponse.json(products || [])
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect()

    const body = await req.json()

    const product = await Product.create(body)

    return NextResponse.json(product)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}