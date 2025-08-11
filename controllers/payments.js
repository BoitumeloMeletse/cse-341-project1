const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
const Payment = require("../models/payment");

async function getAll(req, res) {
  try {
    const payments = await mongodb.getDatabase().collection("payments").find().toArray();
    res.status(200).json(payments);
  } catch {
    res.status(500).json({ error: "Failed to retrieve payments" });
  }
}

async function getSingle(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const payment = await mongodb.getDatabase().collection("payments").findOne({ _id: new ObjectId(id) });
    if (!payment) return res.status(404).json({ error: "Payments not found" });
    res.status(200).json(payment);
  } catch {
    res.status(500).json({ error: "Error retrieving payments" });
  }
}

async function createPayment(req, res) {
  const errors = Payment.validatePayload(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const created = await Payment.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create payment' });
  }
}

async function updatePayment(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });
  const errors = Payment.validatePayload(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const updated = await Payment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Payment not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update payment' });
  }
}

async function deletePayment(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const deleted = await Payment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Payment not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete payment' });
  }
}

module.exports = { getAll, getSingle, createPayment, updatePayment, deletePayment };
