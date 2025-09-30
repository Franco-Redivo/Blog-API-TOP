import api from './axios';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const getUserPosts = async (userId) => {
    try{
        const response = await api.get(`${API_URL}/${userId}/posts`);
        return response.data;
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

export const createPost = async (postData) => {
    try{
        const response = await api.post(`${API_URL}/posts`, postData);
        return response.data;
    }catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
}

export const updatePost = async (postId, postData) => {
    try{
        const response = await api.put(`${API_URL}/posts/${postId}`, postData);
        return response.data;
    }catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
}

export const deletePost = async (postId) => {
    try{
        const response = await api.delete(`${API_URL}/posts/${postId}`);
        return response.data;
    }catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
}
