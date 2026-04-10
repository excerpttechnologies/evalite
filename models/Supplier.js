const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  gstin: { type: String, trim: true },
  pan: { type: String, trim: true },
  address: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },
  country: { type: String, default: 'India' },
  creditLimit: { type: Number, default: 0 },
  openingBalance: { type: Number, default: 0 },
  openingBalanceType: { type: String, enum: ['debit', 'credit'], default: 'credit' },
  paymentTerms: { type: Number, default: 30 },
  bankName: { type: String },
  bankAccount: { type: String },
  bankIFSC: { type: String },
  notes: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  totalOutstanding: { type: Number, default: 0 }
}, { timestamps: true });

supplierSchema.index({ tenantId: 1, isDeleted: 1 });

module.exports = mongoose.model('Supplier', supplierSchema);
