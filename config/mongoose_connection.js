const mongoose = require('mongoose');

const dbUrl = "mongodb://127.0.0.1:27017/tiezbags";
mongoose.connect(dbUrl)
.then(()=>{
    console.log("connected to mongoDB");
}).catch((error) =>{
    console.log("Error connecting to mongoDB : ", error);
});

module.exports = mongoose.connection;