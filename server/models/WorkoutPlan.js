const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  sets:     { type: Number },
  reps:     { type: String },
  duration: { type: String },
  notes:    { type: String },
});

const workoutPlanSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  member:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainer:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal:        { type: String, enum: ["weight_loss", "muscle_gain", "endurance", "flexibility", "general_fitness"] },
  days: [{
    day:       { type: String, required: true },
    exercises: [exerciseSchema],
  }],
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
