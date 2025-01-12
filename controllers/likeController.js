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