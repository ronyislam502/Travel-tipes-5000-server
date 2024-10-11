import httpStatus from 'http-status'
import catchAsync from '../../utilities/catchAsync'
import sendResponse from '../../utilities/sendResponse'
import { CommentServices } from './comment.service'

const createComment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CommentServices.postCommentIntoBD(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment successfully',
    data: result,
  })
})

const getAllComments = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CommentServices.getAllCommentsByPostFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully',
    data: result,
  })
})

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CommentServices.updateCommentPostIntoDB(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment update successfully',
    data: result,
  })
})

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params
  const { user } = req.params
  const result = await CommentServices.deletePostCommentFromDB(id, user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments deleted successfully',
    data: result,
  })
})

export const CommentControllers = {
  createComment,
  getAllComments,
  getAComment,
  updateComment,
  deleteComment,
}
