import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Customer from "@/app/models/Customer"

export async function GET() {
  try {

    await dbConnect()

    const customers = await Customer.find()

    return NextResponse.json(customers)

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {

  try {

    await dbConnect()

    const body = await req.json()

    const newCustomer = await Customer.create(body)

    return NextResponse.json(newCustomer)

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    )
  }
}