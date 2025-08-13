const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/payments');
const { isAuthenticated, hasRole } = require('../middleware/authenticate');

// Public GET routes
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getSingle);

// Protected routes
router.post('/', isAuthenticated, hasRole(['admin', 'user']), ctrl.createPayment);
router.put('/:id', isAuthenticated, hasRole(['admin', 'user']), ctrl.updatePayment);
router.delete('/:id', isAuthenticated, hasRole(['admin']), ctrl.deletePayment);

module.exports = router;