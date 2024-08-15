const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.js");
const { isLoggedIn, isOwner } = require("../middlewares.js");

// index route
router.get("/", productsController.index);

//create product
router.post("/", productsController.createNewProduct);

// new product route
router.get("/newProduct", isLoggedIn, productsController.newProductForm);

// show route
router.get("/:id", productsController.showProduct);

// edit route
router.get("/:id/edit", isLoggedIn, isOwner, productsController.editProductForm);

// update route
router.put("/:id", isLoggedIn, isOwner, productsController.updateProduct);

// delete route
router.delete("/:id", isLoggedIn, isOwner, productsController.deleteProduct);
module.exports = router;
