const jwt = require("jsonwebtoken");
const {createError} = require('./errorHandler');

const verifyToken = (req,res,next) => {
    console.log("verify Token MiddleWare is executed.");
    const token = req.cookies.access_token;
 
    if(!token) return next(createError(401, "You are not authenticated"));

    jwt.verify(token, process.env.JWT, (err, admin) =>{
        if(err){
            console.log("JWT Verifivation Error: ", err);
            return next(createError(403, "Token is not Valid"));
        }
        req.admin = admin;
        next();
    })
}

module.exports = {verifyToken}