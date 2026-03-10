import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@//app/models/User"
import  dbConnect  from "@/app/lib/mongodb"

export async function POST(req: Request) {
  try {
    await dbConnect()

    const { name, email, password } = await req.json()

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashed
    })

    return NextResponse.json({ message: "User created", user })

  } catch (error) {
    return NextResponse.json({ error: "Register failed" }, { status: 500 })
  }
}