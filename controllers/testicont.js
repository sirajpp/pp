const Testi = require("../models/testimodal");

const { createError } = require("../utils/errorHandler");

const getAlltestis = async(req,res,next) =>{
  try{
    const Testimonials = await Testi.find();
    res.status(200).json(
     Testimonials.flat().sort((a, b) => b.createdAt - a.createdAt)
    )
  }catch(err){
    return next(createError(404,"Posts not available"));
  }
}

const addTesti = async (req, res, next) => {
  const newTesti = new Testi({ ...req.body, adminId: req.admin.id });
  try {
    const savedTesti = await newTesti.save();
    res.status(201).json(savedTesti);
  } catch (err) {
   next(err);
  }
};

const deleteTesti = async (req, res, next) => {
  try {
    const testi = await Testi.findById(req.params.id);

    if (!testi) {
      return next(createError(404, "testimonials not found"));
    }

    if (req.admin.id === testi.adminId) {
      await Testi.findByIdAndDelete(req.params.id);
      res.status(200).json("The testimonial has deleted");

    } else {
      return next(
        createError(404, "You are not authorized to perform this action")
      );
    }
  } catch (err) {
    next(err);
  }
};

const updateTesti = async (req, res, next) => {
  try {
    const testi = await Testi.findById(req.params.id);

    if (!testi) return next(createError(404, "Testmonials not found"));

    if (req.admin.id === testi.adminId) {
      const updatedTesti = await Testi.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedTesti)
    }
    else {
        return next(
            createError(404, "You are not authorized to perform this action")
          );
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {addTesti,deleteTesti,updateTesti,getAlltestis}