const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true, trim: true },
  sku: { type: String, trim: true },
  barcode: { type: String, trim: true },
  category: { type: String, trim: true },
  subCategory: { type: String, trim: true },
  unit: { type: String, default: 'Nos', trim: true },
  description: { type: String, trim: true },
  purchasePrice: { type: Number, default: 0 },
  sellingPrice: { type: Number, default: 0, required: true },
  mrp: { type: Number, default: 0 },
  taxRate: { type: Number, default: 18 },
  hsnCode: { type: String, trim: true },
  stockQuantity: { type: Number, default: 0 },
  lowStockAlert: { type: Number, default: 5 },
  warehouse: { type: String, trim: true },
  isService: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  image: { type: String }
}, { timestamps: true });

productSchema.index({ tenantId: 1, isDeleted: 1 });

module.exports = mongoose.model('Product', productSchema);
