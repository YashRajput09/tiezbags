const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products.js");
const { isLoggedIn, isOwner } = require("../middlewares.js");

router
  .route("/")
  .get(productsController.index)
  .post(productsController.createNewProduct);

router
    .route("/newProduct")
    .get(isLoggedIn, productsController.newProductForm);

router
  .route("/:id")
  .get(productsController.showProduct)
  .put(isLoggedIn, isOwner, productsController.updateProduct)
  .delete(isLoggedIn, isOwner, productsController.deleteProduct);

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  productsController.editProductForm
);

module.exports = router;
