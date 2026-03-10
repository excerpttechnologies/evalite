import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: String,
  email: String,
  address: String,
  totalPurchases: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
})

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema)