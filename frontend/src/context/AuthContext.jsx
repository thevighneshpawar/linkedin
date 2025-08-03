import React, { createContext, useEffect, useState } from "react";
import { getCurrentUserApi, logoutApi } from "../api/auth.js";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    // Don't fetch user on login/register pages
    const skipFetch = ["/login", "/register"].includes(location.pathname);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (skipFetch) {
                setLoading(false);
                return;
            }

            try {
                const res = await getCurrentUserApi(); // Cookie-based auth
                setUser(res.data.data);
                //  console.log("Fetched current user:", res.data.data);
            } catch (err) {
                setUser(null);
                //  console.log("No active session");
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [skipFetch]);

    // Login function → set user in context
    const login = (userData) => {
        setUser(userData);
        // console.log("User logged in:", userData);
    };

    // Logout function → clear session
    const logout = async () => {
        try {
            await logoutApi(); // Backend clears refreshToken
        } catch (err) {
            console.error("Logout failed:", err);
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
