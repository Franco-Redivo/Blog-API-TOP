const prisma = require('./client');

//User mutations
async function createUser({ name, email, password }) {
    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });
}

async function updateUser ({id, name, email, password}) {
    await prisma.user.update({
        where: {
            id: id
        },
        data: {
            name,
            email,
            password
        }
    });
}

async function deleteUser (id) {
    await prisma.user.delete({
        where: {
            id: id
        }
    });
}

//posts mutations
async function createPost ({title, body, authorId, published}){
    await prisma.post.create({
        data: {
            title,
            body,
            authorId,
            published
        }
    });

}

async function updatePost (id, data) {
    await prisma.post.update({
        where: {
            id: id
        },
        data: {
            ...data
        }
    });
}

async function deletePost (id) {
    await prisma.post.delete({
        where: {
            id: id
        }
    });
}

//comments mutations
async function createComment ({content, userId, postId}){
    await prisma.comment.create({
        data: {
            content,
            userId,
            postId
        }
    });
}

async function updateComment (id, content) {
    await prisma.comment.update({
        where: {
            id: id
        },
        data: {
            content
        }
    });
}

async function deleteComment (id) {
    await prisma.comment.delete({
        where: {
            id: id
        }
    });
}

const mutations = {
    createUser,
    updateUser,
    deleteUser,
    createPost,
    updatePost,
    deletePost,
    createComment,
    updateComment,
    deleteComment
};
module.exports = mutations;