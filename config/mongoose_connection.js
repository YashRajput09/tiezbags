const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');
const MongoStore = require('connect-mongo');

// const dbUrl = `${config.get('MONGODB_URI')}/tiezbags`;
const dbUrl = process.env.ATLUS_URL;
mongoose.connect(dbUrl)
.then(()=>{
    dbgr("connected");    
}).catch((error) =>{
    console.log("Error connecting to mongoDB : ", error);
});

module.exports.store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
      secret: "sessionsecret",
    },
    touchAfter: 24* 3600,
  });

module.exports = mongoose.connection;