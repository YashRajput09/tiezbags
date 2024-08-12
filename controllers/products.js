const Products = require("../models/products_model");

module.exports.index = async (req, res) => {
  const allProducts = await Products.find();
  // console.log(allProducts);
  res.render("products/index.ejs", { products: allProducts });
};

module.exports.newProductForm =  async (req, res) => {
  res.render("products/newProduct.ejs");
};

module.exports.createNewListing = async (req, res, next) => {
  console.log(req.body);
};
