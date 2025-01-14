// backend/src/routes/cartRoutes.js

const express = require('express');
const { getCartItems, addToCart, updateCartItem, removeCartItem, clearCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/cart
// @desc    Get all items in user's cart
// @access  Private
router.get('/', protect, getCartItems);

// @route   POST /api/cart
// @desc    Add an item to the cart
// @access  Private
router.post('/', protect, addToCart);

// @route   PUT /api/cart/:id
// @desc    Update a cart item
// @access  Private
router.put('/:id', protect, updateCartItem);

// @route   DELETE /api/cart/:id
// @desc    Remove an item from the cart
// @access  Private
router.delete('/:id', protect, removeCartItem);

// @route   DELETE /api/cart
// @desc    Clear all items from the cart
// @access  Private
router.delete('/', protect, clearCart);

module.exports = router;
