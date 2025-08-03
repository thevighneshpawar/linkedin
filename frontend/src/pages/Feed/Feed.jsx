import React, { useEffect, useState } from "react";
import { Clock, Loader2, MessageSquare } from "lucide-react";
import { getPostsApi } from "../../api/post";
import CreatePostFAB from "./CreatePostFAB";

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = async (pageNum = 1) => {
        try {
            setLoading(true);
            setError(null);

            const res = await getPostsApi(pageNum);
            const { posts, hasNextPage } = res.data.data;

            // Append new posts
            setPosts((prev) => (pageNum === 1 ? posts : [...prev, ...posts]));
            setHasMore(hasNextPage);
        } catch (err) {
            console.error("Failed to fetch posts:", err);
            setError("Failed to load posts. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(page);
    }, [page]);

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6">


            {/* Posts List */}
            {posts.length === 0 && !loading ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                    <MessageSquare className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        No posts yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Be the first to share something!
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100 dark:border-gray-700"
                        >
                            {/* Author Info */}
                            <div className="p-4 flex items-center">
                                <div className="relative">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                                        {post.author?.fullName?.[0]?.toUpperCase() || "U"}
                                    </div>
                                    {post.author?.isOnline && (
                                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {post.author?.fullName || "Unknown User"}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {new Date(post.createdAt).toLocaleString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="px-4 pb-4">
                                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                    {post.content}
                                </p>
                            </div>

                            {/* Post Actions */}
                            <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex space-x-4 text-gray-500 dark:text-gray-400">
                                <button className="flex items-center text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <svg
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    Like
                                </button>
                                <button className="flex items-center text-sm hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                                    <svg
                                        className="h-5 w-5 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    Comment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Loading and Error States */}
            <div className="mt-6 text-center">
                {loading && (
                    <div className="flex justify-center items-center py-4">
                        <Loader2 className="h-6 w-6 text-indigo-600 dark:text-indigo-400 animate-spin" />
                    </div>
                )}
                {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg inline-flex items-center">
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        {error}
                        <button
                            onClick={() => fetchPosts(page)}
                            className="ml-2 text-red-700 dark:text-red-300 hover:underline"
                        >
                            Retry
                        </button>
                    </div>
                )}
                {!hasMore && posts.length > 0 && (
                    <p className="text-gray-500 dark:text-gray-400 py-4">
                        You've reached the end of the feed
                    </p>
                )}
            </div>

            {/* Load More Button for non-infinite scroll */}
            {hasMore && !loading && (
                <div className="mt-4 text-center">
                    <button
                        onClick={loadMore}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-md transition-colors inline-flex items-center"
                    >
                        Load More
                    </button>
                </div>
            )}

            <CreatePostFAB />
        </div>
    );
}
