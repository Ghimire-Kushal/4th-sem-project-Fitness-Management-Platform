const router = require("express").Router();
const { protect, allow } = require("../middleware/auth");
const ctrl = require("../controllers/bookingController");

router.post("/",               protect, allow("member"), ctrl.createBooking);
router.get("/my",              protect, allow("member"), ctrl.getMyBookings);
router.get("/trainer",         protect, allow("trainer"), ctrl.getTrainerBookings);
router.get("/all",             protect, allow("admin"), ctrl.getAllBookings);
router.put("/:id/status",      protect, allow("admin", "trainer"), ctrl.updateStatus);
router.put("/:id/cancel",      protect, allow("member"), ctrl.cancelBooking);

module.exports = router;
