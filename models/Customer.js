const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  gstin: { type: String, trim: true },
  pan: { type: String, trim: true },
  billingAddress: { type: String, trim: true },
  shippingAddress: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  pincode: { type: String, trim: true },
  country: { type: String, default: 'India' },
  creditLimit: { type: Number, default: 0 },
  openingBalance: { type: Number, default: 0 },
  openingBalanceType: { type: String, enum: ['debit', 'credit'], default: 'debit' },
  paymentTerms: { type: Number, default: 30 },
  customerType: { type: String, enum: ['regular', 'wholesale', 'retail'], default: 'regular' },
  notes: { type: String },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  totalOutstanding: { type: Number, default: 0 }
}, { timestamps: true });

customerSchema.index({ tenantId: 1, isDeleted: 1 });

module.exports = mongoose.model('Customer', customerSchema);
