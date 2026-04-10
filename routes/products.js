const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, checkPermission } = require('../middleware/auth');

router.get('/', protect, checkPermission('products'), async (req, res) => {
  try {
    const { search, category, lowStock, page = 1, limit = 50, showDeleted } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { barcode: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) query.category = category;
    if (lowStock === 'true') query.$expr = { $lte: ['$stockQuantity', '$lowStockAlert'] };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort({ name: 1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, products, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/categories', protect, async (req, res) => {
  try {
    const categories = await Product.distinct('category', { tenantId: req.tenantId, isDeleted: false });
    res.json({ success: true, categories: categories.filter(Boolean) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, checkPermission('products'), async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, checkPermission('products'), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId }, req.body, { new: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, checkPermission('products'), async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/restore', protect, async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: false });
    res.json({ success: true, message: 'Restored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Adjust stock
router.put('/:id/stock', protect, async (req, res) => {
  try {
    const { adjustment, type } = req.body; // type: 'add' | 'subtract' | 'set'
    const product = await Product.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!product) return res.status(404).json({ success: false, message: 'Not found' });
    if (type === 'set') product.stockQuantity = adjustment;
    else if (type === 'add') product.stockQuantity += adjustment;
    else if (type === 'subtract') product.stockQuantity = Math.max(0, product.stockQuantity - adjustment);
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
