// tests/payments.get.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Payment = require('../models/payment');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL_TEST || 'mongodb://localhost:27017/testdb');
  await Payment.deleteMany();
  // seed one doc (use any valid ObjectId for orderId in test DB)
  await Payment.create({ orderId: new mongoose.Types.ObjectId(), method: 'Cash', amount: 123, status: 'Completed' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Payments GET endpoints', () => {
  test('GET /payments -> 200 and returns array', async () => {
    const res = await request(app).get('/payments');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /payments/:id -> 200 for existing payment', async () => {
    const p = await Payment.findOne();
    const res = await request(app).get(`/payments/${p._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.amount).toBe(p.amount);
  });

  test('GET /payments/:id -> 400 for invalid id', async () => {
    const res = await request(app).get('/payments/not-an-id');
    expect(res.statusCode).toBe(400);
  });

  test('GET /payments/:id -> 404 for not-found id', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/payments/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});
