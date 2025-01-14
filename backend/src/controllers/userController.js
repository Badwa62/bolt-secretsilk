// backend/src/controllers/userController.js

const User = require('../models/User');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user subscriptions
exports.getUserSubscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('subscriptions').select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add subscription
exports.addSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.subscriptions.includes(subscriptionId)) {
      user.subscriptions.push(subscriptionId);
      await user.save();
    }
    res.json({ subscriptions: user.subscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
