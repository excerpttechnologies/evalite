// import { NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import User from "@//app/models/User"
// import  dbConnect  from "@/app/lib/mongodb"

// export async function POST(req: Request) {
//   try {
//     await dbConnect()

//     const { email, password } = await req.json()

//     const user = await User.findOne({ email })

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 })
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//       return NextResponse.json({ error: "Invalid password" }, { status: 401 })
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET!,
//       { expiresIn: "7d" }
//     )

//     return NextResponse.json({ token, user })

//   } catch (error) {
//     return NextResponse.json({ error: "Login failed" }, { status: 500 })
//   }
// }


import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "@/app/models/User"
import dbConnect from "@/app/lib/mongodb"

export async function POST(req: Request) {
  try {
    await dbConnect()

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      )
    }

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    )

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    )
  }
}