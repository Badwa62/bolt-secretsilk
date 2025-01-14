// backend/src/routes/checkoutRoutes.js

const express = require('express');
const { createPaymentIntent, confirmPayment, getOrderById, getUserOrders } = require('../controllers/checkoutController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   POST /api/checkout/payment-intent
// @desc    Create a payment intent for checkout
// @access  Private
router.post('/payment-intent', protect, createPaymentIntent);

// @route   POST /api/checkout/confirm
// @desc    Confirm payment and create an order
// @access  Private
router.post('/confirm', protect, confirmPayment);

// @route   GET /api/checkout/order/:id
// @desc    Get order details by ID
// @access  Private
router.get('/order/:id', protect, getOrderById);

// @route   GET /api/checkout/orders
// @desc    Get all orders for the logged-in user
// @access  Private
router.get('/orders', protect, getUserOrders);

module.exports = router;
