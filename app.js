var express = require('express');
var app = express();

// View engine.
app.set('view engine', 'jade')

// Static files.
app.use('/static', express.static('www'));
var index = require('./routes/index.js');
app.use('', index);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
