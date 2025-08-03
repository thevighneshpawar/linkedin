import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    //  console.log(user, loading);

    if (loading) {
        return (

            <div className="flex items-center justify-center p-8">
                <div className="relative w-12 h-12">
                    {/* Outer ring */}
                    <div className="absolute w-full h-full border-4 border-indigo-200 dark:border-indigo-900 rounded-full animate-spin"></div>

                    {/* Inner dot with pulse animation */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-ping"></div>
                    </div>

                    {/* Progress arcs */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-indigo-600 dark:border-t-indigo-400 border-transparent rounded-full animate-spin"></div>
                    </div>
                </div>

                {/* Optional loading text */}
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading...</span>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
