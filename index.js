const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const mainRouter = require('./routes/index');
const userRouter = require('./routes/user');
const setGlobals = require('./middleware/globals');

require('./db/mongodb');
require('./config/passport');

const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '/public');
const viewsPath = path.join(__dirname, './views');

const app = express();

app.set('view engine', 'pug');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'dipesh-session',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 180 * 60 * 60
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(setGlobals);

app.use('/user', userRouter);
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server up on port ${PORT}`);
});