const Product  = require('../models/productModel');
const Admin = require('../models/adminModel')
const {createError} = require('../utils/errorHandler')

//get all products - /api/v1/products
const getProducts =async (req,res,next) =>{
    try{
        const products = await Product.find();
    res.status(200).json(products.flat().sort((a, b) => b.createdAt - a.createdAt))
    }
    catch(err){
        return next(createError(404,"Posts not available"));
    }  
}

//create  a Products - /api/v1/product/new
const newProducts = async(req,res,next) => {
    const newProduct = await Product({
        adminId : req.admin.id, ...req.body
    })
    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)
    }
    catch(err){
        next(err)
    }
}

//Get a Single Products
const getSingleProduct = async(req,res,next) => {

    const product = await Product.findById(req.params.id)
    if(!product) {
        return next(createError(404,"cannot get a Product"));
    } 
    return res.status(201).json ({
        success : true,
        product
    })   
}

//update Product -- /api/v1/product/:id
const updateProduct = async (req,res,next) => {
   try{
    const product = await Product.findById(req.params.id)
    if(!product) return next(createError(404,"The product was not found"))
    if(req.admin.id === product.adminId ){
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },
        {
            new :true
        });
        res.status(200).json(updatedProduct)
    }
    else{
        return next(createError(404,'you are not an admin'))
   }
   
   }
   catch(err){
    next(err)
   }
}

//delete a product
const deleteProduct = async (req,res,next) =>{
    try{
    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(createError(404,"the product is not available "));
    }

    if(req.admin.id === product.adminId){
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json("The product has been deleted");
    }
    else{
        return next(createError(403,'You are not an admin'))
    }
}
    catch(err){
     next(err);
    }
    }

module.exports= {getProducts,newProducts,getSingleProduct,updateProduct,deleteProduct}