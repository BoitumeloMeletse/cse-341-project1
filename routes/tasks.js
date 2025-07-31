const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");

const{ isAuthenticated } = require("../middleware/authenticate");

// GET all contacts
router.get("/", tasksController.getAll);

// GET single contact
router.get("/:id", tasksController.getSingle);

// POST create contact
router.post("/", isAuthenticated, tasksController.createTask);

// PUT update contact
router.put("/:id", isAuthenticated, tasksController.updateTask);

// DELETE contact
router.delete("/:id", isAuthenticated, tasksController.deleteTask);

module.exports = router;
