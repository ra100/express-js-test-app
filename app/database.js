var config = require('./config');
var mongoose = require('mongoose');

var logSchema = new mongoose.Schema({name: String, count: Number});

var logModel;

module.exports = {
  init: function (cb) {
    logModel = mongoose.model('log', logSchema);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'database connection error:'));
    db.once('open', function () {
      console.info('database connection established');
      cb();
    });
    mongoose.connect(config.db.mongodb);
  },
  increment: function (count) {
    if (typeof count !== 'number') {
      return new Promise(function (resolve, reject) {
        resolve('Error: Count must be a number');
      });
    }
    return logModel.findOne({name: config.log.name}).then(function (log) {
      if (log !== null) {
        log.count += count;
        return log.save().then().catch(function (err) {
          console.error('Error saving record: ', err);
        });
      } else {
        return logModel.create({name: config.log.name, count: count}).then().catch(function (err) {
          console.error('Error saving record: ', err);
        });
      }
    }).catch(function (err) {
      console.error('Error finding record: ', err);
    });
  }
}