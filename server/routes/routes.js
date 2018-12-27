const express = require('express');
const router = express.Router();
const User = require('../database/models/user.js').User;
const Search = require('../database/models/search.js').Search;
const passport = require('../passport/index.js');
const mid = require('../middleware/middleware.js').authenticate;
const midTime = require('../middleware/middleware.js').timeout;
const multer = require('multer');
const newError = require('./errors.js');
const apiKeys = require('../../.config.js').apiKeys;
const axios = require('axios');

// The updateUser function is used to help build an update object and response messages based
// on what information is supplied in the put request, and if that information is valid or
// not.
function updateUser(req, res, updateObj, messageStr, successType, next) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) return next(newError.serverError());
    if (user) {
      if (req.body.originalPassword) {
        if (user.verifyPassword(req.body.originalPassword)) {
          // if password is supplied and verified
          updateObj.password = user.hashPassword(req.body.newPassword);
          return returnUser(req, res, user, updateObj, messageStr, successType, next);
        } else {
          // if password is supplied and is not verified
          messageStr += 'Unable to update password. Original password supplied was invalid. '
          successType = 'Yellow';
          return returnUser(req, res, user, updateObj, messageStr, successType, next);
        }
      } else {
        // if password is not sent in update
        return returnUser(req, res, user, updateObj, messageStr, successType, next);
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

// The returnUser function takes the configured update object and response messages and returns
// the updated user and messages.
function returnUser(req, res, user, updateObj, messageStr, successType, next) {
  user.updateOne(updateObj, {runValidators: true}, function(err, result) {
    if (err) return next(err);
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

// The storage constant specifies where to store image files and how the image should be named.
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

// The fileFilter function returns an error if anything other than a .jpg or .png file is supplied.
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(newError.picError(), false);
  }
};

// The upload constant contains the configuration for the multipart/form-data for saving images.
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// The /users POST route is used for creating new users.
router.post('/users', function(req, res, next) {
  const { userName, password, email } = req.body;
  User.findOne({userName: userName}, function(err, user) {
    if (err) return next(newError.serverError());
    if (user) return next(newError.registrationError());
    const brandNewUser = new User({
        userName: userName,
        password: password,
        email: email,
        userImageURL: 'uploads/default.png',
        userCoordinates: {
          lat: 38,
          lng: -97
        },
        userZoom: 5
    });
    brandNewUser.save(function(err, newUser) {
      if (err) return next(newError.serverError());
      res.status('201').json(newUser);
    });
  });
});

// The /users GET route is used to return the current user information when the page gets
// refreshed when a non-existant route is navigated to.
router.get('/users', mid, function(req, res, next) {
  if (!req.user) {
    return next();
  }
  res.status('200').json(req.user);
});

// The /users/userpic POST route is used for saving new profile images to the uploads folder.
router.post('/users/userpic', mid, upload.single('userImage'), function(req, res, next) {
  res.status('201').json({imageURL: req.file.path});
});

// The /users/:id PUT route is used to update the current user in the database.
router.put('/users/:id', mid, function(req, res, next) {
  // The updateObj, messageStr, and successType are updated depending on what
  // is supplied in the request, and whether or not that information is valid.
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
        return updateUser(req, res, updateObj, messageStr, successType, next);
      } else {
        // if username does not exist
        updateObj.userName = req.body.userName;
        messageStr = 'User Updated!'
        successType = 'Green';
        return updateUser(req, res, updateObj, messageStr, successType, next);
      }
    });
  } else {
    // if username is not sent in update
    messageStr = 'User Updated! '
    successType = 'Green';
    return updateUser(req, res, updateObj, messageStr, successType, next);
  }
});

// The /users/login POST route is used to login a user. This will also create a user session, and
// uses passport's local stategy for user authentication.
router.post('/users/login', passport.authenticate('local'), function(req, res, next) {
  res.status('200').json({
    username: req.user.userName,
    id: req.user._id,
    userImageURL: req.user.userImageURL,
    userCoordinatesLat: req.user.userCoordinates.lat,
    userCoordinatesLng: req.user.userCoordinates.lng,
    userZoom: req.user.userZoom,
    userEmail: req.user.email
  });
});

// The /users/logout POST route is used to log out the current user, and it deletes the user session.
router.post('/users/logout', function(req, res, next) {
    if (req.user) {
        req.logout();
        res.status('200').json({message: 'Logged Out'});
    } else {
        res.status('400').json({message: 'No user to logout'});
    }
});

// The /users/:id/searches GET route returns all searches performed by the current user.
router.get('/users/:id/searches', mid, function(req, res, next) {
  Search.find({user: req.params.id}, null, {sort: {postedOn: -1}}, function(err, searches) {
    if (err) {
      const error = new Error('Not Found');
      error.status = 404;
      return next(error);
    }
    res.status('200').json(searches);
  });
});

// The /users/:id/searches POST route returns the weather search and a corresponding gif from Giphy.
router.post('/users/:id/searches', mid, midTime, function(req, res, next) {
  axios({
    method: 'get',
    url: `http://api.openweathermap.org/data/2.5/weather?lat=${req.body.lat}&lon=${req.body.lng}&APPID=${apiKeys.openWeather}&units=imperial`
  })
  .then(response => {
    axios({
      method: 'get',
      url: `http://api.giphy.com/v1/gifs/search?q=${response.data.weather[0].description}&api_key=${apiKeys.giphy}&limit=1`
    })
    .then(gifResponse => {
      // Open Weather API returns degrees for wind direction. Here, the degree is transformed into a direction.
      const windDeg = response.data.wind.deg;
      let windDir;
      if (windDeg >= 0 && windDeg <= 22.5) {windDir = 'N';}
      if (windDeg > 22.5 && windDeg <= 67.5) {windDir = 'NE';}
      if (windDeg > 67.5 && windDeg <= 112.5) {windDir = 'E';}
      if (windDeg > 112.5 && windDeg <= 157.5) {windDir = 'SE';}
      if (windDeg > 157.5 && windDeg <= 202.5) {windDir = 'S';}
      if (windDeg > 202.5 && windDeg <= 247.5) {windDir = 'SW';}
      if (windDeg > 247.5 && windDeg <= 292.5) {windDir = 'W';}
      if (windDeg > 292.5 && windDeg <= 337.5) {windDir = 'NW';}
      if (windDeg > 337.5 && windDeg <= 360) {windDir = 'N';}
      const newSearch = new Search({
        user: req.params.id,
        city: response.data.name || 'Unavailable',
        coordinates: {
          lat: response.data.coord.lat,
          lng: response.data.coord.lon
        },
        weather: {
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          icon: response.data.weather[0].icon
        },
        temperature: {
          current: response.data.main.temp,
          min: response.data.main.temp_min,
          max: response.data.main.temp_max
        },
        wind: {
          speed: response.data.wind.speed,
          dir: windDir
        },
        gifURL: gifResponse.data.data[0].images.fixed_width.url
      })
      newSearch.save(function(err, search) {
        if (err) return next(err);
        res.status('200').json(search);
      });
    })
    .catch(err => {
      next(newError.serverError());
    });
  }).catch((err) => {
    next(newError.serverError());
  });
});

module.exports = router
