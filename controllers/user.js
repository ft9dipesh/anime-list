const User = require('../models/user');

const getProfile = (req, res) => {
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

module.exports = {
  getProfile,
  postSignUp,
  postSignIn
};
