const express = require('express');
const app = express();
const Twit = require('twit');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const apiKeys = require('../.config.js');

const mongodbURI = 'mongodb://someuser:password1234@ds161183.mlab.com:61183/heroku_ljvqjwlq';

mongoose.connect(mongodbURI);
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('db connection error:', err);
});

db.once('open', function() {
  console.log('The db connection was successful.');
});

const T = new Twit({
  consumer_key: apiKeys.twitterConsumer,
  consumer_secret: apiKeys.twitterSecret,
  app_only_auth: true
});

let params = {
  q: "",
  geocode: '31.2074,-83.2502,2mi',
  count: 1
};

T.get('search/tweets', params, function(err, data, response) {
  console.log(data);
  console.log(data.statuses[0].user);
});

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//app.use(express.static('public'));

app.use('/api/v1', routes);

app.listen(port, function(err) {
  console.log('This app is listening on port ' + port);
});
