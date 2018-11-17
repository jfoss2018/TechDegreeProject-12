const mongoose = require('mongoose');
const databaseKey = require('../../.config.js').databaseKey;

const mongodbURI = `mongodb://${databaseKey.user}:${databaseKey.password}@ds161183.mlab.com:61183/heroku_ljvqjwlq`;

mongoose.connect(mongodbURI, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('db connection error:', err);
});

db.once('open', function() {
  console.log('The db connection was successful.');
});

module.exports = db;
