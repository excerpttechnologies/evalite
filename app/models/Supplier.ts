import mongoose from "mongoose"

const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: String,
  email: String,
  address: String,
  totalPurchases: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  }
})

export default mongoose.models.Supplier ||
mongoose.model("Supplier", SupplierSchema)