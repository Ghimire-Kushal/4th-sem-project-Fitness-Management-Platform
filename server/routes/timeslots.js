const router = require("express").Router();
const { protect, allow } = require("../middleware/auth");
const ctrl = require("../controllers/timeslotController");

router.get("/",       protect, ctrl.getSlots);
router.post("/",      protect, allow("admin"), ctrl.createSlot);
router.put("/:id",    protect, allow("admin"), ctrl.updateSlot);
router.delete("/:id", protect, allow("admin"), ctrl.deleteSlot);

module.exports = router;
