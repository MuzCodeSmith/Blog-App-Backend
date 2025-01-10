const Post = require('../models/postModel')

exports.createPost = async (req,res) =>{
    try{
        const {title, body} = req.body;
        const post = await Post({
            title, body
        })
        const savedPost = await post.save();

        res.status(201).json({
            success:true,
            data:savedPost,
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
        const posts = await Post.find({});
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