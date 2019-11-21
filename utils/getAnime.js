const request = require('request');

const getAnime = (options, callback) => {
  let url = '';
  if (options.single) {
    url = `https://kitsu.io/api/edge/anime/${options.id}`;
  } else {
    let urlYear;
    let urlSeason;
    if (options.season && options.year) {
      urlYear = `&filter[seasonYear]=${options.year}`;
      urlSeason = `&filter[season]=${options.season}`;
    } else {
      urlYear = ``;
      urlSeason = ``;
    }

    let filterUrl = ``;
    if (options.filter) {
      filterUrl = `&filter[${options.filterCriteria}]=${options.filterValue}`;
    }

    let sortUrl = ``;
    if (options.sortByPopularity && options.sortByRating) {
      sortUrl = `&sort=-userCount&sort=-averageRating`;
    } else if (options.sortByRating) {
      sortUrl = `&sort=-averageRating`;
    } else if (options.sortByPopularity) {
      sortUrl = `&sort=-userCount`;
    }

    url = `https://kitsu.io/api/edge/anime?page[limit]=15${sortUrl}${urlYear}${urlSeason}${filterUrl}`;
  }

  request(url, (error, response) => {
    if (error) {
      return callback(error, null);
    }
    const responseBody = JSON.parse(response.body);
    callback(null, responseBody);
  });
};

module.exports = getAnime;
