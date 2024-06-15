const express = require('express');
const multer  = require('multer')
const router = express.Router();

const productsController = require('../controllers/products.js');
const Products = require('../models/products_model.js');

// index route
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

// new product route
router.get("/newProduct", productsController.newProductForm);

// show route
router.get("/:id", async(req, res)=>{
    const { id } = req.params; 
   const product =  await Products.findById(id);
//    console.log(product)
    res.render("products/show.ejs", { product })
})

// edit route
router.get("/:id/edit", async(req, res)=>{
    const { id } = req.params;
    const productDetails = await Products.findById(id);
    res.render("products/edit.ejs", {productDetails})
})

router.put("/:id", async(req, res)=>{
    const { id } = req.params;
    const productDetails = req.body.product;
    if(productDetails.image){
        productDetails.image = {
            url: productDetails.image
        }
    }
    await Products.findByIdAndUpdate(id, {...productDetails})
    res.redirect("/products")
})
module.exports = router;