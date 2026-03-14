import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import UserTemplate from "@/app/models/UserTemplate"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error
    const userId = auth.user.id

    await dbConnect()

    // ✅ Fetch template set by admin for this user
    const template = await UserTemplate.findOne({ userId })
    return NextResponse.json(template || {})

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 })
  }
}