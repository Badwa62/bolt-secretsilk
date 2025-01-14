// backend/src/models/Game.js

const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  levels: {
    type: Number,
    required: true,
    min: 1,
  },
  scores: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      score: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Game', GameSchema);
