const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  done(null, user[0]);
});

const local = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'passwd',
    passReqToCallback : true
  },
  async (req, email, password, done) => {
    console.log(email);
    console.log(password);
    if (!email || password !== '123') { return done(null, false, req.flash('login', '帳號或密碼不正確')); }
    const user = {
      id: 0
    };
    return done(null, user);
  }
);

passport.use(local);
