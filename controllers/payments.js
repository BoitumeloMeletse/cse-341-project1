const { ObjectId } = require("mongodb")
const mongodb = require("../data/database")
const Payment = require("../models/payment")

async function getAll(req, res) {
  try {
    const payments = await mongodb.getDatabase().collection("payments").find().toArray()
    res.status(200).json(payments)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to retrieve payments" })
  }
}

async function getSingle(req, res) {
  const { id } = req.params
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })

  try {
    const payment = await mongodb
      .getDatabase()
      .collection("payments")
      .findOne({ _id: new ObjectId(id) })
    if (!payment) return res.status(404).json({ error: "Payment not found" })
    res.status(200).json(payment)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error retrieving payment" })
  }
}

async function createPayment(req, res) {
  const errors = Payment.validatePayload(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const paymentData = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    const result = await mongodb.getDatabase().collection("payments").insertOne(paymentData)
    res.status(201).json({ _id: result.insertedId })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create payment" })
  }
}

async function updatePayment(req, res) {
  const { id } = req.params
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })

  const errors = Payment.validatePayload(req.body)
  if (errors.length) return res.status(400).json({ errors })

  const updated = {
    ...req.body,
    updatedAt: new Date(),
  }

  try {
    const result = await mongodb
      .getDatabase()
      .collection("payments")
      .replaceOne({ _id: new ObjectId(id) }, updated)
    if (result.matchedCount === 0) return res.status(404).json({ error: "Payment not found" })
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update payment" })
  }
}

async function deletePayment(req, res) {
  const { id } = req.params
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })

  try {
    const result = await mongodb
      .getDatabase()
      .collection("payments")
      .deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) return res.status(404).json({ error: "Payment not found" })
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete payment" })
  }
}

module.exports = { getAll, getSingle, createPayment, updatePayment, deletePayment }
