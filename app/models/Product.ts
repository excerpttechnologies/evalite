import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  purchasePrice: Number,
  sellingPrice: Number,
  stock: Number,
  status: String
})

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema)