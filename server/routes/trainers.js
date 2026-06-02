const router = require("express").Router();
const { protect, allow } = require("../middleware/auth");
const ctrl = require("../controllers/trainerController");

router.get("/",          protect, ctrl.getTrainers);
router.get("/members",   protect, allow("trainer"), ctrl.getMyMembers);
router.post("/assign",   protect, allow("admin"), ctrl.assignTrainer);

module.exports = router;
