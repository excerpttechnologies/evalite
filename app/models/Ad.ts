// File location: models/Ad.ts
// Mongoose model for ERP Billing System - Ad Campaigns

import mongoose, { Schema, Document, Model } from "mongoose"

// ── TypeScript Interface ──────────────────────────────────────────────────────
export interface IAd extends Document {
  adName: string
  clickLink: string
  contact?: string
  mediaPaths: string[]   // e.g. ["/uploads/ads/1720000000-abc.jpg", ...]
  mediaTypes: string[]   // e.g. ["image", "video", ...]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// ── Schema ────────────────────────────────────────────────────────────────────
const AdSchema = new Schema<IAd>(
  {
    adName: {
      type: String,
      required: [true, "Ad name is required"],
      trim: true,
      maxlength: [120, "Ad name must be under 120 characters"],
    },

    clickLink: {
      type: String,
      required: [true, "Clickable link is required"],
      trim: true,
    },

    contact: {
      type: String,
      trim: true,
      default: "",
    },

    // Stores public-facing file paths like /uploads/ads/filename.jpg
    mediaPaths: {
      type: [String],
      required: [true, "At least one media file is required"],
      validate: {
        validator: (arr: string[]) => arr.length >= 1 && arr.length <= 5,
        message: "You must upload between 1 and 5 media files",
      },
    },

    // Stores "image" or "video" for each corresponding mediaPaths entry
    mediaTypes: {
      type: [String],
      enum: ["image", "video"],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // auto-manages createdAt & updatedAt
  }
)

// ── Indexes ───────────────────────────────────────────────────────────────────
AdSchema.index({ createdAt: -1 })   // fast sort by latest
AdSchema.index({ isActive: 1 })     // fast filter active ads

// ── Model (prevent re-compile error in Next.js hot reload) ────────────────────
const Ad: Model<IAd> = mongoose.models.Ad || mongoose.model<IAd>("Ad", AdSchema)

export default Ad