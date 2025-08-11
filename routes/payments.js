const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/payments');
const { isAuthenticated, hasRole } = require('../middleware/authenticate');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getSingle);
// secure payment creation/updating: kitchen or cashier or admin only
router.post('/', isAuthenticated, hasRole(['cashier','admin']), ctrl.createPayment);
router.put('/:id', isAuthenticated, hasRole(['cashier','admin']), ctrl.updatePayment);
router.delete('/:id', isAuthenticated, hasRole(['admin']), ctrl.deletePayment);

module.exports = router;
