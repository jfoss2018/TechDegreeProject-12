const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const { apiKeys, secret } = require('../.config.js');
const db = require('./database/index.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport/index.js');

app.use(session({
  secret: secret,
  store: new MongoStore({mongooseConnection: db}),
  resave: false,
  saveUninitialized: false
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1', routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  const path = require('path');
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

const port = process.env.PORT || 3001;

app.listen(port, function(err) {
  console.log('This app is listening on port ' + port);
});
