const userModel = require("../models/user_model");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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

  module.exports.renderForgotPasswordForm = (req, res, next)=>{
    res.render('users/forgotPassword.ejs');
  }; 
  
  module.exports.forgotPassword = async(req, res, next) =>{
    crypto.randomBytes(20, (err, buf) =>{ //generate 20byte binary randomcode, which is stored in buf(Buffer)
      if (err) return next(err);

      const token = buf.toString('hex'); //convert randomcode to redable hexadecimal string
      
      const email  = req.body.email;
      userModel.findOne({ email: email })
          .then( user =>{
            if(!user){
              req.flash("error", `No account exists with ${email}`);
              return res.redirect('forgotPassword');
            }

            user.resetPasswordToken = token; //save token to db
            user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; //1 hour  //save token expire time

            user.save()
              .then(()=>{

              const transporter = nodemailer.createTransport({ // This method configures and returns a transport object that is used to send emails.
                // service: 'Gamil',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, 
                auth: {
                  user: 'rajputyash8561@gmail.com',
                  pass: 'vsmt zxzl gihf edsr'
                }
              });

              const mailOptions = { //mailOptions, which is used to configure the email that will be sent to the user when they request a password reset.
                to: user.email,
                from: 'rajputyash8561@gmail.com',
                subject: 'Reset Password',
                text: `Please click on the following link, or past this into your brower to compelete the forgot password process: \n\n` +
                      `http://${req.headers.host}/resetPassword/${token} \n\n` +
                      `If you are not request this, please ignore this email and your password will remain unchange. \n`
              };

               transporter.sendMail(mailOptions, err =>{ //sent a mail to user 
                if (err) return next(err);
                req.flash('info', `An email has been sent to ${user.email} with further instructions.`);
                res.redirect('forgotPassword')
              });
            })//

          }).catch(err =>{
            console.error("Error: ", err);
            next(err);
          });    
      
    })
  }

  // vsmt zxzl gihf edsr