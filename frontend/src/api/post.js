import axiosInstance from '../utils/axiosInstance'

// Fetch paginated posts
export const getPostsApi = (page = 1) =>
  axiosInstance.get(`/posts?page=${page}`, { withCredentials: true })

// Create a new post
export const createPostApi = content =>
  axiosInstance.post('/posts', { content }, { withCredentials: true })

// Fetch posts by user
export const getUserPostsApi = userId =>
  axiosInstance.get(`/posts/user/${userId}`, { withCredentials: true })

// Delete a post
export const deletePostApi = postId =>
  axiosInstance.delete(`/posts/${postId}`, { withCredentials: true })
