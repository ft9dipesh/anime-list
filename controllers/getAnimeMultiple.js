const request = require('request');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

let season;
if (month >= 0 && month <= 2) {
  season = 'spring';
} else if (month >= 3 && month <= 5) {
  season = 'summer';
} else if (month >= 6 && month <= 8) {
  season = 'winter';
} else {
  season = 'fall';
}

const getAnimeMultiple = (options, callback) => {
  let urlYear;
  let urlSeason;
  if (options.current) {
    urlYear = ``;
    urlSeason = ``;
  } else if (options.season && options.year) {
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

  const url = `https://kitsu.io/api/edge/anime?page[limit]=15${sortUrl}${urlYear}${urlSeason}${filterUrl}`;

  request(url, (error, response) => {
    if (error) {
      return callback(error, null);
    }
    const responseBody = JSON.parse(response.body);
    callback(null, responseBody);
  });
};

module.exports = getAnimeMultiple;
