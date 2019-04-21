const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const logger = require('morgan');

const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'txtcore', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(flash());
require('./service/passport');
app.use(passport.initialize());

app.use('/users', usersRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 8081;
let server = app.listen(port, function() {
  let host = server.address().address;

  console.info('API at http://%s:%s', host, port);
});

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like our main.js file, or main.css file
  app.use(express.static('../client/build'));

  // Express will serve up the index.html file if it doesn't recognize the route.
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../client', 'build', 'index.html')
    );
  });
}

module.exports = app;
