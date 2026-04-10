const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const { protect, checkPermission } = require('../middleware/auth');

// GET /api/customers
router.get('/', protect, checkPermission('customers'), async (req, res) => {
  try {
    const { search, page = 1, limit = 50, showDeleted } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' ? true : false };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { gstin: { $regex: search, $options: 'i' } }
      ];
    }
    const total = await Customer.countDocuments(query);
    const customers = await Customer.find(query)
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ success: true, customers, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/customers/:id
router.get('/:id', protect, checkPermission('customers'), async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/customers
router.post('/', protect, checkPermission('customers'), async (req, res) => {
  try {
    const customer = await Customer.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/customers/:id
router.put('/:id', protect, checkPermission('customers'), async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ success: false, message: 'Customer not found' });
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/customers/:id (soft delete)
router.delete('/:id', protect, checkPermission('customers'), async (req, res) => {
  try {
    await Customer.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/customers/:id/restore
router.put('/:id/restore', protect, checkPermission('customers'), async (req, res) => {
  try {
    await Customer.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: false });
    res.json({ success: true, message: 'Customer restored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/customers/:id/block
router.put('/:id/block', protect, checkPermission('customers'), async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id, tenantId: req.tenantId });
    customer.isBlocked = !customer.isBlocked;
    await customer.save();
    res.json({ success: true, customer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
