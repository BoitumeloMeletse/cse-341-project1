const request = require('supertest');
const app = require('../server');
const { getDatabase } = require('../data/database');

describe('Payment API', () => {
  beforeAll(async () => {
    // Connect to test database
    await getDatabase();
  });

  describe('GET /payments', () => {
    it('should return all payments', async () => {
      const res = await request(app).get('/payments');
      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('GET /payments/:id', () => {
    it('should return a payment with valid ID', async () => {
      // First get a valid ID from the database
      const payments = await request(app).get('/payments');
      if (payments.body.length > 0) {
        const validId = payments.body[0]._id;
        const res = await request(app).get(`/payments/${validId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id', validId);
      }
    });

    it('should return 400 for invalid ID format', async () => {
      const res = await request(app).get('/payments/invalid-id');
      expect(res.statusCode).toEqual(400);
    });

    it('should return 404 for non-existent payment', async () => {
      const nonExistentId = '507f1f77bcf86cd799439011'; // Valid but non-existent ID
      const res = await request(app).get(`/payments/${nonExistentId}`);
      expect(res.statusCode).toEqual(404);
    });
  });
});