import mongoose from 'mongoose'
import { TFollower } from './follower.interface'
import { User } from '../user/user.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { Follower } from './follower.model'

const createFollowerIntoDB = async (payload: TFollower) => {
  const { user, follower } = payload
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isUserExist = await User.findOne(
      {
        _id: user,
      },
      { session },
    )

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    const isFollowerExist = await User.findOne(
      {
        _id: follower,
      },
      { session },
    )

    if (!isFollowerExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Follower not found')
    }
    const isFollowing = await Follower.findOne({
      user: isUserExist._id,
      follower: isFollowerExist._id,
    })

    if (isFollowing) {
      const result = await Follower.deleteOne({
        user: isUserExist._id,
        follower: isFollowerExist._id,
      })
      return result
    }

    const result = await Follower.create(payload)

    await session.commitTransaction()
    session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to follower create')
  }
}

const getAllFollowersFromDB = async (user: string) => {
  const result = await Follower.find({ user })
  return result
}

const deleteFollowerIntoDB = async (payload: TFollower) => {
  const { user, follower } = payload
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isUserExist = await User.findOne(
      {
        _id: user,
      },
      { session },
    )

    if (!isUserExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    const isFollowerExist = await User.findOne(
      {
        _id: follower,
      },
      { session },
    )

    if (!isFollowerExist) {
      throw new AppError(httpStatus.NOT_FOUND, 'Follower not found')
    }
    const isFollowing = await Follower.findOne({
      user: isUserExist._id,
      follower: isFollowerExist._id,
    })
    if (!isFollowing) {
      throw new AppError(httpStatus.NOT_FOUND, 'Following not found')
    }

    const result = await Follower.deleteOne({
      user: isUserExist._id,
      follower: isFollowerExist._id,
    })

    await session.commitTransaction()
    session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to unfollow')
  }
}

export const FollowerServices = {
  getAllFollowersFromDB,
  createFollowerIntoDB,
  deleteFollowerIntoDB,
}
