import { Router } from 'express'
import { UserRoutes } from '../models/user/user.route'
import { PostRoutes } from '../models/post/post.route'

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
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
