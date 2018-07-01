const {MongoClient, ObjectID} = require('mongodb');

const express = require('express');
const router = express.Router({
    mergeParams: true
});
const Admin = require('../models/admin');
const passport = require('passport');
//const User = require('../models/user');

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/register", (req, res) => {
//   res.render("register");
// });

router.get("/orderlist", (req, res) => {
    res.render("orderList");
});

router.get("/order_history", (req, res) => {
    res.render("order_history");
});

router.get("/menu", (req, res) => {
  res.render("menu");
});

//admin routes
router.post("/register", (req, res) => {
  let admin = new Admin();
  admin.first_name = req.body.first_name;
  admin.first_name = req.body.last_name;
  admin.email = req.body.email;

  if(req.body.password === req.body.password2){
    admin.password = req.body.password;
  }

  Admin.register(admin, req.body.password, function(err, user){
    if(err){
         console.log(err);
         return;
     } //user stragety
     passport.authenticate("local")(req, res, function(){
       //render admin view
        res.render('index', {
          first_name: admin.first_name,
          last_name: admin.last_name,
          email: admin.email
        });
    }); 
 });
});

//admin login
router.get("/admin", (req, res) => {
  res.render("admin");
});

router.post('/login', passport.authenticate('local', { successRedirect: '/',
failureRedirect: '/login'}));

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
