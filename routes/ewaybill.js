const express = require('express');
const router = express.Router();
const EwayBill = require('../models/EwayBill');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: false };
    if (search) query.$or = [{ ewayBillNumber: { $regex: search, $options: 'i' } }, { customerName: { $regex: search, $options: 'i' } }];
    const total = await EwayBill.countDocuments(query);
    const bills = await EwayBill.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, bills, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/next-number', protect, async (req, res) => {
  try {
    const count = await EwayBill.countDocuments({ tenantId: req.tenantId });
    const year = new Date().getFullYear().toString().slice(-2);
    res.json({ success: true, ewayBillNumber: `EWB-${year}-${String(count + 1).padStart(6, '0')}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const bill = await EwayBill.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!bill) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const bill = await EwayBill.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const bill = await EwayBill.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, req.body, { new: true });
    res.json({ success: true, bill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await EwayBill.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
