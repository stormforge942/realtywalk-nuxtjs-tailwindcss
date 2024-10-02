import { object, string, type InferType } from 'yup'

export const SignInWithPasswordSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

export const AuthOnlyEmailSchema = object({
  email: string().email('Invalid email').required('Required'),
})
