let mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let adminSchema = mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        required: false
      },
    last_name: {
        type: String,
        trim: true,
        required: false
      },
    email: {
        type: String,
        trim: true,
        required: false
      },
    password: {
        type: String,
        required: false
      },
    salt: String,
    }, {timestamps: true});

adminSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model('Admin', adminSchema);