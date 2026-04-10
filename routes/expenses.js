const express = require('express');
const router = express.Router();
const { Expense, Salary } = require('../models/Expense');
const { protect, checkPermission } = require('../middleware/auth');

const EXPENSE_CATEGORIES = [
  'Rent', 'Electricity', 'Water', 'Internet', 'Telephone',
  'Office Supplies', 'Travel', 'Fuel', 'Vehicle Maintenance',
  'Marketing', 'Advertising', 'Software', 'Hardware',
  'Repairs & Maintenance', 'Legal & Professional', 'Bank Charges',
  'Insurance', 'Miscellaneous', 'Salary', 'Raw Material',
  'Packing Material', 'Labour', 'Commission', 'Other'
];

router.get('/categories', protect, async (req, res) => {
  res.json({ success: true, categories: EXPENSE_CATEGORIES });
});

// EXPENSES
router.get('/', protect, checkPermission('expenses'), async (req, res) => {
  try {
    const { search, category, from, to, page = 1, limit = 20, showDeleted } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' };
    if (search) query.$or = [{ category: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }, { vendor: { $regex: search, $options: 'i' } }];
    if (category) query.category = category;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to + 'T23:59:59');
    }
    const total = await Expense.countDocuments(query);
    const expenses = await Expense.find(query).sort({ date: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    const totalAmount = await Expense.aggregate([
      { $match: query },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    res.json({ success: true, expenses, total, totalAmount: totalAmount[0]?.total || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, checkPermission('expenses'), async (req, res) => {
  try {
    const expense = await Expense.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, checkPermission('expenses'), async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, req.body, { new: true });
    if (!expense) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Expense.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/restore', protect, async (req, res) => {
  try {
    await Expense.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: false });
    res.json({ success: true, message: 'Restored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// SALARY
router.get('/salary', protect, async (req, res) => {
  try {
    const { month, year, page = 1, limit = 20 } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: false };
    if (month) query.month = month;
    if (year) query.year = parseInt(year);
    const total = await Salary.countDocuments(query);
    const salaries = await Salary.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, salaries, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/salary', protect, async (req, res) => {
  try {
    const salary = await Salary.create({ ...req.body, tenantId: req.tenantId });
    res.status(201).json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/salary/:id', protect, async (req, res) => {
  try {
    const salary = await Salary.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, req.body, { new: true });
    res.json({ success: true, salary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/salary/:id', protect, async (req, res) => {
  try {
    await Salary.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
