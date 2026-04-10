const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Company = require('../models/Company');
const { protect } = require('../middleware/auth');

// Multer config for logo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads/logos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `logo_${req.tenantId}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  }
});

// GET /api/company
router.get('/', protect, async (req, res) => {
  try {
    const company = await Company.findOne({ tenantId: req.tenantId });
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/company/logo - upload logo
router.post('/logo', protect, upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const logoUrl = `/uploads/logos/${req.file.filename}`;
    const company = await Company.findOneAndUpdate(
      { tenantId: req.tenantId },
      { logo: logoUrl },
      { upsert: true, new: true }
    );
    res.json({ success: true, logoUrl, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/company/logo
router.delete('/logo', protect, async (req, res) => {
  try {
    const company = await Company.findOne({ tenantId: req.tenantId });
    if (company && company.logo) {
      const filePath = path.join(__dirname, '..', company.logo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Company.findOneAndUpdate({ tenantId: req.tenantId }, { logo: null });
    res.json({ success: true, message: 'Logo removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST/PUT /api/company - upsert settings
router.post('/', protect, async (req, res) => {
  try {
    const data = { ...req.body, tenantId: req.tenantId };
    const company = await Company.findOneAndUpdate(
      { tenantId: req.tenantId },
      data,
      { upsert: true, new: true, runValidators: true }
    );
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { tenantId: req.tenantId },
      { ...req.body },
      { upsert: true, new: true }
    );
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
