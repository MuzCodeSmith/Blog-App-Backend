const express = require('express');
const router = express.Router();

const {createComment} = require('../controllers/commentController') 
const {createPost,getAllPosts,getPost,deletePost,updatePost} = require('../controllers/postController')

router.post('/comments/create',createComment);
router.post('/post/create',createPost)
router.get('/post/posts',getAllPosts)
router.get('/post/:id',getPost)
router.delete('/post/:id',deletePost)
router.put('/post/:id',updatePost);

module.exports = router;