const express = require('express');
const router = express.Router();

const {createComment} = require('../controllers/commentController') 
const {createPost} = require('../controllers/postController')
const {getAllPosts} = require('../controllers/postController')

router.post('/comments/create',createComment);
router.post('/post/create',createPost)
router.get('/post/posts',getAllPosts)

module.exports = router;