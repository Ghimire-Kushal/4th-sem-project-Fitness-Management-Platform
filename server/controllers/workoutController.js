const WorkoutPlan = require("../models/WorkoutPlan");
const Notification = require("../models/Notification");

exports.createPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.create({ ...req.body, trainer: req.user._id });
    await Notification.create({
      user: plan.member,
      title: "New Workout Plan",
      message: `Your trainer has assigned you a new workout plan: "${plan.title}".`,
      type: "plan",
    });
    res.status(201).json(await plan.populate("trainer", "name"));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ member: req.user._id, isActive: true })
      .populate("trainer", "name email");
    res.json(plans);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAssignedPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ trainer: req.user._id })
      .populate("member", "name email");
    res.json(plans);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findOneAndUpdate(
      { _id: req.params.id, trainer: req.user._id }, req.body, { new: true }
    );
    if (!plan) return res.status(404).json({ message: "Plan not found" });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deletePlan = async (req, res) => {
  try {
    await WorkoutPlan.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Plan removed" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find()
      .populate("member", "name email").populate("trainer", "name");
    res.json(plans);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
