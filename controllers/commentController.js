const Comment = require('../models/commentModel');
const Post = require('../models/postModel')

exports.createComment = async (req,res) =>{
    try{
        const {postId} = req.params;
        const {body,user} = req.body;
        const comment = new Comment({
            body,user
        })
        const savedComment = await comment.save()

        const updatedPost = await Post.findByIdAndUpdate(postId,{$push:{comments:savedComment._id}},{new:true})
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


exports.getCommentsByPostId = async (req,res) =>{
    try{
        const {postId} = req.params;
        const post = await Post.findById({_id:postId}).populate({path:'comments',select:'user body'}).exec();
        if(!post || post.comments.length === 0){
            return res.status(404).json({
                success:false,
                data:[],
                message:"no comments found!",
            })
        }
        res.status(200).json({
            success:true,
            data:post.comments,
            message:`comments of post:${postId}`
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.deleteCommentById = async (req,res) =>{
    try{
        const {id} = req.params;
        await Comment.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"comment deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.updateCommentById = async (req,res) =>{
    try{
        const {id} =req.params;

        const {body} = req.body;
        console.log(body)
        const updatedComment = await Comment.findByIdAndUpdate(id,body,{new:true});
        console.log(updatedComment)

        res.status(200).json({
            success:true,
            data:updatedComment,
            message:"comment updated successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
} 