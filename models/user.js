let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    googleId: String,
    facebookId: String,
    name: String,
    email: String
});

let User = module.exports = mongoose.model('User', userSchema);