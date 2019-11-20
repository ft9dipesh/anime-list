const express = require('express');
const csrf = require('csurf');
const passport = require('passport');

const User = require('../models/user');
const { isLoggedIn, notLoggedIn } = require('../middleware/authorization');

const router = express.Router();

const csrfProtection = csrf();

router.use(csrfProtection);

router.get('/profile', isLoggedIn, (req, res) => {
  User.findById(req.session.passport.user, (error, user) => {
    if (error) {
      return res.redirect('/');
    }

    user
      .populate({ path: 'animeList' })
      .execPopulate()
      .then(() => {
        // console.log(user.animeList);
        res.render('user/profile', { user });
      });
  });
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    failureRedirect: '/'
  }),
  (req, res) => {
    if (req.session.oldUrl) {
      const oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      return res.redirect(oldUrl);
    }
    res.redirect('/user/profile');
  }
);

router.post(
  '/signin',
  passport.authenticate('local.signin', {
    failureRedirect: '/'
  }),
  (req, res) => {
    if (req.session.oldUrl) {
      const oldUrl = req.session.oldUrl;
      req.session.oldUrl = null;
      return res.redirect(oldUrl);
    }
    res.redirect('/user/profile');
  }
);

module.exports = router;
