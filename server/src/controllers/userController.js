const mutations = require('../models/mutations');
const userQueries = require('../models/userQueries');
const postQueries = require('../models/postQueries');

async function getAllUsers(req, res) {
    try{
        const users = await userQueries.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getUserById(req, res) {
    try{
        const id = req.params.id;
        const user = await userQueries.getUserById(id);
        if(!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getPostsByUserId(req, res) {
    try{
        const userId = req.params.id;
        const user = await userQueries.getUserById(userId);
        if(!user) return res.status(404).json({ message: 'User not found' });
        const posts = await postQueries.getPostsByUserId(userId);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createUser(req, res) {
    try{
        const { name, email, password } = req.body;
        const existingUser = await userQueries.getUserByEmail(email);
        if(existingUser) return res.status(400).json({ message: 'User already exists' });
        await mutations.createUser({ name, email, password });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateUser(req, res) {
    try{
        const id = req.params.id;
        const { name, email, password } = req.body;
        await mutations.updateUser(id, name, email, password);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deleteUser(req, res) {
    try{
        const id = req.params.id;
        await mutations.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllUsers, getUserById, getPostsByUserId, createUser, updateUser, deleteUser };