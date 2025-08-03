import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PenSquare, Loader2, ArrowLeft, AlertCircle } from "lucide-react"; // ✅ Import AlertCircle
import { createPostApi } from "../../api/post";

export default function CreatePost() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await createPostApi(content);

            // ✅ Check status instead of success
            if (response.status === 200 || response.status === 201) {
                setContent(""); // Reset content
                navigate("/"); // Redirect to home after successful post
            } else {
                setError(response.data.message || "Failed to create post");
            }
        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.response?.data?.message || "Failed to create post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">

                {/* Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <h2 className="ml-4 text-xl font-semibold text-gray-800 dark:text-white">
                        Create Post
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-4">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                         dark:bg-gray-700 dark:text-white outline-none resize-none"
                            rows={5}
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center">
                            <AlertCircle className="h-5 w-5 mr-2" /> {/* ✅ Fixed */}
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !content.trim()}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                         dark:bg-indigo-500 dark:hover:bg-indigo-600 
                         text-white rounded-lg flex items-center transition-colors 
                         disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <PenSquare className="h-4 w-4 mr-2" />
                                    Post
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
