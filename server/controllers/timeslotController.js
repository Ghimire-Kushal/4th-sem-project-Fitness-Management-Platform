const TimeSlot = require("../models/TimeSlot");

exports.getSlots = async (req, res) => {
  try {
    const { date, type } = req.query;
    const filter = { isActive: true };
    if (date) filter.date = date;
    if (type) filter.type = type;
    const slots = await TimeSlot.find(filter).populate("trainer", "name");
    res.json(slots);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.createSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.create(req.body);
    res.status(201).json(slot);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateSlot = async (req, res) => {
  try {
    const slot = await TimeSlot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(slot);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.deleteSlot = async (req, res) => {
  try {
    await TimeSlot.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Slot removed" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
