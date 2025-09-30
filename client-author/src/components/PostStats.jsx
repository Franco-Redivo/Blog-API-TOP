import { usePosts } from '../hooks/usePosts'

function PostStats() {

  const { data: posts, isLoading } = usePosts('1')

  if (isLoading) return <div>Loading stats...</div>

  if (!posts) return null

  const publishedPosts = posts.filter(post => post.published).length
  const draftPosts = posts.length - publishedPosts

  return (
    <div>
      <h3>Post Statistics</h3>
      <div>
        <div>
          <strong>Total Posts:</strong> {posts.length}
        </div>
        <div>
          <strong>Published:</strong> {publishedPosts}
        </div>
        <div>
          <strong>Drafts:</strong> {draftPosts}
        </div>
      </div>
    </div>
  )
}

export default PostStats