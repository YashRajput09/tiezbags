const Products = require("../models/products_model")

module.exports.index = async(req, res) => {
    const allProducts = await Products.find()
    // console.log(allProducts);
    res.render("products/index.ejs",{products : allProducts} )
};