const User = require('../models/user');
const { Types } = require('mongoose');

async function getAll(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error retrieving users:', err); 
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

async function getSingle(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
}

async function createUser(req, res) {
  const errors = User.validatePayload(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const created = await User.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });
  const errors = User.validatePayload(req.body);
  if (errors.length) return res.status(400).json({ errors });
  try {
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' });
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
