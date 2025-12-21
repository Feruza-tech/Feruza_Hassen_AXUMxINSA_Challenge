const router = require("express").Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  const users = await pool.query(
    "SELECT username, phone FROM users"
  );
  res.json(users.rows);
});

module.exports = router;
