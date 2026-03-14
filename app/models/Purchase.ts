
// import mongoose from "mongoose"

// const PurchaseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ added
//   supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
//   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   quantity: Number,
//   price: Number,
//   date: { type: Date, default: Date.now }
// })

// export default mongoose.models.Purchase ||
//   mongoose.model("Purchase", PurchaseSchema)



//aravind

import mongoose from "mongoose"

const PurchaseSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  supplier:      { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  product:       { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity:      { type: Number, default: 1 },
  price:         { type: Number, default: 0 },
  total:         { type: Number, default: 0 },
  taxableValue:  { type: Number, default: 0 },
  gstRate:       { type: Number, default: 0 },
  cgst:          { type: Number, default: 0 },
  sgst:          { type: Number, default: 0 },
  igst:          { type: Number, default: 0 },
  billNumber:    { type: String, default: "" },
  paymentStatus: { type: String, enum: ["paid", "unpaid", "partial"], default: "paid" },
  paymentMode:   { type: String, enum: ["cash", "upi", "bank", "credit"], default: "cash" },
  date:          { type: Date, default: Date.now }
})

export default mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema)