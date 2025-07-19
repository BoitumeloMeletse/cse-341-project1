const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');

const getAll = async (req, res) => {
  /* #swagger.tags = ['Users'] */
  try {
    const db = mongodb.getDatabase();
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

const getSingle = async (req, res) => {
  /* #swagger.tags = ['Users'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid user ID format' });

    const db = mongodb.getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

const createUser = async (req, res) => {
  /* #swagger.tags = ['Users'] */
  try {
    const user = {
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      ipAddress: req.body.ipAddress
    };

    // Basic required field validation
    for (const [k, v] of Object.entries(user)) {
      if (!v) return res.status(400).json({ error: `Missing field: ${k}` });
    }

    const db = mongodb.getDatabase();
    const result = await db.collection('users').insertOne(user);

    res
      .status(201)
      .location(`/users/${result.insertedId}`)
      .json({ _id: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {
  /* #swagger.tags = ['Users'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid user ID format' });

    const db = mongodb.getDatabase();
    const updated = {
      email: req.body.email,
      username: req.body.username,
      name: req.body.name,
      ipAddress: req.body.ipAddress
    };

    const result = await db.collection('users').replaceOne({ _id: new ObjectId(id) }, updated);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'User not found' });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  /* #swagger.tags = ['Users'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid user ID format' });

    const db = mongodb.getDatabase();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'User not found' });

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
