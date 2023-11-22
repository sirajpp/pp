const Work = require("../models/workmodel")

const { createError } = require("../utils/errorHandler");

const getAllworks = async(req,res,next) => {
    try{
        const works = await Work.find();
        res.status(200).json(
         works.flat().sort((a, b) => b.createdAt - a.createdAt)
        )
      }catch(err){
        return next(createError(404,"Posts not available"));
      }
}

const addwork =async(req,res,next) =>{
    const newWork = new Work({
        ...req.body,adminId:req.admin.id
    })
    try{
        const savedWork=await newWork.save()
        res.status(201).json(savedWork);
    }
    catch(err){
        next(err);
    }
}

const deletework = async(req,res,next) => {
    try{
        const work = await Work.findById(req.params.id);
        if(!work){
            return next(createError(404, "Post not found"));
    }
    if(req.admin.id === work.adminId){
        await Work.findByIdAndDelete(req.params.id);
        res.status(200).json("The post has been deleted")
    }
    else {
        return next(
            createError(404, "You are not authorized to perform this action")
          );
    }
}
catch(err){
     next(err);
}
}

module.exports = {getAllworks,addwork,deletework}