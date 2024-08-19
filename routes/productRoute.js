const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.js");
const { isLoggedIn, isOwner } = require("../middlewares.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const expressErrorAsync = require("../utils/expressErrorAsync");

router
  .route("/")
  .get(expressErrorAsync(productsController.index))  //Index route ---> show all products
  .post(                                             //Create route
    isLoggedIn,
    upload.single("product[image]"),
    productsController.createNewProduct
  );

router
  .route("/newProduct")
  .get(isLoggedIn, productsController.newProductForm); //newProduct route

router
  .route("/:id")  
  .get(expressErrorAsync(productsController.showProduct)) //Show route    
  .put(                                                   //Edit-Update route
    isLoggedIn,
    isOwner,
    upload.single("product[image]"),
    expressErrorAsync(productsController.updateProduct)
  )
  .delete(        //Delete route
    isLoggedIn,
    isOwner,
    expressErrorAsync(productsController.deleteProduct)
  );

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  expressErrorAsync(productsController.editProductForm) // Edit route
);

module.exports = router;
