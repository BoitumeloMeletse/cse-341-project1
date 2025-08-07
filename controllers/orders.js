// controllers/order.js
const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
const Order = require("../models/order");

async function getAll(req, res) {
  try {
    const orders = await mongodb.getDatabase().collection("orders").find().toArray();
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
}

async function getSingle(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const order = await mongodb.getDatabase().collection("orders").findOne({ _id: new ObjectId(id) });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.status(200).json(order);
  } catch {
    res.status(500).json({ error: "Error retrieving order" });
  }
}

async function createOrder(req, res) {
  const errors = Order.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const order = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  try {
    const result = await mongodb.getDatabase().collection("orders").insertOne(order);
    res.status(201).json({ _id: result.insertedId });
  } catch {
    res.status(500).json({ error: "Failed to create order" });
  }
}

async function updateOrder(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  const errors = Order.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const updated = {
    ...req.body,
    updatedAt: new Date()
  };
  try {
    const result = await mongodb.getDatabase().collection("orders").replaceOne({ _id: new ObjectId(id) }, updated);
    if (result.matchedCount === 0) return res.status(404).json({ error: "Order not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to update order" });
  }
}

async function deleteOrder(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const result = await mongodb.getDatabase().collection("orders").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Order not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete order" });
  }
}

module.exports = { getAll, getSingle, createOrder, updateOrder, deleteOrder };