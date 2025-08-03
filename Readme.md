# Mini LinkedIn-like Community Platform

A responsive **community platform** built with **MERN Stack** that allows users to **register, log in, create posts, and view public feeds** like a mini LinkedIn.

---

## 🚀 Live Demo

- **Frontend (Vercel)**: [Live Demo](https://linkedin-ktm3.vercel.app/)
- **Backend (vercel)**: [API](#)
- **GitHub Repository**: [Repo](https://github.com/thevighneshpawar/linkedin)

---

## 📌 Features

### 1️⃣ User Authentication
- Register and Login using **Email & Password**
- HTTP-only cookie-based **JWT Authentication**
- Profile includes:
  - Name
  - Email
  - Bio (optional)

### 2️⃣ Public Post Feed
- Create and view **text-only posts**
- Feed displays:
  - Author’s name
  - Timestamp
- **Pagination:** First 10 posts with **Load More** button

### 3️⃣ Profile Page
- View user’s **profile**
- Display all posts by that user

### 4️⃣ Modern UI
- Built with **React + Tailwind CSS**
- **Responsive and Mobile-first design**
- **Light/Dark mode** support

---

## 🛠 Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM
- Lucide React Icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT (Access & Refresh Tokens with Cookies)
- Express Async Handler

**Deployment:**
- **Frontend:** Vercel  
- **Backend:** Render   
- **Database:** MongoDB Atlas  

---

# Mini LinkedIn-like Community Platform

A simple community platform similar to LinkedIn, where users can register, log in, create posts, and view profiles with their posts.

---

## ⚡ Features
- **User Authentication**: Register and Login using email & password  
- **JWT Auth with Cookies**: Secure access & refresh tokens  
- **Profile Page**: View your profile and your posts  
- **Post Feed**: Create and view public text-only posts  
- **Pagination**: Load posts in pages (10 posts at a time)  
- **Responsive UI**: Mobile-friendly design  

---

## 🛠 Tech Stack

- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express  
- **Database:** MongoDB + Mongoose  
- **Auth:** JWT (Access & Refresh Tokens stored in cookies)  
- **Other:** Express Async Handler, Axios, React Router DOM  

**Deployment:**  
- **Frontend:** Vercel  
- **Backend:** Render  
- **Database:** MongoDB Atlas  

---



## 📂 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-link>
cd <your-project-folder>
```

### 2️⃣ Backend Setup
1. Navigate to the backend folder:
    ```bash
    cd backend
    npm install
    ```
2. Create a `.env` file in the backend folder with the following content:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
    CORS_ORIGIN=http://localhost:5173
    ```
3. Start the backend server:
    ```bash
    npm run dev
    ```

### 3️⃣ Frontend Setup
1. Navigate to the frontend folder:
    ```bash
    cd ../frontend
    npm install
    ```
2. Create a `.env` file in the frontend folder with the following content:
    ```env
    VITE_BACKEND_URL=http://localhost:5000/api/v1
    ```
3. Start the frontend:
    ```bash
    npm run dev
    ```

### 4️⃣ Access the App
- **Frontend**: [http://localhost:5173](http://localhost:5173)  
- **Backend API**: [http://localhost:5000/api](http://localhost:5000/api/v1)

