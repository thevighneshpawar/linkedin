// models/Post.js
import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: { type: String, required: true, trim: true }
  },
  { timestamps: true }
)

export const post = mongoose.model('Post', postSchema)
