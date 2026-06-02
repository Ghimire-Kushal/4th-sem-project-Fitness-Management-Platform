const router = require("express").Router();
const { protect } = require("../middleware/auth");
const ctrl = require("../controllers/authController");

router.post("/register", ctrl.register);
router.post("/login",    ctrl.login);
router.get("/me",        protect, ctrl.getMe);
router.put("/profile",   protect, ctrl.updateProfile);
router.put("/password",  protect, ctrl.changePassword);

module.exports = router;
