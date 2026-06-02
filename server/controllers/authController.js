const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Notification = require("../models/Notification");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const sanitize = (u) => ({
  _id: u._id, name: u.name, email: u.email, role: u.role,
  phone: u.phone, address: u.address, age: u.age, gender: u.gender,
  isActive: u.isActive, assignedTrainer: u.assignedTrainer, createdAt: u.createdAt,
});

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, age, gender } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Please fill all required fields" });

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password, phone, age, gender });
    await Notification.create({
      user: user._id,
      title: "Welcome to Fitness Platform!",
      message: `Hi ${name}, your account has been created. Start your fitness journey today!`,
      type: "general",
    });

    res.status(201).json({ token: signToken(user._id), user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Please enter email and password" });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid email or password" });
    if (!user.isActive)
      return res.status(403).json({ message: "Account deactivated. Contact admin." });

    res.json({ token: signToken(user._id), user: sanitize(user) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json(sanitize(req.user));
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address, age, gender } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, address, age, gender },
      { new: true }
    );
    res.json(sanitize(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!(await user.matchPassword(currentPassword)))
      return res.status(400).json({ message: "Current password is incorrect" });
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
