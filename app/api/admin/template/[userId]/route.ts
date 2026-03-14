import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import User from "@/app/models/User"
import UserTemplate from "@/app/models/UserTemplate"
import { getUserFromToken } from "@/app/lib/authMiddleware"

// ✅ GET - fetch template for a specific user
export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error

    await dbConnect()

    const requester = await User.findById(auth.user.id)
    if (!requester || requester.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 })
    }

    const { userId } = await params
    const template = await UserTemplate.findOne({ userId })

    return NextResponse.json(template || {})

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 })
  }
}

// ✅ POST - save/update template for a specific user
export async function POST(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error

    await dbConnect()

    const requester = await User.findById(auth.user.id)
    if (!requester || requester.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 })
    }

    const { userId } = await params
    const body = await req.json()

    const { logoPath, templatePath, headerText, footerText, templateStyle } = body

    // ✅ Upsert — create if not exists, update if exists
    const template = await UserTemplate.findOneAndUpdate(
      { userId },
      { userId, logoPath, templatePath, headerText, footerText, templateStyle },
      { new: true, upsert: true }
    )

    return NextResponse.json(template)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to save template" }, { status: 500 })
  }
}