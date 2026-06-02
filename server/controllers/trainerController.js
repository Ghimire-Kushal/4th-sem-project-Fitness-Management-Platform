const User = require("../models/User");

exports.getTrainers = async (req, res) => {
  try {
    const trainers = await User.find({ role: "trainer", isActive: true }).select("-password");
    res.json(trainers);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyMembers = async (req, res) => {
  try {
    const members = await User.find({ assignedTrainer: req.user._id }).select("-password");
    res.json(members);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.assignTrainer = async (req, res) => {
  try {
    const { memberId, trainerId } = req.body;
    const member = await User.findByIdAndUpdate(memberId, { assignedTrainer: trainerId }, { new: true })
      .select("-password").populate("assignedTrainer", "name email");
    res.json(member);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
