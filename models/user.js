const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    regTime: {
        type: Date,
        required: true
    },
    lastLogin: {
        type: Date,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        required: true
    },
});

module.exports = model("User", userSchema);