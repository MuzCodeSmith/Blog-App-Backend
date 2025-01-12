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

exports.getPost = async (req,res) =>{
    try{
        const id = req.params.id;
        const post =  await Post.find({_id:id}).populate('comments').populate('likes').exec();
        console.log(post)
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
        console.log(updatedPost)
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