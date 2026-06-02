const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  date:      { type: String, required: true },
  startTime: { type: String, required: true },
  endTime:   { type: String, required: true },
  capacity:  { type: Number, default: 10 },
  booked:    { type: Number, default: 0 },
  trainer:   { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type:      { type: String, enum: ["gym_session", "trainer_appointment"], default: "gym_session" },
  isActive:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
