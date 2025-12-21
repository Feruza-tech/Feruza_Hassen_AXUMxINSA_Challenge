const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db/db'); // your PostgreSQL pool
const bcrypt = require('bcrypt');

module.exports = function(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE username=$1',
        [username]
      );

      if (result.rowCount === 0) {
        console.log('User not found');
        return done(null, false, { message: 'User not found' });
      }

      const user = result.rows[0];

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        console.log('Incorrect password');
        return done(null, false, { message: 'Incorrect password' });
      }

      console.log('Login success:', user.username);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
      done(null, result.rows[0]);
    } catch (err) {
      done(err);
    }
  });
};
