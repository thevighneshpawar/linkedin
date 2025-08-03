import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./Themetoggle.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { Menu, X, User, Home, LogOut } from "lucide-react";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left section - Logo and Desktop Nav */}
                    <div className="flex items-center">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center text-xl font-bold text-indigo-600 dark:text-indigo-400"
                        >
                            <span className="ml-2">MiniLinkedIn</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:ml-8 md:flex md:items-center md:space-x-6">
                            <Link
                                to="/"
                                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <Home className="h-5 w-5 mr-1" />
                                Home
                            </Link>
                            {user && (
                                <Link
                                    to={`/profile/${user._id}`}
                                    className="flex items-center text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                    <User className="h-5 w-5 mr-1" />
                                    Profile
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Right section - Theme toggle and user actions */}
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center space-x-4">
                            <ThemeToggle />
                            {user && (
                                <button
                                    onClick={logout}
                                    className="flex items-center px-3 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
                                >
                                    <LogOut className="h-4 w-4 mr-1.5" />
                                    Logout
                                </button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <ThemeToggle className="mr-2" />
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {menuOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <Menu className="block h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
                <div className="pt-2 pb-3 space-y-1 px-4">
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Home className="h-5 w-5 mr-3" />
                        Home
                    </Link>
                    {user && (
                        <>
                            <Link
                                to={`/profile/${user._id}`}
                                onClick={() => setMenuOpen(false)}
                                className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <User className="h-5 w-5 mr-3" />
                                Profile
                            </Link>
                            <button
                                onClick={() => { logout(); setMenuOpen(false); }}
                                className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                                <LogOut className="h-5 w-5 mr-3" />
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}