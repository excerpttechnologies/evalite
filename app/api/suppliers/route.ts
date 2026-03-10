import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Supplier from "@/app/models/Supplier"

export async function GET() {
  try {

    await dbConnect()

    const suppliers = await Supplier.find()

    return NextResponse.json(suppliers)

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {

    await dbConnect()

    const body = await req.json()

    const supplier = await Supplier.create(body)

    return NextResponse.json(supplier)

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 }
    )
  }
}