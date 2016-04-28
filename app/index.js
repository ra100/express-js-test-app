'use strict';

const config = require('./config');
const express = require('express');

let app = express();
let database = require('./database');
let server;

/**
 * Initializes databse and starts http server.
 */
function boot() {
  database.init(startServer);
}

/**
 * Shuts down the server.
 */
function shutdown() {
  server.close();
};

function startServer() {
  /**
   * Handles get requests on route /track.
   */
  app.get('/track', (req, res) => {
    if (typeof req.query.count !== 'undefined') {
      database.increment(Number(req.query.count));
    }
    // TODO append data to file
    res.send({status: 'ok'});
  });

  /**
   * Handles post requests on route /track.
   */
  app.post('/track', (req, res) => {
    if (typeof req.body.count !== 'undefined') {
      database.increment(Number(req.body.count));
    }
    // TODO append data to file
    res.send({status: 'ok'});
  });

  /**
   * Returns status 404 Not Found for every other route.
   */
  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  /**
   * Start server listening on port set in config.
   */
  server = app.listen(config.server.port, () => {
    console.info('listening on port %s!', config.server.port);
  });
}

if (require.main === module) {
  boot();
} else {
  exports.shutdown = shutdown;
  exports.boot = boot;
  exports.startServer = startServer;
  exports.database = database;
}