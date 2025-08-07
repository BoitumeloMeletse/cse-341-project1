const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders");

const{ isAuthenticated } = require("../middleware/authenticate");

// GET all order
router.get("/", ordersController.getAll);

// GET single order
router.get("/:id", ordersController.getSingle);

// POST create order
router.post("/", isAuthenticated, ordersController.createOrder);

// PUT update order
router.put("/:id", isAuthenticated, ordersController.updateOrder);

// DELETE order
router.delete("/:id", isAuthenticated, ordersController.deleteOrder);

module.exports = router;
