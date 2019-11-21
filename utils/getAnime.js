const request = require('request');

const getAnime = (url, callback) => {
  request(url, (error, response) => {
    if (error) {
      return callback(error, null);
    }
    const responseBody = JSON.parse(response.body);
    callback(null, responseBody);
  });
};

module.exports = getAnime;
