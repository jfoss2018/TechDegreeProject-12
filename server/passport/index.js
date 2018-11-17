const passport = require('passport');
const User = require('../database/models.js').User;
const LocalStrategy = require('./strategy.js');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
