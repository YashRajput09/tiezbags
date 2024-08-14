const express = require("express");
const router = express.Router();
const userModel = require("../models/user_model");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");

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
    const registeredUser = await userModel.register(newUser, password); //store user signup details to db
    console.log(registeredUser);
    req.login(registeredUser, (err) =>{
      if(err){
        return next(err);
      }
      req.flash("success", "Welcome to TIEZBags Guru.");
      res.redirect("/");
    })
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
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "login",
    failureFlash: "Ex ka number yaad rhta hai tumhe, par apna username or password nahi.",
  }),
  (req, res) => {
    const redirectUrl = res.locals.redirectUrl || "/" ; // '/' is used for, if user login from home page
    req.flash("success", "Shabas mere sher !");
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next)=>{
  req.logout((err) =>{
    if(err){
      return next(err);
    }
    req.flash("success", "LoggedOut successfully");
    res.redirect('/');
  })
})
module.exports = router;
