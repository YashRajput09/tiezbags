const productModel = require("./models/products_model");

module.exports.isLoggedIn = (req, res, next) =>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be LoggedIn to access this Page");
        return res.redirect("/user/login");
    }
    next(); 
};

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req, res, next) =>{
    const { id } = req.params;
    const product = await productModel.findById(id);
    
    if(!product.owner.equals(res.locals.currentUser._id)){
        req.flash("error", "You don't have permission to edit")
       return res.redirect(`/${id}`);
    }
    
    next();
}