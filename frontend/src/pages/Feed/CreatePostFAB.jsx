import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CreatePostFAB() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate("/create-post")}
            className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105"
            aria-label="Create new post"
        >
            <Plus className="h-6 w-6" />
        </button>
    );
}

export default CreatePostFAB;