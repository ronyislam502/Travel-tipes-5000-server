import { z } from 'zod'

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    content: z.string(),
    images: z.array(z.string()),
    categories: z.string(),
    premium: z.boolean(),
    increase: z.number(),
    decrease: z.number(),
    commentCount: z.number(),
  }),
})

const updatePostValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    content: z.string().optional(),
    images: z.array(z.string()).optional(),
    categories: z.string().optional(),
    premium: z.boolean().optional(),
    increase: z.number().optional(),
    decrease: z.number().optional(),
    commentCount: z.number().optional(),
  }),
})

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
}
