const User = require('../models/user');
const AnimeList = require('../models/anime-list');

const getAnime = require('../utils/getAnime');

const getAnimeSingle = (req, res) => {
  req.session.oldUrl = req.originalUrl;
  getAnime(
    `https://kitsu.io/api/edge/anime/${req.params.id}`,
    (error, anime) => {
      if (error) {
        return res.send(error.message);
      }
      res.render('anime/anime', {
        anime,
        csrfToken: req.csrfToken(),
        pageTitle: `${anime.data.attributes.canonicalTitle} - AnimeList`
      });
    }
  );
};

const getAnimeMultiple = (req, res) => {
  // CALLBACK HELL - DONT DO THIS
  req.session.oldUrl = null;
  const messages = req.flash('error');
  getAnime(
    `https://kitsu.io/api/edge/anime?sort=-userCount&sort=-averageRating&filter[status]=current&page[limit]=16`,
    (error, topNewAnime) => {
      if (error) {
        return res.send(error.message);
      }
      getAnime(
        `https://kitsu.io/api/edge/anime?sort=-averageRating&page[limit]=5`,
        (error, topAnime) => {
          if (error) {
            return res.send(error.message);
          }
          getAnime(
            `https://kitsu.io/api/edge/anime?sort=-userCount&page[limit]=5`,
            (error, popularAnime) => {
              if (error) {
                return res.send(error.message);
              }
              res.render('index', {
                topNewAnime,
                topAnime,
                popularAnime,
                csrfToken: req.csrfToken(),
                pageTitle: `AnimeList - Track Your Anime`,
                messages,
                hasErrors: messages.length > 0
              });
              // console.log(topNewAnime);
            }
          );
        }
      );
    }
  );
};

const addAnimeToList = (req, res) => {
  User.findById(req.session.passport.user, (error, user) => {
    if (error) {
      return res.send(error);
    }
    const newAnime = new AnimeList({ ...req.body, owner: user._id });
    newAnime.save((error, result) => {
      if (error) {
        return res.send(error);
      }
      res.redirect(`/user/profile`);
    });
  });
};

const searchAnime = (req, res) => {
  let urlAppend = '';
  if (req.params.criteria) {
    if (req.params.criteria === 'current') {
      urlAppend = `sort=-userCount&sort=-averageRating&filter[status]=current`;
    } else {
      urlAppend = `sort=-${req.params.criteria}`;
    }
    searchAppend = '';
  } else {
    searchAppend = `&filter[text]=${req.body.searchQuery}`;
  }
  getAnime(
    `https://kitsu.io/api/edge/anime?${urlAppend}&page[limit]=16${searchAppend}`,
    (error, searchResults) => {
      if (error) {
        return res.send(error.message);
      }
      res.render('anime/search', {
        searchResults,
        csrfToken: req.csrfToken(),
        pageTitle: `Search - AnimeList`
      });
    }
  );
};

module.exports = {
  getAnimeSingle,
  getAnimeMultiple,
  addAnimeToList,
  searchAnime
};
