// File location: app/api/admin/ads/route.ts

import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir, unlink } from "fs/promises"
import path from "path"
import { existsSync } from "fs"
import mongoose from "mongoose"
import Ad from "../../../models/Ad"

// ── DB connect ────────────────────────────────────────────────────────────────
let isConnected = false
async function connectDB() {
  if (isConnected) return
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not defined in .env.local")
  await mongoose.connect(uri, { dbName: "evalite" })
  isConnected = true
}

// ── Constants ─────────────────────────────────────────────────────────────────
const MAX_FILES  = 5
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "ads")
const ALLOWED_MIME = new Set([
  "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp",
  "video/mp4", "video/mov", "video/quicktime", "video/webm", "video/avi",
])

// ── Helper: save uploaded files to disk ──────────────────────────────────────
async function saveFiles(files: File[]) {
  if (!existsSync(UPLOAD_DIR)) await mkdir(UPLOAD_DIR, { recursive: true })

  const paths: string[] = []
  const types: string[] = []

  for (const file of files) {
    const ext        = file.name.split(".").pop()?.toLowerCase() ?? "bin"
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const filePath   = path.join(UPLOAD_DIR, uniqueName)
    await writeFile(filePath, Buffer.from(await file.arrayBuffer()))
    paths.push(`/uploads/ads/${uniqueName}`)
    types.push(file.type.startsWith("video") ? "video" : "image")
  }
  return { paths, types }
}

// ── Helper: delete file from disk safely ─────────────────────────────────────
async function deleteFileFromDisk(publicPath: string) {
  try {
    const filePath = path.join(process.cwd(), "public", publicPath)
    if (existsSync(filePath)) await unlink(filePath)
  } catch { /* ignore */ }
}

// ── POST: Create new ad ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const formData  = await req.formData()
    const adName    = (formData.get("adName")    as string)?.trim()
    const clickLink = (formData.get("clickLink") as string)?.trim()
    const contact   = (formData.get("contact")   as string)?.trim() ?? ""

    if (!adName)    return NextResponse.json({ error: "Ad name is required."        }, { status: 400 })
    if (!clickLink) return NextResponse.json({ error: "Clickable link is required." }, { status: 400 })
    try { new URL(clickLink) } catch { return NextResponse.json({ error: "Enter a valid URL (include https://)." }, { status: 400 }) }

    const mediaEntries = formData.getAll("media") as File[]
    if (!mediaEntries.length)        return NextResponse.json({ error: "At least one media file is required." }, { status: 400 })
    if (mediaEntries.length > MAX_FILES) return NextResponse.json({ error: `Maximum ${MAX_FILES} files allowed.` }, { status: 400 })
    for (const f of mediaEntries) {
      if (!ALLOWED_MIME.has(f.type)) return NextResponse.json({ error: `Unsupported file type: ${f.type}` }, { status: 400 })
    }

    const { paths, types } = await saveFiles(mediaEntries)

    const ad = await Ad.create({ adName, clickLink, contact, mediaPaths: paths, mediaTypes: types, isActive: true })

    return NextResponse.json({ success: true, message: "Ad published.", ad }, { status: 201 })
  } catch (err: any) {
    console.error("[ADS POST]", err)
    return NextResponse.json({ error: err?.message ?? "Internal server error." }, { status: 500 })
  }
}

// ── GET: List all ads ─────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const filter = searchParams.get("active") === "true" ? { isActive: true } : {}
    const ads = await Ad.find(filter).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ success: true, ads })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}

// ── PUT: Edit an existing ad ──────────────────────────────────────────────────
export async function PUT(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Ad ID is required." }, { status: 400 })

    const existing = await Ad.findById(id)
    if (!existing) return NextResponse.json({ error: "Ad not found." }, { status: 404 })

    const formData     = await req.formData()
    const adName       = (formData.get("adName")       as string)?.trim()
    const clickLink    = (formData.get("clickLink")    as string)?.trim()
    const contact      = (formData.get("contact")      as string)?.trim() ?? ""
    const removedPaths: string[] = JSON.parse((formData.get("removedPaths") as string) || "[]")

    if (!adName)    return NextResponse.json({ error: "Ad name is required."        }, { status: 400 })
    if (!clickLink) return NextResponse.json({ error: "Clickable link is required." }, { status: 400 })
    try { new URL(clickLink) } catch { return NextResponse.json({ error: "Enter a valid URL (include https://)." }, { status: 400 }) }

    // Build kept paths/types (exclude removed)
    const keptPaths: string[] = []
    const keptTypes: string[] = []
    existing.mediaPaths.forEach((p: string, i: number) => {
      if (!removedPaths.includes(p)) { keptPaths.push(p); keptTypes.push(existing.mediaTypes[i]) }
    })

    // Save new uploaded files
    const newFiles = formData.getAll("media") as File[]
    let newPaths: string[] = []
    let newTypes: string[] = []
    if (newFiles.length) {
      const totalAfter = keptPaths.length + newFiles.length
      if (totalAfter > MAX_FILES) return NextResponse.json({ error: `Total files cannot exceed ${MAX_FILES}.` }, { status: 400 })
      const saved = await saveFiles(newFiles)
      newPaths = saved.paths
      newTypes = saved.types
    }

    if (keptPaths.length + newPaths.length === 0) {
      return NextResponse.json({ error: "At least one media file is required." }, { status: 400 })
    }

    // Delete removed files from disk
    for (const p of removedPaths) await deleteFileFromDisk(p)

    // Update document
    const updated = await Ad.findByIdAndUpdate(
      id,
      {
        adName,
        clickLink,
        contact,
        mediaPaths: [...keptPaths, ...newPaths],
        mediaTypes: [...keptTypes, ...newTypes],
      },
      { new: true }
    )

    return NextResponse.json({ success: true, message: "Ad updated.", ad: updated })
  } catch (err: any) {
    console.error("[ADS PUT]", err)
    return NextResponse.json({ error: err?.message ?? "Internal server error." }, { status: 500 })
  }
}

// ── DELETE: Remove an ad ──────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "Ad ID is required." }, { status: 400 })

    const ad = await Ad.findByIdAndDelete(id)
    if (!ad) return NextResponse.json({ error: "Ad not found." }, { status: 404 })

    // Delete all associated files from disk
    for (const p of ad.mediaPaths) await deleteFileFromDisk(p)

    return NextResponse.json({ success: true, message: "Ad deleted." })
  } catch (err: any) {
    console.error("[ADS DELETE]", err)
    return NextResponse.json({ error: err?.message }, { status: 500 })
  }
}