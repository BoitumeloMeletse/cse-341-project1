const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // make server exportable (see note below)
const User = require('../models/user');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URL_TEST || 'mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany();
  await User.create({ displayName: 'Test User', email: 't@test.com', role: 'customer' });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Users GET endpoints', () => {
  test('GET /users -> 200 and returns array', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /users/:id -> 200 for existing user', async () => {
    const u = await User.findOne();
    const res = await request(app).get(`/users/${u._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.displayName).toBe(u.displayName);
  });

  test('GET /users/:id -> 400 for invalid id', async () => {
    const res = await request(app).get('/users/invalid-id');
    expect(res.statusCode).toBe(400);
  });

  test('GET /users/:id -> 404 for not-found id', async () => {
    const fakeId = mongoose.Types.ObjectId();
    const res = await request(app).get(`/users/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});
