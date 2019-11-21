const express = require('express');
const csrf = require('csurf');

const {
  getAnimeSingle,
  getAnimeMultiple,
  addAnimeToList,
  searchAnime
} = require('../controllers/anime');

const router = express.Router();

const csrfProtection = csrf();

router.get('/', csrfProtection, getAnimeMultiple);

router.get('/anime/:id', csrfProtection, getAnimeSingle);

router.post('/anime/add', csrfProtection, addAnimeToList);

router.get('/anime/search/:criteria', csrfProtection, searchAnime);

router.post('/anime/search', csrfProtection, searchAnime);

module.exports = router;
