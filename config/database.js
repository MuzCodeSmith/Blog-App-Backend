const mongoose =  require('mongoose');

require('dotenv').config();

const connectDB = () =>{
     mongoose.connect(process.env.DATABASE_URL)
    .then(()=>console.log("conection to database successful"))
    .catch((error)=>{
        console.log("error while connecting to database")
        console.log(error);
        process.exit(1);  
    })
}
module.exports = connectDB;