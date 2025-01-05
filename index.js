const express = require('express');
const app = express();
const connectDB =  require('./config/database')

app.listen(4000,()=>{
    console.log("app is running")
})
app.get('/',(req,res)=>{
    res.send("<h1>Home Page1</h1>")
})

connectDB();
