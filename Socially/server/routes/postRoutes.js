/*
postRoutes.js
DESCRIPTION
    This Express router defines the routes related to posts. It includes routes for creating, retrieving, updating,
    and deleting posts. Additional routes are provided for liking posts, creating comments, and getting posts by users,
    tags, and user's followings. The 'isAuthenticatedUser' middleware is applied to protect certain routes.
ROUTES
    - POST /post/create: Creates a new post.
    - GET /posts/all: Retrieves all posts.
    - GET /post/:id: Retrieves a specific post by its ID.
    - DELETE /post/delete/:id: Deletes a post by its ID.
    - GET /post/user/:id: Retrieves posts by a specific user.
    - PUT /post/like/:id: Likes a post.
    - PUT /post/update/:id: Updates a post by its ID.
    - POST /comment/create/:id: Creates a comment on a post.
    - GET /tags/popular: Retrieves popular tags.
    - GET /tag/:id: Retrieves posts by a specific tag.
    - GET /posts/following: Retrieves posts from users being followed by the authenticated user.
MIDDLEWARE
    - isAuthenticatedUser: Protects certain routes by ensuring that only authenticated users can access them.
EXPORT
    Exports the router for use in other parts of the application.
*/

const express = require("express");
const router = express.Router();  

const {createPost,getPosts,getSinglePost,updatePost,deletePost,getPostsByUser,likePost,createComment, getPopularTags,getPostsByTag, getFollowingsPosts} = require("../controllers/postController.js");
const {isAuthenticatedUser} = require("../middleware/auth.js");

//post routes
router.route("/post/create").post(isAuthenticatedUser,createPost);
router.route("/posts/all").get(getPosts);
router.route("/post/:id").get(getSinglePost);
router.route("/post/delete/:id").delete(isAuthenticatedUser,deletePost);
router.route("/post/user/:id").get(getPostsByUser);
router.route("/post/like/:id").put(isAuthenticatedUser,likePost);
router.route("/post/update/:id").put(isAuthenticatedUser,updatePost);
router.route("/comment/create/:id").post(isAuthenticatedUser,createComment);
router.route("/tags/popular").get(getPopularTags);
router.route('/tag/:id').get(getPostsByTag);
router.route("/posts/following").get(isAuthenticatedUser,getFollowingsPosts);

module.exports  = router;