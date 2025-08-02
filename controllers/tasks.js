const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
const Task = require("../models/task");

async function getAll(req, res) {
  try {
    const tasks = await mongodb.getDatabase().collection("tasks").find().toArray();
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ error: "Failed to retrieve tasks" });
  }
}

async function getSingle(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const task = await mongodb.getDatabase().collection("tasks").findOne({ _id: new ObjectId(id) });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch {
    res.status(500).json({ error: "Error retrieving task" });
  }
}

async function createTask(req, res) {
  const errors = Task.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const task = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  try {
    const result = await mongodb.getDatabase().collection("tasks").insertOne(task);
    res.status(201).json({ _id: result.insertedId });
  } catch {
    res.status(500).json({ error: "Failed to create task" });
  }
}

async function updateTask(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  const errors = Task.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const updated = {
    ...req.body,
    updatedAt: new Date()
  };
  try {
    const result = await mongodb.getDatabase().collection("tasks").replaceOne({ _id: new ObjectId(id) }, updated);
    if (result.matchedCount === 0) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to update task" });
  }
}

async function deleteTask(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const result = await mongodb.getDatabase().collection("tasks").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Task not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete task" });
  }
}

module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };
