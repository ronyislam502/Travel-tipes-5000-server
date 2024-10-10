import httpStatus from 'http-status'
import catchAsync from '../../utilities/catchAsync'
import sendResponse from '../../utilities/sendResponse'
import { PostServices } from './post.service'

const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create post successfully',
    data: result,
  })
})

const getAllPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  })
})

const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await PostServices.getSinglePostFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  })
})

const getPostByUser = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await PostServices.getPostByUserFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  })
})

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await PostServices.getPostByUserFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  })
})

const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await PostServices.getPostByUserFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  })
})

export const PostControllers = {
  createPost,
  getAllPosts,
  getSinglePost,
  getPostByUser,
  updatePost,
  deletePost,
}
