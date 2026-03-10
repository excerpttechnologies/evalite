import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema({

  businessName:String,
  ownerName:String,
  phone:String,
  email:String,
  address:String,
  gst:String,
  currency:{
    type:String,
    default:"INR"
  }

})

export default mongoose.models.Settings ||
mongoose.model("Settings",SettingsSchema)