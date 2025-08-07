// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [{ 
    type: String, 
    required: true,
    validate: {
      validator: function(items) {
        return items && items.length > 0;
      },
      message: "At least one order item is required"
    }
  }],
  orderStatus: {
    type: String,
    enum: ['Preparing', 'Completed'],
    default: 'Preparing'
  },
  orderType: {
    type: String,
    enum: ['Dine-in', 'Take-out', 'Delivery'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Add static validation method
orderSchema.statics.validate = function(payload) {
  const errors = [];
  if (!payload.orderItems || payload.orderItems.length === 0) errors.push("At least one order item required");
  if (!payload.orderType || !['Dine-in', 'Take-out', 'Delivery'].includes(payload.orderType)) {
    errors.push("Valid order type required");
  }
  return errors;
};

module.exports = mongoose.model('Order', orderSchema);