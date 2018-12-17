const mongoose = require('mongoose');
const databaseKey = require('../../.config.js').databaseKey;

// This file sets up the app's connection to MongoDB using mlab.
const mongodbURI = `mongodb://${databaseKey.user}:${databaseKey.password}@ds161183.mlab.com:61183/heroku_ljvqjwlq`;

// Connects the the database using the above URI.
mongoose.connect(mongodbURI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('db connection error:', err);
});

db.once('open', function() {
  console.log('The db connection was successful.');
});

module.exports = db;
