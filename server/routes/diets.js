const router = require("express").Router();
const { protect, allow } = require("../middleware/auth");
const ctrl = require("../controllers/dietController");

router.post("/",        protect, allow("trainer"), ctrl.createPlan);
router.get("/my",       protect, allow("member"), ctrl.getMyPlans);
router.get("/assigned", protect, allow("trainer"), ctrl.getAssignedPlans);
router.get("/all",      protect, allow("admin"), ctrl.getAllPlans);
router.put("/:id",      protect, allow("trainer"), ctrl.updatePlan);
router.delete("/:id",   protect, allow("trainer", "admin"), ctrl.deletePlan);

module.exports = router;
