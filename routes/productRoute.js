const express = require('express');
const multer  = require('multer')
const router = express.Router();

const productsController = require('../controllers/products.js');
const Products = require('../models/products_model.js');

router.get("/", productsController.index)
router.post("/", async(req, res) =>{    
    const productData = req.body.product;

    if(productData.image){
        productData.image = {
        url: productData.image
        }
        }
        try{
    const newProduct = new Products(productData);
   await newProduct.save();
    // res.send("data entered")
    res.redirect("/products");
        } catch (error){
            res.send(error)
        }
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