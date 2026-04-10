const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Purchase = require('../models/Purchase');
const { Expense } = require('../models/Expense');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const Payment = require('../models/Payment');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  try {
    const tid = req.tenantId;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 3, 1); // April
    if (now.getMonth() < 3) startOfYear.setFullYear(now.getFullYear() - 1);

    const [
      totalSales, totalPurchase, totalExpense,
      pendingInvoices, overdueInvoices,
      totalCustomers, totalSuppliers, totalProducts,
      lowStockProducts, recentInvoices, topCustomers,
      monthlySales, monthlyPurchase, monthlyExpense
    ] = await Promise.all([
      Invoice.aggregate([{ $match: { tenantId: tid, isDeleted: false } }, { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }]),
      Purchase.aggregate([{ $match: { tenantId: tid, isDeleted: false } }, { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }]),
      Expense.aggregate([{ $match: { tenantId: tid, isDeleted: false } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Invoice.aggregate([{ $match: { tenantId: tid, isDeleted: false, paymentStatus: { $in: ['unpaid', 'partial'] } } }, { $group: { _id: null, total: { $sum: '$balanceAmount' }, count: { $sum: 1 } } }]),
      Invoice.countDocuments({ tenantId: tid, isDeleted: false, paymentStatus: { $in: ['unpaid', 'partial'] }, dueDate: { $lt: now } }),
      Customer.countDocuments({ tenantId: tid, isDeleted: false }),
      Product.countDocuments({ tenantId: tid, isDeleted: false }),
      Product.countDocuments({ tenantId: tid, isDeleted: false }),
      Product.find({ tenantId: tid, isDeleted: false, $expr: { $lte: ['$stockQuantity', '$lowStockAlert'] } }).limit(10),
      Invoice.find({ tenantId: tid, isDeleted: false }).sort({ createdAt: -1 }).limit(10),
      Invoice.aggregate([
        { $match: { tenantId: tid, isDeleted: false } },
        { $group: { _id: '$customerId', name: { $first: '$customerName' }, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } },
        { $sort: { total: -1 } }, { $limit: 5 }
      ]),
      Invoice.aggregate([
        { $match: { tenantId: tid, isDeleted: false, invoiceDate: { $gte: new Date(now.getFullYear(), 0, 1) } } },
        { $group: { _id: { month: { $month: '$invoiceDate' } }, total: { $sum: '$totalAmount' } } },
        { $sort: { '_id.month': 1 } }
      ]),
      Purchase.aggregate([
        { $match: { tenantId: tid, isDeleted: false, purchaseDate: { $gte: new Date(now.getFullYear(), 0, 1) } } },
        { $group: { _id: { month: { $month: '$purchaseDate' } }, total: { $sum: '$totalAmount' } } },
        { $sort: { '_id.month': 1 } }
      ]),
      Expense.aggregate([
        { $match: { tenantId: tid, isDeleted: false, date: { $gte: new Date(now.getFullYear(), 0, 1) } } },
        { $group: { _id: { month: { $month: '$date' } }, total: { $sum: '$amount' } } },
        { $sort: { '_id.month': 1 } }
      ])
    ]);

    const sales = totalSales[0] || { total: 0, count: 0 };
    const purchase = totalPurchase[0] || { total: 0, count: 0 };
    const expense = totalExpense[0] || { total: 0 };
    const pending = pendingInvoices[0] || { total: 0, count: 0 };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const chartData = months.map((month, i) => {
      const mNum = i + 1;
      const s = monthlySales.find(x => x._id.month === mNum);
      const p = monthlyPurchase.find(x => x._id.month === mNum);
      const e = monthlyExpense.find(x => x._id.month === mNum);
      return { month, sales: s?.total || 0, purchase: p?.total || 0, expense: e?.total || 0 };
    });

    res.json({
      success: true,
      stats: {
        totalSales: sales.total,
        totalSalesCount: sales.count,
        totalPurchase: purchase.total,
        totalPurchaseCount: purchase.count,
        totalExpense: expense.total,
        pendingAmount: pending.total,
        pendingCount: pending.count,
        profit: sales.total - purchase.total - expense.total,
        overdueCount: overdueInvoices,
        totalCustomers,
        totalProducts,
        lowStockCount: lowStockProducts.length
      },
      recentInvoices,
      topCustomers,
      chartData,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
