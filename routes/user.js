const express = require('express');
const csrf = require('csurf');
const passport = require('passport');

const upload = require('../config/img-upload');

const {
  getProfile,
  postSignIn,
  postSignUp,
  postAvatar
} = require('../controllers/user');

const { isLoggedIn, notLoggedIn } = require('../middleware/authorization');

const router = express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile', isLoggedIn, getProfile);

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.post('/avatar', upload.single('avatar'), isLoggedIn, postAvatar);

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    failureRedirect: '/'
  }),
  postSignUp
);

router.post(
  '/signin',
  passport.authenticate('local.signin', {
    failureRedirect: '/'
  }),
  postSignIn
);

module.exports = router;
