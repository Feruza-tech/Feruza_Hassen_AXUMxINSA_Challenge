const pool = require("../config/db");
const imageService = require("../services/imageFetcher");

exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username, phone, avatar_url FROM users WHERE id=$1",
      [req.session.userId]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.avatarFromUrl = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ message: "Image URL required" });
  }

  try {
    const filename = await imageService.fetchImage(
      imageUrl,
      req.session.userId
    );

    await pool.query(
      "UPDATE users SET avatar_url=$1 WHERE id=$2",
      [filename, req.session.userId]
    );

    res.json({ message: "Avatar updated", filename });
  } catch (err) {
    console.error("Avatar error:", err.message);
    res.status(400).json({ message: err.message });
  }
};
