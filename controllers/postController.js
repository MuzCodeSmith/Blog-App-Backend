const Post = require('../models/postModel')
const User = require('../models/userModel')

exports.createPost = async (req,res) =>{
    try{
        const {title, body, author} = req.body;


        const post = await Post({
            title, body, author
        })
        const savedPost = await post.save();

        // add to user model
        const updatedUser = await User.findByIdAndUpdate(author,{$push:{posts:savedPost._id}},{new:true}).populate({path:'posts', select:'title body likes comments'}).exec() 

        res.status(201).json({
            success:true,
            data:updatedUser,
            message:"post created successfully!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })

    }
}

exports.getAllPosts = async (req,res) =>{
    try{
        const posts = await Post.find({}).populate('comments').populate('likes').exec();
        res.status(200).json({
            success:true,
            data:posts,
            message:"post created successfully!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}
exports.getAllUserPosts = async (req,res) =>{
    try{
        const {userId} = req.params;
        const user = await User.findById({_id:userId}).populate('posts').exec();
        res.status(200).json({
            success:true,
            data:user.posts,
            message:"posts fetched successfully!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.getPost = async (req,res) =>{
    try{
        const id = req.params.id;
        const post =  await Post.find({_id:id}).populate('comments').populate('likes').exec();
        if(!post){
            res.status(404).json({
                success:false,
                message:"post not found",
                data:null,
            })
        }
        res.status(200).json({
            success:true,
            data:post,
            message:"post fetched successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
    
}

exports.deletePost = async (req,res)=>{
    try{
        const id = req.params.id;
        await Post.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"post deleted successfully",
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.updatePost = async (req,res)=>{
    try{
        const id = req.params.id;
        const {title,body} = req.body;
        const updatedPost = await Post.findByIdAndUpdate(id,{title,body,updatedAt:Date.now()},{new:true});
        res.status(200).json({
            success:true,
            data:updatedPost,
            message:"post updated successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}