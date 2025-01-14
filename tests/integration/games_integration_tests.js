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

// Test suite for Games Management
describe('Games Integration Tests', () => {
  let server;
  let token;

  beforeAll(async () => {
    server = request(app);

    // Register and log in a user to get a token
    const res = await server.post('/api/auth/register').send({
      name: 'Games Tester',
      email: 'gamestester@example.com',
      password: 'Games1234!',
    });
    token = res.body.token;
  });

  describe('POST /api/games', () => {
    it('should add a new game to the platform', async () => {
      const res = await server
        .post('/api/games')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Game',
          description: 'This is a test game for testing purposes.',
          category: 'Trivia',
        });
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('game');
      expect(res.body.game.name).toBe('Test Game');
    });

    it('should return 400 for missing required fields', async () => {
      const res = await server
        .post('/api/games')
        .set('Authorization', `Bearer ${token}`)
        .send({
          category: 'Trivia',
        });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/games', () => {
    it('should get all games from the platform', async () => {
      const res = await server.get('/api/games');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('games');
      expect(Array.isArray(res.body.games)).toBe(true);
    });
  });

  describe('GET /api/games/:id', () => {
    let gameId;

    beforeAll(async () => {
      const res = await server
        .post('/api/games')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Another Game',
          description: 'Another game for testing.',
          category: 'Puzzle',
        });
      gameId = res.body.game._id;
    });

    it('should get a game by its ID', async () => {
      const res = await server.get(`/api/games/${gameId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('game');
      expect(res.body.game.name).toBe('Another Game');
    });

    it('should return 404 for a non-existent game ID', async () => {
      const res = await server.get('/api/games/invalidGameId');
      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty('error');
    });
  });
});
