// backend/config/config.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DB_URL || 'mongodb://localhost:27017/secret-silk',
};
