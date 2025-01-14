// Filename: controllers_validation_unit.test.js

const { authController, marketplaceController, gamesController } = require('../../src/controllers');
const { validateUserData, sanitizeInput } = require('../../src/utils/validators');
const httpMocks = require('node-mocks-http');
const mongoose = require('mongoose');

// Unit tests for authController
describe('Auth Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should register a user and return a token', async () => {
    req.body = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'Test1234!',
    };

    await authController.register(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toHaveProperty('token');
  });

  it('should return 400 for invalid user data during registration', async () => {
    req.body = {
      email: 'invalidemail',
      password: 'short',
    };

    await authController.register(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toHaveProperty('error');
  });
});

// Unit tests for marketplaceController
describe('Marketplace Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should add a product to the marketplace', async () => {
    req.body = {
      name: 'New Product',
      description: 'A new product description.',
      price: 19.99,
    };
    req.user = { id: mongoose.Types.ObjectId() };

    await marketplaceController.addProduct(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toHaveProperty('product');
  });

  it('should return 400 if product data is missing required fields', async () => {
    req.body = {
      price: 19.99,
    };

    await marketplaceController.addProduct(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toHaveProperty('error');
  });
});

// Unit tests for gamesController
describe('Games Controller Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
  });

  it('should create a new game', async () => {
    req.body = {
      name: 'Trivia Game',
      description: 'A fun trivia game.',
      category: 'Trivia',
    };
    req.user = { id: mongoose.Types.ObjectId() };

    await gamesController.createGame(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toHaveProperty('game');
  });

  it('should return 400 if game data is invalid', async () => {
    req.body = {
      category: 'Trivia',
    };

    await gamesController.createGame(req, res);

    expect(res.statusCode).toBe(400);
    expect(res._getJSONData()).toHaveProperty('error');
  });
});

// Unit tests for data validation and sanitization
describe('Data Validation and Sanitization Unit Tests', () => {
  it('should validate correct user data', () => {
    const validData = {
      name: 'Valid User',
      email: 'validuser@example.com',
      password: 'ValidPassword123!',
    };

    const result = validateUserData(validData);
    expect(result).toBe(true);
  });

  it('should return false for invalid user data', () => {
    const invalidData = {
      email: 'invalidemail',
      password: 'short',
    };

    const result = validateUserData(invalidData);
    expect(result).toBe(false);
  });

  it('should sanitize input by removing script tags', () => {
    const dirtyInput = '<script>alert("hack!")</script>Test Input';
    const cleanInput = sanitizeInput(dirtyInput);

    expect(cleanInput).toBe('Test Input');
  });
});
