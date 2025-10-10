import api from './axios';


const API_URL = 'http://localhost:3000/api';

export const getPostComments = async (postId) => {
    try{
        const response = await api.get(`${API_URL}/posts/${postId}/comments`);
        return response.data;
    }catch (error) {
        console.error('Error fetching post comments:', error);
        throw error;
    }
}

export const addCommentToPost = async (postId, commentData) => {
    try{
        const response = await api.post(`${API_URL}/posts/${postId}/comments`, commentData);
        return response.data;
    }catch (error) {
        console.error('Error adding comment to post:', error);
        throw error;
    }
}

export const updateComment = async (postId, commentId, commentData) => {
    try{
        const response = await api.put(`${API_URL}/posts/${postId}/comments/${commentId}`, commentData);
        return response.data;
    }catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}

export const deleteComment = async (postId, commentId) => {
    try{
        const response = await api.delete(`${API_URL}/posts/${postId}/comments/${commentId}`);
        return response.data;
    }catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}
