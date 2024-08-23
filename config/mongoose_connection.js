const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');

// const dbUrl = `${config.get('MONGODB_URI')}/tiezbags`;
const dbUrl = process.env.ATLUS_URL;
mongoose.connect(dbUrl)
.then(()=>{
    dbgr("connected");
}).catch((error) =>{
    console.log("Error connecting to mongoDB : ", error);
});

module.exports = mongoose.connection;