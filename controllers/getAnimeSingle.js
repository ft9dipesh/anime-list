const request = require('request');

const getAnimeSingle = (id, callback) => {
  const url = `https://kitsu.io/api/edge/anime/${id}`;

  request(url, (error, response) => {
    if (error) {
      return callback(error, null);
    }
    const responseBody = JSON.parse(response.body);
    callback(null, responseBody);
  });
};

module.exports = getAnimeSingle;
