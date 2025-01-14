// backend/src/routes/userRoutes.js

const express = require('express');
const { getUserProfile, updateUserProfile, getUserSubscriptions, updateUserSubscription } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, getUserProfile);

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, updateUserProfile);

// @route   GET /api/user/subscriptions
// @desc    Get user subscriptions
// @access  Private
router.get('/subscriptions', protect, getUserSubscriptions);

// @route   PUT /api/user/subscriptions
// @desc    Update user subscription
// @access  Private
router.put('/subscriptions', protect, updateUserSubscription);

module.exports = router;
