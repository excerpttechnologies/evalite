const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['superadmin', 'admin', 'subuser'], default: 'admin' },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  phone: { type: String, trim: true },
  avatar: { type: String },
  isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  permissions: {
    dashboard: { type: Boolean, default: true },
    invoices: { type: Boolean, default: true },
    customers: { type: Boolean, default: true },
    suppliers: { type: Boolean, default: true },
    products: { type: Boolean, default: true },
    purchases: { type: Boolean, default: true },
    expenses: { type: Boolean, default: true },
    payments: { type: Boolean, default: true },
    reports: { type: Boolean, default: true },
    ewaybill: { type: Boolean, default: false },
    settings: { type: Boolean, default: false }
  },
  lastLogin: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
