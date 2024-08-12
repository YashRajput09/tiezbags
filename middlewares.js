module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.flash("error", "You must be LoggedIn First");
        return res.redirect("/");
    }
    next();
};