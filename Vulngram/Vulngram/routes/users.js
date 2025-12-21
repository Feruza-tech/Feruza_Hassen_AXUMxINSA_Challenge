const express = require('express');
const axios = require('axios');
const pool = require('../db/db');
const router = express.Router();


const ALLOWED_DOMAINS = ['imgur.com', 'images.example.com'];


function ensureAuth(req, res, next) {
if (req.isAuthenticated()) return next();
res.redirect('/');
}


router.get('/dashboard', ensureAuth, (req, res) => {
res.render('dashboard', { user: req.user });
});


router.post('/update-profile', ensureAuth, async (req, res) => {
const { profilePicUrl } = req.body;


const hostname = new URL(profilePicUrl).hostname;
if (!ALLOWED_DOMAINS.some(d => hostname.endsWith(d))) {
return res.send('Image domain not allowed');
}


await axios.get(profilePicUrl); // SSRF vulnerable


await pool.query(
'UPDATE users SET profile_pic=$1 WHERE id=$2',
[profilePicUrl, req.user.id]
);


res.redirect('/users/dashboard');
});


module.exports = router;