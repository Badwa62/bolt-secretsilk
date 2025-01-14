// Filename: articlesSeeder.js - Seeding des articles du blog

const mongoose = require('mongoose');
const Article = require('../../src/models/Article');
require('dotenv').config();

const seedArticles = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.TEST_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to the database');

    // Clear existing articles
    await Article.deleteMany();
    console.log('Existing articles removed');

    // Create sample articles
    const articles = [
      {
        title: 'The Importance of Open Communication in Relationships',
        content: 'Open communication is vital for maintaining a healthy relationship. It helps partners understand each other's needs and resolve conflicts effectively.',
        author: 'Jane Doe',
        category: 'Relationships',
        publishedDate: new Date(),
      },
      {
        title: 'Exploring Aromatherapy for Relaxation',
        content: 'Aromatherapy can be a great way to relax and de-stress. Learn how different essential oils can help you unwind.',
        author: 'John Smith',
        category: 'Wellness',
        publishedDate: new Date(),
      },
      {
        title: 'Tips for Enhancing Intimacy in Long-Term Relationships',
        content: 'Intimacy is a crucial component of a long-term relationship. Here are some tips to keep the passion alive.',
        author: 'Alice Johnson',
        category: 'Intimacy',
        publishedDate: new Date(),
      },
      {
        title: 'Understanding Boundaries in Healthy Relationships',
        content: 'Setting boundaries is key to a healthy and respectful relationship. This article explores how to communicate and establish personal boundaries.',
        author: 'Emily Davis',
        category: 'Relationships',
        publishedDate: new Date(),
      },
      {
        title: 'Mindfulness Techniques for Better Sleep',
        content: 'Mindfulness can improve sleep quality. Learn simple mindfulness exercises to help you fall asleep faster and stay asleep longer.',
        author: 'Michael Lee',
        category: 'Wellness',
        publishedDate: new Date(),
      },
    ];

    // Insert sample articles into the database
    await Article.insertMany(articles);
    console.log('Sample articles created');

    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding articles:', error);
    process.exit(1);
  }
};

seedArticles();
