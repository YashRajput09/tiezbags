const express = require('express');
const router = express.Router();

router.get("/login", (req, res) =>{
    res.render("users/login.ejs")
});

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs")
});

module.exports = router;