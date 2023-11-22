const express = require("express");

const mongoose= require("mongoose")
const cors = require("cors");
const dotenv = require('dotenv');
const path = require('path');
const products = require('./routes/product')
const admin = require ('./routes/admin')
const testi = require('./routes/testi')
const works = require('./routes/works')
const cookieParser = require("cookie-parser");const app = express();
const connectDatabase = require('./config/database');
dotenv.config({path :path.join(__dirname, "config/.env")});
const whiteList = [
  "https://www.yoursite.com",
  "https://127.0.0.1:5500",
  "http://localhost:5173",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);

    } else {
      callback(new Error("Not allowed CORS"));
    }
  },
  credentials: true,
};

connectDatabase()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(cookieParser())
app.use(express.json())


app.use('/api/auths',admin)
app.use('/api/products',products);
app.use('/api/works',works);
app.use('/api/testi',testi);

app.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success :false,
        status,
        message

    })
})

app.listen(process.env.PORT,()=>{
    console.log(`server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})