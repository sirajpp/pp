const mongoose = require('mongoose')

const TestiSchema = new mongoose.Schema({
    adminId:{
        type:String,
        required:[true,'Admin Id is required']
    },
    name : {
        type:String,
    
    },
    feedback : {
        type : String,
        
    },

},{timestamps:true})

module.exports = mongoose.model("Testi",TestiSchema);