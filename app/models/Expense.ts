import mongoose from "mongoose"

const ExpenseSchema = new mongoose.Schema({
  title: String,
  category: String,
  amount: Number,
  date: Date,
  note: String
})

export default mongoose.models.Expense ||
  mongoose.model("Expense", ExpenseSchema)