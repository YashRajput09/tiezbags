const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares");
const usersController = require("../controllers/users")

//signup
router.get("/signup", usersController.renderSignUpForm);

router.post("/signup", usersController.signUpUser);

//login
router.get("/login", usersController.renderLogInForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "login",
    failureFlash: "Ex ka number yaad rhta hai tumhe, par apna username or password nahi.",
  }),
  usersController.logInUser
);

//logout
router.get("/logout", usersController.logOutUser);

module.exports = router;