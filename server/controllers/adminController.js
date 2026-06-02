const User = require("../models/User");
const Booking = require("../models/Booking");
const Membership = require("../models/Membership");
const WorkoutPlan = require("../models/WorkoutPlan");
const DietPlan = require("../models/DietPlan");

exports.getStats = async (req, res) => {
  try {
    const [totalMembers, totalTrainers, totalBookings, activeMembers] = await Promise.all([
      User.countDocuments({ role: "member" }),
      User.countDocuments({ role: "trainer" }),
      Booking.countDocuments(),
      Membership.countDocuments({ status: "active" }),
    ]);
    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    res.json({ totalMembers, totalTrainers, totalBookings, activeMembers, bookingsByStatus });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select("-password")
      .populate("assignedTrainer", "name");
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email }))
      return res.status(400).json({ message: "Email already exists" });
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, rest, { new: true }).select("-password");
    res.json(user);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ message: `User ${user.isActive ? "activated" : "deactivated"}`, isActive: user.isActive });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
