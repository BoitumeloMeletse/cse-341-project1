const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/payments")
const { isAuthenticated, hasRole } = require("../middleware/authenticate")

// GET all payments - public access
router.get("/", ctrl.getAll)

// GET single payment - public access
router.get("/:id", ctrl.getSingle)

// POST create payment (test route) - no authentication required
router.post("/test", ctrl.createPayment)

// POST create payment - requires cashier or admin role
router.post("/", isAuthenticated, hasRole(["cashier", "admin"]), ctrl.createPayment)

// PUT update payment - requires cashier or admin role
router.put("/:id", isAuthenticated, hasRole(["cashier", "admin"]), ctrl.updatePayment)

// DELETE payment - requires admin role only
router.delete("/:id", isAuthenticated, hasRole(["admin"]), ctrl.deletePayment)

module.exports = router
