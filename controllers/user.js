const User = require('../models/user');
const sharp = require('sharp');

const getProfile = (req, res) => {
  User.findById(req.session.passport.user, (error, user) => {
    if (error) {
      return res.redirect('/');
    }
    // console.log(user.avatar.toString());
    user
      .populate({
        path: 'animeList',
        options: {
          sort: {
            updatedAt: -1
          }
        }
      })
      .execPopulate()
      .then(() => {
        // console.log(user.animeList);
        res.render('user/profile', {
          user,
          pageTitle: `${user.name} - AnimeList`,
          csrfToken: req.csrfToken()
        });
      });
  });
};

const postSignUp = (req, res) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    return res.redirect(oldUrl);
  }
  res.redirect('/user/profile');
};

const postSignIn = (req, res) => {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    return res.redirect(oldUrl);
  }
  res.redirect('/user/profile');
};

const postAvatar = (req, res) => {
  sharp(req.file.buffer)
    .resize({ width: 250, height: 300 })
    .png()
    .toBuffer()
    .then(buffer => {
      User.findById(req.session.passport.user, (error, user) => {
        if (error) {
          return res.send(error.message);
        }
        user.avatar = buffer;
        user.save((error, result) => {
          if (error) {
            return res.send(error.message);
          }
          res.redirect('/user/profile');
        });
      });
    });
};

module.exports = {
  getProfile,
  postSignUp,
  postSignIn,
  postAvatar
};
