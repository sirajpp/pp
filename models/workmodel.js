const mongoose = require("mongoose")

const WorkSchema = new mongoose.Schema({
    adminId : {
        type :String,
        required:true,
    },
    image : {
        type : String,
        required : true,
    }
},{timestamps:true})

module.exports = mongoose.model("Work",WorkSchema)