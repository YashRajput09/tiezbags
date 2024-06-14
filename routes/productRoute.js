const express = require('express');
const multer  = require('multer')
const router = express.Router();

const productsController = require('../controllers/products.js');
const Products = require('../models/products_model.js');

router.get("/", productsController.index)
router.post("/", async(req, res) =>{
    console.log(req.body)
    res.send("data entered")
})
// .post(
//     upload.single('image'),
//     productsController.createNewProduct
// )
// router.get('/newProduct', productsController.newProductForm)

router.get("/newProduct", productsController.newProductForm);

router.get("/:id", async(req, res)=>{
    const { id } = req.params; 
   const product =  await Products.findById(id);
//    console.log(product)
    res.render("products/show.ejs", { product })
})
module.exports = router;