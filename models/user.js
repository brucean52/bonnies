let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    account: {
        type: String,
        default: "customer"
    },
    passowrd: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);