const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, adminOrSuper, superAdmin } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'eva_lite_secret', { expiresIn: '7d' });

// GET /api/users - Get all users (superadmin: all, admin: their subusers)
router.get('/', protect, adminOrSuper, async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'admin') {
      query = { tenantId: req.user._id, role: 'subuser' };
    } else {
      query = { role: { $in: ['admin', 'subuser'] } };
    }
    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/users - Create subuser (admin) or admin (superadmin)
router.post('/', protect, adminOrSuper, async (req, res) => {
  try {
    const { name, email, password, phone, role, permissions } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password required' });
    }
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(400).json({ success: false, message: 'Email already exists' });

    const newRole = req.user.role === 'superadmin' ? (role || 'admin') : 'subuser';
    const tenantId = req.user.role === 'superadmin' ? null : req.user._id;

    const user = await User.create({
      name, email, password, phone,
      role: newRole,
      tenantId,
      permissions: permissions || undefined,
      createdBy: req.user._id
    });

    res.status(201).json({ success: true, user, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/:id - Update user
router.put('/:id', protect, adminOrSuper, async (req, res) => {
  try {
    const { name, phone, permissions, isBlocked, isActive, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (permissions) user.permissions = permissions;
    if (isBlocked !== undefined) user.isBlocked = isBlocked;
    if (isActive !== undefined) user.isActive = isActive;
    if (password) user.password = password;

    await user.save();
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/users/:id
router.delete('/:id', protect, adminOrSuper, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isActive: false, isBlocked: true });
    res.json({ success: true, message: 'User deactivated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/users/profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone }, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
