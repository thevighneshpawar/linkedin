import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600
                 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700
                 transition-all"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}
