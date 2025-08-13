const request = require('supertest');
const app = require('../server');
const { getDatabase } = require('../data/database');

describe('User API', () => {
  beforeAll(async () => {
    // Connect to test database
    await getDatabase();
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('GET /users/:id', () => {
    it('should return a user with valid ID', async () => {
      // First get a valid ID from the database
      const users = await request(app).get('/users');
      const validId = users.body[0]._id;
      
      const res = await request(app).get(`/users/${validId}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id', validId);
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/users/invalid-id');
      expect(res.statusCode).toEqual(400);
    });

    it('should return 404 for non-existent user', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011'; // Valid but non-existent ID
      const res = await request(app).get(`/users/${nonExistentId}`);
      expect(res.statusCode).toEqual(404);
    });
  });
});