const mongoose = require("mongoose");

const membershipPlanSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  duration:    { type: String, enum: ["monthly", "quarterly", "yearly"], required: true },
  price:       { type: Number, required: true },
  features:    [{ type: String }],
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);
