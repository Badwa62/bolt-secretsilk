// backend/src/routes/authRoutes.js

const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/logout
// @desc    Logout a user
// @access  Private
router.get('/logout', logout);

module.exports = router;
