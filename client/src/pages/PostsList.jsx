import { Link } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import PostCard from "../components/PostCard";
import { useState, useEffect } from "react";

function PostsList() {
    const { data: posts, isLoading, error } = usePosts();

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    // Add null/undefined checks
    const postsArray = posts || [];
    const totalPages = Math.ceil(postsArray.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = postsArray.slice(startIndex, endIndex);

    useEffect(() => {
        if(currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [currentPage, totalPages]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading posts</div>;
    }

    return (
        <div className="bg-background-light font-display text-gray-800 relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <main className="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-5xl">
                    <h1 className="text-3xl text-center sm:text-4xl sm:text-left font-bold tracking-tight text-gray-900 px-4 pb-5 sm:pb-8">Posts List</h1>
                    <div>
                        {postsArray.length === 0 ? (
                            <p>No posts available.</p>
                        ) : (
                            <div className="flex flex-col gap-6">
                                {currentPosts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}

                    </div>
                    {totalPages > 1 && (
                        <div className="mt-12 flex items-center justify-center gap-2">
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-4xl h-8 w-8 px-1 py-1 text-gray-600 hover:bg-gray-300 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                <span className="sr-only">Previous</span>
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`relative items-center rounded-full h-8 w-8 px-1 py-1 text-sm font-semibold ${
                                    currentPage === page
                                        ? 'z-10 bg-blue-500 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                        : 'text-gray-600  hover:bg-gray-300 focus:z-20 focus:outline-offset-0'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="relative inline-flex items-center rounded-4xl h-8 w-8 px-1 py-1 text-gray-600  hover:bg-gray-300 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="sr-only">Next</span>
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    )}
                </div>
            </main>
            
        </div>
    )
}

export default PostsList;