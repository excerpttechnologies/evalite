const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { protect, checkPermission } = require('../middleware/auth');

router.get('/', protect, checkPermission('payments'), async (req, res) => {
  try {
    const { type, from, to, method, page = 1, limit = 20, partyId, showDeleted } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' };
    if (type) query.type = type;
    if (method) query.paymentMethod = method;
    if (partyId) query.partyId = partyId;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to + 'T23:59:59');
    }
    const total = await Payment.countDocuments(query);
    const payments = await Payment.find(query).sort({ date: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    const summary = await Payment.aggregate([
      { $match: { ...query, isDeleted: false } },
      { $group: { _id: '$type', total: { $sum: '$amount' } } }
    ]);
    res.json({ success: true, payments, total, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, checkPermission('payments'), async (req, res) => {
  try {
    const payment = await Payment.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, req.body, { new: true });
    res.json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Payment.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
