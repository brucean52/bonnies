var mongoose = require('mongoose');

var menu_item = mongoose.model('menu_item', {
    id: {
        type: Number
    },
    price: {
        type: Number
    },
    type: {
        type: String
    }
})

module.exports = {menu_item}