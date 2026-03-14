// import mongoose from "mongoose"

// const SettingsSchema = new mongoose.Schema({

//   businessName:String,
//   ownerName:String,
//   phone:String,
//   email:String,
//   address:String,
//   gst:String,
//   currency:{
//     type:String,
//     default:"INR"
//   }

// })

// export default mongoose.models.Settings ||
// mongoose.model("Settings",SettingsSchema)



//aravind

import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ added
  businessName: String,
  ownerName: String,
  phone: String,
  email: String,
  address: String,
  gst: String,
  currency: { type: String, default: "INR" }
})

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema)