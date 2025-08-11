const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/user');
const Payment = require('./models/payment');

async function run() {
  await mongoose.connect(process.env.MONGODB_URL);

  await User.deleteMany();
  await Payment.deleteMany();

  const u1 = await User.create({ displayName: 'Admin User', email: 'admin@example.com', role: 'admin' });
  const u2 = await User.create({ displayName: 'Cashier User', email: 'cashier@example.com', role: 'cashier' });

  // For payments we need order object IDs — if you have orders, replace ids accordingly
  // Quick demo: create payments without valid orderId if you want a quick seed, or get an order id from DB.
  // Example uses a placeholder that will fail if you have Mongoose ref check. Replace with real order _id.
  // const demoOrderId = '64...'; // real order id from orders collection
  // await Payment.create({ orderId: demoOrderId, method: 'Cash', amount: 100, status: 'Completed', processedAt: new Date() });

  console.log('seeded users and payments (payments left for real order ids)');
  mongoose.disconnect();
}
run().catch(err => { console.error(err); process.exit(1); });
