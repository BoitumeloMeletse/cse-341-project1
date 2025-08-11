const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/users');
const { isAuthenticated, hasRole } = require('../middleware/authenticate');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getSingle);
router.post('/', isAuthenticated, hasRole(['admin']), ctrl.createUser);   // only admin can create users via API
router.put('/:id', isAuthenticated, hasRole(['admin']), ctrl.updateUser);
router.delete('/:id', isAuthenticated, hasRole(['admin']), ctrl.deleteUser);

module.exports = router;
