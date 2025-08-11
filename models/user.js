const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String },
  role: { type: String, enum: ['customer', 'kitchen', 'cashier', 'admin'], default: 'customer' },
  githubId: { type: String }
}, { timestamps: true });

// validation helper for controllers (minimal)
userSchema.statics.validatePayload = function(payload) {
  const errors = [];
  if (!payload.displayName) errors.push('displayName is required');
  if (payload.role && !['customer','kitchen','cashier','admin'].includes(payload.role)) errors.push('Invalid role');
  return errors;
};

module.exports = mongoose.model('User', userSchema);
