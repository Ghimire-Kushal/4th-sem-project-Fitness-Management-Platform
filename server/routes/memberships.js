const router = require("express").Router();
const { protect, allow } = require("../middleware/auth");
const ctrl = require("../controllers/membershipController");

router.get("/plans",               protect, ctrl.getPlans);
router.post("/plans",              protect, allow("admin"), ctrl.createPlan);
router.put("/plans/:id",           protect, allow("admin"), ctrl.updatePlan);
router.delete("/plans/:id",        protect, allow("admin"), ctrl.deletePlan);

router.post("/enroll",             protect, allow("member"), ctrl.enroll);
router.get("/my",                  protect, allow("member"), ctrl.getMyMembership);
router.get("/all",                 protect, allow("admin"), ctrl.getAllMemberships);

module.exports = router;
