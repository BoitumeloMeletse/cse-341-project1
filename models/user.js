const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    role: { type: String, enum: ["admin", "customer"], default: "customer" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
