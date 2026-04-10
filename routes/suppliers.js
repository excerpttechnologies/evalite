const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');
const { protect, checkPermission } = require('../middleware/auth');

router.get('/', protect, checkPermission('suppliers'), async (req, res) => {
  try {
    const { search, page = 1, limit = 50, showDeleted } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Supplier.countDocuments(query);
    const suppliers = await Supplier.find(query).sort({ name: 1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, suppliers, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', protect, checkPermission('suppliers'), async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!supplier) return res.status(404).json({ success: false, message: 'Supplier not found' });
    res.json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, checkPermission('suppliers'), async (req, res) => {
  try {
    const supplier = await Supplier.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, checkPermission('suppliers'), async (req, res) => {
  try {
    const supplier = await Supplier.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId }, req.body, { new: true }
    );
    if (!supplier) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, checkPermission('suppliers'), async (req, res) => {
  try {
    await Supplier.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/restore', protect, async (req, res) => {
  try {
    await Supplier.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: false });
    res.json({ success: true, message: 'Supplier restored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/block', protect, async (req, res) => {
  try {
    const supplier = await Supplier.findOne({ _id: req.params.id, tenantId: req.tenantId });
    supplier.isBlocked = !supplier.isBlocked;
    await supplier.save();
    res.json({ success: true, supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
