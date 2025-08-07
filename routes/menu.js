// routes/menu.js
const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu");
const { isAuthenticated } = require("../middleware/authenticate");

// GET all menu items
router.get("/", menuController.getAll);

// GET single menu item
router.get("/:id", menuController.getSingle);

// POST create menu item
router.post("/", isAuthenticated, menuController.createMenu);

// PUT update menu item
router.put("/:id", isAuthenticated, menuController.updateMenu);

// DELETE menu item
router.delete("/:id", isAuthenticated, menuController.deleteMenu);

module.exports = router;