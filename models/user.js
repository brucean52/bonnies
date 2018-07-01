let mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let userSchema = mongoose.Schema({
    googleId: String,
    facebookId: String,
    name: String,
    email: String,
    admin: {
        type: Boolean,
        default: false
    },
    password: String
});

userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

let User = module.exports = mongoose.model('User', userSchema);