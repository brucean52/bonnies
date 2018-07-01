let mongoose = require('mongoose');

let orderSchema = mongoose.Schema({
    id: Number,
    itemsOrdered: Array,
    timeOrdered: Number,
    
});

module.exports = mongoose.model('Order', orderSchema);