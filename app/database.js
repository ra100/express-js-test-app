const config = require('./config');
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({name: String, count: Number});
const logModel = mongoose.model('log', logSchema);

module.exports = {
  /**
   * Initialize database connection.
   * @return {Promise}      Promise
   */
  init() {
    let db = mongoose.connection;
    return new Promise((resolve, reject) => {
      db.on('error', (err) => {
        reject('database connection error:', err);
      });
      db.once('open', () => {
        console.info('database connection established');
        resolve();
      });
      mongoose.connect(config.db.mongodb);
    });
  },
  /**
   * Increments value in database.
   * @param  {Number} count how much to increase count value by
   * @return {Promise}      Promise
   */
  increment(count) {
    return new Promise((resolve, reject) => {
      if (typeof count !== 'number') {
        return reject('Error: Count must be a number');
      }
      let saveIncrement = (log) => {
        if (log !== null) {
          log.count += count;
          return log.save();
        } else {
          return logModel.create({name: config.log.name, count: count});
        }
      }
      logModel.findOne({name: config.log.name}).then(saveIncrement).then(resolve).catch((err) => {
        console.error('Database error: ', err);
        reject(err);
      });
    });
  }
}