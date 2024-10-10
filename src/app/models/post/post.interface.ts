import { Types } from 'mongoose'

export interface TComment {
  commenter: Types.ObjectId
  content: string
  _id: string
}

export type TPost = {
  user: Types.ObjectId
  content: string
  images: string[]
  categories: string
  premium: boolean
  increase: number
  decrease: number
  commentCount: number
  comments?: TComment[]
  isDeleted: boolean
}
