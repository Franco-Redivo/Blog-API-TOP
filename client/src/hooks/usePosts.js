import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getPostById, getUserPosts } from '../services/posts';
import { useAuth } from './useAuth';

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => getAllPosts(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000 // 30 minutes
    });
};

export const usePost = (postId) => {
    return useQuery({
        queryKey: ['post', postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000 // 30 minutes
    });
};

export const useUserPosts = (userId) => {
    const {userId: currentUserId, isAuthenticated} = useAuth();

    const targetUserId = userId || currentUserId;

    return useQuery({
        queryKey: ['userPosts', targetUserId],
        queryFn: () => getUserPosts(targetUserId),
        enabled: !!targetUserId && isAuthenticated,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000 // 30 minutes
    });
};
