// backend/src/controllers/blogController.js

const Article = require('../models/Article');
const User = require('../models/User');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.user.id;

    const article = new Article({
      title,
      content,
      author,
    });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'name email');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get an article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'name email');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an article
exports.updateArticle = async (req, res) => {
  try {
    const updates = req.body;
    const article = await Article.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Submit a question to experts
exports.submitQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const user = req.user.id;

    // Assuming a model for storing questions (not defined here)
    const submittedQuestion = { question, user, date: new Date() };
    // Add logic to save the question (e.g., save to database)

    res.status(201).json({ message: 'Question submitted successfully', submittedQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
