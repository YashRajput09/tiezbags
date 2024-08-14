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
    await Products.deleteMany({});
   initData.data =  initData.data.map((obj) =>({
        ...obj,
        owner: '66b8cd75567de2882d1995f2'
    }));
    await Products.insertMany(initData.data)
    console.log("Data was initialized");
    
}
initDB();