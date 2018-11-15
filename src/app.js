const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes.js');
const bodyParser = require('body-parser');
const apiKeys = require('../.config.js');

const mongodbURI = 'mongodb://someuser:password1234@ds161183.mlab.com:61183/heroku_ljvqjwlq';

mongoose.connect(mongodbURI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('db connection error:', err);
});

db.once('open', function() {
  console.log('The db connection was successful.');
});

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
//app.use(express.static('public'));

app.use('/api/v1', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

app.listen(port, function(err) {
  console.log('This app is listening on port ' + port);
});
