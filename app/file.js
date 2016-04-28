'use strict';

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
      try {
        let filedata = fs.readFileSync(file);
        data = JSON.parse(filedata);
      } catch (err) {
        if (err.code !== 'ENOENT') {
          return reject('Error reading file: ', err);
        }
        data = [];
        try {
          fs.mkdirSync(path);
        } catch (err) {
          if (err.code !== 'EEXIST') {
            return reject('Error creating directory: ', err);
          }
        }
        fs.writeFileSync(file, JSON.stringify(data));
      }
      resolve(data);
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
    })
  }
}