const express = require("express")
const router = express.Router()

// POST login with role - creates session with specified role
router.post("/login", (req, res) => {
  const { role = "customer" } = req.body

  // Validate role
  const validRoles = ["customer", "cashier", "admin"]
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role. Must be: customer, cashier, or admin" })
  }

  // Create session user with specified role
  req.session.user = {
    id: "test-user-id",
    displayName: "Test User",
    role: role,
  }

  res.status(200).json({
    message: "Logged in successfully",
    user: req.session.user,
  })
})

// POST logout - destroys session
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" })
    }
    res.status(200).json({ message: "Logged out successfully" })
  })
})

// GET current user - returns current session user
router.get("/me", (req, res) => {
  const user = req.user || (req.session && req.session.user)
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" })
  }
  res.status(200).json({ user })
})

module.exports = router
