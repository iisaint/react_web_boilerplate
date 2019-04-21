const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth/login', failureFlash: true }), async (req, res) => {
  try {
    if (req.body.email === undefined || req.body.passwd === undefined) {
      console.warn(`invalid parameters, email|passwd is undefined`);
      res.send({ error: 'invalid parameters, email|passwd is undefined' });
      return;
    } else {
      res.send({
        user: 0,
        token: 1234
      });
    }
  } catch (error) {
    console.error(error.stack);
    res.status(500).send({ error: 'try again later.' });
  }
});

router.get('/login', async (req, res) => {
  res.send({ error: req.flash('login')[0] });
})

module.exports = router;
