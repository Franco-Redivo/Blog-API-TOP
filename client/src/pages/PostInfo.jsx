import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePosts";
import { useComments, useAddComment, useDeleteComment } from "../hooks/useComments";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { fetchUserData } from "../utils/queryUtils";

function PostInfo() {
    const [comment, setComment] = useState("");
    const [postAuthor, setPostAuthor] = useState(null);
    const [commentAuthors, setCommentAuthors] = useState({});

    const { user } = useAuth();
    const { postId } = useParams();
    const { data: post, isLoading, isError } = usePost(postId);
    const { data: comments } = useComments(postId);


    useEffect(() => {
        const fetchAuthor = async () => {
            if (post?.authorId) {
                try {
                    const author = await fetchUserData(post.authorId);
                    setPostAuthor(author);
                } catch (error) {
                    console.error("Error fetching post author:", error);
                }
            }
        };

        fetchAuthor();
    }, [post?.authorId]);

    // Fetch comment authors
    useEffect(() => {
        const fetchCommentAuthors = async () => {
            if (comments && comments.length > 0) {
                const authorsMap = {};
                for (const comment of comments) {
                    if (!commentAuthors[comment.authorId]) {
                        try {
                            const author = await fetchUserData(comment.authorId);
                            authorsMap[comment.authorId] = author;
                        } catch (error) {
                            console.error("Error fetching comment author:", error);
                        }
                    }
                }
                if (Object.keys(authorsMap).length > 0) {
                    setCommentAuthors(prev => ({ ...prev, ...authorsMap }));
                }
            }
        };

        fetchCommentAuthors();
    }, [comments, commentAuthors]);

    const addCommentMutation = useAddComment(postId);
    const deleteCommentMutation = useDeleteComment(postId);

    const handleAddComment = (e) => {
        e.preventDefault();
        addCommentMutation.mutate({ content: comment });
        setComment("");
    };

    const handleDeleteComment = (commentId) => {
        deleteCommentMutation.mutate(commentId);
    };


    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isError) {
        return <div>Error loading post</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <main className="flex-1">
            <div>
                <article>
                    <header>
                        <h1>{post.title}</h1>
                        <p>By {postAuthor?.name} · {new Date(post.createdAt).toLocaleDateString()}</p>
                    </header>
                    <section dangerouslySetInnerHTML={{ __html: post.body }}>
                    </section>
                </article>
                <section>
                    <h2>Comments</h2>
                    {comments && comments.length > 0 ? (
                        comments.map(c => {
                            const commentAuthor = commentAuthors[c.authorId];
            
                            return (
                                <div key={c.id}>
                                    <div>
                                        {commentAuthor?.avatar ? (
                                            <img src={commentAuthor.avatar} alt={commentAuthor.name} />
                                        ) : (
                                            <div>No avatar</div>
                                        )}
                                        <div>
                                            <div>
                                                <h4>{commentAuthor?.name || 'Loading...'}</h4>
                                                <p>{new Date(c.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        <p>{c.content}</p>
                                        </div>
                                        {user?.id === c.userId && (
                                            <button onClick={() => handleDeleteComment(c.id)}>Delete</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No comments yet</div>
                    )}
                    <div>
                        <form onSubmit={handleAddComment}>
                            <img />
                            <div>
                                <textarea 
                                    value={comment} 
                                    onChange={(e) => setComment(e.target.value)} 
                                    placeholder="Add a comment..." 
                                    rows="3"
                                ></textarea>
                                <div>
                                    <button type="submit">
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default PostInfo;
