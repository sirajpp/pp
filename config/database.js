const mongoose = require('mongoose')


const connectDatabase=() =>{
    mongoose
    .connect(process.env.MONGO )
    .then(()=>{
        console.log("Connected to db");
    }
    ).catch((err)=>{
        throw err;
    })
};

module.exports = connectDatabase;