/* eslint-disable no-throw-literal */
const fs = require('fs').promises;

const readJson = (path) => fs.readFile(path)
  // eslint-disable-next-line no-unused-vars
  .catch((err) => {
    throw `File: ${path} not found`;
  })
  .then((text) => {
    try {
      return JSON.parse(text);
    } catch (err) {
      throw 'JSON file is invalid';
    }
  });

module.exports = readJson;
