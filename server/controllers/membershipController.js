const MembershipPlan = require("../models/MembershipPlan");
const Membership = require("../models/Membership");
const Notification = require("../models/Notification");

// Plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find({ isActive: true });
    res.json(plans);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createPlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.create(req.body);
    res.status(201).json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updatePlan = async (req, res) => {
  try {
    const plan = await MembershipPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(plan);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deletePlan = async (req, res) => {
  try {
    await MembershipPlan.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Plan deactivated" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Member enrollments
exports.enroll = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await MembershipPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const durationMap = { monthly: 30, quarterly: 90, yearly: 365 };
    const days = durationMap[plan.duration] || 30;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    const membership = await Membership.create({
      member: req.user._id, plan: planId, endDate, paymentStatus: "paid", status: "active",
    });

    await Notification.create({
      user: req.user._id,
      title: "Membership Activated",
      message: `Your ${plan.name} membership is active until ${endDate.toDateString()}.`,
      type: "membership",
    });

    res.status(201).json(await membership.populate("plan"));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyMembership = async (req, res) => {
  try {
    const membership = await Membership.findOne({ member: req.user._id, status: "active" })
      .populate("plan").sort({ createdAt: -1 });
    res.json(membership);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().populate("member", "name email").populate("plan");
    res.json(memberships);
  } catch (err) { res.status(500).json({ message: err.message }); }
};
