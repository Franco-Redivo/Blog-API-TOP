const { Router } = require('express');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const { verifyToken, isCommentOwner, isPostOwner } = require('../middlewares/authMiddleware');

const postRouter = Router();

postRouter.get('/',verifyToken, postController.getAllPosts);
postRouter.get('/:id', postController.getPostById);
postRouter.post('/',verifyToken, postController.createPost);
postRouter.put('/:id',[verifyToken, isPostOwner], postController.updatePost);
postRouter.delete('/:id',[verifyToken, isPostOwner], postController.deletePost);

// comments for a specific post
postRouter.get('/:id/comments',verifyToken, commentController.getCommentsByPostId);
postRouter.post('/:id/comments',verifyToken, commentController.createComment);
postRouter.put('/:postId/comments/:commentId',[verifyToken, isCommentOwner], commentController.updateComment);
postRouter.delete('/:postId/comments/:commentId',[verifyToken, isCommentOwner], commentController.deleteComment);

module.exports = postRouter;
