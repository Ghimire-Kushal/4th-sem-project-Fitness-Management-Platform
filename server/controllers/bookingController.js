const Booking = require("../models/Booking");
const TimeSlot = require("../models/TimeSlot");
const Notification = require("../models/Notification");

exports.createBooking = async (req, res) => {
  try {
    const { timeSlotId, type, notes } = req.body;
    const slot = await TimeSlot.findById(timeSlotId);
    if (!slot) return res.status(404).json({ message: "Time slot not found" });
    if (slot.booked >= slot.capacity)
      return res.status(400).json({ message: "This slot is fully booked" });

    const existing = await Booking.findOne({
      member: req.user._id, timeSlot: timeSlotId, status: { $in: ["pending", "approved"] }
    });
    if (existing) return res.status(400).json({ message: "You already have a booking for this slot" });

    const booking = await Booking.create({
      member: req.user._id,
      timeSlot: timeSlotId,
      trainer: slot.trainer,
      type,
      notes,
    });

    await TimeSlot.findByIdAndUpdate(timeSlotId, { $inc: { booked: 1 } });

    await Notification.create({
      user: req.user._id,
      title: "Booking Confirmed",
      message: `Your ${type === "gym_session" ? "gym session" : "trainer appointment"} on ${slot.date} at ${slot.startTime} is pending approval.`,
      type: "booking",
    });

    res.status(201).json(await booking.populate(["timeSlot", { path: "trainer", select: "name" }]));
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ member: req.user._id })
      .populate("timeSlot").populate("trainer", "name email").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getTrainerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ trainer: req.user._id })
      .populate("timeSlot").populate("member", "name email phone").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("member", "name email").populate("timeSlot")
      .populate("trainer", "name").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true })
      .populate("member", "name").populate("timeSlot");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await Notification.create({
      user: booking.member._id,
      title: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      message: `Your booking for ${booking.timeSlot?.date} has been ${status}.`,
      type: "booking",
    });

    if (status === "cancelled") {
      await TimeSlot.findByIdAndUpdate(booking.timeSlot._id, { $inc: { booked: -1 } });
    }

    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, member: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (["completed", "cancelled"].includes(booking.status))
      return res.status(400).json({ message: "Cannot cancel this booking" });

    booking.status = "cancelled";
    await booking.save();
    await TimeSlot.findByIdAndUpdate(booking.timeSlot, { $inc: { booked: -1 } });
    res.json({ message: "Booking cancelled" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
