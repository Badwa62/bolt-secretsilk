// backend/src/controllers/gamesController.js

const Game = require('../models/Game');

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a game by ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update game progression
exports.updateGameProgression = async (req, res) => {
  try {
    const { level, score } = req.body;
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update progression details
    game.progression = {
      ...game.progression,
      level: level || game.progression.level,
      score: score || game.progression.score,
    };

    await game.save();
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new game
exports.addGame = async (req, res) => {
  try {
    const { name, description, levels } = req.body;
    const game = new Game({
      name,
      description,
      levels,
    });
    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a game
exports.deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
