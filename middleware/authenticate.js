function isAuthenticated(req, res, next) {
    // Check if user is authenticated via Passport
    if (req.isAuthenticated && req.isAuthenticated()) return next()
  
    // Fallback to session user
    if (req.session && req.session.user) return next()
  
    return res.status(401).json({ error: "Not authenticated" })
  }
  
  function hasRole(roles = []) {
    return (req, res, next) => {
      const user = req.user || (req.session && req.session.user)
      if (!user) return res.status(401).json({ error: "Not authenticated" })
  
      // If no roles specified, just check authentication
      if (!roles.length) return next()
  
      // Get user role (default to 'customer' if not specified)
      const userRole = user.role || "customer"
  
      // Check if user has required role
      if (roles.includes(userRole)) return next()
  
      return res.status(403).json({ error: "Forbidden - insufficient role" })
    }
  }
  
  module.exports = { isAuthenticated, hasRole }
  