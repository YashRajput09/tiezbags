module.exports.isLoggedIn = (req, res, next) =>{
    // console.log(req.originalUrl);

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