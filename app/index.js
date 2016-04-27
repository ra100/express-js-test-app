var config = require('./config');
var express = require('express');
var app = express();
var database = require('./database');

var server;

app.get('/track', function (req, res) {
  console.log(req);
  res.send({status: 'ok'});
});

var shutdown = function() {
  server.close();
};

var startServer = function () {
  server = app.listen(config.server.port, function () {
    console.log('Listening on port ' + config.server.port + '!');
  });
}

var boot = function () {
  database.init(startServer);
}

if (require.main === module) {
  boot();
} else {
  exports.shutdown = shutdown;
  exports.boot = boot;
  exports.startServer = startServer;
}