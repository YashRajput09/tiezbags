// This a better way to handle error, insted of writing try-catch.
module.exports = (fn) =>{
    return function(req, res, next){
        fn(req, res, next).catch(next);
    }
}