const {MongoClient, ObjectID} = require('mongodb');

const express = require('express');
const router = express.Router({
    mergeParams: true
});
const User = require('../models/user');
const Order = require('../models/order');
const UserOrder = require('../models/userOrder');
const passport = require('passport');
//const User = require('../models/user');

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

// router.get("/register", (req, res) => {
//   res.render("register");
// });

// router.get("/orderlist", (req, res) => {
    
// });

router.get("/order_history", (req, res) => {
    res.render("order_history");
});

router.get("/menu", (req, res) => {
  res.render("menu", {data: ""});
});


router.get("/cart", (req, res) => {
  // let cart = global.cart;
  //   console.log('cart', cart);
    res.render("cart");
});


router.get("/confirmation", (req, res) => {
    res.render("confirmation");
});

//admin routes

router.post("/register", (req, res) => {
  let user = new User();
  user.name = req.body.first_name +" "+ req.body.last_name;
  user.email = req.body.email;

  if(req.body.password === req.body.password2){
    user.password = req.body.password;
  }

  user.admin = true;

  User.register(user, req.body.password, function(err, user){
    if(err){
         console.log(err);
         return;
     } //user stragety
     passport.authenticate("local")(req, res, function(){
       //render admin view
        res.render('index');
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

//update fulfilled status of order items
router.post('/fulfillItem', (req, res) => {
  console.log("FULFILLING ITEM: ", req.body.id);
  var time = new Date();

  Order.update({id: req.body.id}, {
      fulfilled: true,
      timeFulfilled: time.toLocaleString('en-US', { hour: 'numeric', hour12: true })

  }, function(err){
      if(err){
          console.log(err);
      }
  })
  res.redirect('/orderList')
})

//cancel order from order items on admin screen
router.post('/cancelItem', (req, res) => {
    console.log("CANCELING ITEM: ", req.body.id);
  
    UserOrder.remove({id: req.body.id}, function(err) {
        if (!err) {
                console.log('deletion went fine');
        }
        else {
                console.log(err);
        }
    });
    res.redirect('/order_history')
})

// get all orders from the orders table onto admin orderList
router.get("/orderList", function(req, res) {
    console.log("ORDERLIST CLICKED")
  MongoClient.connect('mongodb://eeps30:av862549@ds125001.mlab.com:25001/bonnies_vegan_cuisine', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server', err);
    }
    console.log('Connected to MongoDB server.');

    db.collection('orders').find().toArray().then((docs) => {
        // console.log('Menu Items: ');
        // console.log(JSON.stringify(docs, undefined, 2));
        // console.log('This is order data: ', docs);
        res.render('orderList', {orderData: docs});
    }, (err) => {
        console.log('Unable to fetch order list items', err);
    })
    // db.close();
  })

})

router.post('/additem', (req, res)=> {
  console.log(req.body.food);
  let itemObject = {
    name : req.body.food,
    price: req.body.price,
    qty: 1
  }
  let cartArray = [];
  let found = false;

  if(!global.cart){
    cartArray.push(itemObject);
    global.cart = cartArray;
  } else {
    cartArray = global.cart;

    for(var i =0; i<cartArray.length; i++){
      if(cartArray[i].name == itemObject.name){
        cartArray[i].qty++;
        found = true;
      }
    }
    if(!found){
      cartArray.push(itemObject);
    }
    global.cart = cartArray;  
  }

  console.log(global.cart);
  res.render('menu', {data: 'item added'});
});


//get all orders from userOrders onto order_history.ejs
router.get("/orderHistory", function(req, res) {
    console.log("ORDER HISTORY CLICKED")
    MongoClient.connect('mongodb://eeps30:av862549@ds125001.mlab.com:25001/bonnies_vegan_cuisine', (err, db) => {
      if(err) {
          return console.log('Unable to connect to MongoDB server', err);
      }
      console.log('Connected to MongoDB server.');
  
      db.collection('userOrders').find().toArray().then((docs) => {
          // console.log('Menu Items: ');
          // console.log(JSON.stringify(docs, undefined, 2));
          // console.log('This is order data: ', docs);
          res.render('order_history', {orderData: docs});
      }, (err) => {
          console.log('Unable to fetch order list items', err);
      })
      // db.close();
    })
  
})

router.post('./')


module.exports = router;
