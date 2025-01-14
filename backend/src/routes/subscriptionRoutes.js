// backend/src/routes/subscriptionRoutes.js

const express = require('express');
const { getSubscriptions, subscribe, updateSubscription, cancelSubscription } = require('../controllers/subscriptionController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/subscriptions
// @desc    Get all available subscriptions
// @access  Public
router.get('/', getSubscriptions);

// @route   POST /api/subscriptions
// @desc    Subscribe to a plan
// @access  Private
router.post('/', protect, subscribe);

// @route   PUT /api/subscriptions/:id
// @desc    Update a subscription plan
// @access  Private
router.put('/:id', protect, updateSubscription);

// @route   DELETE /api/subscriptions/:id
// @desc    Cancel a subscription
// @access  Private
router.delete('/:id', protect, cancelSubscription);

module.exports = router;
