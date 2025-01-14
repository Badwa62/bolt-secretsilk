// Filename: gamesSeeder.js - Seeding des jeux

const mongoose = require('mongoose');
const Game = require('../../src/models/Game');
require('dotenv').config();

const seedGames = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    // Clear existing games
    await Game.deleteMany();
    console.log('Existing games removed');

    // Create sample games
    const games = [
      {
        name: 'Trivia Challenge',
        description: 'A fun trivia game to test your general knowledge.',
        category: 'Trivia',
        difficulty: 'Medium',
        maxPlayers: 4,
      },
      {
        name: 'Fantasy Adventure',
        description: 'An adventure game where players complete quests to earn rewards.',
        category: 'Adventure',
        difficulty: 'Hard',
        maxPlayers: 1,
      },
      {
        name: 'Couples Quiz',
        description: 'A quiz game designed for couples to learn more about each other.',
        category: 'Romance',
        difficulty: 'Easy',
        maxPlayers: 2,
      },
      {
        name: 'Memory Match',
        description: 'A memory matching game to sharpen your memory skills.',
        category: 'Puzzle',
        difficulty: 'Easy',
        maxPlayers: 1,
      },
      {
        name: 'Speed Math',
        description: 'A fast-paced math game to solve problems under time pressure.',
        category: 'Educational',
        difficulty: 'Medium',
        maxPlayers: 1,
      },
    ];

    // Insert sample games into the database
    await Game.insertMany(games);
    console.log('Sample games created');

    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding games:', error);
    process.exit(1);
  }
};

seedGames();
