const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  category: { type: String, required: true, trim: true },
  subCategory: { type: String, trim: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, trim: true },
  paymentMethod: { type: String, enum: ['cash', 'upi', 'bank', 'cheque'], default: 'cash' },
  reference: { type: String, trim: true },
  vendor: { type: String, trim: true },
  receipt: { type: String },
  isRecurring: { type: Boolean, default: false },
  recurringFrequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'yearly'] },
  isDeleted: { type: Boolean, default: false },
  financialYear: { type: String }
}, { timestamps: true });

// Salary sub-schema
const salarySchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  employeeName: { type: String, required: true, trim: true },
  role: { type: String, trim: true },
  department: { type: String, trim: true },
  salaryAmount: { type: Number, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  paymentDate: { type: Date },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentMethod: { type: String, enum: ['cash', 'bank', 'upi', 'cheque'], default: 'bank' },
  notes: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

expenseSchema.index({ tenantId: 1, isDeleted: 1, date: -1 });
salarySchema.index({ tenantId: 1, isDeleted: 1 });

module.exports = {
  Expense: mongoose.model('Expense', expenseSchema),
  Salary: mongoose.model('Salary', salarySchema)
};
