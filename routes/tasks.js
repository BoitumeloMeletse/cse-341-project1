const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasks");

// GET all contacts
router.get("/", tasksController.getAll);

// GET single contact
router.get("/:id", tasksController.getSingle);

// POST create contact
router.post("/", tasksController.createTask);

// PUT update contact
router.put("/:id", tasksController.updateTask);

// DELETE contact
router.delete("/:id", tasksController.deleteTask);

module.exports = router;
