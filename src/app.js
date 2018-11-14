const express = require('express');
const app = express();
const Twit = require('twit');
const mongoose = require('mongoose');
const routes = require('./routes.js');
const bodyParser = require('body-parser');

const mongodbURI = 'mongodb://someuser:password1234@ds161183.mlab.com:61183/heroku_ljvqjwlq';

mongoose.connect(mongodbURI);
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('db connection error:', err);
});

db.once('open', function() {
  console.log('The db connection was successful.');
});

/*
const T = new Twit({
  consumer_key: ,
  consumer_secret: ,
  app_only_auth: true
});
*/
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//app.use(express.static('public'));

app.use('/api/v1', routes);

app.listen(port, function(err) {
  console.log('This app is listening on port ' + port);
});
