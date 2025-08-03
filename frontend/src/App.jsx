import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute.jsx";

// Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register.jsx";
import Feed from "./pages/Feed/Feed.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import CreatePost from "./pages/Feed/CreatePost.jsx";

function App() {
  return (

    <Routes>

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes inside MainLayout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Feed />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Route>

    </Routes>

  );
}

export default App;
