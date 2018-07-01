let mongoose = require('mongoose');

let userOrderSchema = mongoose.Schema({
    id: Number,
    itemsOrdered: [],
    status: String,
    timeFulfilled: 0,
    fulfilled: false,
    email: String
});

module.exports = mongoose.model('UserOrder', userOrderSchema);