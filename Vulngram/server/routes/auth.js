const router = require("express").Router();
const {
  register,
  login
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});


module.exports = router;
