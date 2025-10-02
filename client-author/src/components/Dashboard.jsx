import { usePosts, useDeletePost, useUpdatePost } from '../hooks/usePosts'
import { useState } from 'react'

function Dashboard() {
  const { data: posts, isLoading, error, isError } = usePosts()
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
    const postToEdit = posts.find(post => post.id === postId)
    setEditingPost(postToEdit)
    setShowEditModal(true)
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

  if (!posts || posts.length === 0) {
    return (
      <div>
        <div>No posts found. Create your first post!</div>
      </div>
    )
  }

  return (
    <div>
      <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {posts.map((post) => (
                <tr key={post.id}>
                    <td>{post.title}</td>
                    <td><span>{post.published ? 'Published' : 'Draft'}</span></td>
                    <td>
                        <button onClick={() => handleEditPost(post.id)}>Edit</button>
                        <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
        {showEditModal && editingPost && (
          <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleEditSubmit}>
              <div>
                <label>
                  Title:
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  />
                </label>
              </div>
              <div>
                <label>
                  Content:
                  <textarea
                    value={editingPost.body}
                    onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                  />
                </label>
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
            </form>
          </div>
        )}
    </div>
  )
}

export default Dashboard;