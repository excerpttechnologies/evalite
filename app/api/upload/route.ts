import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { getUserFromToken } from "@/app/lib/authMiddleware"
import User from "@/app/models/User"
import dbConnect from "@/app/lib/mongodb"

export async function POST(req: Request) {
  try {
    const auth = getUserFromToken(req)
    if ("error" in auth) return auth.error

    await dbConnect()

    const requester = await User.findById(auth.user.id)
    if (!requester || requester.role !== "admin") {
      return NextResponse.json({ error: "Admin access only" }, { status: 403 })
    }

    // ✅ Parse formData
    let formData: FormData
    try {
      formData = await req.formData()
    } catch (e) {
      console.error("FormData parse error:", e)
      return NextResponse.json({ error: "Failed to parse form data" }, { status: 400 })
    }

    const file = formData.get("file") as File | null

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("📁 Uploading file:", file.name, "size:", file.size, "type:", file.type)

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // ✅ Create uploads folder if not exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")
    await mkdir(uploadDir, { recursive: true })

    // ✅ Unique filename
    const timestamp = Date.now()
    const cleanName = file.name.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._-]/g, "")
    const fileName = `${timestamp}-${cleanName}`
    const filePath = path.join(uploadDir, fileName)

    await writeFile(filePath, buffer)

    console.log("✅ File saved to:", filePath)

    const publicPath = `/uploads/${fileName}`
    return NextResponse.json({ message: "File uploaded successfully", path: publicPath, fileName })

  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed", details: String(error) }, { status: 500 })
  }
}