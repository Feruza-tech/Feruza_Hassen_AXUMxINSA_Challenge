const router = require("express").Router();
const pool = require("../config/db");

// internal-only
router.use((req, res, next) => {
  const ip = req.socket.remoteAddress;

  if (
    ip !== "127.0.0.1" &&
    ip !== "::1"
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  next();
});

router.get("/", async (req, res) => {
  const users = await pool.query(
    "SELECT username, phone FROM users"
  );
  res.json(users.rows);
});

module.exports = router;

