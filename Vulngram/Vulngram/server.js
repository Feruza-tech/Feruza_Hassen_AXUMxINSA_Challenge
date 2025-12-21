require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const pool = require('./db/db');


const app = express();
require('./passport')(passport);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/chat', require('./routes/chat'));
app.use('/', require('./routes/imageFetcher'));


// Internal admin (SSRF target)
app.get('/internal/admin', async (req, res) => {
if (req.ip !== '127.0.0.1' && req.ip !== '::1') return res.sendStatus(403);
const data = await pool.query('SELECT * FROM admin_secrets');
res.json(data.rows);
});


app.listen(3000, () => console.log('Vulngram running on port 3000'));