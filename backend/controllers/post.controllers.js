import uploadOnCloudinary from "../config/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const uploadPost= async(req,res)=>{
    try {
        
        const{caption, mediaType}=req.body
        let media;
        if(req.file){
            media=await uploadOnCloudinary(req.file.path)

        }

        else{
            return res.status(400).json({
                message:"media is required"
            })
        }

        const post= await Post.create({
            caption,media,mediaType,author:req.userId
        })
        const user= await User.findById(req.userId)
        user.posts.push(post._id)
        await user.save()

        const populatedPost= await Post.findById(post._id).populate("author", "name userName profileImage")
        return res.status(201).json(populatedPost)

    } catch (error) {

        return res.status(500).json({
            message: `upload post error ${error}`
        })
        
    }

}

export const getAllPosts= async(req,res)=>{
    try {
        const posts=await Post.find({}).populate("author", "name userName profileImage")
        return res.status(200).json(posts)
        
    } catch (error) {
        return res.status(500).json({
            message: `get all post error ${error}`
        })
        
    }
}

export const like=async(req,res)=>{
    try {
        const postId=req.params.postId

        const post=await Post.findById(postId)

        if(!post){
            return res.status(400).json({
                message:"post not found"
            })
    
        }

        const alreadyLiked= post.likes.some(id=>id.toString()==req.userId.toString())

        if(alreadyLiked){
            post.likes=post.likes.filter(id=>id.toString() !=req.userId.toString())
        }

        else{
            post.likes.push(req.userId)
        }
        await post.save()
        post.populate("author", "name userName profileImage")

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json({
            message: `like post error ${error}`
        })

        
    }
}


export const comment =async(req,res)=>{
    try {
        const {message}=req.body
        const postId=req.params.postId
        const post =await Post.findById(postId)
        if(!post){
            return res.status(400).json({
                message:"post not found"
            })

        }

        post.comments.push({
            author:req.userId,
            message
        })

        await post.save()
        post.populate("author", "name userName profileImage")
        post.populate("comments.author")

        return res.status(200).json(post)
        
    } catch (error) {
         return res.status(500).json({
            message: `comment post error ${error}`
        })
        
    }
}

export const saved=async(req,res)=>{
    try {
        const postId=req.params.postId
        const user= await User.findById(req.userId)

       

        const alreadySaved= user.saved.some(id=>id.toString()==postId.toString())

        if(alreadySaved){
            user.saved=user.saved.filter(id=>id.toString() !=postId.toString())
        }

        else{
            user.saved.push(postId)
        }
        await user.save()
        user.populate("saved")

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({
            message: `saved post error ${error}`
        })

        
    }
}