// controllers/menu.js
const { ObjectId } = require("mongodb");
const mongodb = require("../data/database");
const Menu = require("../models/menu");

async function getAll(req, res) {
  try {
    const menuItems = await mongodb.getDatabase().collection("menu").find().toArray();
    res.status(200).json(menuItems);
  } catch {
    res.status(500).json({ error: "Failed to retrieve menu items" });
  }
}

async function getSingle(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const menuItem = await mongodb.getDatabase().collection("menu").findOne({ _id: new ObjectId(id) });
    if (!menuItem) return res.status(404).json({ error: "Menu item not found" });
    res.status(200).json(menuItem);
  } catch {
    res.status(500).json({ error: "Error retrieving menu item" });
  }
}

async function createMenu(req, res) {
  const errors = Menu.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const menuItem = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  try {
    const result = await mongodb.getDatabase().collection("menu").insertOne(menuItem);
    res.status(201).json({ _id: result.insertedId });
  } catch {
    res.status(500).json({ error: "Failed to create menu item" });
  }
}

async function updateMenu(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  const errors = Menu.validate(req.body);
  if (errors.length) return res.status(400).json({ errors });
  const updated = {
    ...req.body,
    updatedAt: new Date()
  };
  try {
    const result = await mongodb.getDatabase().collection("menu").replaceOne({ _id: new ObjectId(id) }, updated);
    if (result.matchedCount === 0) return res.status(404).json({ error: "Menu item not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to update menu item" });
  }
}

async function deleteMenu(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });
  try {
    const result = await mongodb.getDatabase().collection("menu").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Menu item not found" });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
}

module.exports = { getAll, getSingle, createMenu, updateMenu, deleteMenu };