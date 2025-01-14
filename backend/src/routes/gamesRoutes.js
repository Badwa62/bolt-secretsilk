// backend/src/routes/gamesRoutes.js

const express = require('express');
const { getGames, getGameById, startGame, updateGameProgress, getUserGameProgress } = require('../controllers/gamesController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/games
// @desc    Get all games
// @access  Public
router.get('/', getGames);

// @route   GET /api/games/:id
// @desc    Get game by ID
// @access  Public
router.get('/:id', getGameById);

// @route   POST /api/games/:id/start
// @desc    Start a game
// @access  Private
router.post('/:id/start', protect, startGame);

// @route   PUT /api/games/:id/progress
// @desc    Update game progress
// @access  Private
router.put('/:id/progress', protect, updateGameProgress);

// @route   GET /api/games/:id/progress
// @desc    Get user game progress
// @access  Private
router.get('/:id/progress', protect, getUserGameProgress);

module.exports = router;
