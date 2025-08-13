const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/payments');
const { isAuthenticated } = require('../middleware/authenticate');

// Public GET routes
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getSingle);

// Authenticated routes (no role restriction)
router.post('/', isAuthenticated, ctrl.createPayment);
router.put('/:id', isAuthenticated, ctrl.updatePayment);
router.delete('/:id', isAuthenticated, ctrl.deletePayment);

module.exports = router;
