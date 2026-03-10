import mongoose from "mongoose"

const PurchaseSchema = new mongoose.Schema({
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier"
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  quantity: Number,
  price: Number,
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.models.Purchase ||
mongoose.model("Purchase", PurchaseSchema)