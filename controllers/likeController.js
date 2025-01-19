const Post = require('../models/postModel');
const Like = require('../models/likeModel');
exports.createLike = async (req,res) =>{
    try{
        const {user, post} = req.body;
        const like = await Like({user,post});
        const savedLike = await like.save()
        const updatedPost = await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true}).populate('likes').exec();
        
        res.status(200).json({
            success:true,
            data:updatedPost,
            message:"like added successfully"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.getLikesByPostId = async (req, res) =>{
    try{
        let {postId} = req.params;
        let post = await Post.findById({_id:postId}).populate('likes').exec();
        if(!post){
            res.status(404).json({
                success:false,
                message:'post not found!'
            })    
        }
        res.status(200).json({
            success:true,
            data:post.likes,
            message:'likes fetched successfully!'
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })       
    }
}

exports.removeLike = async (req,res) =>{
    try{
        const {id} = req.params;
        const removedLike = await Like.findByIdAndDelete(id);
        const updatedPost = await Post.findByIdAndUpdate(removedLike.post,{$pull:{likes:removedLike._id}},{new:true}).populate('likes').exec();
        res.status(200).json({
            success:true,
            data:updatedPost,
            message:"like removed successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })       
    }
}