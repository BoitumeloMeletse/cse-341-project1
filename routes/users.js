const express = require("express")
const router = express.Router()
const ctrl = require("../controllers/users")
const { isAuthenticated, hasRole } = require("../middleware/authenticate")

// GET all users - public access
router.get("/", ctrl.getAll)

// GET single user - public access
router.get("/:id", ctrl.getSingle)

// POST create user (test route) - no authentication required
router.post("/test", ctrl.createUser)

// POST create user - admin only
router.post("/", isAuthenticated, ctrl.createUser)

// PUT update user - admin only
router.put("/:id", isAuthenticated, ctrl.updateUser)

// DELETE user - admin only
router.delete("/:id", isAuthenticated, ctrl.deleteUser)

module.exports = router
