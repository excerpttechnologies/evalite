const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Purchase = require('../models/Purchase');
const { Expense } = require('../models/Expense');
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const { protect, checkPermission } = require('../middleware/auth');

// GET /api/reports/sales
router.get('/sales', protect, checkPermission('reports'), async (req, res) => {
  try {
    const { from, to, groupBy = 'month' } = req.query;
    const match = { tenantId: req.tenantId, isDeleted: false };
    if (from || to) {
      match.invoiceDate = {};
      if (from) match.invoiceDate.$gte = new Date(from);
      if (to) match.invoiceDate.$lte = new Date(to + 'T23:59:59');
    }
    const invoices = await Invoice.find(match).sort({ invoiceDate: -1 });
    const summary = {
      totalSales: invoices.reduce((s, i) => s + i.totalAmount, 0),
      totalPaid: invoices.reduce((s, i) => s + i.paidAmount, 0),
      totalPending: invoices.reduce((s, i) => s + i.balanceAmount, 0),
      totalTax: invoices.reduce((s, i) => s + i.totalTax, 0),
      count: invoices.length
    };
    res.json({ success: true, invoices, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/purchase
router.get('/purchase', protect, checkPermission('reports'), async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = { tenantId: req.tenantId, isDeleted: false };
    if (from || to) {
      match.purchaseDate = {};
      if (from) match.purchaseDate.$gte = new Date(from);
      if (to) match.purchaseDate.$lte = new Date(to + 'T23:59:59');
    }
    const purchases = await Purchase.find(match).sort({ purchaseDate: -1 });
    const summary = {
      totalPurchase: purchases.reduce((s, p) => s + p.totalAmount, 0),
      totalPaid: purchases.reduce((s, p) => s + p.paidAmount, 0),
      totalPending: purchases.reduce((s, p) => s + p.balanceAmount, 0),
      count: purchases.length
    };
    res.json({ success: true, purchases, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/expense
router.get('/expense', protect, checkPermission('reports'), async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = { tenantId: req.tenantId, isDeleted: false };
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to + 'T23:59:59');
    }
    const expenses = await Expense.find(match).sort({ date: -1 });
    const byCategory = await Expense.aggregate([
      { $match: match },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
    const summary = { total: expenses.reduce((s, e) => s + e.amount, 0), count: expenses.length };
    res.json({ success: true, expenses, byCategory, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/profit-loss
router.get('/profit-loss', protect, checkPermission('reports'), async (req, res) => {
  try {
    const { from, to, financialYear } = req.query;
    const buildMatch = (dateField) => {
      const match = { tenantId: req.tenantId, isDeleted: false };
      if (financialYear) { match.financialYear = financialYear; }
      else if (from || to) {
        match[dateField] = {};
        if (from) match[dateField].$gte = new Date(from);
        if (to) match[dateField].$lte = new Date(to + 'T23:59:59');
      }
      return match;
    };

    const [salesAgg, purchaseAgg, expenseAgg] = await Promise.all([
      Invoice.aggregate([{ $match: buildMatch('invoiceDate') }, { $group: { _id: null, total: { $sum: '$totalAmount' }, tax: { $sum: '$totalTax' } } }]),
      Purchase.aggregate([{ $match: buildMatch('purchaseDate') }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
      Expense.aggregate([{ $match: buildMatch('date') }, { $group: { _id: null, total: { $sum: '$amount' } } }])
    ]);

    const sales = salesAgg[0]?.total || 0;
    const purchase = purchaseAgg[0]?.total || 0;
    const expense = expenseAgg[0]?.total || 0;
    const grossProfit = sales - purchase;
    const netProfit = grossProfit - expense;

    res.json({
      success: true,
      data: { sales, purchase, expense, grossProfit, netProfit, tax: salesAgg[0]?.tax || 0 }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/gst
router.get('/gst', protect, checkPermission('reports'), async (req, res) => {
  try {
    const { from, to, financialYear } = req.query;
    const match = { tenantId: req.tenantId, isDeleted: false };
    if (financialYear) match.financialYear = financialYear;
    else if (from || to) {
      match.invoiceDate = {};
      if (from) match.invoiceDate.$gte = new Date(from);
      if (to) match.invoiceDate.$lte = new Date(to + 'T23:59:59');
    }
    const invoices = await Invoice.find(match);
    const summary = {
      totalCGST: invoices.reduce((s, i) => s + i.cgst, 0),
      totalSGST: invoices.reduce((s, i) => s + i.sgst, 0),
      totalIGST: invoices.reduce((s, i) => s + i.igst, 0),
      totalTax: invoices.reduce((s, i) => s + i.totalTax, 0),
      taxableAmount: invoices.reduce((s, i) => s + (i.subtotal - i.discountAmount), 0)
    };
    res.json({ success: true, invoices, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/financial-year
router.get('/financial-year', protect, async (req, res) => {
  try {
    const { year } = req.query;
    if (!year) return res.status(400).json({ success: false, message: 'Year required' });
    const match = { tenantId: req.tenantId, isDeleted: false, financialYear: year };

    const [salesData, purchaseData, expenseData, monthlySales, monthlyPurchase, monthlyExpense] = await Promise.all([
      Invoice.aggregate([{ $match: match }, { $group: { _id: null, total: { $sum: '$totalAmount' }, tax: { $sum: '$totalTax' }, count: { $sum: 1 } } }]),
      Purchase.aggregate([{ $match: { ...match, financialYear: year } }, { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }]),
      Expense.aggregate([{ $match: { ...match, financialYear: year } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Invoice.aggregate([{ $match: match }, { $group: { _id: { $month: '$invoiceDate' }, total: { $sum: '$totalAmount' } } }, { $sort: { '_id': 1 } }]),
      Purchase.aggregate([{ $match: { tenantId: req.tenantId, isDeleted: false, financialYear: year } }, { $group: { _id: { $month: '$purchaseDate' }, total: { $sum: '$totalAmount' } } }, { $sort: { '_id': 1 } }]),
      Expense.aggregate([{ $match: { tenantId: req.tenantId, isDeleted: false, financialYear: year } }, { $group: { _id: { $month: '$date' }, total: { $sum: '$amount' } } }, { $sort: { '_id': 1 } }])
    ]);

    const fyMonths = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const fyMonthNums = [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3];
    const chartData = fyMonths.map((m, i) => {
      const mNum = fyMonthNums[i];
      return {
        month: m,
        sales: monthlySales.find(x => x._id === mNum)?.total || 0,
        purchase: monthlyPurchase.find(x => x._id === mNum)?.total || 0,
        expense: monthlyExpense.find(x => x._id === mNum)?.total || 0
      };
    });

    const sales = salesData[0]?.total || 0;
    const purchase = purchaseData[0]?.total || 0;
    const expense = expenseData[0]?.total || 0;

    res.json({
      success: true,
      summary: {
        totalRevenue: sales,
        totalPurchase: purchase,
        totalExpense: expense,
        grossProfit: sales - purchase,
        netProfit: sales - purchase - expense,
        totalTax: salesData[0]?.tax || 0,
        invoiceCount: salesData[0]?.count || 0,
        purchaseCount: purchaseData[0]?.count || 0
      },
      chartData,
      financialYear: year
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reports/stock
router.get('/stock', protect, async (req, res) => {
  try {
    const products = await Product.find({ tenantId: req.tenantId, isDeleted: false }).sort({ name: 1 });
    const stockValue = products.reduce((s, p) => s + (p.stockQuantity * p.purchasePrice), 0);
    const lowStock = products.filter(p => p.stockQuantity <= p.lowStockAlert);
    res.json({ success: true, products, stockValue, lowStockCount: lowStock.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
