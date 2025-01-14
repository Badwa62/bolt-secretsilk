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

// Test suite for Product Management
describe('Product Integration Tests', () => {
  let server;
  let token;

  beforeAll(async () => {
    server = request(app);

    // Register and log in a user to get a token
    const res = await server.post('/api/auth/register').send({
      name: 'Product Tester',
      email: 'producttester@example.com',
      password: 'Product1234!',
    });
    token = res.body.token;
  });

  describe('POST /api/marketplace/products', () => {
    it('should add a new product to the marketplace', async () => {
      const res = await server
        .post('/api/marketplace/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Sample Product',
          description: 'This is a sample product for testing purposes.',
          price: 29.99,
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('product');
      expect(res.body.product.name).toBe('Sample Product');
    });

    it('should return 400 for missing required fields', async () => {
      const res = await server
        .post('/api/marketplace/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          price: 19.99,
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/marketplace/products', () => {
    it('should get all products from the marketplace', async () => {
      const res = await server.get('/api/marketplace/products');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('products');
      expect(Array.isArray(res.body.products)).toBe(true);
    });
  });

  describe('GET /api/marketplace/products/:id', () => {
    let productId;

    beforeAll(async () => {
      const res = await server
        .post('/api/marketplace/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Another Product',
          description: 'Another product for testing.',
          price: 39.99,
        });
      productId = res.body.product._id;
    });

    it('should get a product by its ID', async () => {
      const res = await server.get(`/api/marketplace/products/${productId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('product');
      expect(res.body.product.name).toBe('Another Product');
    });

    it('should return 404 for a non-existent product ID', async () => {
      const res = await server.get('/api/marketplace/products/invalidProductId');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
