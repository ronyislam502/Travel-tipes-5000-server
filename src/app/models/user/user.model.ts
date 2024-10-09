import { model, Schema } from 'mongoose'
import { TUser, TUserName, UserModel } from './user.interface'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
})

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: userNameSchema,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
      },
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'admin'],
      },
      required: true,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
)

userSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName
})

userSchema.pre('find', function (next) {
  this.find({
    isDeleted: { $ne: true },
  })
  next()
})

userSchema.pre('findOne', function (next) {
  this.find({
    isDeleted: { $ne: true },
  })
  next()
})

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await User.findOne({ id })
  return existingUser
}

export const User = model<TUser, UserModel>('User', userSchema)
