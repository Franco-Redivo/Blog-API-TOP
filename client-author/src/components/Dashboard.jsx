import { usePosts, useDeletePost, useUpdatePost } from '../hooks/usePosts'
import { useState, useMemo } from 'react'
import Modal from './Modal'

function Dashboard() {
  const { data: posts, isLoading, error, isError } = usePosts()
  
  // Sort posts by creation date to maintain consistent order
  const sortedPosts = useMemo(() => {
    if (!posts) return []
    return [...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }, [posts])
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const deletePostMutation = useDeletePost()
  const updatePostMutation = useUpdatePost()

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync(postId)
      } catch (error) {
        console.error('Failed to delete post:', error)
      }
    }
  }

  const handleEditPost = (postId) => {
    const postToEdit = sortedPosts.find(post => post.id === postId)
    setEditingPost(postToEdit)
    setShowEditModal(true)
  }

  const handlePublishToggle = async (postId) => {
    const postToUpdate = sortedPosts.find(post => post.id === postId)

    if (postToUpdate) {
      try {
        await updatePostMutation.mutateAsync({ postId: postToUpdate.id, published: !postToUpdate.published })
      } catch (error) {
        console.error('Failed to update post:', error)
      }
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    if (editingPost) {
      try {
        await updatePostMutation.mutateAsync({ postId: editingPost.id, ...editingPost })
        setShowEditModal(false)
        setEditingPost(null)
      } catch (error) {
        console.error('Failed to update post:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div>
        <div>Loading posts...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <div>Error loading posts: {error?.message}</div>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    )
  }

  if (!sortedPosts || sortedPosts.length === 0) {
    return (
      <div>
        <div>No posts found. Create your first post!</div>
      </div>
    )
  }

  return (
    <div className="bg-white  rounded-lg shadow-sm border border-gray-200  overflow-hidden">
      <table className="w-full text-md text-left">
        <thead className="bg-gray-50  text-md text-gray-700 uppercase tracking-wider">
            <tr>
                <th className="px-6 py-4 font-medium" scope='col'>Title</th>
                <th className="px-6 py-4 font-medium" scope='col'>Status</th>
                <th className="px-6 py-4 font-medium text-right" scope='col'>Actions</th>
            </tr>
        </thead>
        <tbody>
            {sortedPosts.map((post) => (
                <tr key={post.id}
                  className='border-t border-gray-200  hover:bg-gray-50 '>
                    <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{post.title}</td>
                    <td className='px-6 py-4'><span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium`}
                      style={{
                        backgroundColor: `var(--color-${post.published ? 'published' : 'draft'}, ${post.published ? '#38bdf8' : '#e5e7eb'})`
                      }}>
                        {post.published ? 'Published' : 'Draft'}</span></td>
                    <td className='px-6 py-4 text-right space-x-4 text-indigo-600'>
                        <button 
                          className='font-medium hover:underline' 
                          onClick={() => handlePublishToggle(post.id)}>
                            {post.published ? 'Draft' : 'Publish'}
                        </button>
                        <button 
                          className='font-medium text-[var(--color-primary)] hover:underline' 
                          onClick={() => handleEditPost(post.id)}>
                            Edit
                        </button>
                        <button 
                          className='font-medium text-red-600 hover:underline' 
                          onClick={() => handleDeletePost(post.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      {editingPost && (

      <Modal isVisible={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className='py-4 px-2 sm:p-7'>
          <div className='flex justify-between items-start mb-6'>
            <h2 className='text-2xl font-bold'>Edit Post</h2>
            <button className="text-slate-500 hover:bg-slate-200 rounded-4xl p-1" onClick={() => setShowEditModal(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label className='block text-md font-medium text-slate-700 mb-1'>
                Title
                <input
                  className='mt-1 p-3 w-full bg-slate-100 border-slate-300  rounded-lg focus:ring-blue-400 focus:border-blue-400 text-slate-900'
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                />
              </label>
            </div>
            <div className='mt-5'>
              <label className='block text-md font-medium text-slate-700 mb-1'>
                Content
                <textarea
                  className='mt-1 w-full p-3 bg-slate-100 border-slate-300 rounded-lg focus:ring-0 text-slate-900 resize-y'
                  value={editingPost.body}
                  onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                />
              </label>
            </div>
            <div className='flex justify-end gap-4 pt-4'>
              <button 
                className='px-6 py-2.5 rounded-lg text-sm font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300'
                type="button" 
                onClick={() => setShowEditModal(false)}>
                  Cancel
              </button>
              <button 
                className='px-6 py-2.5 rounded-lg text-sm font-semibold bg-blue-500 text-white hover:bg-blue-600'
                type="submit">
                  Save Changes
              </button>
            </div>
          </form>
        </div>
      </Modal>  
      )}
    </div>
  )
}

export default Dashboard;