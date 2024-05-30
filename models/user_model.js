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

const user = mongoose.model("user", userSchema);
module.exports = user;