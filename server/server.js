require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

const ensureDefaultAdmin = async () => {
  const existing = await User.findOne({ username: "admin" });
  if (existing) return;
  const byEmail = await User.findOne({ email: "admin@fitness.com" });
  if (byEmail) {
    byEmail.username = "admin";
    byEmail.role = "admin";
    byEmail.isActive = true;
    await byEmail.save();
    return;
  }
  await User.create({
    name: "Admin",
    username: "admin",
    email: "admin@fitness.com",
    password: "admin123",
    role: "admin",
    isActive: true,
  });
};

app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/api/auth",        require("./routes/auth"));
app.use("/api/users",       require("./routes/users"));
app.use("/api/memberships", require("./routes/memberships"));
app.use("/api/timeslots",   require("./routes/timeslots"));
app.use("/api/bookings",    require("./routes/bookings"));
app.use("/api/workouts",    require("./routes/workouts"));
app.use("/api/diets",       require("./routes/diets"));
app.use("/api/trainers",    require("./routes/trainers"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/admin",       require("./routes/admin"));

const PORT = process.env.PORT || 5001;

const start = async () => {
  await connectDB();
  await ensureDefaultAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
