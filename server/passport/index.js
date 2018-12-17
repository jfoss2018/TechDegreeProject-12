const passport = require('passport');
const User = require('../database/models/user.js').User;
const LocalStrategy = require('./strategy.js');

// serialize user by saving the user id to the request object.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// returns the user using the serialized user's id.
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
