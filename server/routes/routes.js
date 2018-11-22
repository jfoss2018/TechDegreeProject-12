const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js').User;
const passport = require('../passport/index.js');
const mid = require('../middleware/middleware.js');

router.post('/users', function(req, res, next) {
  const { userName, password } = req.body;

  User.findOne({userName: userName}, function(err, user) {
    if (err) return console.log('No!!!!!!!!!!');
    if (user) return console.log('NO way!');
    const brandNewUser = new User({
        userName: userName,
        password: password
    });
    brandNewUser.save(function(err, newUser) {
      if (err) return next(err);
      res.status = 201;
      res.json(newUser);
    });
  });
});

/*
router.post('/users', function(req, res, next) {
  res.json({
    username: req.body.userName,
    password: req.body.password
  })
});
*/
/*
router.get('/users/:id/profile', mid.authenticationMiddleware, function(req, res, next) {
  const userID = req.params.id;

});
*/
router.post('/users/login', passport.authenticate('local'), function(req, res, next) {
  res.status = 200;
  res.json({
    username: req.user.userName,
    id: req.user._id
  });
});


router.post('/users/logout', function(req, res, next) {
    if (req.user) {
        req.logout();
        res.status = 200;
        res.json({message: 'Logged Out'});
    } else {
        res.status = 400;
        res.json({message: 'No user to logout'});
    }
});
/*
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
*/

router.get('/users/:id/profile', mid, function(req, res, next) {
  res.status = 200;
  res.json('yup');
});

module.exports = router
