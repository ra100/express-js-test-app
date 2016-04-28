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
   * Handles get requests on route /track.
   */
  app.get('/track', function (req, res) {
    if (typeof req.query.count !== 'undefined') {
      database.increment(Number(req.query.count));
    }
    // TODO append data to file
    res.send({status: 'ok'});
  });

  /**
   * Handles post requests on route /track.
   */
  app.post('/track', function(req, res) {
    if (typeof req.body.count !== 'undefined') {
      database.increment(Number(req.body.count));
    }
    // TODO append data to file
    res.send({status: 'ok'});
  });

  /**
   * Returns status 404 Not Found for every other route.
   */
  app.use(function(req, res, next) {
    res.sendStatus(404);
  });

  /**
   * Start server listening on port set in config.
   */
  server = app.listen(config.server.port, function () {
    console.info('listening on port %s!', config.server.port);
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