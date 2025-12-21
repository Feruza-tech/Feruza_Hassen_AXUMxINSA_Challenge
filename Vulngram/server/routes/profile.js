const router = require("express").Router();
const auth = require("../middleware/auth");
const { getProfile, avatarFromUrl } = require("../controllers/profileController");

router.get("/", auth, getProfile);
router.post("/avatar-from-url", auth, avatarFromUrl);

module.exports = router;
