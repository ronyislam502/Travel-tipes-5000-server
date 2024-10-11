import { z } from 'zod'

const createCommentValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    post: z.string(),
    reply: z.string(),
  }),
})

const updateCommentValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    post: z.string().optional(),
    reply: z.string().optional(),
  }),
})

export const CommentValidations = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
}
