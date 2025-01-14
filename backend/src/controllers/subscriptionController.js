// backend/src/controllers/subscriptionController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');
const User = require('../models/User');

// Create a subscription
exports.createSubscription = async (req, res) => {
  try {
    const { paymentMethodId, planId } = req.body;

    // Create a customer if not already created
    const user = await User.findById(req.user.id);
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      user.stripeCustomerId = customer.id;
      await user.save();
    }

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: user.stripeCustomerId,
      items: [{ plan: planId }],
      expand: ['latest_invoice.payment_intent'],
    });

    const newSubscription = new Subscription({
      user: req.user.id,
      stripeSubscriptionId: subscription.id,
      planId,
      status: subscription.status,
    });
    await newSubscription.save();

    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel a subscription
exports.cancelSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const subscription = await Subscription.findOne({ stripeSubscriptionId: subscriptionId, user: req.user.id });

    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    await stripe.subscriptions.del(subscriptionId);
    subscription.status = 'canceled';
    await subscription.save();

    res.status(200).json({ message: 'Subscription canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all subscriptions for the logged-in user
exports.getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.id });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id).populate('user', 'name email');
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
