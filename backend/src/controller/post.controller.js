import { Post } from '../models/post.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

export const createPost = asyncHandler(async (req, res) => {
  let { content } = req.body

  if (typeof content !== 'string') {
    content = String(content || '').trim()
  } else {
    content = content.trim()
  }

  const post = await Post.create({
    content,
    author: req.user._id
  })

  return res
    .status(201)
    .json(new ApiResponse(201, post, 'Post created successfully'))
})

export const getAllPosts = asyncHandler(async (req, res) => {
  // Get page from query params, default is 1
  const page = parseInt(req.query.page) || 1
  const limit = 10 // posts per page
  const skip = (page - 1) * limit

  // Get total post count for frontend pagination info
  const totalPosts = await Post.countDocuments()

  // Fetch posts with pagination
  const posts = await Post.find()
    .populate('author', 'username fullName email') // only show limited info
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(limit)

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        posts,
        page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasNextPage: page * limit < totalPosts
      },
      'Posts fetched successfully'
    )
  )
})

export const getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params

  const posts = await Post.find({ author: userId })
    .populate('author', 'username fullName email')
    .sort({ createdAt: -1 })

  return res
    .status(200)
    .json(new ApiResponse(200, posts, 'User posts fetched successfully'))
})

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params

  const post = await Post.findById(postId)
  if (!post) throw new ApiError(404, 'Post not found')

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this post')
  }

  await post.deleteOne()

  return res
    .status(200)
    .json(new ApiResponse(200, {}, 'Post deleted successfully'))
})
