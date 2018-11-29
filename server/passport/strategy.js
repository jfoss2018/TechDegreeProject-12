const User = require('../database/models/user.js').User;
const LocalStrategy = require('passport-local').Strategy;
const newError = require('../routes/errors.js');

const strategy = new LocalStrategy({
    usernameField: 'userName'
  },
  function(username, password, done) {
    User.findOne({userName: username}, function(err, user) {
      if (err) return done(newError.serverError());
      if (!user) return done(newError.loginError(), false);
      if (!user.verifyPassword(password)) return done(newError.loginError(), false);
      return done(null, user);
    });
  }
);

module.exports = strategy;
