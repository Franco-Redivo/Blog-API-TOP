const { Router } = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const postRouter = Router();

postRouter.get('/', postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/', postController.createPost);
postRouter.put('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

// comments for a specific post
postRouter.get('/:id/comments', commentController.getCommentsByPostId);
postRouter.post('/:id/comments', commentController.createCommentForPost);
postRouter.put('/:postId/comments/:commentId', commentController.updateComment);
postRouter.delete('/:postId/comments/:commentId', commentController.deleteComment);

module.exports = postRouter;
