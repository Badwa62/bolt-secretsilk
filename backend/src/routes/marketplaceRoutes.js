// backend/src/routes/marketplaceRoutes.js

const express = require('express');
const { getProducts, getProductById, addProduct, updateProduct, deleteProduct } = require('../controllers/marketplaceController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/marketplace
// @desc    Get all products
// @access  Public
router.get('/', getProducts);

// @route   GET /api/marketplace/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', getProductById);

// @route   POST /api/marketplace
// @desc    Add a new product
// @access  Private/Admin
router.post('/', protect, admin, addProduct);

// @route   PUT /api/marketplace/:id
// @desc    Update a product
// @access  Private/Admin
router.put('/:id', protect, admin, updateProduct);

// @route   DELETE /api/marketplace/:id
// @desc    Delete a product
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
