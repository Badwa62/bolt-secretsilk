// backend/src/utils/paymentProcessor.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a payment intent for a specified amount and currency
const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });
    return paymentIntent.client_secret;
  } catch (error) {
    throw new Error('Payment Intent creation failed');
  }
};

// Confirm a payment using the payment intent ID
const confirmPayment = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment not completed');
    }
    return paymentIntent;
  } catch (error) {
    throw new Error('Payment confirmation failed');
  }
};

module.exports = { createPaymentIntent, confirmPayment };
