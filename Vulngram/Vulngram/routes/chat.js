const express = require('express');
const pool = require('../db/db');
const router = express.Router();


router.get('/', async (req, res) => {
const users = await pool.query('SELECT username FROM users WHERE id != $1', [req.user.id]);
res.render('chat', { users: users.rows });
});


router.post('/send', async (req, res) => {
const { receiver, message } = req.body;
const recv = await pool.query('SELECT id FROM users WHERE username=$1', [receiver]);


await pool.query(
'INSERT INTO messages(sender_id, receiver_id, content) VALUES($1,$2,$3)',
[req.user.id, recv.rows[0].id, message]
);


res.redirect('/chat');
});


module.exports = router;