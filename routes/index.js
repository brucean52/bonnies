var express = require('express');
const {MongoClient, ObjectID} = require('mongodb');

var router = express.Router({
    mergeParams: true
});

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index");
});

router.get("/1", function(req, res) {
  res.render("index1");
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
