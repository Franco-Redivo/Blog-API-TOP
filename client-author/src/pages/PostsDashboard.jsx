import { useState } from "react";
import Dashboard from "../components/Dashboard";
import { useCreatePost } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";

function PostsDashboard() {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const createPostMutation = useCreatePost();
    const { userId } = useAuth();

    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!newPost.title.trim() || !newPost.content.trim()) {
            alert('Please fill in both title and content');
            return;
        }

        try {
            await createPostMutation.mutateAsync({
                title: newPost.title,
                body: newPost.content,    // Backend expects 'body' not 'content'
                authorId: userId,         // Backend expects 'authorId' not 'userId'
                published: false           // Backend requires 'published' field
            });
            setNewPost({ title: '', content: '' });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Failed to create post:', error);
        }
    };

    return(
        <div>
            <div>
                <h2>Your Posts</h2>
                <button 
                    onClick={() => setShowCreateForm(!showCreateForm)}
                >
                    {showCreateForm ? 'Cancel' : '+ New Post'}
                </button>
            </div>

            {showCreateForm && (
                <div>
                    <h3>Create New Post</h3>
                    <form onSubmit={handleCreatePost}>
                        <div>
                            <label>
                                Title:
                            </label>
                            <input
                                type="text"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                placeholder="Enter post title..."
                            />
                        </div>
                        <div>
                            <label>
                                Content:
                            </label>
                            <textarea
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                placeholder="Write your post content..."
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={createPostMutation.isPending}
                            >
                                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowCreateForm(false)}                          
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <Dashboard/>
        </div>
    )
}

export default PostsDashboard;