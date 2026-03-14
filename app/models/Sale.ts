// import mongoose from "mongoose"

// const SaleSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ added
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
//   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//   quantity: Number,
//   price: Number,
//   total: Number,
//   date: { type: Date, default: Date.now }
// })

// export default mongoose.models.Sale ||
//   mongoose.model("Sale", SaleSchema)




//aravind


import mongoose from "mongoose"

const SaleSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  customer:      { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  product:       { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity:      { type: Number, default: 1 },
  price:         { type: Number, default: 0 },
  total:         { type: Number, default: 0 },
  taxableValue:  { type: Number, default: 0 },
  gstRate:       { type: Number, default: 0 },
  cgst:          { type: Number, default: 0 },
  sgst:          { type: Number, default: 0 },
  igst:          { type: Number, default: 0 },
  invoiceNumber: { type: String, default: "" },
  paymentStatus: { type: String, enum: ["paid", "unpaid", "partial"], default: "paid" },
  paymentMode:   { type: String, enum: ["cash", "upi", "bank", "credit"], default: "cash" },
  date:          { type: Date, default: Date.now }
})

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema)