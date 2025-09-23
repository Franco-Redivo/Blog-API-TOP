const prisma = require('./client');

async function getAllComments (){
    const comments = await prisma.comment.findMany();
    return comments;
}

async function getCommentById (id) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: id,
        },
    });
    return comment;
}

async function getCommentsByPostId (postId) {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
        },
    });
    return comments;
}

const commentQueries = {
    getAllComments,
    getCommentById,
    getCommentsByPostId
};

module.exports = commentQueries;
