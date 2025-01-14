// backend/src/routes/blogRoutes.js

const express = require('express');
const { getArticles, getArticleById, addArticle, updateArticle, deleteArticle, postQuestion, getQuestions } = require('../controllers/blogController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/blog
// @desc    Get all articles
// @access  Public
router.get('/', getArticles);

// @route   GET /api/blog/:id
// @desc    Get article by ID
// @access  Public
router.get('/:id', getArticleById);

// @route   POST /api/blog
// @desc    Add a new article
// @access  Private/Admin
router.post('/', protect, admin, addArticle);

// @route   PUT /api/blog/:id
// @desc    Update an article
// @access  Private/Admin
router.put('/:id', protect, admin, updateArticle);

// @route   DELETE /api/blog/:id
// @desc    Delete an article
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteArticle);

// @route   POST /api/blog/questions
// @desc    Post a user question
// @access  Private
router.post('/questions', protect, postQuestion);

// @route   GET /api/blog/questions
// @desc    Get all user questions
// @access  Private/Admin
router.get('/questions', protect, admin, getQuestions);

module.exports = router;
