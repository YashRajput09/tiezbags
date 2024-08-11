const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: Number,
    contact: Number,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    isAdmin:Boolean,
    picture: String,
})

const User = mongoose.model("User", userSchema);
module.exports = User;