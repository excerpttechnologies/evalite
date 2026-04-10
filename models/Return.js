const mongoose = require('mongoose');

// Audit trail entry
const timelineSchema = new mongoose.Schema({
  action: { type: String, required: true },
  note: { type: String },
  performedBy: { type: String },
  performedAt: { type: Date, default: Date.now }
}, { _id: false });

// Returned item line
const returnItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, default: 'Nos' },
  price: { type: Number, default: 0 },
  taxRate: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
  condition: { type: String, enum: ['good', 'damaged', 'partial'], default: 'good' }
}, { _id: true });

const returnSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  returnNumber: { type: String, required: true },

  // Linked invoice
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice', required: true },
  invoiceNumber: { type: String, required: true },

  // Customer (auto-fetched from invoice)
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String, required: true },
  customerPhone: { type: String },
  customerEmail: { type: String },

  // Return items
  items: [returnItemSchema],

  // Totals
  subtotal: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },

  // Return info
  reason: { type: String, required: true },
  notes: { type: String },
  date: { type: Date, default: Date.now },

  // Status flow: pending → approved/rejected → completed
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },

  // Resolution (set after approval)
  resolutionType: {
    type: String,
    enum: ['refund', 'replacement', 'partial_refund', 'extra_charge', null],
    default: null
  },
  resolutionNote: { type: String },

  // Credit / Debit Note reference
  creditNoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'CreditDebitNote' },
  debitNoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'CreditDebitNote' },

  // Admin fields
  reviewedBy: { type: String },
  reviewedAt: { type: Date },
  rejectionReason: { type: String },

  // Audit trail
  timeline: [timelineSchema],

  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

returnSchema.index({ tenantId: 1, status: 1 });
returnSchema.index({ tenantId: 1, invoiceId: 1 });

// Credit/Debit Note schema
const creditDebitNoteSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  noteNumber: { type: String, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },

  // Linked return
  returnId: { type: mongoose.Schema.Types.ObjectId, ref: 'Return' },
  returnNumber: { type: String },

  // Linked original invoice
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  invoiceNumber: { type: String },

  // Customer
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String, required: true },
  customerGstin: { type: String },

  // Items
  items: [{
    name: String,
    quantity: Number,
    unit: { type: String, default: 'Nos' },
    price: Number,
    taxRate: Number,
    taxAmount: Number,
    amount: Number
  }],

  // Amounts
  subtotal: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  cgst: { type: Number, default: 0 },
  sgst: { type: Number, default: 0 },
  igst: { type: Number, default: 0 },
  totalTax: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },

  gstType: { type: String, default: 'cgst_sgst' },
  reason: { type: String },
  notes: { type: String },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'cancelled'], default: 'active' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

creditDebitNoteSchema.index({ tenantId: 1, type: 1 });

module.exports = {
  Return: mongoose.model('Return', returnSchema),
  CreditDebitNote: mongoose.model('CreditDebitNote', creditDebitNoteSchema)
};
