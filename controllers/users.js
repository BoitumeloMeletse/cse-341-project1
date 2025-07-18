const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// GET all users
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const users = await db.collection('users').find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getAll:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// GET single user by ID
const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const db = mongodb.getDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getSingle:', error);
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
};

module.exports = { getAll, getSingle };
