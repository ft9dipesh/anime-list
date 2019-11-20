const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
      User.findOne({ email: email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (user) {
          return done(null, false);
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
      passwordField: 'password'
    },
    (email, password, done) => {
      User.findOne({ email }, (error, user) => {
        if (error) {
          return done(error);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.validPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
