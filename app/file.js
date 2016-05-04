const fs = require('fs');

let file;
let data;

module.exports = {
  /**
   * Initializes file manager.
   * @param  {string} path path to folder containing file
   * @param  {string} name filename
   * @return {Promise}      Promise
   */
  init(path, name) {
    file = path + '/' + name;
    return new Promise((resolve, reject) => {
      return new Promise((resolve, reject) => {
        fs.readFile(file, (err, _data) => {
          if (err) {
            return reject(err);
          }
          data = JSON.parse(_data);
          return resolve(data);
        });
      }).then((_data) => {
        fs.writeFile(file, JSON.stringify(_data), (err) => {
          if (!err) {
            return resolve(_data);
          }
        });
      }).catch((err) => {
        if (err.code !== 'ENOENT') {
          return reject('Error reading file: ', err);
        }
        data = [];
        return new Promise((resolve, reject) => {
          fs.mkdir(path, (err) => {
            if (err.code !== 'EEXIST') {
              return reject('Error creating directory: ', err);
            }
            return resolve();
          });
        }).then(() => {
          return new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(data), (err) => {
              if (!err) {
                resolve(data);
              }
            });
          });
        }).then(resolve).catch(reject);
      });
    });
  },
  /**
   * Appends data to json and saves to file.
   * @param  {Object} d   data object
   * @return {Promise}    Promise
   */
  append(d) {
    data.push(d);
    return new Promise((resolve, reject) => {
      fs.writeFile(file, JSON.stringify(data), (err, d) => {
        if (err) {
          return reject(err);
        }
        resolve(d);
      });
    });
  }
};
