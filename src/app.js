const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', function(req, res, next) {
  res.json({message: 'Hello World!'});
});

app.listen(port, function(err) {
  console.log('This app is listening on port ' + port);
});
