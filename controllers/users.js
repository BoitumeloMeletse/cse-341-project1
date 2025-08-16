const { ObjectId } = require("mongodb")
const mongodb = require("../data/database")
const User = require("../models/user")

async function getAll(req, res) {
  try {
    const users = await mongodb.getDatabase().collection("users").find().toArray()
    res.status(200).json(users)
  } catch (err) {
    console.error("Error retrieving users:", err)
    res.status(500).json({ error: "Failed to retrieve users" })
  }
}

async function getSingle(req, res) {
  const { id } = req.params
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })
  try {
    const user = await mongodb
      .getDatabase()
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
    if (!user) return res.status(404).json({ error: "User not found" })
    res.status(200).json(user)
  } catch (err) {
    console.error("Error retrieving user:", err)
    res.status(500).json({ error: "Error retrieving user" })
  }
}

async function createUser(req, res) {
  const errors = User.validatePayload ? User.validatePayload(req.body) : []
  if (errors.length) return res.status(400).json({ errors })

  const user = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  try {
    const result = await mongodb.getDatabase().collection("users").insertOne(user)
    res.status(201).json({ _id: result.insertedId })
  } catch (err) {
    console.error("Error creating user:", err)
    res.status(500).json({ error: "Failed to create user" })
  }
}

async function updateUser(req, res) {
  const { id } = req.params
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })

  const errors = User.validatePayload ? User.validatePayload(req.body) : []
  if (errors.length) return res.status(400).json({ errors })

  const updated = {
    ...req.body,
    updatedAt: new Date(),
  }

  try {
    const result = await mongodb
      .getDatabase()
      .collection("users")
      .replaceOne({ _id: new ObjectId(id) }, updated)
    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" })
    res.status(204).send()
  } catch (err) {
    console.error("Error updating user:", err)
    res.status(500).json({ error: "Failed to update user" })
  }
}

async function deleteUser(req, res) {
  const { id } = req.params
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" })
  try {
    const result = await mongodb
      .getDatabase()
      .collection("users")
      .deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" })
    res.status(204).send()
  } catch (err) {
    console.error("Error deleting user:", err)
    res.status(500).json({ error: "Failed to delete user" })
  }
}

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser }
