const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const Task = require('../models/task');

const getAll = async (req, res) => {
  /* #swagger.tags = ['Tasks'] */
  try {
    const db = mongodb.getDatabase();
    const tasks = await db.collection('tasks').find().toArray();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const getSingle = async (req, res) => {
  /* #swagger.tags = ['Tasks'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid task ID format' });

    const db = mongodb.getDatabase();
    const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

const createTask = async (req, res) => {
  /* #swagger.tags = ['Tasks'] */
  try {
    const task = {
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    const validationErrors = Task.validate(task);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const db = mongodb.getDatabase();
    const result = await db.collection('tasks').insertOne(task);
    res.status(201).json({ _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  /* #swagger.tags = ['Tasks'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid task ID format' });

    const updatedTask = {
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      status: req.body.status,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt
    };

    const validationErrors = Task.validate(updatedTask);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    const db = mongodb.getDatabase();
    const result = await db.collection('tasks').replaceOne({ _id: new ObjectId(id) }, updatedTask);
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Task not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  /* #swagger.tags = ['Tasks'] */
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid task ID format' });

    const db = mongodb.getDatabase();
    const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Task not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };
