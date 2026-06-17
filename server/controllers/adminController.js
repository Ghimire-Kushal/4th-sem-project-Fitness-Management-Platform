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
    const { role, search, trainerId, active } = req.query;
    const filter = role ? { role } : {};
    if (trainerId) filter.assignedTrainer = trainerId;
    if (active === "true") filter.isActive = true;
    if (active === "false") filter.isActive = false;
    if (search) {
      const term = new RegExp(search, "i");
      filter.$or = [{ name: term }, { email: term }, { phone: term }];
    }
    const users = await User.find(filter).select("-password")
      .populate("assignedTrainer", "name email")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role = "member", phone, age, gender, assignedTrainer, username } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Name, email and password are required" });
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });
    if (username && await User.findOne({ username: username.toLowerCase() }))
      return res.status(400).json({ message: "Username already exists" });
    if (assignedTrainer) {
      const trainer = await User.findOne({ _id: assignedTrainer, role: "trainer" });
      if (!trainer) return res.status(400).json({ message: "Selected trainer is invalid" });
    }
    const user = await User.create({ name, email, password, role, phone, age, gender, assignedTrainer, username });
    const saved = await User.findById(user._id).select("-password").populate("assignedTrainer", "name email");
    res.status(201).json(saved);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, email, username, role, assignedTrainer, ...rest } = req.body;
    const update = { ...rest };
    if (email) update.email = email;
    if (username !== undefined) update.username = username || undefined;
    if (role) update.role = role;
    if (assignedTrainer !== undefined) {
      if (assignedTrainer) {
        const trainer = await User.findOne({ _id: assignedTrainer, role: "trainer" });
        if (!trainer) return res.status(400).json({ message: "Selected trainer is invalid" });
      }
      update.assignedTrainer = assignedTrainer || null;
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true })
      .select("-password").populate("assignedTrainer", "name email");
    if (!user) return res.status(404).json({ message: "User not found" });
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

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin")
      return res.status(400).json({ message: "Admin users cannot be removed here" });

    if (user.role === "trainer") {
      await User.updateMany({ assignedTrainer: user._id }, { $unset: { assignedTrainer: "" } });
    }

    await user.deleteOne();
    res.json({ message: `${user.role === "trainer" ? "Trainer" : "User"} removed successfully` });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
