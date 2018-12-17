const Search = require('../database/models/search.js').Search;
const newError = require('../routes/errors.js');

// authenticate middleware calls isAuthenticated provided by passport, and allows
// access to the next middleware in the current endpoint.
module.exports.authenticate = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not authenticated, they are redirected home.
  res.redirect('/');
}

// The timeout middleware tests the current search's coordinates against all searches
// performed within the previous 10 minutes. If the coordinates are within a set distance
// from previous searches, an error is returned.
// The reason for this is due to the Open Weather API stating not to perform repetitive
// searches for a single location more than once every 10 minutes.
module.exports.timeout = function(req, res, next) {
  let sendRes = false;
  const latHigh = parseFloat(req.body.lat) + .1;
  const latLow = parseFloat(req.body.lat) - .1;
  const lngHigh = parseFloat(req.body.lng) + .13;
  const lngLow = parseFloat(req.body.lng) - .13;
  Search.find({postedOn: {$gte: (Date.now() - 600000)}}, function(err, searches) {
    if (err) return next(newError.serverError());
    for (let i = 0; i < searches.length; i += 1) {
      const sLat = searches[i].coordinates.lat;
      const sLng = searches[i].coordinates.lng;
      if (sLat <= latHigh && sLat >= latLow && sLng <= lngHigh && sLng >= lngLow) {
        sendRes = true;
      }
    }
    if (sendRes) {
      res.status('400').json({
        message: 'Close proximity searches within 10 minutes have been disabled.',
        success: 'Yellow'
      });
    } else {
      next();
    }
  });
}
