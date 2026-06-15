require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

const ensureDefaultAdmin = async () => {
  const username = process.env.DEFAULT_ADMIN_USERNAME;
  const password = process.env.DEFAULT_ADMIN_PASSWORD;
  const email = process.env.DEFAULT_ADMIN_EMAIL;

  if (!username || !password || !email) {
    console.warn("Default admin was not created. Set DEFAULT_ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD and DEFAULT_ADMIN_EMAIL in server/.env.");
    return;
  }

  const existing = await User.findOne({ username });
  if (existing) return;
  const byEmail = await User.findOne({ email });
  if (byEmail) {
    byEmail.username = username;
    byEmail.role = "admin";
    byEmail.isActive = true;
    await byEmail.save();
    return;
  }
  await User.create({
    name: "Admin",
    username,
    email,
    password,
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
