const config = require('./config');
const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({name: String, count: Number});
const logModel = mongoose.model('log', logSchema);

let log = null;

module.exports = {
  /**
   * Initialize database connection.
   * @param  {String} mongodb database connection string
   * @return {Promise}        Promise
   */
  init(mongodb) {
    let db = mongoose.connection;
    return new Promise((resolve, reject) => {
      let handleLog = (l) => {
        if (l !== null) {
          log = l;
          resolve(log);
        } else {
          logModel.create({name: config.log.name, count: 0}).then((l) => {
            log = l;
            resolve(log);
          });
        }
      };
      db.on('error', (err) => {
        reject('database connection error:', err);
      });
      db.once('open', () => {
        console.info('database connection established');
        logModel.findOne({name: config.log.name}).then(handleLog).catch((err) => {
          reject('Database error: ', err);
        });
        resolve();
      });
      mongoose.connect(mongodb);
    });
  },
  /**
   * Increments value in database.
   * @param  {Number} count how much to increase count value by
   * @return {Promise}      Promise
   */
  increment(c) {
    return new Promise((resolve, reject) => {
      if (typeof c !== 'number') {
        return reject('Error: Count must be a number');
      }
      log.count += c;
      log.save().then(resolve);
    });
  }
}