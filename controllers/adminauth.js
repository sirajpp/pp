const  Admin = require("../models/adminModel");
const bycrypt = require('bcryptjs')
const { createError } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

// sign up Admin

// const signup = async (req,res,next) => {
//   try{
//     const salt = bycrypt.genSaltSync(10);
//     const hash = bycrypt.hashSync(req.body.password,salt);
//     const newAdmin = new Admin({...req.body,password:hash});

//     await newAdmin.save();
//     res.status(200).send("Admin has been Created")
//   }catch(err){
//     next(err)
//   }
// }


// signin Admin
const signin = async(req,res,next) => {
  try{
    const admin = await Admin.findOne({name : req.body.name});

    if(!admin) return next(createError(404,"You are not authorized"))

    const isCorrect = await bycrypt.compare(req.body.password, admin.password);

    if(!isCorrect) return next(createError(400,"Wrong credentials"));

    const token = jwt.sign({id : admin._id}, process.env.JWT);
    const  { password, ...others} = admin._doc;

    res.cookie("access_token",token,{
      httpOnly:true,
    })
    .status(200).json(others);
  }catch(err){
    next(err);
  }
}

    module.exports = {signin}