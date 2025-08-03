import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User, CalendarDays, Delete, Edit, Briefcase, Mail, Link as LinkIcon, MessageSquare } from "lucide-react";
import { getCurrentUserApi } from "../../api/auth";
import { deletePostApi, getUserPostsApi } from "../../api/post";

export default function Profile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProfile();
    }, [userId]);



    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);

            // Parallel API requests
            const [userRes, postsRes] = await Promise.all([
                getCurrentUserApi(userId),
                getUserPostsApi(userId)
            ]);

            setUser(userRes.data.data);
            setPosts(postsRes.data.data);

        } catch (err) {
            console.error("Failed to fetch profile:", err);
            setError("Failed to load profile data");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        try {
            const response = await deletePostApi(postId);

            if (response.status === 200) {

                setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
            } else {
                setError("Failed to delete post");
            }

        } catch (error) {
            console.error("Error deleting post:", error);
            setError("Failed to delete post");
        }

    }


    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg max-w-2xl mx-auto">
                {error}
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                {/* Cover Photo Placeholder */}
                <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>

                {/* Profile Info */}
                <div className="px-6 pb-6 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16">
                        <div className="flex items-end">
                            <div className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                {user.avatar ? (
                                    <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" />
                                ) : (
                                    <User className="h-16 w-16 text-gray-400" />
                                )}
                            </div>
                            <div className="ml-6 mb-2">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.fullName}</h1>
                                <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
                            </div>
                        </div>

                        {/* <div className="mt-4 sm:mt-0">
                            <button className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Profile
                            </button>
                        </div> */}
                    </div>

                    {/* Bio and Details */}
                    <div className="mt-6">
                        <p className="text-gray-700 dark:text-gray-300">{user.bio || "No bio yet"}</p>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {user.company && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Briefcase className="h-5 w-5 mr-2" />
                                    <span>{user.company}</span>
                                </div>
                            )}
                            {user.email && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <Mail className="h-5 w-5 mr-2" />
                                    <span>{user.email}</span>
                                </div>
                            )}
                            {user.website && (
                                <div className="flex items-center text-gray-600 dark:text-gray-400">
                                    <LinkIcon className="h-5 w-5 mr-2" />
                                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                        {user.website.replace(/(^\w+:|^)\/\//, '')}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Posts Section */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <MessageSquare className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    Posts
                </h2>

                {posts.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center">
                        <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                                <div className="p-6">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                                        <CalendarDays className="h-4 w-4 mr-1" />
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">
                                            {post.content}
                                        </p>

                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors">
                                            <Delete className="h-4 w-4 mr-2" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}