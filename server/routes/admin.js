const router = require("express").Router();
const { protect, allow } = require("../middleware/auth");
const ctrl = require("../controllers/adminController");

router.get("/stats",              protect, allow("admin"), ctrl.getStats);
router.get("/users",              protect, allow("admin"), ctrl.getUsers);
router.post("/users",             protect, allow("admin"), ctrl.createUser);
router.put("/users/:id",          protect, allow("admin"), ctrl.updateUser);
router.put("/users/:id/toggle",   protect, allow("admin"), ctrl.toggleUserStatus);

module.exports = router;
