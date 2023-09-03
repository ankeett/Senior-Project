const Post = require('../models/postModel');
const User = require('../models/userModel');
const cloudinary = require('cloudinary').v2;

/*
createPost(req, res, next)
NAME
    createPost
SYNOPSIS
    createPost(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a user to create a new post with content, tags, images, and visibility settings.
    It handles image uploads to a cloud storage service (e.g., Cloudinary) and associates the post with the authenticated user.
    Upon successful creation, it responds with the created post data.
    If an error occurs during the operation, it forwards the error to the error-handling middleware.
PARAMETERS
    - req: Request - Express request object containing post data, including content, tags, images, and visibility.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the created post data upon success.
    If an error occurs, it forwards the error to the error-handling middleware for further processing.
*/
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
            // Upload each image to Cloudinary and store the public ID and URL.
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "BeaconPosts"
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        // Extract content, tags, and visibility from the request body.
        const {content,tags,visibility} = req.body;

        // Create a new post in the database.
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

/*
getPosts(req, res, next)
NAME
    getPosts
SYNOPSIS
    getPosts(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function retrieves all posts from the database and populates the 'user' field.
    It responds with a success status and the retrieved posts data.
    If no posts are found, it responds with a 'Not Found' status and an appropriate message.
    If an error occurs during the process, it provides an error response.
PARAMETERS
    - req: Request - Express request object (unused in this function).
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the retrieved posts data upon success.
    If no posts are found, it responds with a 'Not Found' status and message.
    If an error occurs, it provides an error response.
*/
exports.getPosts = async (req, res, next) => {
    try{
        // Retrieve all posts from the database and populate the 'user' field.
        const posts = await Post.find().populate('user');

        // Respond with a success status and the retrieved posts data.
        res.status(200).json({
            success: true,
            posts,
        })
    }
    catch(error){
        // If an error occurs during the process, it provides an error response.
        res.status(404).json({
            success: false,
            message: "Posts not found",
        })
    }
}

/*
getUserDetails(req, res, next)
NAME
    getUserDetails
SYNOPSIS
    getUserDetails(req, res, next);
    - req: Request - Express request object containing the user's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function retrieves user details by their ID from the database.
    If the user is found, it responds with a success status and the user's details.
    If no user is found, it responds with a 'Not Found' status and an appropriate message.
    If an error occurs during the process, it provides an error response.
PARAMETERS
    - req: Request - Express request object containing the user's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the user's details upon success.
    If no user is found, it responds with a 'Not Found' status and message.
    If an error occurs, it provides an error response.
*/
exports.getUserDetails = async (req, res, next) => {
    try{
        // Retrieve user details by their ID from the database.
        const user = await User.findById(req.params.id);
        // If no user is found, it responds with a 'Not Found' status and an appropriate message.
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        // If the user is found, it responds with a success status and the user's details.
        res.status(200).json({
            success: true,
            user,
        })

    }
    catch(error){
        // If an error occurs during the process, it provides an error response.
        res.status(404).json({
            success: false,
            message: "User not found",
        })

    }
}

/*
getSinglePost(req, res, next)
NAME
    getSinglePost
SYNOPSIS
    getSinglePost(req, res, next);
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function retrieves a single post by its ID from the database.
    If the post is found, it responds with a success status and the post's details.
    If no post is found, it responds with a 'Not Found' status and an appropriate message.
    If an error occurs during the process, it provides an error response.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the post's details upon success.
    If no post is found, it responds with a 'Not Found' status and message.
    If an error occurs, it provides an error response.
*/
exports.getSinglePost = async (req, res, next) => {
    try{
        // Retrieve a single post by its ID from the database.
        const post = await Post.findById(req.params.id).populate('user');
        
        // If no post is found, it responds with a 'Not Found' status and an appropriate message.
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        // If the post is found, it responds with a success status and the post's details.
        res.status(200).json({
            success: true,
            post,
        })
    }
    catch(error){
        // If an error occurs during the process, it provides an error response.
        res.status(404).json({
            success: false,
            message: "Post not found",
        })
    }
}

/*
updatePost(req, res, next)
NAME
    updatePost
SYNOPSIS
    updatePost(req, res, next);
    - req: Request - Express request object containing the post's ID in the params and updated post data.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a user to update an existing post by its ID.
    It handles the addition of new images to the post using a cloud storage service (e.g., Cloudinary).
    The function verifies the user's authorization to update the post and performs the update.
    Upon successful update, it responds with the updated post's details.
    If no post is found, the user is not authorized, or an error occurs, appropriate responses are sent.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params and updated post data.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the updated post's details upon success.
    If no post is found, the user is not authorized, or an error occurs, appropriate responses are sent.
*/
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
        if(post.user._id.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to update this post",
            })
        }

        // Update the post in the database.
        const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
            content,tags,image: imagesLink,visibility
        },{
            new: true,
            runValidators: true,
            useFindAndModify: false,
        })

        updatedPost.populate('user').execPopulate();

        // Respond with a success status and the updated post's details.
        res.status(200).json({
            success: true,
            post: updatedPost,
        })
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Server error",
        })

    }
}

/*
deletePost(req, res, next)
NAME
    deletePost
SYNOPSIS
    deletePost(req, res, next);
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a user to delete an existing post by its ID.
    It verifies the user's authorization to delete the post and performs the deletion.
    Upon successful deletion, it responds with a success message.
    If no post is found, the user is not authorized, or an error occurs, appropriate responses are sent.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with a success message upon successful deletion.
    If no post is found, the user is not authorized, or an error occurs, appropriate responses are sent.
*/
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

/*
getPostsByUser(req, res, next)
NAME
    getPostsByUser
SYNOPSIS
    getPostsByUser(req, res, next);
    - req: Request - Express request object containing the user's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function fetches posts created by a specific user based on their ID.
    It populates the user details for each post retrieved.
    If no posts are found for the user, it returns the user's details in the same format as a post.
    The function responds with the retrieved posts or user details in a JSON format.
PARAMETERS
    - req: Request - Express request object containing the user's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response containing the retrieved posts or user details in a JSON format.
*/
exports.getPostsByUser = async (req, res, next) => {
    try{
        const posts = await Post.find({user: req.params.id}).populate('user');

        // return user details in the same format as the post if post is empty
        if(posts.length === 0){
            const user = await User.findById(req.params.id).lean();
            posts[0]= {}
            posts[0].user = user;
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

/*
likePost(req, res, next)
NAME
    likePost
SYNOPSIS
    likePost(req, res, next);
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a logged-in user to like a specific post based on its ID.
    It checks if the user has already liked the post and prevents duplicate likes.
    If the user hasn't logged in, it returns an error message.
    The function responds with a success message if the like is successful.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with a success message if the like is successful or an error message otherwise.
*/
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

/*
unlikePost(req, res, next)
NAME
    unlikePost
SYNOPSIS
    unlikePost(req, res, next);
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a logged-in user to unlike a specific post based on its ID.
    It checks if the user has previously liked the post and removes the like if found.
    If the user has not liked the post, it returns an error message.
    The function responds with the updated likes of the post.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the updated likes of the post or an error message if the user hasn't liked the post.
*/
exports.unlikePost = async (req, res, next) => {
    try{
        const post =   await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        //check if user has liked the post
        if(!post.likes.includes(req.user.id)){
            return res.status(400).json({
                success: false,
                message: "You have not liked this post",
            })
        }
        //remove like
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


/*
createComment(req, res, next)
NAME
    createComment
SYNOPSIS
    createComment(req, res, next);
    - req: Request - Express request object containing the post's ID in the params and the comment in the request body.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a logged-in user to create a new comment on a specific post.
    It retrieves the comment content from the request body, finds the target post by ID, and associates the comment with the user.
    The comment is added to the post's comments array, and the post is saved with the new comment.
    The function responds with the updated post, including the new comment.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params and the comment in the request body.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the updated post, including the new comment, or a "Server error" message if an error occurs.
*/
exports.createComment = async (req, res, next) => {
    try{
        // Extract the comment content from the request body.
        const {comment} = req.body;

        // Find the target post by ID.
        const post = await Post.findById(req.params.id);

        // If no post is found, it responds with a 'Not Found' status and an appropriate message.
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        // Create a new comment and associate it with the user.
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

/*
deleteComment(req, res, next)
NAME
    deleteComment
SYNOPSIS
    deleteComment(req, res, next);
    - req: Request - Express request object containing the post's ID in the params and the comment's ID in the params.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function allows a user to delete a specific comment on a post.
    It first checks if the post and comment exist. Then, it verifies if the user is authorized to delete the comment.
    If authorized, the comment is removed from the post's comments array, and the post is saved.
    The function responds with the updated comments array of the post.
PARAMETERS
    - req: Request - Express request object containing the post's ID in the params and the comment's ID in the params.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the updated comments array of the post upon success.
    If an error occurs, it forwards the error to the error-handling middleware for further processing.
*/
exports.deleteComment = async (req, res, next) => {
    try{
        // Find the target post by ID.
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }
        // Find the target comment by ID.
        const comment = post.comments.find(c => c.id === req.params.comment_id);
        if(!comment){
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            })
        }

        //check if user is authorized to delete the comment
        if(comment.user.toString() !== req.user.id || post.user.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this comment",
            })
        }
        //remove comment
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

/*
getPopularTags(req, res, next)
NAME
    getPopularTags
SYNOPSIS
    getPopularTags(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function fetches the popular tags from posts created within the last 7 days.
    It queries the database for posts created in the specified timeframe and calculates tag counts.
    The function responds with the list of popular tags and their respective counts.
PARAMETERS
    - req: Request - Express request object.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the list of popular tags and their counts upon success.
    If an error occurs, it forwards the error to the error-handling middleware for further processing.
*/
exports.getPopularTags = async (req, res, next) => {
    try {
        // Query the database for posts created in the last 7 days.
      const posts = await Post.find({
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
      });
      
      // Calculate tag counts.
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

  /*
getPostsByTag(req, res, next)
NAME
    getPostsByTag
SYNOPSIS
    getPostsByTag(req, res, next);
    - req: Request - Express request object containing the tag ID.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function fetches posts that are associated with a specific tag.
    It queries the database for posts matching the provided tag ID and retrieves user information for each post.
    The function responds with the list of posts and associated user data.
PARAMETERS
    - req: Request - Express request object containing the tag ID.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the list of posts and associated user data upon success.
    If an error occurs, it forwards the error to the error-handling middleware for further processing.
*/
exports.getPostsByTag = async (req, res, next) => {
    try{
        // Query the database for posts matching the provided tag ID.
        const postsWithoutUser = await Post.find({tags: req.params.id});

        // Retrieve user information for each post.
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

/*
getFollowingsPosts(req, res, next)
NAME
    getFollowingsPosts
SYNOPSIS
    getFollowingsPosts(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function fetches posts created by users who are being followed by the authenticated user.
    It queries the database for posts created by users in the authenticated user's "following" list
    and retrieves user information for each post.
    The function responds with the list of posts and associated user data.
PARAMETERS
    - req: Request - Express request object.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the list of posts and associated user data upon success.
    If an error occurs, it forwards the error to the error-handling middleware for further processing.
*/
exports.getFollowingsPosts = async (req, res, next) => {
    try{
        // Query the database for posts created by users in the authenticated user's "following" list.
        const user = await User.findById(req.user.id);

        // Retrieve user information for each post.
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

/*
search(req, res, next)
NAME
    search
SYNOPSIS
    search(req, res, next);
    - req: Request - Express request object.
    - res: Response - Express response object.
    - next: NextFunction - Express middleware function for error handling.
DESCRIPTION
    This controller function performs a search across tags, users, and posts based on the provided search query.
    It uses the `$text` operator in MongoDB to perform full-text search on posts and users.
    The function responds with search results, including matched posts and users.
PARAMETERS
    - req: Request - Express request object containing the search query in the request body.
    - res: Response - Express response object used to send HTTP responses.
    - next: NextFunction - Express middleware function for error handling.
RETURNS
    This function sends an HTTP response with the search results, including matched posts and users, upon success.
    If an error occurs, it forwards the error to the error-handling middleware for further processing.
*/
exports.search = async (req, res, next) => {
    try{
        // Use the `$text` operator in MongoDB to perform full-text search on posts and users.
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