class User {
  static validatePayload(payload) {
    const errors = [];
    if (!payload.username) errors.push("Username is required");
    if (!payload.email) errors.push("Email is required");
    if (!payload.password) errors.push("Password is required");
    if (payload.role && !["admin", "user", "guest"].includes(payload.role)) {
      errors.push("Role must be one of: admin, user, guest");
    }
    return errors;
  }
}

module.exports = User;