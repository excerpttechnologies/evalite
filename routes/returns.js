const express = require('express');
const router = express.Router();
const { Return, CreditDebitNote } = require('../models/Return');
const Invoice = require('../models/Invoice');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const { protect } = require('../middleware/auth');

// Helper: get next return number
const getNextReturnNumber = async (tenantId) => {
  const count = await Return.countDocuments({ tenantId });
  const year = new Date().getFullYear().toString().slice(-2);
  return `RET-${year}-${String(count + 1).padStart(4, '0')}`;
};

// Helper: get next note number
const getNextNoteNumber = async (tenantId, type) => {
  const { CreditDebitNote } = require('../models/Return');
  const count = await CreditDebitNote.countDocuments({ tenantId, type });
  const year = new Date().getFullYear().toString().slice(-2);
  const prefix = type === 'credit' ? 'CN' : 'DN';
  return `${prefix}-${year}-${String(count + 1).padStart(4, '0')}`;
};

// ─── GET all returns ────────────────────────────────────────────────
router.get('/', protect, async (req, res) => {
  try {
    const { status, from, to, customerId, invoiceId, page = 1, limit = 20 } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: false };
    if (status) query.status = status;
    if (customerId) query.customerId = customerId;
    if (invoiceId) query.invoiceId = invoiceId;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to + 'T23:59:59');
    }
    const total = await Return.countDocuments(query);
    const returns = await Return.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, returns, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── GET dashboard stats ────────────────────────────────────────────
router.get('/stats', protect, async (req, res) => {
  try {
    const tid = req.tenantId;
    const [pending, approved, rejected, completed, creditNotes, debitNotes, recent] = await Promise.all([
      Return.countDocuments({ tenantId: tid, status: 'pending', isDeleted: false }),
      Return.countDocuments({ tenantId: tid, status: 'approved', isDeleted: false }),
      Return.countDocuments({ tenantId: tid, status: 'rejected', isDeleted: false }),
      Return.countDocuments({ tenantId: tid, status: 'completed', isDeleted: false }),
      CreditDebitNote.aggregate([{ $match: { tenantId: tid, type: 'credit', isDeleted: false } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      CreditDebitNote.aggregate([{ $match: { tenantId: tid, type: 'debit', isDeleted: false } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Return.find({ tenantId: tid, isDeleted: false }).sort({ createdAt: -1 }).limit(5)
    ]);
    res.json({
      success: true,
      stats: {
        pending, approved, rejected, completed,
        totalCreditIssued: creditNotes[0]?.total || 0,
        totalDebitIssued: debitNotes[0]?.total || 0
      },
      recentReturns: recent
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── GET next return number ─────────────────────────────────────────
router.get('/next-number', protect, async (req, res) => {
  try {
    const returnNumber = await getNextReturnNumber(req.tenantId);
    res.json({ success: true, returnNumber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── GET single return ──────────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const ret = await Return.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!ret) return res.status(404).json({ success: false, message: 'Return not found' });

    // Fetch linked credit/debit notes
    const notes = await CreditDebitNote.find({
      tenantId: req.tenantId,
      returnId: ret._id,
      isDeleted: false
    });

    // Fetch original invoice
    const invoice = await Invoice.findById(ret.invoiceId);

    res.json({ success: true, return: ret, notes, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── CREATE return ──────────────────────────────────────────────────
router.post('/', protect, async (req, res) => {
  try {
    const { invoiceId, items, reason, notes, date } = req.body;

    if (!invoiceId) return res.status(400).json({ success: false, message: 'Invoice required' });
    if (!items || !items.length) return res.status(400).json({ success: false, message: 'Items required' });
    if (!reason) return res.status(400).json({ success: false, message: 'Reason required' });

    // Fetch invoice for customer details
    const invoice = await Invoice.findOne({ _id: invoiceId, tenantId: req.tenantId });
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' });

    const returnNumber = await getNextReturnNumber(req.tenantId);

    // Calculate totals
    let subtotal = 0, taxAmount = 0;
    items.forEach(item => {
      const lineAmt = item.quantity * item.price;
      const tax = lineAmt * (item.taxRate || 0) / 100;
      subtotal += lineAmt;
      taxAmount += tax;
      item.amount = lineAmt + tax;
    });

    const ret = await Return.create({
      tenantId: req.tenantId,
      returnNumber,
      invoiceId: invoice._id,
      invoiceNumber: invoice.invoiceNumber,
      customerId: invoice.customerId,
      customerName: invoice.customerName,
      customerPhone: invoice.customerPhone,
      customerEmail: invoice.customerEmail,
      items,
      subtotal,
      taxAmount,
      totalAmount: subtotal + taxAmount,
      reason,
      notes,
      date: date || new Date(),
      timeline: [{
        action: 'Return Request Created',
        note: `Return request ${returnNumber} created for invoice ${invoice.invoiceNumber}`,
        performedBy: req.user.name
      }]
    });

    res.status(201).json({ success: true, return: ret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── APPROVE return ─────────────────────────────────────────────────
router.put('/:id/approve', protect, async (req, res) => {
  try {
    const ret = await Return.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!ret) return res.status(404).json({ success: false, message: 'Not found' });
    if (ret.status !== 'pending') return res.status(400).json({ success: false, message: 'Only pending returns can be approved' });

    ret.status = 'approved';
    ret.reviewedBy = req.user.name;
    ret.reviewedAt = new Date();
    ret.timeline.push({
      action: 'Return Approved',
      note: req.body.note || 'Return request approved',
      performedBy: req.user.name
    });
    await ret.save();

    res.json({ success: true, return: ret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── REJECT return ──────────────────────────────────────────────────
router.put('/:id/reject', protect, async (req, res) => {
  try {
    const ret = await Return.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!ret) return res.status(404).json({ success: false, message: 'Not found' });
    if (ret.status !== 'pending') return res.status(400).json({ success: false, message: 'Only pending returns can be rejected' });

    ret.status = 'rejected';
    ret.reviewedBy = req.user.name;
    ret.reviewedAt = new Date();
    ret.rejectionReason = req.body.reason || '';
    ret.timeline.push({
      action: 'Return Rejected',
      note: req.body.reason || 'Return request rejected',
      performedBy: req.user.name
    });
    await ret.save();

    res.json({ success: true, return: ret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── RESOLVE return (credit note / debit note / replacement) ────────
router.put('/:id/resolve', protect, async (req, res) => {
  try {
    const { resolutionType, resolutionNote, refundAmount, gstType } = req.body;
    const ret = await Return.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!ret) return res.status(404).json({ success: false, message: 'Not found' });
    if (ret.status !== 'approved') return res.status(400).json({ success: false, message: 'Return must be approved first' });

    const invoice = await Invoice.findById(ret.invoiceId);
    const usedGstType = gstType || invoice?.gstType || 'cgst_sgst';
    const amount = parseFloat(refundAmount) || ret.totalAmount;

    // Calculate taxes for the note
    const taxableAmt = amount / (1 + (ret.taxAmount / Math.max(ret.subtotal, 1)));
    const taxAmt = amount - taxableAmt;
    let cgst = 0, sgst = 0, igst = 0;
    if (usedGstType === 'igst') igst = taxAmt;
    else { cgst = taxAmt / 2; sgst = taxAmt / 2; }

    let noteType = null;
    let stockAction = null;

    if (resolutionType === 'refund' || resolutionType === 'partial_refund') {
      noteType = 'credit';
    } else if (resolutionType === 'extra_charge') {
      noteType = 'debit';
    } else if (resolutionType === 'replacement') {
      // Stock OUT for replacement + Stock IN for returned items
      for (const item of ret.items) {
        if (item.productId) {
          if (item.condition === 'good') {
            // Good returned items go back to stock
            await Product.findOneAndUpdate(
              { _id: item.productId, tenantId: req.tenantId },
              { $inc: { stockQuantity: item.quantity } }
            );
          }
          // New items sent as replacement go out
          await Product.findOneAndUpdate(
            { _id: item.productId, tenantId: req.tenantId },
            { $inc: { stockQuantity: -item.quantity } }
          );
        }
      }
      stockAction = 'replacement_processed';
    }

    // Create credit/debit note
    let noteId = null;
    if (noteType) {
      const noteNumber = await getNextNoteNumber(req.tenantId, noteType);
      const note = await CreditDebitNote.create({
        tenantId: req.tenantId,
        noteNumber,
        type: noteType,
        returnId: ret._id,
        returnNumber: ret.returnNumber,
        invoiceId: ret.invoiceId,
        invoiceNumber: ret.invoiceNumber,
        customerId: ret.customerId,
        customerName: ret.customerName,
        items: ret.items.map(i => ({
          name: i.name, quantity: i.quantity, unit: i.unit,
          price: i.price, taxRate: i.taxRate, taxAmount: (i.price * i.quantity * i.taxRate / 100),
          amount: i.amount
        })),
        subtotal: amount - taxAmt,
        totalTax: taxAmt,
        cgst, sgst, igst,
        totalAmount: amount,
        gstType: usedGstType,
        reason: resolutionNote || ret.reason,
        date: new Date()
      });
      noteId = note._id;

      // Update customer balance (credit note reduces outstanding)
      if (noteType === 'credit' && ret.customerId) {
        await Customer.findByIdAndUpdate(ret.customerId, { $inc: { totalOutstanding: -amount } });
      }
    }

    // Handle stock for returned items (non-replacement)
    if (resolutionType !== 'replacement') {
      for (const item of ret.items) {
        if (item.productId && item.condition === 'good') {
          await Product.findOneAndUpdate(
            { _id: item.productId, tenantId: req.tenantId },
            { $inc: { stockQuantity: item.quantity } }
          );
        }
      }
    }

    // Update return
    ret.resolutionType = resolutionType;
    ret.resolutionNote = resolutionNote;
    ret.status = 'completed';
    if (noteType === 'credit') ret.creditNoteId = noteId;
    if (noteType === 'debit') ret.debitNoteId = noteId;

    ret.timeline.push({
      action: resolutionType === 'refund' ? 'Credit Note Created' :
              resolutionType === 'extra_charge' ? 'Debit Note Created' :
              resolutionType === 'replacement' ? 'Replacement Processed' : 'Partial Credit Note Created',
      note: resolutionNote || `Resolution: ${resolutionType}`,
      performedBy: req.user.name
    });
    if (stockAction) {
      ret.timeline.push({ action: 'Stock Updated', note: 'Inventory adjusted for replacement', performedBy: req.user.name });
    }
    ret.timeline.push({ action: 'Completed', note: 'Return process completed', performedBy: req.user.name });

    await ret.save();
    res.json({ success: true, return: ret });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── DELETE (soft) return ───────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const ret = await Return.findOne({ _id: req.params.id, tenantId: req.tenantId });
    if (!ret) return res.status(404).json({ success: false, message: 'Not found' });
    if (ret.status !== 'pending') return res.status(400).json({ success: false, message: 'Only pending returns can be deleted' });
    ret.isDeleted = true;
    await ret.save();
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─── GET all credit/debit notes ─────────────────────────────────────
router.get('/notes/all', protect, async (req, res) => {
  try {
    const { type, page = 1, limit = 20 } = req.query;
    const query = { tenantId: req.tenantId, isDeleted: false };
    if (type) query.type = type;
    const total = await CreditDebitNote.countDocuments(query);
    const notes = await CreditDebitNote.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    res.json({ success: true, notes, total });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
