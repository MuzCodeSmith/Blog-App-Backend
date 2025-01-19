const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createUser = async (req,res) =>{
    try{
        const {name, email,password} = req.body;
        console.log(name,email,password);
        
        const alreadyExist = await User.findOne({email})
        if(alreadyExist){
            return res.json({
               message:'user already exist'
            })
        }

        // hash password
        let saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds)

        let user = await User({
            name, email,password:hashedPassword
        })

        let savedUser = await user.save()
        res.status(201).json({
            success:true,
            data:savedUser,
            message:"user registered successfully"
        })

    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

// login
exports.loginUser = async (req,res) =>{
    try{
        const {email, password} =  req.body;
        
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({
                message:'user not found!'
            })    
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)  
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid credentials!"
            })
        }

        res.status(200).json({
            success:true,
            message:"login successful!"
        })


    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
    
}

exports.getUserById = async (req, res) =>{
    try{
        const {userId} = req.params;
        const user = await User.findOne({_id:userId}).populate('posts');
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found!"
            })
        }
        res.status(200).json({
            success:true,
            data:user,
            message:"user successfully fetched"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}



exports.getAllUsers = async (req, res) =>{
    try{
        const users = await User.find();
        res.status(200).json({
            success:true,
            data:users,
            message:"users fetched successfully!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.deleteUser = async (req, res) =>{
    try{
        const {userId} = req.params;
        const deletedUser = await User.findByIdAndDelete({_id:userId});
        if(!deletedUser){
            return res.status(400).json({
                message:'user not found!'
            })
        }
        res.status(200).json({
            success:true,
            message:"user deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}
