const mutations = require('../models/mutations');
const commentQueries = require('../models/commentQueries');
const postQueries = require('../models/postQueries');

async function getAllPosts(req, res) {
    try{
        const posts = await postQueries.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getPostById(req, res) {
    try{
        const id = req.params.id;
        const post = await postQueries.getPostById(id);
        if(!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function createPost(req, res) {
    try{
        
        const { title, body, published } = req.body;
        const authorId = req.user.id;
        await mutations.createPost({ title, body, authorId, published });
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function updatePost(req, res) {
    try{
        const id = req.params.id;
        const { title, body, published } = req.body;
        const data = {};
        if(title !== undefined) data.title = title;
        if(body !== undefined) data.body = body;
        if(published !== undefined) data.published = published;
        await mutations.updatePost(id, data);
        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function deletePost(req, res) {
    try{
        const id = req.params.id;
        await mutations.deletePost(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };