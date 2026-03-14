import mongoose from "mongoose"

const SupplierSchema = new mongoose.Schema({
  userId:         { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name:           { type: String, required: true },
  phone:          String,
  email:          String,
  address:        String,
  gstin:          { type: String, default: "" },
  totalPurchases: { type: Number, default: 0 },
  balance:        { type: Number, default: 0 },
})

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema)