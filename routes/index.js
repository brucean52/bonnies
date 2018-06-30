var express = require('express');
var router = express.Router({
    mergeParams: true
});

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index");
});

router.get("/register", function(req, res) {
  res.render("register");
});
router.post("/register", function(req, res)
{
  username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});
module.exports = router;
