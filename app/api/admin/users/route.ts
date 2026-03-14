import { NextResponse } from "next/server"
import dbConnect from "@/app/lib/mongodb"
import User from "@/app/models/User"
import UserTemplate from "@/app/models/UserTemplate"
import { getUserFromToken } from "@/app/lib/authMiddleware"

export async function GET(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error

    await dbConnect()

    const requester = await User.findById(auth.user.id)
    if (!requester || requester.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 })
    }

    // ✅ Fix — show all users except the logged-in admin himself
    // This works even if other users don't have role field yet
    const users = await User.find({
      _id: { $ne: auth.user.id }  // exclude only the admin himself
    }).select("-password")

    const templates = await UserTemplate.find()

    const usersWithTemplate = users.map(user => {
      const template = templates.find(
        t => t.userId.toString() === user._id.toString()
      )
      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        hasTemplate: !!template,
        template: template || null
      }
    })

    return NextResponse.json(usersWithTemplate)

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}