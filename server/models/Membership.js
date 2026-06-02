const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema({
  member:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan:    { type: mongoose.Schema.Types.ObjectId, ref: "MembershipPlan", required: true },
  startDate: { type: Date, default: Date.now },
  endDate:   { type: Date, required: true },
  status:    { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
  paymentStatus: { type: String, enum: ["paid", "pending", "failed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Membership", membershipSchema);
