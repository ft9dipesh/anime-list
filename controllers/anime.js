const User = require('../models/user');
const AnimeList = require('../models/anime-list');

const getAnime = require('../utils/getAnime');

const getAnimeSingle = (req, res) => {
  getAnime(
    {
      single: true,
      id: req.params.id
    },
    (error, anime) => {
      if (error) {
        return res.send(error.message);
      }
      res.render('anime', { anime, csrfToken: req.csrfToken() });
    }
  );
};

const getAnimeMultiple = (req, res) => {
  // CALLBACK HELL - DONT DO THIS
  getAnime(
    {
      current: true,
      sortByPopularity: true,
      sortByRating: true,
      filter: true,
      filterCriteria: 'status',
      filterValue: 'current'
    },
    (error, topNewAnime) => {
      if (error) {
        return res.send(error.message);
      }
      getAnime({ sortByRating: true }, (error, topAnime) => {
        if (error) {
          return res.send(error.message);
        }
        getAnime({ sortByPopularity: true }, (error, popularAnime) => {
          if (error) {
            return res.send(error.message);
          }
          res.render('index', {
            topNewAnime,
            topAnime,
            popularAnime,
            csrfToken: req.csrfToken()
          });
          // console.log(topNewAnime);
        });
      });
    }
  );
};

const addAnimeToList = (req, res) => {
  User.findById(req.session.passport.user, (error, user) => {
    if (error) {
      return res.redirect(`/anime/${req.body.kitsuId}`);
    }
    const newAnime = new AnimeList({ ...req.body, owner: user._id });
    newAnime.save((error, result) => {
      if (error) {
        return res.redirect(`/anime/${req.body.kitsuId}`);
      }
      res.redirect(`/user/profile`);
    });
  });
};

module.exports = {
  getAnimeSingle,
  getAnimeMultiple,
  addAnimeToList
};
