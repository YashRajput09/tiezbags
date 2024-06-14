if(process.env.NODE_ENV != "development"){
    require("dotenv").config();
  }

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const ejsMate = require('ejs-mate');
const db = require('./config/mongoose_connection');
const Products = require('./models/products_model');
const Owners = require('./models/owner_model.js')
const Usres = require('./models/user_model.js')
const ownerRoute = require('./routes/ownerRoute.js');
const userRoute = require('./routes/userRoute.js');
const productsRoute = require('./routes/productRoute.js');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true})); // Middleware to parse URL-encoded bodies
app.use(cookieParser());
app.engine("ejs", ejsMate); // use ejs-locals for all ejs templates:
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.listen(8080);
// const port = 8080;
// app.listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
// });

app.get('products/newProducts', (req, res)=>{
  res.send("jai shree ram")
})
app.use(['/products', '/'], productsRoute);
app.use('/owner', ownerRoute);
app.use('/users', userRoute);
