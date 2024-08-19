if(process.env.NODE_ENV != "development"){
    require("dotenv").config();
  }

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');;
const LocalStrategy = require('passport-local');
const userModel = require('./models/user_model.js')
const mongooseConnection = require('./config/mongoose_connection.js'); //value is not read but its necessary to require
const ownerRoute = require('./routes/ownerRoute.js');
const userRoute = require('./routes/userRoute.js');
const productsRoute = require('./routes/productRoute.js');
app.listen(8080);

app.engine("ejs", ejsMate); // use ejs-locals for all ejs templates:
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true})); // Middleware to parse URL-encoded bodies
app.use(methodOverride('_method'))
app.use(cookieParser("cookiesecret"));
app.use(express.static(path.join(__dirname, '/public')));

const sessionOptions ={
  secret: "sessionsecret",
  resave: false,
  saveUninitialized: true, 
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  } 
}
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize()); //initialize passport with every request
app.use(passport.session()); //to identify users as they browse from page to page.
passport.use(new LocalStrategy(userModel.authenticate())); //jitne bhi request/users hai saare localStrategy ke through authenticate hona cahiye, or un users ko authenticate karne ke liye authenticarte method use hoga. 
// authenticate means user ko login or signup karvana (static method hai authenticate())
passport.serializeUser(userModel.serializeUser()); //user se related jitni bhi info hai, usko session me store kar ta hai serializeUser, jis se ki user ko baar baar login na karna pade
passport.deserializeUser(userModel.deserializeUser()); //user se related jitni bhi info hai, usko session se hatan deserializeUser()  

app.use((req, res, next) =>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  res.locals.infoMsg = req.flash("info");
  res.locals.currentUser = req.user; //we can not access req.user directy into ejs tamplate, so we store req.user inti res.locals.currentUser
  next();
})

app.use(['/products', '/'], productsRoute);
app.use('/owner', ownerRoute);
app.use('/user', userRoute);

// if request is not match to any route this will execute
app.use('*', (req, res, next) =>{
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) =>{
  let { statusCode = 500, message = "Something went wrong. Please try again!"} = err;
  console.log(err);
  res.render('error.ejs', { statusCode, message })  
});