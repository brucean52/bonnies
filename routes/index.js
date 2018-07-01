const {MongoClient, ObjectID} = require('mongodb');

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

router.get("/menu", (req, res) => {
  res.render("menu");
});

router.get("/cart", (req, res) => {
    res.render("cart");
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

// GET all orders from the orders table 
router.get("/orders", function(req, res) {
  
  var orderData = MongoClient.connect('mongodb://eeps30:av862549@ds125001.mlab.com:25001/bonnies_vegan_cuisine', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server.');

    db.collection('menu_item').find().toArray().then((docs) => {
        console.log('Menu Items: ');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch menu items', err);
    })
    
    // db.close();
  })

  res.render('orderData: ', {orderData});

})

module.exports = router;
