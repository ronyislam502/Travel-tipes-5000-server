import { Model } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TUser = {
  _id: string
  name: TUserName
  email: string
  gender: 'male' | 'female' | 'other'
  role: 'user' | 'admin'
  isPremium: boolean
  image?: string
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>
}
