const express = require('express');
const router = express.Router();
const User = require('../database/models.js').User;
const passport = require('../passport/index.js');

router.post('/users', function(req, res, next) {
  const { username, password } = req.body;
  User.findOne({username: username}, function(err, user) {
    if (err) return next(err);
    if (user) return next(/*already a user error*/);
    const user = new User({
        userName: username,
        password: password
    });
    user.save(function(err, newUser) {
      if (err) return next(err);
      res.status = 201;
      res.json(newUser);
    });
  });
});

router.post('/users/login', passport.authenticate('local'), function(req, res, next) {

});

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        res.send(userInfo);
    }
)


router.get('/users', function(req, res, next) {
  res.json('yup');
});

module.exports = router
