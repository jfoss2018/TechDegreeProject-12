const databaseKey = require('../../.config.js').databaseKey;

const config = {};

config.mongoURI = {
  development: `mongodb://${databaseKey.user}:${databaseKey.password}@ds161183.mlab.com:61183/heroku_ljvqjwlq`,
  test: 'mongodb://localhost:27017/testDatabase',
  production: `mongodb://${databaseKey.user}:${databaseKey.password}@ds161183.mlab.com:61183/heroku_ljvqjwlq`
};

module.exports = config;
