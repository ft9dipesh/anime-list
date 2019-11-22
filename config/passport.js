const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { validationResult } = require('express-validator');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user);
  });
});

// Local signup configuration
passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const errors = validationResult(req);
      // console.log(errors);
      if (!errors.isEmpty()) {
        let messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        return done(null, false, req.flash('error', messages));
      }

      User.findOne({ email: email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (user) {
          return done(null, false, { message: 'Email already in use!' });
        }
        const newUser = new User({
          email,
          name: req.body.name
        });
        newUser.password = newUser.encryptPassword(password);
        newUser.save((error, result) => {
          if (error) {
            return done(error);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      const errors = validationResult(req);
      // console.log(errors);
      if (!errors.isEmpty()) {
        let messages = [];
        errors.array().forEach(error => messages.push(error.msg));
        return done(null, false, req.flash('error', messages));
      }
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false, { message: 'Email not found' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, user);
      });
    }
  )
);
