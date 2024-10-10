import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TPost } from './post.interface'
import { Post } from './post.model'
import { TUser } from '../user/user.interface'

const createPostIntoDb = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}

const getAllPostsFromDB = async () => {
  const result = await Post.find()
  return result
}

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id)
  return result
}

const getPostByUserFromDB = async (id: string) => {
  const result = await Post.find({ user: id }).select({ comments: 0 })
  return result
}

const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const isPostExists = await Post.findById(id)
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not Found')
  }

  const isDeletedPost = isPostExists.isDeleted

  if (isDeletedPost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post not found')
  }

  if (isPostExists.user.toString() !== payload.user?.toString()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'unauthorized access')
  }

  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

const deletePostFromDB = async (id: string, payload: TPost, user: TUser) => {
  const isPostExists = await Post.findById(id)
  if (!isPostExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not Found')
  }

  const isDeletedPost = isPostExists.isDeleted

  if (isDeletedPost) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Post not found')
  }

  if (
    isPostExists?.user.toString() !== payload.user?.toString() &&
    user.role !== 'admin'
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, 'unauthorized access')
  }

  const result = await Post.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  )
  return result
}

export const PostServices = {
  createPostIntoDb,
  getAllPostsFromDB,
  getSinglePostFromDB,
  getPostByUserFromDB,
  updatePostIntoDB,
  deletePostFromDB,
}
