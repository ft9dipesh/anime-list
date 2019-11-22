const express = require('express');
const csrf = require('csurf');
const passport = require('passport');
const { check } = require('express-validator');

const upload = require('../config/img-upload');

const {
  getSignUp,
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

router.get('/signup', getSignUp);

router.post(
  '/signup',
  [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').isLength({ min: 6 }),
    check('password').custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Password confirmation is incorrect');
      } else {
        return true;
      }
    })
  ],
  passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
  }),
  postSignUp
);

router.post(
  '/signin',
  [check('email', 'Invalid Email').isEmail()],
  passport.authenticate('local.signin', {
    failureRedirect: '/',
    failureFlash: true
  }),
  postSignIn
);

module.exports = router;
