const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  type: { type: String, enum: ['received', 'made'], required: true },
  referenceType: { type: String, enum: ['invoice', 'purchase', 'other'], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId },
  referenceNumber: { type: String },
  partyType: { type: String, enum: ['customer', 'supplier'] },
  partyId: { type: mongoose.Schema.Types.ObjectId },
  partyName: { type: String, required: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true, default: Date.now },
  paymentMethod: { type: String, enum: ['cash', 'upi', 'bank', 'cheque', 'credit'], default: 'cash' },
  chequeNumber: { type: String },
  chequeDate: { type: Date },
  bankName: { type: String },
  upiRef: { type: String },
  transactionId: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'cancelled'], default: 'completed' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

paymentSchema.index({ tenantId: 1, isDeleted: 1, date: -1 });

module.exports = mongoose.model('Payment', paymentSchema);
