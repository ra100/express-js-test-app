var config = require('./config');
var express = require('express');
var app = express();
var database = require('./database');

var server;

/**
 * Shuts down the server.
 */
var shutdown = function () {
  server.close();
};

var startServer = function () {
  /**
   * Handles requests on path /track.
   */
  app.get('/track', function (req, res) {
    if (typeof req.query.count !== 'undefined') {
      database.increment(Number(req.query.count));
    }
    // TODO append data to file
    res.send({status: 'ok'});
  });

  app.post('/track', function(req, res) {
    if (typeof req.body.count !== 'undefined') {
      database.increment(Number(req.body.count));
    }
    // TODO append data to file
    res.send({status: 'ok'});
  });

  /**
   * Start server listening on port set in config.
   */
  server = app.listen(config.server.port, function () {
    console.info('Listening on port ' + config.server.port + '!');
  });
}

/**
 * Initializes databse and starts http server.
 */
var boot = function () {
  database.init(startServer);
}

if (require.main === module) {
  boot();
} else {
  exports.shutdown = shutdown;
  exports.boot = boot;
  exports.startServer = startServer;
  exports.database = database;
}