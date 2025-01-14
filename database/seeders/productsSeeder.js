// Filename: productsSeeder.js - Seeding des produits de la Marketplace

const mongoose = require('mongoose');
const Product = require('../../src/models/Product');
require('dotenv').config();

const seedProducts = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products removed');

    // Create sample products
    const products = [
      {
        name: 'Silk Scarf',
        description: 'A luxurious silk scarf perfect for special occasions.',
        price: 49.99,
        category: 'Accessories',
        stock: 100,
        seller: 'Vendor A',
      },
      {
        name: 'Handmade Bracelet',
        description: 'A beautifully crafted bracelet made from premium materials.',
        price: 29.99,
        category: 'Jewelry',
        stock: 50,
        seller: 'Vendor B',
      },
      {
        name: 'Aromatherapy Candle',
        description: 'A scented candle to help relax and unwind after a long day.',
        price: 19.99,
        category: 'Home & Wellness',
        stock: 200,
        seller: 'Vendor C',
      },
      {
        name: 'Luxury Bathrobe',
        description: 'A soft and comfortable bathrobe made from high-quality cotton.',
        price: 79.99,
        category: 'Apparel',
        stock: 30,
        seller: 'Vendor A',
      },
      {
        name: 'Essential Oils Set',
        description: 'A set of essential oils for aromatherapy and relaxation.',
        price: 39.99,
        category: 'Home & Wellness',
        stock: 150,
        seller: 'Vendor D',
      },
    ];

    // Insert sample products into the database
    await Product.insertMany(products);
    console.log('Sample products created');

    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
