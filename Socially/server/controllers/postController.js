const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.createPost = async (req, res, next) => {
    try{

        const {content,tags} = req.body;
        console.log(req.user)
        const post = await Post.create({
            content,tags,user: req.user.id,
        });
        res.status(201).json({
            success: true,
            post
        })

    }
    catch(error){
        next(error);
    }
}

exports.getPosts = async (req, res, next) => {
    try{
        const postsWithoutUser = await Post.find();

        //find the respective user for each post
        const posts = await Promise.all(postsWithoutUser.map(async post => {
            let user = await User.findById(post.user);
            post = post.toJSON();
            post.user = user;
            return post;
        }))

        console.log(posts)
        res.status(200).json({
            success: true,
            posts,
        })
    }
    catch(error){
        res.status(404).json({
            success: false,
            message: "Posts not found",
        })
    }
}

exports.getUserDetails = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        res.status(200).json({
            success: true,
            user,
        })

    }
    catch(error){
        res.status(404).json({
            success: false,
            message: "User not found",
        })

    }
}

exports.getSinglePost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        res.status(200).json({
            success: true,
            post,
        })
    }
    catch(error){
        next(error);
    }
}

exports.updatePost = async (req, res, next) => {
    try{
        const {title,content} = req.body;
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this post",
            })
        }
        post.title = title;
        post.content = content;
        await post.save();
    }
    catch(error){
        next(error);
    }
}

exports.deletePost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this post",
            })
        }
        await post.remove();
        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        })
    }
    catch(error){
        next(error);
    }

}

exports.getPostsByUser = async (req, res, next) => {
    try{
        const posts = await Post.find({user: req.user.id});
        res.status(200).json({
            success: true,
            posts,
        })
    }
    catch(error){
        next(error);
    }
}

exports.getLikes = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        res.status(200).json({
            success: true,
            likes: post.likes,
        })
    }
    catch(error){
        next(error);
    }
}

exports.likePost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(post.likes.includes(req.user.id)){
            return res.status(400).json({
                success: false,
                message: "You have already liked this post",
            })
        }
        post.likes.push(req.user.id);
        await post.save();
        res.status(200).json({
            success: true,
            likes: post.likes,
        })
    }
    catch(error){
        next(error);
    }
}

exports.unlikePost = async (req, res, next) => {
    try{
        const post =   await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(!post.likes.includes(req.user.id)){
            return res.status(400).json({
                success: false,
                message: "You have not liked this post",
            })
        }
        post.likes = post.likes.filter(id => id.toString() !== req.user.id);
        await post.save();
        res.status(200).json({
            success: true,
            likes: post.likes,
        })
    }
    catch{
        next(error);
    }
}

exports.getComments = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "POst not found",
            })
        }
        res.status(200).json({
            success: true,
            comments: post.comments,
        })
    }
    catch(error){
        next(error);
    }
}

exports.createComment = async (req, res, next) => {
    try{
        const {comment} = req.body;
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        const newComment = {
            comment,
            user: req.user.id,
        }
        post.comments.push(newComment);
        await post.save();
        res.status(200).json({
            success: true,
            comments: post.comments,
        })
    }
    catch(error){
        next(error);
    }
}

exports.deleteComment = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        const comment = post.comments.find(c => c.id === req.params.comment_id);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            })
        }
        if(comment.user.toString() !== req.user.id || post.user.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this comment",
            })
        }
        post.comments = post.comments.filter(c => c.id !== req.params.comment_id);
        await post.save();
        res.status(200).json({
            success: true,
            comments: post.comments,
        })

    }
    catch(error){
        next(error);
    }
}

