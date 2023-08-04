const Post = require('../models/postModel');
const User = require('../models/userModel');
const cloudinary = require('cloudinary').v2;

exports.createPost = async (req, res, next) => {
    try{
        //cloudinary
        let images = [];
        if(typeof req.body.image === 'string'){
            images.push(req.body.image);
        }
        else{
            images = req.body.image;
        }
        const imagesLinks = [];
        for(let i = 0; i < images.length; i++){
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "BeaconPosts"
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }


        const {content,tags,visibility} = req.body;
        const post = await Post.create({
            content,tags,user: req.user.id,image: imagesLinks,visibility
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
        const posts = await Post.find().populate('user');

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
        const post = await Post.findById(req.params.id).populate('user');
    
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
        res.status(404).json({
            success: false,
            message: "Post not found",
        })
    }
}

exports.updatePost = async (req, res, next) => {
    try{

        //cloudinary
        const oldImagesFromDB = req.body.image;

        //now we have  images and imagesString
        //images refer to new ones 
        //and imagesString refer to old ones


         // add cloudinary - new images
         let newImages = [];
         if (typeof(req.body.newImages) ==="string"){
            newImages.push(req.body.newImages);
         }else{  
            newImages = req.body.newImages;
         }
         const imagesLink = [];

         //if adding new images
         for (let i = 0; i < newImages.length; i++){
             const result = await cloudinary.uploader.upload(newImages[i],{
                 folder:"BeaconPosts",
             });
             imagesLink.push({
                 public_id:result.public_id,
                 url:result.secure_url,
             })
            
         }
        for (let i = 0; i< oldImagesFromDB.length; i++){
            imagesLink.push(oldImagesFromDB[i]);
        }

        const {content,tags,visibility} = req.body;
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        console.log(post.user)
        if(post.user._id.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this post",
            })
        }
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
            content,tags,image: imagesLink,visibility
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        updatedPost.populate('user').execPopulate();

        res.status(200).json({
            success: true,
            post: updatedPost,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server error",
        })

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
        if(post.user._id.toString() !== req.user.id){
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
        res.status(500).json({
            success: false,
            message: "Server error",
        })

    }

}

exports.getPostsByUser = async (req, res, next) => {
    try{
        const posts = await Post.find({user: req.params.id}).populate('user');

        // const posts = await Promise.all(postsWithoutUser.map(async post => {
        //         let user = await User.findById(post.user).lean();
        //         post = post.toJSON();
        //         post.user = user;
        //         return post;
        //     }))

        // return user details in the same format as the post if post is empty
        if(posts.length === 0){
            const user = await User.findById(req.params.id).lean();
            posts[0]= {}
            posts[0].user = user;
            console.log(posts)
            return res.status(200).json({
                success: true,
                posts,
            })
        }
        
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
        const posts = await Post.find();
        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        if(req.user){
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
                message: "Post liked successfully",
            })
        }
        else{
            return res.status(400).json({
                success: false,
                message: "You have not logged in",
            })
        }
        
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "You have not logged in",
        })
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
        const commenter = await User.findById(req.user.id);
        const newComment = {
            comment,
            user: commenter
        }
        post.comments.push(newComment);
        await post.save();

        post.populate('user')
        res.status(200).json({
            success: true,
            post,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
        })
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

//get popular tags in last week
exports.getPopularTags = async (req, res, next) => {
    try {
      const posts = await Post.find({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      });
  
      const tagCounts = posts.reduce((acc, post) => {
        post.tags.forEach((tag) => {
          const existingTag = acc.find((t) => t.tag === tag);
          if (existingTag) {
            existingTag.count++;
          } else {
            acc.push({ tag, count: 1 });
          }
        });
        return acc;
      }, []);
  
      res.status(200).json({
        success: true,
        tags: tagCounts,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong",
      });
    }
  };

exports.getPostsByTag = async (req, res, next) => {
    try{
        const postsWithoutUser = await Post.find({tags: req.params.id});
        const posts = await Promise.all(postsWithoutUser.map(async post => {
            let user = await User.findById(post.user);
            post = post.toJSON();
            post.user = user;
            return post;
        }))
        res.status(200).json({
            success: true,
            posts,
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

exports.getFollowingsPosts = async (req, res, next) => {
    try{
        const user = await User.findById(req.user.id);
        const postsWithoutUser = await Post.find({user: {$in: user.following}});
        const posts = await Promise.all(postsWithoutUser.map(async post => {
            let user = await User.findById(post.user);
            post = post.toJSON();
            post.user = user;
            return post;
        }
        ))
        res.status(200).json({
            success: true,
            posts,
        })
        
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

//seach tags, users, posts
exports.search = async (req, res, next) => {
    try{
        const {search} = req.body;
        const posts = await Post.find({$text: {$search: search}});
        const users = await User.find({$text: {$search: search}});
        res.status(200).json({
            success: true,
            posts,
            users,
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}