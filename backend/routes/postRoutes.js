const express = require('express');

const router = express.Router();

const {getPosts, addPost, updatePost, deletePost} = require('../controllers/postController');

const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getPosts)

router.post('/', protect, addPost)

router.put('/:id', protect, updatePost)

router.delete('/:id', protect, deletePost)

module.exports = router;