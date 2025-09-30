import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUserPosts, createPost, updatePost, deletePost, getPostById } from '../services/posts'
import { useAuth } from './useAuth'

export const usePosts = (userId) => {
  const { userId: currentUserId, isAuthenticated } = useAuth()
  
  const targetUserId = userId || currentUserId
  
  return useQuery({
    queryKey: ['posts', targetUserId],
    queryFn: () => getUserPosts(targetUserId),
    enabled: isAuthenticated && !!targetUserId, 
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      console.error('Error creating post:', error)
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ postId, ...postData }) => updatePost(postId, postData),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      queryClient.setQueryData(['post', variables.postId], data)
    },
    onError: (error) => {
      console.error('Error updating post:', error)
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      
      queryClient.removeQueries({ queryKey: ['post', postId] })
    },
    onError: (error) => {
      console.error('Error deleting post:', error)
    },
  })
}

export const usePost = (postId) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000,
  })
}