const mongoose =require('mongoose');

const commentSchema = new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    body:{
        type:String,
        required:true
    }
})
 
module.exports = mongoose.model('Comment',commentSchema)