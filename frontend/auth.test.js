const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');

// Before running tests, set up connection to the test database
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// After all tests, close the database connection
afterAll(async () => {
  await mongoose.connection.close();
});

// Test suite for Authentication
describe('Authentication Integration Tests', () => {
  let server;

  beforeAll(() => {
    server = request(app);
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user and return a token', async () => {
      const res = await server.post('/api/auth/register').send({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Test1234!',
      });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 for missing fields', async () => {
      const res = await server.post('/api/auth/register').send({
        email: 'testuser@example.com',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user and return a token', async () => {
      const res = await server.post('/api/auth/login').send({
        email: 'testuser@example.com',
        password: 'Test1234!',
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 400 for invalid credentials', async () => {
      const res = await server.post('/api/auth/login').send({
        email: 'testuser@example.com',
        password: 'WrongPassword!',
      });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout the user', async () => {
      const res = await server.post('/api/auth/logout');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Logout successful');
    });
  });
});
