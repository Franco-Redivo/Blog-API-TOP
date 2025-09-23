const prisma = require('./client');


async function getAllUsers (){
    const users = await prisma.user.findMany();
    return users;
}

async function getUserById (id) {
    const user = await prisma.user.findUnique({
        where: {
            id: id, 
        },
    });
}

async function getUserByEmail (email) {
    const user = await prisma.user.findUnique({
        where: {
            email: email, 
        },
    });
    return user;
}

const userQueries = {
    getAllUsers,
    getUserById,
    getUserByEmail
};
module.exports = userQueries;