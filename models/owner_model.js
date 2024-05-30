const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: {
        type: Array,
        default: [],
    },
    image: {
        url: String,
    }
});

const Owner = mongoose.model("Owner", ownerSchema)
module.exports = Owner;