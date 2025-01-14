// backend/src/controllers/dashboardController.js

const Order = require('../models/Order');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');

// Get user dashboard summary
exports.getUserDashboard = async (req, res) => {
  try {
    // Fetch user's orders
    const orders = await Order.find({ user: req.user.id });

    // Fetch user's subscriptions
    const subscriptions = await Subscription.find({ user: req.user.id });

    // Fetch user's notifications
    const notifications = await Notification.find({ user: req.user.id });

    // Prepare dashboard summary
    const dashboardSummary = {
      orders: orders.length,
      subscriptions: subscriptions.length,
      notifications: notifications.length,
    };

    res.json(dashboardSummary);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user notifications
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);

    if (!notification || notification.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user recent activity
exports.getUserRecentActivity = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);
    const subscriptions = await Subscription.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(5);

    res.json({ orders, subscriptions, notifications });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
