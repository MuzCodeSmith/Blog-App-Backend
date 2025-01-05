const express = require('express');
const app = express();

app.listen(4000,()=>{
    console.log("app is running")
})
app.get('/',(req,res)=>{
    res.send("<h1>Home Page</h1>")
})