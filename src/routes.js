const express = require('express');
const router = express.Router();
const User = require('./models.js').User;

router.post('/users', function(req, res, next) {
  console.log(req.body);
  const user = new User(req.body);
  user.save(function(err, newUser) {
    res.status = 201;
    res.json(newUser);
  });
});

router.get('/users', function(req, res, next) {
  res.json('yup');
});

module.exports = router
