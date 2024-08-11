const express = require('express');
const router = express.Router();
const userModel = require('../models/user_model');

router.get("/login", (req, res) =>{
    res.render("users/login.ejs",);
});

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs")
});

router.post('/signup', async(req, res) =>{
    const { username , email, password } = req.body;
    const newUser = new userModel({
        username,
        email,
    });
    const registeredUser = await userModel.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to TIEZBags.")
    res.redirect('/');
})

module.exports = router;