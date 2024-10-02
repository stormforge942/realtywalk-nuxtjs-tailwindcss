import { object, string, type InferType, ref } from 'yup'

export const SignInWithPasswordSchema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
})

export const AuthOnlyEmailSchema = object({
  email: string().email('Invalid email').required('Required'),
})

export const SignUpOnlyEmailSchema = object({
  name: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
})

export const SignUpWithPasswordSchema = object({
  name: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  password: string()
    .min(8, 'Must be at least 8 characters')
    .required('Required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('Required'),
})

export const ReportBugFormSchema = object({
  name: string().required('Required'),
  email: string().email('Invalid email').required('Required'),
  url: string().required('Required'),
  bug: string().required('Required'),
})
