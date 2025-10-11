import { fetchUserData, getRandomImageUrl } from "../utils/queryUtils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import { getResponsiveTextExcerpt, getLargeScreenExcerpt } from "../utils/textUtils";

function PostCard({ post }) {
    const [author, setAuthor] = useState(null);
    const { authorId } = post;

    useEffect(() => {
        const fetchAuthor = async () => {
            const authorData = await fetchUserData(authorId);
            setAuthor(authorData);
        };
        fetchAuthor();
    }, [authorId]);

    if(!author) {
        return <LoadingSpinner />;
    }

    return (
        <article className="flex flex-col-reverse md:flex-row items-stretch gap-6 rounded-lg bg-white/50 p-5 sm:p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="mb-3 lg:mb-4">
                        <p className="text-sm text-gray-500 mb-1">By {author.name} | {post.createdAt.split("T")[0]}</p>
                        <h2 className="text-xl lg:text-2xl font-semibold">{post.title}</h2>
                    </div>
                    {/* Show different text lengths based on screen size */}
                    <p className="mb-4 text-gray-700 leading-relaxed lg:hidden">
                        {getResponsiveTextExcerpt(post.body)}
                    </p>
                    <p className="mb-4 text-gray-700 leading-relaxed hidden lg:block lg:text-lg lg:leading-relaxed">
                        {getLargeScreenExcerpt(post.body)}
                    </p>
                </div>
                <div className="mt-auto">
                    <Link className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:text-blue-500" to={`/posts/${post.id}`}>
                        Read more 
                        <span className="material-symbols-outlined text-base translate-y-[2px]">arrow_forward</span>
                    </Link>
                </div>
            </div>
            <div className="flex-shrink-0 flex justify-center md:justify-start">
                <img className="aspect-[4/3] sm:w-120 sm:h-80 md:w-48 md:h-full lg:w-80 object-cover rounded-md" src={getRandomImageUrl()} alt="Random image from Picsum"/>
            </div>
        </article>
    )
}
export default PostCard;