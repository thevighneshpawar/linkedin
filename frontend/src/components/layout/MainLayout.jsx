import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
            {/* 🔹 Fixed Navbar */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-800 shadow-md">
                <Navbar />
            </header>

            {/* 🔹 Scrollable Outlet */}
            <main className="flex-1 mt-16 overflow-y-auto px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
}
