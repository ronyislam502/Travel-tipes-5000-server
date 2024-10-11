import { Router } from 'express'
import { UserRoutes } from '../models/user/user.route'
import { PostRoutes } from '../models/post/post.route'
import { CommentRoutes } from '../models/comment/comment.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
