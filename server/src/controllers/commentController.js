const mutations = require('../models/mutations');
const commentQueries = require('../models/commentQueries');
const postQueries = require('../models/postQueries');

async function getCommentsByPostId(req, res) {
    try{
        const postId = req.params.id;
        const post = await postQueries.getPostById(postId);
        if(!post) return res.status(404).json({ message: 'Post not found' });
        const comments = await commentQueries.getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createComment(req, res) {
    try{
        const postId = req.params.id;
        console.log("Post ID:", postId);
        const post = await postQueries.getPostById(postId);
        const userId = req.user.id;
        if(!post) return res.status(404).json({ message: 'Post not found' });
        const { content } = req.body;
        await mutations.createComment({ content,  userId, postId });
        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateComment(req, res) {
    try{
        const commentId = req.params.commentId;
        const { content } = req.body;
        await mutations.updateComment(commentId, content);
        res.status(200).json({ message: 'Comment updated successfully' });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteComment(req, res) {
    try{
        const commentId = req.params.commentId;
        await mutations.deleteComment(commentId);
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getCommentsByPostId, createComment, updateComment, deleteComment };
