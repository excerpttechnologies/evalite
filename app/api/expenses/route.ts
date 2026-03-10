import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import Expense from "@/app/models/Expense"

export async function POST(req: Request) {

  try {

    await dbConnect()

    const body = await req.json()

    const { title, category, amount, date, note } = body

    const expense = await Expense.create({
      title,
      category,
      amount,
      date,
      note
    })

    return NextResponse.json(expense)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to create expense" },
      { status: 500 }
    )

  }

}

export async function GET() {

  try {

    await dbConnect()

    const expenses = await Expense.find()
      .sort({ date: -1 })

    return NextResponse.json(expenses)

  } catch (error) {

    console.error(error)

    return NextResponse.json(
      { error: "Failed to fetch expenses" },
      { status: 500 }
    )

  }

}