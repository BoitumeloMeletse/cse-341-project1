const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const database = mongodb.getDatabase();
        const result = database.db('project1').collection('users').find();
        const users = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error in getAll:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getSingle = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        const userId = new ObjectId(req.params.id);
        const database = mongodb.getDatabase();
        const result = database.db('project1').collection('users').find({ _id: userId });
        const users = await result.toArray();

        if (users.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } catch (error) {
        console.error('Error in getSingle:', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

module.exports = {
    getAll,
    getSingle
};
