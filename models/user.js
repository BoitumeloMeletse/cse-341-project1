const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'kitchen', 'cashier', 'admin'], default: 'customer' }
}, { timestamps: true });

// Update validation to match
userSchema.statics.validatePayload = function(payload) {
  const errors = [];
  if (!payload.username) errors.push('username is required');
  if (!payload.email) errors.push('email is required');
  if (!payload.password) errors.push('password is required');
  if (payload.role && !['customer','kitchen','cashier','admin'].includes(payload.role)) 
    errors.push('Invalid role');
  return errors;
};