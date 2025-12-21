const router = require("express").Router();
const pool = require("../config/db");
const auth = require("../middleware/auth");

// POST /api/chat/send — send a message by username or phone
router.post("/send", auth, async (req, res) => {
  const { to, content } = req.body;
  if (!to || !content) {
    return res.status(400).json({ message: "Recipient and content required" });
  }

  try {
    // Find recipient by username OR phone
    const result = await pool.query(
      "SELECT id FROM users WHERE username=$1 OR phone=$1 LIMIT 1",
      [to]
    );
    if (!result.rows.length) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    const receiverId = result.rows[0].id;

    // Insert message
    await pool.query(
      "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)",
      [req.session.userId, receiverId, content]
    );

    res.json({ message: "Message sent" });
  } catch (err) {
    console.error("Send error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/chat/inbox — messages received by current user
router.get("/inbox", auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT m.id, u.username AS sender, m.content, m.created_at
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.receiver_id=$1
       ORDER BY m.created_at DESC`,
      [req.session.userId]
    );
    res.json(result.rows); 
  } catch (err) {
    console.error("Inbox error:", err);
    res.json([]);
  }
});

module.exports = router;
