const express = require('express');
const router = require("./api/router");
const connectDB = require('./configs/db');
const limiter = require('./middlewares/ratelimiter');
const speedLimiter = require('./middlewares/requestThrottling');


require('dotenv').config();

const app = express();


app.use(express.json());
app.use(limiter);
app.use(speedLimiter);

try{
    connectDB();
}
catch(err){
    throw new Error(err.message)
}


app.use("/",router)

const server = app.listen(3000,()=>{
    console.log("Server Up on Port 3000");
})

module.exports = server;