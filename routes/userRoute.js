const express = require('express');
const router = express.Router();

router.get("/login", (req, res) =>{
    res.render("users/login.ejs",);
});

router.get("/signup", (req, res) =>{
    res.render("users/signup.ejs")
});

router.post('/signup', (req, res) =>{
    const {username , email, password } = req.body;
    console.log(username, email, password
    );
    res.send("Welcome to TIEZBags");
})

module.exports = router;