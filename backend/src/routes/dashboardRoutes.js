// backend/src/routes/dashboardRoutes.js

const express = require('express');
const { getUserDashboard, updateUserDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/', protect, getUserDashboard);

// @route   PUT /api/dashboard
// @desc    Update user dashboard settings
// @access  Private
router.put('/', protect, updateUserDashboard);

// @route   GET /api/dashboard/admin
// @desc    Get admin dashboard data
// @access  Private/Admin
router.get('/admin', protect, admin, getAdminDashboard);

module.exports = router;
