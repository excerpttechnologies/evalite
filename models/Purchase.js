const mongoose = require('mongoose');

const purchaseItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  description: { type: String },
  hsnCode: { type: String },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'Nos' },
  price: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  amount: { type: Number, required: true }
}, { _id: true });

const purchaseSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  purchaseNumber: { type: String, required: true },
  purchaseDate: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  supplierName: { type: String, required: true },
  supplierPhone: { type: String },
  supplierGstin: { type: String },
  supplierInvoiceNumber: { type: String },
  items: [purchaseItemSchema],
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
  isDeleted: { type: Boolean, default: false },
  financialYear: { type: String }
}, { timestamps: true });

purchaseSchema.index({ tenantId: 1, isDeleted: 1, purchaseDate: -1 });

module.exports = mongoose.model('Purchase', purchaseSchema);
