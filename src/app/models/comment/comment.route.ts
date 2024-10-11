import express from 'express'
import { CommentControllers } from './comment.controller'

const router = express.Router()

router.post('/post-comment', CommentControllers.createComment)

router.get('/', CommentControllers.getAllComments)

router.patch('/:id', CommentControllers.updateComment)

router.delete('/:id', CommentControllers.deleteComment)

export const CommentRoutes = router
