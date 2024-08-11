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
const flash = require('connect-flash')
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

app.use((req, res, next) =>{
  res.locals.successMsg = req.flash("success");
  res.locals.errorMsg = req.flash("error");
  next();
})

app.use(['/products', '/'], productsRoute);
app.use('/owner', ownerRoute);
app.use('/user', userRoute);
