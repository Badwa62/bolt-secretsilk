// backend/config/secrets.js

const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'default_jwt_secret',
  apiKey: process.env.API_KEY || 'default_api_key',
};
