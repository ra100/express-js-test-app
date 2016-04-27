var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var app = express();

MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
  if (err) {
    throw err;
  }
  console.log('Connected to db');
});

app.get('/track', function (req, res) {
  res.send('tracked');
});

app.listen(1337, function () {
  console.log('Listening on port 1337!');
});