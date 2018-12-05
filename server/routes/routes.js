const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js').User;
const passport = require('../passport/index.js');
const mid = require('../middleware/middleware.js');
const multer = require('multer');
const newError = require('./errors.js');

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
  const { userName, password, email } = req.body;

  User.findOne({userName: userName}, function(err, user) {
    if (err) return next(newError.serverError());
    if (user) return next(newError.registrationError());
    const brandNewUser = new User({
        userName: userName,
        password: password,
        email: email,
        userImageURL: 'uploads/default.png'
    });
    brandNewUser.save(function(err, newUser) {
      if (err) return next(newError.serverError());
      res.status(201).json(newUser);
    });
  });
});

router.post('/userpic', upload.single('userImage'), function(req, res, next) {
  res.status(201).json({imageURL: req.file.path});
});

function updateUser(req, res, updateObj, messageStr, successType) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) return next(newError.serverError());
    if (user) {
      if (req.body.originalPassword) {
        if (user.verifyPassword(req.body.originalPassword)) {
          // if password is supplied and verified
          updateObj.password = user.hashPassword(req.body.newPassword);
          return returnUser(req, res, user, updateObj, messageStr, successType);
        } else {
          // if password is supplied and is not verified
          messageStr += 'Unable to update password. Original password supplied was invalid. '
          successType = 'Yellow';
          return returnUser(req, res, user, updateObj, messageStr, successType);
        }
      } else {
        // if password is not sent in update
        return returnUser(req, res, user, updateObj, messageStr, successType);
      }
    } else {
      // if there is no user id
      res.status('400').json({
        message: 'User ID missing in update request. Log out then log back in to refresh.',
        success: 'Red'
      });
    }
  });
}

function returnUser(req, res, user, updateObj, messageStr, successType) {
  user.update(updateObj, {runValidators: true}, function(err, result) {
    if (err) return next(newError.serverError());
    User.findOne({_id: req.params.id}, function(err, updatedUser) {
      if (err) return next(newError.serverError());
      res.status('200').json({
        user: updatedUser,
        message: messageStr,
        success: successType
      });
    });
  });
}

router.put('/users/:id',  function(req, res, next) {
  const updateObj = {};
  let messageStr;
  let successType;
  if (req.body.email.length > 0) {
    updateObj.email = req.body.email;
  }
  if (req.body.imageURL.length > 0) {
    updateObj.userImageURL = req.body.imageURL;
  }
  if (req.body.lat.length > 0) {
    updateObj.userCoordinates = {};
    updateObj.userCoordinates.lat = parseFloat(req.body.lat);
  }
  if (req.body.lng.length > 0 && updateObj.userCoordinates) {
    updateObj.userCoordinates.lng = parseFloat(req.body.lng);
  } else if (req.body.lng.length > 0) {
    updateObj.userCoordinates = {};
    updateObj.userCoordinates.lng = parseFloat(req.body.lng);
  }
  if (req.body.zoom.length > 0) {
    updateObj.userZoom = parseFloat(req.body.zoom);
  }
  if (req.body.userName.length > 0) {
    User.findOne({userName: req.body.userName}, function(err, searchUser) {
      if (err) return next(newError.serverError());
      if (searchUser) {
        // if username exists
        messageStr = 'User Updated! Unable to update username. New usernames must be unique. ';
        successType = 'Yellow';
        return updateUser(req, res, updateObj, messageStr, successType);
      } else {
        // if username does not exist
        updateObj.userName = req.body.userName;
        messageStr = 'User Updated!'
        successType = 'Green';
        return updateUser(req, res, updateObj, messageStr, successType);
      }
    });
  } else {
    // if username is not sent in update
    messageStr = 'User Updated! '
    successType = 'Green';
    return updateUser(req, res, updateObj, messageStr, successType);
  }
});

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
