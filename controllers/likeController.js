const Post = require('../models/postModel');
const Like = require('../models/likeModel');
exports.createLike = async (req,res) =>{
    try{

        const {postId} = req.params;
        const {user} = req.body;
        const like = await Like({user,postId});
        const savedLike = await like.save()
        const updatedPost = await Post.findByIdAndUpdate(postId,{$push:{likes:savedLike._id}},{new:true}).populate({path:'likes' ,select:'user'}).exec();
        if(!updatedPost){
            return res.status(500).json({
                success:false,
                message:"failed to like",
            })
        }
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
        const {likeId,postId } = req.params;
        console.log(likeId)
        const likeToRemove = await Like.findById(likeId);
        console.log(likeToRemove)
        if (!likeToRemove) {
            return res.status(404).json({
                success: false,
                message: "Like not found",
            });
        }
        await Like.findByIdAndDelete(likeId)
        const updatePost = await Post.findByIdAndUpdate(postId,{$pull:{likes:likeToRemove._id}},{new:true}).populate('likes');

        res.status(200).json({
            success:true,
            data:updatePost,
            message:'unliked post successfully'
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })       
    }
}