import express from 'express'
import { FollowerControllers } from './follower.contrller'

const router = express.Router()

router.post('/toggle-follower', FollowerControllers.toggleFollower)

router.get('/', FollowerControllers.getAllFollowers)

export const FollowerRoutes = router
