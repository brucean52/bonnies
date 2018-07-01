let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
    id: Number,
    itemsOrdered: {},
    timeOrdered: Number,
    timeFulfilled: 0,
    fulfilled: false
});

module.exports = mongoose.model('Order', orderSchema);