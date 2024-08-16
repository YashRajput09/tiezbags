const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const usersController = require("../controllers/users");

router
  .route("/signup")
  .get(usersController.renderSignUpForm)
  .post(usersController.signUpUser);

router
  .route("/login")
  .get(usersController.renderLogInForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "login",
      failureFlash:
        "Ex ka number yaad rhta hai tumhe, par apna username or password nahi.",
    }),
    usersController.logInUser
  );

router
  .route("/logout")
  .get(usersController.logOutUser);

router
  .route('/forgotPassword')
  .get(usersController.renderForgotPasswordForm)
  .post(usersController.forgotPassword);
  
router
  .route('/resetPassword/:token')
  .get(usersController.renderResetPasswordForm)
  .post(usersController.resetPassword);
  
module.exports = router;
