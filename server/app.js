const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const passport = require('passport');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'txtcore', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));
app.use(flash());
require('./service/passport');
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 8081;
let server = app.listen(port, function() {
  let host = server.address().address;

  console.info('API at http://%s:%s', host, port);
});

module.exports = app;
