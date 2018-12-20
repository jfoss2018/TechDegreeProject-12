const mongoose = require('mongoose');
const config = require('./databaseConfig.js');

// Connects the the database using the above URI.
mongoose.connect(config.mongoURI[process.env.NODE_ENV], {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', function(err) {
  console.log('db connection error:', err);
});

db.once('open', function() {
  console.log('The db connection was successful.');
});

module.exports = db;
