// Filename: usersSeeder.js

const mongoose = require('mongoose');
const User = require('../../src/models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedUsers = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    // Clear existing users
    await User.deleteMany();
    console.log('Existing users removed');

    // Create sample users
    const users = [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: await bcrypt.hash('Password123!', 10),
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@example.com',
        password: await bcrypt.hash('Password123!', 10),
      },
      {
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        password: await bcrypt.hash('Password123!', 10),
      },
    ];

    // Insert sample users into the database
    await User.insertMany(users);
    console.log('Sample users created');

    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
