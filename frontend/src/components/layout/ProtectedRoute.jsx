import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    console.log(user, loading);

    if (loading) {
        return <div className="text-center mt-10">Checking authentication...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
