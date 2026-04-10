const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'eva_lite_secret');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user || !user.isActive || user.isBlocked) {
      return res.status(401).json({ success: false, message: 'User is inactive or blocked' });
    }
    
    req.user = user;
    // Set tenantId: for admin it's their own ID, for subuser it's their tenantId
    req.tenantId = user.role === 'admin' ? user._id : user.tenantId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

const superAdmin = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ success: false, message: 'Super Admin access required' });
  }
  next();
};

const adminOrSuper = (req, res, next) => {
  if (!['admin', 'superadmin'].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};

const checkPermission = (module) => (req, res, next) => {
  if (req.user.role === 'superadmin' || req.user.role === 'admin') return next();
  if (req.user.permissions && req.user.permissions[module]) return next();
  return res.status(403).json({ success: false, message: `No permission for ${module}` });
};

module.exports = { protect, superAdmin, adminOrSuper, checkPermission };
