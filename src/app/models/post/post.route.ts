import express from 'express'
import { PostControllers } from './post.controller'

const router = express.Router()

router.post('/create-post', PostControllers.createPost)

router.get('/', PostControllers.getAllPosts)

router.get('/:id', PostControllers.getSinglePost)

router.get('/user/:id', PostControllers.getPostByUser)

router.patch('/id', PostControllers.updatePost)

router.delete('/:id', PostControllers.deletePost)

export const PostRoutes = router
