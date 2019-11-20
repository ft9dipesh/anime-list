const setGlobals = (req, res, next) => {
  // Set up login boolean as global
  res.locals.login = req.isAuthenticated();
  // Provide the session object as global
  res.locals.session = req.session;
  next();
};

module.exports = setGlobals;
