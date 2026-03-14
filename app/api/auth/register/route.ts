// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import User from "@//app/models/User"
// import  dbConnect  from "@/app/lib/mongodb"

// export async function POST(req: Request) {
//   try {
//     await dbConnect()

//     const { name, email, password } = await req.json()

//     const hashed = await bcrypt.hash(password, 10)

//     const user = await User.create({
//       name,
//       email,
//       password: hashed
//     })

//     return NextResponse.json({ message: "User created", user })

//   } catch (error) {
//     return NextResponse.json({ error: "Register failed" }, { status: 500 })
//   }
// }






//aravind

import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import User from "@/app/models/User"  // ✅ fixed typo (was @//app)
import dbConnect from "@/app/lib/mongodb"

export async function POST(req: Request) {
  try {
    await dbConnect()

    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // ✅ Check if email already exists
    const existing = await User.findOne({ email })
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      )
    }

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