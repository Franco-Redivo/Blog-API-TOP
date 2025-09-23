const prisma = require('./client');

async function getAllPosts (){
    const posts = await prisma.post.findMany();
    return posts;
}

async function getPostById (id) {
    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });
    return post;
}

async function getPostsByUserId (userId) {
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId,
        },
    });
    return posts;
}

const postQueries = {
    getAllPosts,
    getPostById,
    getPostsByUserId
};

module.exports = postQueries;
