const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/users');
const { isAuthenticated } = require('../middleware/authenticate');

// Public GET routes
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getSingle);

// Authenticated routes (no role restriction)
router.post('/', isAuthenticated, ctrl.createUser);
router.put('/:id', isAuthenticated, ctrl.updateUser);
router.delete('/:id', isAuthenticated, ctrl.deleteUser);

module.exports = router;
