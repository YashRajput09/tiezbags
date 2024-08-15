const userModel = require("../models/user_model");

module.exports.renderSignUpForm =  (req, res) => {
    res.render("users/signup.ejs");
  };

  module.exports.signUpUser = async (req, res) => {
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
  };

  module.exports.renderLogInForm = (req, res) => {
    res.render("users/login.ejs");
  };

  module.exports.logInUser = (req, res) => {
    const redirectUrl = res.locals.redirectUrl || "/" ; // '/' is used for, if user login from home page
    req.flash("success", "Shabas mere sher !");
    res.redirect(redirectUrl);
  };

  module.exports.logOutUser = (req, res, next)=>{
    req.logout((err) =>{
      if(err){
        return next(err);
      }
      req.flash("success", "LoggedOut successfully");
      res.redirect('/');
    })
  };