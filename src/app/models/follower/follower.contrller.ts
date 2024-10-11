import httpStatus from 'http-status'
import catchAsync from '../../utilities/catchAsync'
import sendResponse from '../../utilities/sendResponse'
import { FollowerServices } from './follower.service'

const toggleFollower = catchAsync(async (req, res) => {
  const result = await FollowerServices.toggleFollowerFromDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow successfully',
    data: result,
  })
})

const getAllFollowers = catchAsync(async (req, res) => {
  const result = await FollowerServices.getAllFollowersFromDB(req.params.user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Follow successfully',
    data: result,
  })
})

export const FollowerControllers = {
  toggleFollower,
  getAllFollowers,
}
