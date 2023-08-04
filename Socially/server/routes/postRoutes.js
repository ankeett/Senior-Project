const express = require("express");

const router = express.Router();  

const {createPost,getPosts,getSinglePost,updatePost,deletePost,getPostsByUser,getLikes,likePost,unlikePost,getComments,createComment,deleteComment, getUserDetails, getPopularTags,getPostsByTag, getFollowingsPosts} = require("../controllers/postController.js");
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