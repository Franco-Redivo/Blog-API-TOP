import api from './axios';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getUserPosts = async (userId) => {
    try{
        const response = await api.get(`${API_URL}/users/${userId}/posts`);
        const publishedPosts = response.data.filter(post => post.published);
        return publishedPosts;
    }catch (error) {
        console.error('Error fetching user posts:', error);
        throw error;
    }
}

export const getPostById = async (postId) => {
    try{
        const response = await axios.get(`${API_URL}/posts/${postId}`);
        return response.data;
    }catch (error) {
        console.error('Error fetching post by ID:', error);
        throw error;
    }
}

export const getAllPosts = async () => {
    try{
        const response = await api.get(`${API_URL}/posts`);
        const publishedPosts = response.data.filter(post => post.published);
        return publishedPosts;
    }catch (error) {
        console.error('Error fetching all posts:', error);
        throw error;
    }
}
