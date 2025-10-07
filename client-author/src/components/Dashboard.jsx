import { usePosts, useDeletePost, useUpdatePost } from '../hooks/usePosts'
import { useState, useMemo, useEffect } from 'react'
import Modal from './Modal'
import { Editor } from '@tinymce/tinymce-react'

function Dashboard() {
  const { data: posts, isLoading, error, isError } = usePosts()
  
  
  const [currentPage, setCurrentPage] = useState(1)
  const POSTS_PER_PAGE = 10 
  

  const sortedPosts = useMemo(() => {
    if (!posts) return []
    return [...posts].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }, [posts])

  
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = sortedPosts.slice(startIndex, endIndex)

  
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-sm sm:text-[16px] text-gray-700 uppercase tracking-wider">
              <tr>
                  <th className="px-2 py-3 sm:px-6 sm:py-4 font-medium" scope='col'>Title</th>
                  <th className="px-1 py-3 sm:px-6 sm:py-4 font-medium text-center sm:text-left" scope='col'>Status</th>
                  <th className="px-2 py-3 sm:px-6 sm:py-4 font-medium text-right" scope='col'>Actions</th>
              </tr>
          </thead>
          <tbody>
              {currentPosts.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-2 py-4 sm:px-6 text-center text-gray-500 text-sm">
                    {sortedPosts.length === 0 ? 'No posts yet. Create your first post!' : 'No posts on this page.'}
                  </td>
                </tr>
              ) : (
                currentPosts.map((post) => (
                  <tr key={post.id}
                    className='border-t border-gray-200 hover:bg-gray-50'>
                      <td className='px-2 py-3 sm:px-6 sm:py-4 font-medium text-gray-900 text-sm sm:text-[16px]'>
                        <div className="max-w-[120px] sm:max-w-none truncate sm:whitespace-normal">
                          {post.title}
                        </div>
                      </td>
                      <td className='px-1 py-3 sm:px-6 sm:py-4 text-center sm:text-left'>
                        <span 
                          className="inline-flex items-center px-1.5 py-0.5 sm:px-2.5 rounded-full text-sm sm:text-[16px] font-medium"
                          style={{
                            backgroundColor: `var(--color-${post.published ? 'published' : 'draft'})`
                          }}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className='px-2 py-3 sm:px-6 sm:py-4 text-right'>
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:justify-end">
                          <button 
                            className='text-sm sm:text-[16px] font-medium hover:underline text-indigo-600' 
                            onClick={() => handlePublishToggle(post.id)}>
                              {post.published ? 'Draft' : 'Publish'}
                          </button>
                          <button 
                            className='text-sm sm:text-[16px] font-medium text-[var(--color-primary)] hover:underline' 
                            onClick={() => handleEditPost(post.id)}>
                              Edit
                          </button>
                          <button 
                            className='text-sm sm:text-[16px] font-medium text-red-600 hover:underline' 
                            onClick={() => handleDeletePost(post.id)}>
                              Del
                          </button>
                        </div>
                      </td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">{Math.min(endIndex, sortedPosts.length)}</span> of{' '}
                <span className="font-medium">{sortedPosts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      currentPage === page
                        ? 'z-10 bg-blue-500 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
      
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
              <Editor
                  tinymceScriptSrc='/tinymce/tinymce.min.js'
                  licenseKey='gpl'
                  value={editingPost.body}
                  onEditorChange={(content) => setEditingPost({ ...editingPost, body: content })}
                  init={{
                      height: 400,
                      menubar: false,
                      branding: false,
                      plugins: [
                          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                          'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                          'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                          'bold italic forecolor | alignleft aligncenter ' +
                          'alignright alignjustify | bullist numlist outdent indent | ' +
                          'image',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  
                  }}
              />
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
              