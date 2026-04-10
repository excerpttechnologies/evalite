const mongoose = require('mongoose');

const ewayBillSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  ewayBillNumber: { type: String, required: true },
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  invoiceNumber: { type: String },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  customerName: { type: String, required: true },
  customerGstin: { type: String },
  fromAddress: { type: String },
  toAddress: { type: String },
  vehicleNumber: { type: String },
  transporterName: { type: String },
  transporterId: { type: String },
  distance: { type: Number },
  transportMode: { type: String, enum: ['road', 'rail', 'air', 'ship'], default: 'road' },
  supplyType: { type: String, enum: ['outward', 'inward'], default: 'outward' },
  subType: { type: String },
  items: [{
    name: String,
    hsnCode: String,
    quantity: Number,
    unit: String,
    taxableValue: Number,
    taxRate: Number
  }],
  totalValue: { type: Number },
  validUpto: { type: Date },
  generatedDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['generated', 'cancelled'], default: 'generated' },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

ewayBillSchema.index({ tenantId: 1, isDeleted: 1 });

module.exports = mongoose.model('EwayBill', ewayBillSchema);
