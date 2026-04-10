const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const Payment = require('../models/Payment');
const { protect, checkPermission } = require('../middleware/auth');

const getFinancialYear = (date) => {
  const d = date ? new Date(date) : new Date();
  const year = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${year}-${year + 1}`;
};

router.get('/', protect, checkPermission('purchases'), async (req, res) => {
  try {
    const { search, status, from, to, page = 1, limit = 20, showDeleted } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' };
    if (search) {
      query.$or = [
        { purchaseNumber: { $regex: search, $options: 'i' } },
        { supplierName: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.paymentStatus = status;
    if (from || to) {
      query.purchaseDate = {};
      if (from) query.purchaseDate.$gte = new Date(from);
      if (to) query.purchaseDate.$lte = new Date(to + 'T23:59:59');
    }
    const total = await Purchase.countDocuments(query);
    const purchases = await Purchase.find(query).sort({ purchaseDate: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, purchases, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/next-number', protect, async (req, res) => {
  try {
    const count = await Purchase.countDocuments({ tenantId: req.tenantId });
    const year = new Date().getFullYear().toString().slice(-2);
    res.json({ success: true, purchaseNumber: `PO-${year}-${String(count + 1).padStart(4, '0')}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', protect, async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!purchase) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', protect, checkPermission('purchases'), async (req, res) => {
  try {
    const data = { ...req.body, tenantId: req.tenantId };
    data.financialYear = getFinancialYear(data.purchaseDate);
    data.balanceAmount = data.totalAmount - (data.paidAmount || 0);
    if (data.balanceAmount <= 0) data.paymentStatus = 'paid';
    else if (data.paidAmount > 0) data.paymentStatus = 'partial';
    else data.paymentStatus = 'unpaid';

    const purchase = await Purchase.create(data);

    // Add stock
    for (const item of purchase.items) {
      if (item.productId) {
        await Product.findOneAndUpdate(
          { _id: item.productId, tenantId: req.tenantId },
          { $inc: { stockQuantity: item.quantity }, $set: { purchasePrice: item.price } }
        );
      }
    }

    if (data.balanceAmount > 0) {
      await Supplier.findByIdAndUpdate(purchase.supplierId, { $inc: { totalOutstanding: data.balanceAmount } });
    }

    if (purchase.paidAmount > 0) {
      await Payment.create({
        tenantId: req.tenantId, type: 'made', referenceType: 'purchase',
        referenceId: purchase._id, referenceNumber: purchase.purchaseNumber,
        partyType: 'supplier', partyId: purchase.supplierId, partyName: purchase.supplierName,
        amount: purchase.paidAmount, date: purchase.purchaseDate, paymentMethod: purchase.paymentMethod
      });
    }

    res.status(201).json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', protect, checkPermission('purchases'), async (req, res) => {
  try {
    const data = { ...req.body };
    data.balanceAmount = data.totalAmount - (data.paidAmount || 0);
    if (data.balanceAmount <= 0) data.paymentStatus = 'paid';
    else if (data.paidAmount > 0) data.paymentStatus = 'partial';
    else data.paymentStatus = 'unpaid';
    const purchase = await Purchase.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, data, { new: true });
    res.json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Purchase.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id/restore', protect, async (req, res) => {
  try {
    await Purchase.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: false });
    res.json({ success: true, message: 'Restored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:id/payment', protect, async (req, res) => {
  try {
    const { amount, paymentMethod, date, notes } = req.body;
    const purchase = await Purchase.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!purchase) return res.status(404).json({ success: false, message: 'Not found' });

    purchase.paidAmount = (purchase.paidAmount || 0) + parseFloat(amount);
    purchase.balanceAmount = purchase.totalAmount - purchase.paidAmount;
    if (purchase.balanceAmount <= 0) { purchase.balanceAmount = 0; purchase.paymentStatus = 'paid'; }
    else purchase.paymentStatus = 'partial';
    await purchase.save();

    await Payment.create({
      tenantId: req.tenantId, type: 'made', referenceType: 'purchase',
      referenceId: purchase._id, referenceNumber: purchase.purchaseNumber,
      partyType: 'supplier', partyId: purchase.supplierId, partyName: purchase.supplierName,
      amount: parseFloat(amount), date: date || new Date(), paymentMethod: paymentMethod || 'cash', notes
    });

    await Supplier.findByIdAndUpdate(purchase.supplierId, { $inc: { totalOutstanding: -parseFloat(amount) } });

    res.json({ success: true, purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
