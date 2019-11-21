const express = require('express');
const csrf = require('csurf');

const {
  getAnimeSingle,
  getAnimeMultiple,
  addAnimeToList
} = require('../controllers/anime');

const router = express.Router();

const csrfProtection = csrf();

router.get('/', csrfProtection, getAnimeMultiple);

router.get('/anime/:id', csrfProtection, getAnimeSingle);

router.post('/anime/add', csrfProtection, addAnimeToList);

module.exports = router;
