const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// GET all users
router.get('/', usersController.getAll);

// GET single user by ID
router.get('/:id', usersController.getSingle);

module.exports = router;
