const { Types } = require('mongoose');
const Order = require('../models/order');

async function getAll(req, res) {
  try {
    const orders = await Order.find(); // using mongoose
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error in getAll:', err); // ✅ log the real error
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
}


async function getSingle(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch {
    res.status(500).json({ error: "Error retrieving order" });
  }
}

async function createOrder(req, res) {
  const errors = Order.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const newOrder = new Order(req.body);
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch {
    res.status(500).json({ error: "Failed to create order" });
  }
}

async function updateOrder(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

  const errors = Order.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });

  try {
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update order" });
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

  try {
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Order not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete order" });
  }
}

module.exports = { getAll, getSingle, createOrder, updateOrder, deleteOrder };
