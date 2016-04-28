const config = require('./config');
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({name: String, count: Number});
const logModel = mongoose.model('log', logSchema);

module.exports = {
  /**
   * Initialize database connection.
   * @param  {Function} cb callback
   */
  init(cb) {
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'database connection error:'));
    db.once('open', () => {
      console.info('database connection established');
      cb();
    });
    mongoose.connect(config.db.mongodb);
  },
  /**
   * Increments value in database.
   * @param  {Number} count how much to increase count value by
   * @return {Promise}      Promise
   */
  increment(count) {
    if (typeof count !== 'number') {
      return new Promise((resolve, reject) => {
        resolve('Error: Count must be a number');
      });
    }
    let saveIncrement = (log) => {
      if (log !== null) {
        log.count += count;
        return log.save();
      } else {
        return logModel.create({name: config.log.name, count: count});
      }
    }
    return logModel.findOne({name: config.log.name}).then(saveIncrement).catch((err) => {
      console.error('Database error: ', err);
    });
  }
}