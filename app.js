const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

const User = require('./models/user');
const Admin = require('./models/admin');
require('./services/passport');

// Init
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//MongoDB
mongoose.connect(keys.mongoURI);
let db = mongoose.connection;

// check db connection
db.once('open', () => {
    console.log("MongoDB Connection: Successful");
});
  
  // check for db errors
db.on('error', (err) => {
console.log("MongoDB Connection: " + err);
});

passport.use(Admin.createStrategy());
app.use(passport.initialize());
app.use(passport.session());
// Routes
var index = require('./routes/index');

// Routing
app.use('/', index);

//Initialize cookie session and passport session
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000, //cookie lasts for 30 days
        keys: [keys.cookieKey]
    })
);
//set user
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
  });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        console.log(err.message);
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err.message);
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // });
});

module.exports = app;
