import mongoose from 'mongoose'

const UserTemplateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true  // ✅ one template per user
  },
  logoPath: { type: String, default: "" },        // /uploads/logo-xyz.png
  templatePath: { type: String, default: "" },    // /uploads/template-xyz.pdf
  headerText: { type: String, default: "" },      // company name + address
  footerText: { type: String, default: "" },      // thank you note, terms
  templateStyle: {
    type: String,
    enum: ['Classic', 'Modern', 'Minimal', 'Professional'],
    default: 'Classic'
  }
}, { timestamps: true })

export default mongoose.models.UserTemplate ||
  mongoose.model('UserTemplate', UserTemplateSchema)