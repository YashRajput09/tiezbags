const Products = require("../models/products_model");

module.exports.index = async (req, res) => {
  const allProducts = await Products.find();
  // console.log(allProducts);
  res.render("products/index.ejs", { products: allProducts });
};

module.exports.newProductForm =  async (req, res) => {
  res.render("products/newProduct.ejs");
};

module.exports.createNewProduct = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  try {
    const newProduct = new Products(req.body.product);
    newProduct.owner = req.user._id;
    newProduct.image = { url, filename }
    await newProduct.save();

    req.flash("success", "New collection is added.");
    res.redirect("/products");
  } catch (error) {
    res.send(error);
  }
};

module.exports.showProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Products.findById(id).populate("owner");
  console.log(product);

  //    console.log(product)
  res.render("products/show.ejs", { product });
};

module.exports.editProductForm = async (req, res) => {
  const { id } = req.params;
  const productDetails = await Products.findById(id);
  res.render("products/edit.ejs", { productDetails });
};

module.exports.updateProduct = async (req, res) => {
  const { id } = req.params; 
  
  let updatedProduct = await Products.findByIdAndUpdate(id, { ...req.body.product });
  
  if(req.file){
    const url = req.file.path;
    const filename = req.file.filename;
    updatedProduct.image = { url, filename };  
    await updatedProduct.save();
    console.log(updatedProduct);
  }
  
  req.flash("success", "Product Details updated");
  res.redirect(`/products/${id}`);
};

module.exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Products.findByIdAndDelete(id);
  req.flash("success", "Product Deleted Successfully");
  res.redirect("/products");
};