const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    // username and password fields are automatically added by passport-local-mongoose
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    mobilenumber: Number,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    otp: Number,
    otpExpires: Date,
    isAdmin:Boolean,
    picture: String,
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema); 