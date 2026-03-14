
// import mongoose from "mongoose"

// const ExpenseSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ added
//   title: String,
//   category: String,
//   amount: Number,
//   date: Date,
//   note: String
// })

// export default mongoose.models.Expense ||
//   mongoose.model("Expense", ExpenseSchema)



//aravind

import mongoose from "mongoose"

const ExpenseSchema = new mongoose.Schema({
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title:       { type: String },
  category:    { type: String },
  amount:      { type: Number, default: 0 },
  gstAmount:   { type: Number, default: 0 },
  vendor:      { type: String, default: "" },
  paymentMode: { type: String, enum: ["cash", "upi", "bank", "credit"], default: "cash" },
  date:        { type: Date, default: Date.now },
  note:        { type: String }
})

export default mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema)