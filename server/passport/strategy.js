const User = require('../database/models/user.js').User;
const LocalStrategy = require('passport-local').Strategy;

const strategy = new LocalStrategy({
    usernameField: 'userName'
  },
  function(username, password, done) {
    User.findOne({userName: username}, function(err, user) {
      if (err) return done(err);
      if (!user) return done(null, false);
      if (!user.verifyPassword(password)) return done(null, false);
      return done(null, user);
    });
  }
);

module.exports = strategy;
