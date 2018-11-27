const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js').User;
const passport = require('../passport/index.js');
const mid = require('../middleware/middleware.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    let dateString = new Date().toISOString();
    let formattedDateString = dateString.replace(/:/g, "-");
    cb(null, formattedDateString + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post('/users', function(req, res, next) {
  const { userName, password } = req.body;

  User.findOne({userName: userName}, function(err, user) {
    if (err) return console.log('No!!!!!!!!!!');
    if (user) return console.log('NO way!');
    const brandNewUser = new User({
        userName: userName,
        password: password,
        userImageURL: 'uploads/default.png'
    });
    brandNewUser.save(function(err, newUser) {
      if (err) return next(err);
      res.status = 201;
      res.json(newUser);
    });
  });
});

router.post('/userpic', upload.single('userImage'), function(req, res, next) {
  res.status(201).json({imageURL: req.file.path});
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
    id: req.user._id,
    userImageURL: req.user.userImageURL,
    userCoordinatesLat: req.user.userCoordinates.lat,
    userCoordinatesLng: req.user.userCoordinates.lng,
    userZoom: req.user.userZoom,
    userEmail: req.user.email
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
