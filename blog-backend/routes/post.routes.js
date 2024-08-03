const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', authMiddleware.verifyToken, postController.createPost);
router.put('/:id', authMiddleware.verifyToken, postController.updatePost);
router.delete('/:id', authMiddleware.verifyToken, postController.deletePost);

module.exports = router;
