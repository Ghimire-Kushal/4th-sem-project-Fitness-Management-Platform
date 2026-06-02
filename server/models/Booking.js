const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  member:   { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timeSlot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot", required: true },
  trainer:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type:     { type: String, enum: ["gym_session", "trainer_appointment"], required: true },
  status:   { type: String, enum: ["pending", "approved", "completed", "cancelled"], default: "pending" },
  notes:    { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
