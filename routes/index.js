const express = require('express');
const csrf = require('csurf');

const getAnimeMultiple = require('../controllers/getAnimeMultiple');
const getAnimeSingle = require('../controllers/getAnimeSingle');

const User = require('../models/user');
const AnimeList = require('../models/anime-list');

const router = express.Router();

const csrfProtection = csrf();

router.get('/', csrfProtection, (req, res) => {
  // CALLBACK HELL - DONT DO THIS
  getAnimeMultiple(
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
      getAnimeMultiple({ sortByRating: true }, (error, topAnime) => {
        if (error) {
          return res.send(error.message);
        }
        getAnimeMultiple({ sortByPopularity: true }, (error, popularAnime) => {
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
});

router.get('/anime/:id', csrfProtection, (req, res) => {
  getAnimeSingle(req.params.id, (error, anime) => {
    if (error) {
      return res.send(error.message);
    }
    res.render('anime', { anime, csrfToken: req.csrfToken() });
  });
});

router.post('/anime/add', csrfProtection, (req, res) => {
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
});

module.exports = router;
