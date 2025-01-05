const express = require('express');
const router = express.Router();

router.get('/blogs',(req,res)=>{
    res.send('<h1>welcome to blog route</h1>')
})

module.exports = router;