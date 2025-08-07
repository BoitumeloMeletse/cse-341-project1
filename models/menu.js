// models/menu.js
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  price: { type: Number, required: true, min: 0 },
  category: String,
  servingSize: String,
  createdAt: { type: Date, default: Date.now }
});

// Add static validation method
menuSchema.statics.validate = function(payload) {
  const errors = [];
  if (!payload.name || payload.name.length < 2) errors.push("Name must be at least 2 characters");
  if (!payload.price || isNaN(payload.price)) errors.push("Valid price required");
  return errors;
};

module.exports = mongoose.model('Menu', menuSchema);