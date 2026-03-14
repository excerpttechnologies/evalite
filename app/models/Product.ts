// import mongoose from "mongoose"

// const ProductSchema = new mongoose.Schema({
//   name: String,
//   category: String,
//   purchasePrice: Number,
//   sellingPrice: Number,
//   stock: Number,
//   status: String
// })

// export default mongoose.models.Product ||
//   mongoose.model("Product", ProductSchema)


//aravind
import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ added
  name: String,
  category: String,
  purchasePrice: Number,
  sellingPrice: Number,
  stock: Number,
  status: String
})

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema)