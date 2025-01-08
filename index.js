const express = require('express');
const app = express();
const connectDB =  require('./config/database')
const blogRoutes = require('./routes/blog')
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("app is running")
})
app.get('/',(req,res)=>{
    res.send("<h1>Home Page1</h1>")
})
app.use('/api/v1',blogRoutes)

connectDB();
