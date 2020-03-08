const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema
(
    {
        personType: {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true
        },
        mname: {
            type: String
        },
        lname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        is_profile_complete: {
            type: String,
            default: "N"
        }
    }
);


const User = mongoose.model('User', UserSchema);

module.exports = User;