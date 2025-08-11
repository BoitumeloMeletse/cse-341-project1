const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Order' },
  method: { type: String, enum: ['Online','Cash','Card'], required: true },
  amount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['Pending','Completed','Failed'], default: 'Pending' },
  processedAt: { type: Date }
}, { timestamps: true });

paymentSchema.statics.validatePayload = function(payload) {
  const errors = [];
  if (!payload.orderId) errors.push('orderId is required');
  if (!payload.method || !['Online','Cash','Card'].includes(payload.method)) errors.push('Valid method required');
  if (typeof payload.amount !== 'number' || payload.amount < 0) errors.push('Valid amount required');
  return errors;
};

module.exports = mongoose.model('Payment', paymentSchema);
