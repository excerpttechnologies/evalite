const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  category: { type: String, required: true, trim: true },
  subCategory: { type: String, trim: true },
  amount: { type: Number, required: true, min: 0 },
  date: { type: Date, required: true, default: Date.now },
  description: { type: String, trim: true },
  paymentMethod: { type: String, enum: ['cash', 'RTGS', 'UPI', 'NEFT', 'bank', 'cheque', 'given by someone'], default: 'cash' },
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

  // Attendance
  totalWorkingDays: { type: Number, default: 26 },
  presentDays: { type: Number, default: 0 },
  fullDayLeaves: { type: Number, default: 0 },
  halfDayLeaves: { type: Number, default: 0 },
  paidLeaves: { type: Number, default: 0 },
  emergencyLeaves: { type: Number, default: 0 },

  // Earnings
  basicSalary: { type: Number, required: true, default: 0 },
  otHours: { type: Number, default: 0 },
  otRate: { type: Number, default: 0 },
  otAmount: { type: Number, default: 0 },
  otherAllowances: { type: Number, default: 0 },
  incentives: { type: Number, default: 0 },
  bonus: { type: Number, default: 0 },
  grossEarnings: { type: Number, default: 0 },

  // Deductions
  pf: { type: Number, default: 0 },
  esi: { type: Number, default: 0 },
  otherDeductions: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },

  // Final payable amount (kept same name so your list/stats code still works)
  salaryAmount: { type: Number, required: true },

  month: { type: String, required: true },
  year: { type: Number, required: true },
  paymentDate: { type: Date },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentMethod: { type: String, enum: ['cash', 'bank', 'upi', 'cheque', 'neft', 'rtgs'], default: 'bank' },
  notes: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

salarySchema.index({ tenantId: 1, isDeleted: 1 });
salarySchema.index({ tenantId: 1, employeeName: 1 });



module.exports = {
  Expense: mongoose.model('Expense', expenseSchema),
  Salary: mongoose.model('Salary', salarySchema)
};
