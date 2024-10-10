import { z } from 'zod'

const createUserNameValidationSchema = z.object({
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
})

const createUserValidationSchema = z.object({
  body: z.object({
    name: createUserNameValidationSchema,
    email: z.string(),
    gender: z.enum(['male', 'female', 'other']),
    role: z.enum(['user', 'admin']),
    isPremium: z.boolean(),
    image: z.string(),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateUserValidationSchema = z.object({
  body: z.object({
    name: updateUserNameValidationSchema,
    email: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    role: z.enum(['user', 'admin']).optional(),
    isPremium: z.boolean().optional(),
    image: z.string().optional(),
  }),
})

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
