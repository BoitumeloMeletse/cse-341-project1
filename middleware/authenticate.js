function isAuthenticated(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) return next();
    if (req.session && req.session.user) return next();
    return res.status(401).json({ error: 'Not authenticated' });
  }
  
  function hasRole(roles = []) {
    return (req, res, next) => {
      const user = req.user || (req.session && req.session.user);
      if (!user) return res.status(401).json({ error: 'Not authenticated' });
      if (!roles.length) return next();
      const role = user.role || 'customer';
      if (roles.includes(role)) return next();
      return res.status(403).json({ error: 'Forbidden - insufficient role' });
    };
  }
  
  module.exports = { isAuthenticated, hasRole };
  