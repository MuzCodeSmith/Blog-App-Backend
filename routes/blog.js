const express = require('express');
const router = express.Router();

const {createComment,getCommentsByPostId,deleteCommentById,updateCommentById} = require('../controllers/commentController') 
const {createLike} = require('../controllers/likeController')
const {createPost,getAllPosts,getPost,deletePost,updatePost} = require('../controllers/postController')

// comment controllers
router.post('/comments', createComment); // Create a comment
router.get('/posts/:postId/comments', getCommentsByPostId); // Get comments for a post
router.delete('/comments/:id',deleteCommentById) // delete comment
router.put('/comments/:id',updateCommentById) // delete comment



// like controllers
router.post('/likes', createLike); // Create a like

// post controllers
router.post('/posts', createPost); // Create a post
router.get('/posts', getAllPosts); // Get all posts
router.get('/posts/:id', getPost); // Get a single post by ID
router.put('/posts/:id', updatePost); // Update a post by ID
router.delete('/posts/:id', deletePost); // Delete a post by ID


module.exports = router;