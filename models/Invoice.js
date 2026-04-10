const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  description: { type: String },
  hsnCode: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'Nos' },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  discountType: { type: String, enum: ['percent', 'amount'], default: 'percent' },
  taxRate: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  amount: { type: Number, required: true }
}, { _id: true });

const invoiceSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  invoiceNumber: { type: String, required: true },
  invoiceDate: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String },
  customerEmail: { type: String },
  customerGstin: { type: String },
  billingAddress: { type: String },
  shippingAddress: { type: String },
  gstType: { type: String, enum: ['igst', 'cgst_sgst', 'exempt', 'composition'], default: 'cgst_sgst' },
  items: [invoiceItemSchema],
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  cgst: { type: Number, default: 0 },
  sgst: { type: Number, default: 0 },
  igst: { type: Number, default: 0 },
  totalTax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  paidAmount: { type: Number, default: 0 },
  balanceAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['unpaid', 'partial', 'paid'], default: 'unpaid' },
  paymentMethod: { type: String, enum: ['cash', 'upi', 'bank', 'cheque', 'credit'], default: 'cash' },
  notes: { type: String },
  termsConditions: { type: String },
  template: { type: Number, default: 1 },
  isDeleted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  financialYear: { type: String }
}, { timestamps: true });

invoiceSchema.index({ tenantId: 1, isDeleted: 1, invoiceDate: -1 });

module.exports = mongoose.model('Invoice', invoiceSchema);
