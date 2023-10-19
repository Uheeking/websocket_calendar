const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const app = express();

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("connect to database"))

module.exports = app