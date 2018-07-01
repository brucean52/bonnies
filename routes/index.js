const express = require('express');
const router = express.Router({
    mergeParams: true
});

const passport = require('passport');
//const User = require('../models/user');

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let user = new User();
  console.log(req.body.first_name);
});

//authentication routes
router.get('/auth/google',
    passport.authenticate('google', {
    scope: ['profile', 'email']
})
);

router.get('/auth/google/callback',
passport.authenticate('google', {
        successRedirect : '/',
        failureRedirect : '/'
}));

router.get('/auth/facebook',
    passport.authenticate('facebook')
);

router.get('/auth/facebook/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/');
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
