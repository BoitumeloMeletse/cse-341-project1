class Payment {
  static validatePayload(payload) {
    const errors = [];
    if (!payload.userId) errors.push("User ID is required");
    if (payload.amount === undefined || isNaN(payload.amount)) {
      errors.push("Valid amount is required");
    }
    if (!payload.currency) errors.push("Currency is required");
    if (!payload.status || !["Pending", "Completed", "Failed"].includes(payload.status)) {
      errors.push("Status must be one of: Pending, Completed, Failed");
    }
    return errors;
  }
}

module.exports = Payment;