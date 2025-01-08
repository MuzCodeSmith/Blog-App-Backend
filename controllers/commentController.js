const Comment = require('../models/commentModel');
const Post = require('../models/postModel')

exports.createComment = async (req,res) =>{
    try{
        console.log("req.body:",req.body)
        const {post,user,body} = req.body;
        const comment = new Comment({
            post,body,user
        })


        const savedComment = await comment.save()

        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
        .populate("comments").exec();
    
        res.status(201).json({
            success:true,
            data:updatedPost,
            message:"comment added successfully"
        })

    }catch(error){
        console.log(error)
        console.error(error);
        res.status(500).json({
            success:false,
            error:error.message,
            message:"internal server error!"
        })

    }
}