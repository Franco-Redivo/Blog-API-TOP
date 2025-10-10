import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostComments, addCommentToPost, updateComment, deleteComment } from '../services/comments';

export const useComments = (postId) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getPostComments(postId),
        enabled: !!postId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000 // 30 minutes
    });
}

export const useAddComment = (postId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newComment) => addCommentToPost(postId, newComment),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
        onError: (error) => {
            console.error('Error adding comment:', error);
        }
    });
}

export const useUpdateComment = (postId, commentId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updatedComment) => updateComment(postId, commentId, updatedComment),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
            // Optimistic update
            queryClient.setQueryData(['comments', postId], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map(comment => 
                    comment.id === commentId ? data : comment
                );
            });
        },
        onError: (error) => {
            console.error('Error updating comment:', error);
        }
    });
}

export const useDeleteComment = (postId, commentId) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteComment(postId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments', postId]});
        },
        onError: (error) => {
            console.error('Error deleting comment:', error);
        }
    });
}
