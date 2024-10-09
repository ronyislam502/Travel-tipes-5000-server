import { z } from 'zod'

const userNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
})

const userValidationSchema = z.object({
  body: z.object({
    name: userNameValidationSchema,
    email: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    role: z.enum(['user', 'admin']),
    isPremium: z.boolean(),
    image: z.string(),
  }),
})

export const UserValidations = {
  userValidationSchema,
}
