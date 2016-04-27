var config = require('./config');
var mongoose = require('mongoose');

var logSchema = {
  log: String,
  count: Number
};

var logModel;

module.exports = {
  init: function (cb) {
    mongoose.connect(config.db.mongodb);
    logModel = mongoose.model('log', logSchema);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      cb();
    });
  },
  increment: function(count) {
    logModel.findOne({ name: config.log.name }).then(function(log){
      if (log !== undefined) {
        log.count += count;
        log.save().catch(function(err) {
          console.error.bing(console, err);
        });
      }
    }).catch(function(err) {
      console.error.bing(console, err);
    });
  }
}