const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const pool = require('../db/db');

// ----------------- REGISTER -----------------
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, phone, password } = req.body;

  try {
    // Check if username or phone exists
    const exists = await pool.query(
      'SELECT 1 FROM users WHERE username=$1 OR phone=$2',
      [username, phone]
    );

    if (exists.rowCount > 0) return res.send('Username or phone already exists');

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert user
    await pool.query(
      'INSERT INTO users (username, phone, password) VALUES ($1, $2, $3)',
      [username, phone, hashed]
    );

    res.send('Registration successful! You can now <a href="/">login</a>.');
  } catch (err) {
    console.error(err);
    res.send('Error registering user');
  }
});

// ----------------- LOGIN -----------------
router.get('/', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  console.log('Login attempt:', req.body);
  next();
}, passport.authenticate('local', {
  successRedirect: '/users/dashboard',
  failureRedirect: '/',
  failureFlash: false
}));

module.exports = router;
