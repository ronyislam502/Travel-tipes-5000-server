import { model, Schema } from 'mongoose'
import { TPost } from './post.interface'

const postSchema = new Schema<TPost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    categories: {
      type: String,
      required: true,
    },
    premium: {
      type: Boolean,
      default: false,
    },
    increase: {
      type: Number,
    },
    decrease: {
      type: Number,
    },
    commentCount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

// Create the Post model
export const Post = model<TPost>('Post', postSchema)
