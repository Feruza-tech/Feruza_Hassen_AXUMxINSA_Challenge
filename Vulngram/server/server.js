require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const adminRoutes = require("./routes/admin");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const chatRoutes = require("./routes/chat");

const app = express();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);
app.use("/internal/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on port", PORT));

