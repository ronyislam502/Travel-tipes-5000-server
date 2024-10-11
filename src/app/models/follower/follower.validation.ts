import { z } from 'zod'

const followerValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    follower: z.string(),
  }),
})

export const FollowerValidations = {
  followerValidationSchema,
}
