const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name: 
    { type: String,
    required: true,
unique:true, },
    email : {
        type: String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
    },
    img : {
        type:String,
    }
},
{timestamps:true})

module.exports = mongoose.model("Admin", AdminSchema)