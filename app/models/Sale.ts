import mongoose from "mongoose"

const SaleSchema = new mongoose.Schema({

  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer"
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },

  quantity: Number,
  price: Number,
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }

})

export default mongoose.models.Sale ||
mongoose.model("Sale", SaleSchema)