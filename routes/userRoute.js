const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const passport = require("passport");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post("/signup", async (req, res) => {
  try{
  const { username, email, password } = req.body;
  const newUser = new userModel({
    username,
    email,
  });
    const registeredUser = await userModel.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "La La Paisa laya.");
    res.redirect("/");
  } catch(e){
    req.flash("error", e.message);
    res.redirect('signup')
  }
});

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login",
    failureFlash: "Ex ka number yaad rhta hai tumhe, par apna username or password nahi.",
  }),
  (req, res) => {
    req.flash("success", "Shabas mere sher !");
    res.redirect("/");
  }
);

router.get("/logout", (req, res, next)=>{
  req.logout((err) =>{
    if(err){
      return next(err);
    }
    req.flash("success", "Nikal Lavde, Pheli fursat me nikal.");
    res.redirect('/');
  })
})
module.exports = router;
