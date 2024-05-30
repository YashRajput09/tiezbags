const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner_model')

// console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req, res){
       let owners = await ownerModel.find();
       if(owners.length > 0){
        return res.send(500)
        .send("Owner only created once");
       }

       let {fullname, email, password} = req.body;
      let createOwner = await ownerModel.create({
        fullname,
        email,
        password,
       })
        res.send(createOwner)
    });
}

router.get("/", (req, res) =>{
    res.send("Owner Route Working");
});

module.exports = router;