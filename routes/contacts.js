const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

const { isAuthenticated } = require('../middleware/authenticate');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact
router.get('/:id', contactsController.getSingle);

// POST create contact
router.post('/', isAuthenticated, contactsController.createContact);

// PUT update contact
router.put('/:id', isAuthenticated, contactsController.updateContact);

// DELETE contact
router.delete('/:id', isAuthenticated, contactsController.deleteContact);

module.exports = router;
