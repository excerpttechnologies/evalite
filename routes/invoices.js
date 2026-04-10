const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Company = require('../models/Company');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const Payment = require('../models/Payment');
const { protect, checkPermission } = require('../middleware/auth');

const getFinancialYear = (date) => {
  const d = date ? new Date(date) : new Date();
  const year = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1;
  return `${year}-${year + 1}`;
};

// GET /api/invoices
router.get('/', protect, checkPermission('invoices'), async (req, res) => {
  try {
    const { search, status, from, to, page = 1, limit = 20, showDeleted, customerId } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: showDeleted === 'true' };
    if (search) {
      query.$or = [
        { invoiceNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } }
      ];
    }
    if (status) query.paymentStatus = status;
    if (from || to) {
      query.invoiceDate = {};
      if (from) query.invoiceDate.$gte = new Date(from);
      if (to) query.invoiceDate.$lte = new Date(to + 'T23:59:59');
    }
    if (customerId) query.customerId = customerId;

    const total = await Invoice.countDocuments(query);
    const invoices = await Invoice.find(query)
      .sort({ invoiceDate: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json({ success: true, invoices, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/invoices/next-number
router.get('/next-number', protect, async (req, res) => {
  try {
    const company = await Company.findOne({ tenantId: req.tenantId });
    const prefix = company?.invoicePrefix || 'INV';
    const counter = company?.invoiceCounter || 1;
    const year = new Date().getFullYear().toString().slice(-2);
    const invoiceNumber = `${prefix}-${year}-${String(counter).padStart(4, '0')}`;
    res.json({ success: true, invoiceNumber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/invoices/:id
router.get('/:id', protect, checkPermission('invoices'), async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });
    res.json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/invoices
router.post('/', protect, checkPermission('invoices'), async (req, res) => {
  try {
    const invoiceData = { ...req.body, tenantId: req.tenantId };
    invoiceData.financialYear = getFinancialYear(invoiceData.invoiceDate);
    invoiceData.balanceAmount = invoiceData.totalAmount - (invoiceData.paidAmount || 0);
    if (invoiceData.balanceAmount <= 0) invoiceData.paymentStatus = 'paid';
    else if (invoiceData.paidAmount > 0) invoiceData.paymentStatus = 'partial';
    else invoiceData.paymentStatus = 'unpaid';

    const invoice = await Invoice.create(invoiceData);

    // Increment invoice counter
    await Company.findOneAndUpdate({ tenantId: req.tenantId }, { $inc: { invoiceCounter: 1 } });

    // Deduct stock
    for (const item of invoice.items) {
      if (item.productId) {
        await Product.findOneAndUpdate(
          { _id: item.productId, tenantId: req.tenantId },
          { $inc: { stockQuantity: -item.quantity } }
        );
      }
    }

    // Update customer outstanding
    if (invoice.balanceAmount > 0) {
      await Customer.findByIdAndUpdate(invoice.customerId, { $inc: { totalOutstanding: invoice.balanceAmount } });
    }

    // Create payment record if paid
    if (invoice.paidAmount > 0) {
      await Payment.create({
        tenantId: req.tenantId,
        type: 'received',
        referenceType: 'invoice',
        referenceId: invoice._id,
        referenceNumber: invoice.invoiceNumber,
        partyType: 'customer',
        partyId: invoice.customerId,
        partyName: invoice.customerName,
        amount: invoice.paidAmount,
        date: invoice.invoiceDate,
        paymentMethod: invoice.paymentMethod
      });
    }

    res.status(201).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/invoices/:id
router.put('/:id', protect, checkPermission('invoices'), async (req, res) => {
  try {
    const existing = await Invoice.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!existing) return res.status(404).json({ success: false, message: 'Not found' });

    const updateData = { ...req.body };
    updateData.balanceAmount = updateData.totalAmount - (updateData.paidAmount || 0);
    if (updateData.balanceAmount <= 0) updateData.paymentStatus = 'paid';
    else if (updateData.paidAmount > 0) updateData.paymentStatus = 'partial';
    else updateData.paymentStatus = 'unpaid';

    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId }, updateData, { new: true }
    );
    res.json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/invoices/:id (soft)
router.delete('/:id', protect, checkPermission('invoices'), async (req, res) => {
  try {
    await Invoice.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: true });
    res.json({ success: true, message: 'Invoice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/invoices/:id/restore
router.put('/:id/restore', protect, async (req, res) => {
  try {
    await Invoice.findOneAndUpdate({ _id: req.params.id, tenantId: req.tenantId }, { isDeleted: false });
    res.json({ success: true, message: 'Restored' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/invoices/:id/payment - Record partial payment
router.post('/:id/payment', protect, async (req, res) => {
  try {
    const { amount, paymentMethod, date, notes, chequeNumber, upiRef } = req.body;
    const invoice = await Invoice.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!invoice) return res.status(404).json({ success: false, message: 'Not found' });

    invoice.paidAmount = (invoice.paidAmount || 0) + parseFloat(amount);
    invoice.balanceAmount = invoice.totalAmount - invoice.paidAmount;
    if (invoice.balanceAmount <= 0) { invoice.balanceAmount = 0; invoice.paymentStatus = 'paid'; }
    else invoice.paymentStatus = 'partial';
    if (paymentMethod) invoice.paymentMethod = paymentMethod;

    await invoice.save();

    await Payment.create({
      tenantId: req.tenantId,
      type: 'received',
      referenceType: 'invoice',
      referenceId: invoice._id,
      referenceNumber: invoice.invoiceNumber,
      partyType: 'customer',
      partyId: invoice.customerId,
      partyName: invoice.customerName,
      amount: parseFloat(amount),
      date: date || new Date(),
      paymentMethod: paymentMethod || 'cash',
      chequeNumber, upiRef, notes
    });

    // Update customer outstanding
    await Customer.findByIdAndUpdate(invoice.customerId, { $inc: { totalOutstanding: -parseFloat(amount) } });

    res.json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
