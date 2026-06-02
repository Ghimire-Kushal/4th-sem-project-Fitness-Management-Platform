const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  time:     { type: String },
  items:    [{ type: String }],
  calories: { type: Number },
  notes:    { type: String },
});

const dietPlanSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  member:      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainer:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal:        { type: String },
  dailyCalories: { type: Number },
  meals: {
    breakfast: mealSchema,
    lunch:     mealSchema,
    dinner:    mealSchema,
    snacks:    mealSchema,
  },
  restrictions: [{ type: String }],
  isActive:    { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("DietPlan", dietPlanSchema);
