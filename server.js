const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Serve uploaded files (logos, attachments)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/company', require('./routes/company'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/products', require('./routes/products'));
app.use('/api/invoices', require('./routes/invoices'));
app.use('/api/purchases', require('./routes/purchases'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/reports', require('./routes/reports'));
app.use('/api/ewaybill', require('./routes/ewaybill'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/returns', require('./routes/returns'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EVA Lite API running', timestamp: new Date() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ EVA Lite Server running on port ${PORT}`);
});
