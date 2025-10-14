import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePost } from "../hooks/usePosts";
import { useComments, useAddComment, useDeleteComment } from "../hooks/useComments";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { fetchUserData } from "../utils/queryUtils";

function PostInfo() {
    const [comment, setComment] = useState("");
    const [postAuthor, setPostAuthor] = useState(null);
    const [commentAuthors, setCommentAuthors] = useState({});
    const textareaRef = useRef(null);
    const MAX_COMMENT_LENGTH = 200;

    const { user } = useAuth();
    const { postId } = useParams();
    const { data: post, isLoading, isError } = usePost(postId);
    const { data: comments } = useComments(postId);
    const { data: userData } = useUser(user?.id);


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

    useEffect(() => {
        const fetchCommentAuthors = async () => {
            if (comments && comments.length > 0) {
                const authorsMap = {};
                for (const comment of comments) {
                    const authorId = comment.authorId || comment.userId;
                    
                    
                    if (authorId && !commentAuthors[authorId]) {
                        try {
                            const author = await fetchUserData(authorId);
                    
                            authorsMap[authorId] = author;
                        } catch (error) {
                            console.error("Error fetching comment author for ID", authorId, ":", error);
            
                            authorsMap[authorId] = { 
                                name: 'Unknown User', 
                                avatar: null,
                                id: authorId 
                            };
                        }
                    }
                }
                if (Object.keys(authorsMap).length > 0) {
                    setCommentAuthors(prev => ({ ...prev, ...authorsMap }));
                }
            }
        };

        fetchCommentAuthors();
    }, [comments]); 

    const addCommentMutation = useAddComment(postId);
    const deleteCommentMutation = useDeleteComment(postId);

    
    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    };

    
    const handleCommentChange = (e) => {
        const value = e.target.value;
        if (value.length <= MAX_COMMENT_LENGTH) {
            setComment(value);
            setTimeout(autoResizeTextarea, 0);
        }
    };

    useEffect(() => {
        autoResizeTextarea();
    }, [comment]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            addCommentMutation.mutate({ content: comment });
            setComment("");
        }
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
        <main className="flex-1 ">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <article>
                    <header>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-4">{post.title}</h1>
                        <p className="text-slate-500 mb-8">By {postAuthor?.name} · {new Date(post.createdAt).toLocaleDateString()}</p>
                    </header>
                    <section 
                        className="post-content mt-6 text-slate-700 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: post.body }}>
                    </section>
                </article>
                <section className="mt-12 pt-8 border-t border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Comments</h2>
                    {comments && comments.length > 0 ? (
                        comments.map(c => {
                            const authorId = c.authorId || c.userId;
                            const commentAuthor = commentAuthors[authorId];
                            console.log("Comment:", c.id, "Author ID:", authorId, "Author data:", commentAuthor);
            
                            return (
                                <div className="space-y-6 mb-5" key={c.id}>
                                    <div className="flex items-start gap-4">
                                        {commentAuthor?.avatar ? (
                                            <img className="w-10 h-10 rounded-full" src={commentAuthor.avatar} alt={commentAuthor.name} />
                                        ) : (
                                            <div>No avatar</div>
                                        )}
                                        <div className="flex-grow">
                                            <div className="flex items-baseline gap-2">
                                                <h4 className="font-bold text-slate-800">{commentAuthor?.name || 'Loading...'}</h4>
                                                <p className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        <p className="mt-1 text-slate-600">{c.content}</p>
                                        </div>
                                        {user?.id === c.userId && (
                                            <button onClick={() => handleDeleteComment(c.id)}
                                                className="text-sm self-center text-red-500 hover:underline">Delete</button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>No comments yet</div>
                    )}
                    <div className="mt-8">
                        <form onSubmit={handleAddComment}
                            className="flex items-start gap-4">
                            <img src={userData?.avatar} alt={userData?.name} className="w-10 h-10 rounded-full" />
                            <div className="flex-grow">
                                <textarea 
                                    ref={textareaRef}
                                    value={comment} 
                                    onChange={handleCommentChange} 
                                    placeholder="Add a comment..." 
                                    rows="2"
                                    maxLength={MAX_COMMENT_LENGTH}
                                    style={{ resize: 'none', minHeight: '80px', maxHeight: '200px' }}
                                    className="w-full p-3 rounded-lg bg-slate-200/50 border border-transparent focus:bg-white focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] transition overflow-hidden"
                                ></textarea>
                                <div className="mt-1 flex justify-between items-center">
                                    <span className={`text-sm ${comment.length > MAX_COMMENT_LENGTH * 0.9 ? 'text-red-500' : 'text-gray-500'}`}>
                                        {comment.length}/{MAX_COMMENT_LENGTH}
                                    </span>
                                    <button 
                                        type="submit"
                                        disabled={!comment.trim() || comment.length === 0}
                                        className="px-4 py-2 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-[var(--color-primary)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light focus:ring-[var(--color-primary)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
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
