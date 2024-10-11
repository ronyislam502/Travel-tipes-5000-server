import mongoose, { Types } from 'mongoose'
import { Post } from '../post/post.model'
import { TComment } from './comment.interface'
import { Comment } from './comment.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const postCommentIntoBD = async (id: string, payload: TComment) => {
  const session = await mongoose.startSession()

  session.startTransaction()

  try {
    const post = await Post.findById(id)
    if (!post) {
      throw new Error('Post not found')
    }
    const result = await Comment.create([payload], { session })

    post.commentCount = (post.commentCount || 0) + 1

    // Save the updated post
    await post.save({ session })
    await session.commitTransaction()
    session.endSession()

    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'comment not created')
  }
}

const updateCommentPostIntoDB = async (id: string, payload: TComment) => {
  const { user, reply } = payload

  const session = await mongoose.startSession()

  session.startTransaction()

  try {
    const isFeedbackAvailable = await Comment.findById(id)

    if (!isFeedbackAvailable) {
      throw new Error('Comment not found')
    }
    // Compare userId with isFeedbackAvailable.userId
    const isSameUser = new Types.ObjectId(user).equals(isFeedbackAvailable.user)

    if (!isSameUser) {
      throw new Error('Unauthorized: You can only edit your own comments')
    }

    const result = await Comment.findByIdAndUpdate(
      id,
      {
        reply,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'comment not updated')
  }
}

const getAllCommentsByPostFromDB = async (id: string) => {
  const result = await Comment.find({ post: id }).populate('user')
  return result
}
const deletePostCommentFromDB = async (id: string, user: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isCommentAvailable = await Comment.findById(id)
    if (!isCommentAvailable) {
      throw new Error('Comment not found')
    }
    const isSameUser = new Types.ObjectId(user).equals(isCommentAvailable.user)
    if (!isSameUser) {
      throw new Error('You are not authorized to delete')
    }
    const result = await Comment.findByIdAndDelete(id)

    const postId = isCommentAvailable.post

    const post = await Post.findById(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    post.commentCount = (post.commentCount || 0) - 1

    await session.commitTransaction()
    session.endSession()
    await post.save()

    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw error
  }
}

export const CommentServices = {
  postCommentIntoBD,
  updateCommentPostIntoDB,
  getAllCommentsByPostFromDB,
  deletePostCommentFromDB,
}
