const jwt = require('jsonwebtoken');
require('dotenv').config();


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

async function isCommentOwner(req, res, next) {
    try{
        const userId = req.accessToken.id;
        const commentId = parseInt(req.params.commentId);
        const comment = await commentQueries.getCommentById(commentId);
        if(!comment) return res.status(404).json({ message: 'Comment not found' });
        if(comment.userId !== userId) return res.status(403).json({ message: 'Forbidden' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function isPostOwner(req, res, next) {
    try{
        const userId = req.accessToken.id;
        const postId = parseInt(req.params.id);
        const post = await postQueries.getPostById(postId);
        if(!post) return res.status(404).json({ message: 'Post not found' });
        if(post.authorId !== userId) return res.status(403).json({ message: 'Forbidden' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function isAdmin(req, res, next) {
    try{
        const userId = req.accessToken.id;
        const user = await userQueries.getUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });
        if(user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { verifyToken, isCommentOwner, isPostOwner, isAdmin };