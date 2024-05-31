const mongoose = require('mongoose');
const initData = require('./data.js');
const Products = require('../models/products_model.js');

async function dbconnection(){
    await mongoose.connect('mongodb://127.0.0.1:27017/tiezbags');
}
dbconnection()
.then(()=>{
    console.log("Connected with db");
})
.catch((error) =>{
    console.log(error);
});

const initDB = async ()=>{
    // await Products.deletaMany({});
    // initData.map((obj) =>({
    //     ...obj,

    // }))
    await Products.insertMany(initData.data)
}
initDB();