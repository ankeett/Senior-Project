const express = require("express");

const router = express.Router();  

const {createPost,getPosts,getSinglePost,updatePost,deletePost,getPostsByUser,getLikes,likePost,unlikePost,getComments,createComment,deleteComment} = require("../controllers/postController.js");

//post routes
router.route("/post/create").post(createPost);
router.route("/post/all").get(getPosts);
router.route("/post/:id").get(getSinglePost);
router.route("/post/update/:id").put(updatePost);
router.route("/post/delete/:id").delete(deletePost);
router.route("/post/user/:id").get(getPostsByUser);
router.route("/post/likes/:id").get(getLikes);
router.route("/post/like/:id").put(likePost);
router.route("/post/unlike/:id").put(unlikePost);
router.route("/post/comments/:id").get(getComments);
router.route("/post/comment/:id").put(createComment);
router.route("/post/comment/delete/:id").delete(deleteComment);

module.exports  = router;