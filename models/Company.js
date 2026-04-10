const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, unique: true },
  name: { type: String, required: true, trim: true },
  gstin: { type: String, trim: true },
  pan: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },
  country: { type: String, default: 'India' },
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  website: { type: String, trim: true },
  logo: { type: String },
  footerNote: { type: String },
  invoicePrefix: { type: String, default: 'INV' },
  invoiceCounter: { type: Number, default: 1 },
  currency: { type: String, default: 'INR' },
  financialYearStart: { type: String, default: '04' },
  termsConditions: { type: String },
  bankName: { type: String },
  bankAccount: { type: String },
  bankIFSC: { type: String },
  bankBranch: { type: String },
  upiId: { type: String },
  selectedTemplate: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
