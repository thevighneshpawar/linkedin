import express from 'express'
import {
  createPost,
  getAllPosts,
  getUserPosts,
  deletePost
} from '../controller/post.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = express.Router()

// Public Feed
router.get('/', getAllPosts)

// Create Post (Protected)
router.post('/', verifyJWT, createPost)

// User Profile Posts (Public)
router.get('/user/:userId', getUserPosts)

// Delete Post (Protected)
router.delete('/:postId', verifyJWT, deletePost)

export default router
