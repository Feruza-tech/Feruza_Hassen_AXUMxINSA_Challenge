const bcrypt = require("bcrypt");
const pool = require("../config/db");
exports.register = async (req, res) => {
  const { username, phone, password } = req.body;
  const hash = await bcrypt.hash(password, 12);
  try {
    await pool.query(
      "INSERT INTO users (username, phone, password_hash) VALUES ($1,$2,$3)",
      [username, phone, hash]
    );
    res.json({ message: "Registered" });
  } catch (err) {
    if (err.code === "23505") {
      res.status(400).json({ message: "User already exists" });
    } else {
      console.error("Register error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );
  if (!result.rows.length)
    return res.status(401).json({ message: "Invalid credentials" });

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password_hash);

  if (!match)
    return res.status(401).json({ message: "Invalid credentials" });

  req.session.userId = user.id;
  res.json({ message: "Logged in" });
};
