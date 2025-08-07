// models/tasks.js
class Task {
  // ... existing code ...

  static validate(payload) {
    const errors = [];
    if (!payload.title || payload.title.length < 3) errors.push("Title ≥ 3 characters required");
    if (!payload.description) errors.push("Description required");
    if (!payload.assignedTo) errors.push("assignedTo required");
    if (!payload.dueDate || isNaN(Date.parse(payload.dueDate))) errors.push("Valid dueDate required");
    if (!["Low","Medium","High"].includes(payload.priority)) errors.push("Priority must be Low/Medium/High");
    if (!["Not Started","In Progress","Complete"].includes(payload.status)) errors.push("Invalid status");
    return errors;
  }
}