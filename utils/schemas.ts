import { object, string, type InferType, ref, mixed } from 'yup'

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const FILE_SIZE = 5 * 1024 * 1024;

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
  body: string().required('Required'),
})

export const ProfileSchema = object({
  name: string().required(),
  picture: mixed().notRequired()
})

export const PasswordChangeSchema = object().shape({
  currentPassword: string()
    .required('Current password is required'),
  newPassword: string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long'),
  confirmPassword: string()
    .required('Please confirm your new password')
    .oneOf([ref('newPassword')], 'Passwords do not match'),
});

export const ResetPasswordSchema = object({
  email: string().required(),
  resetToken: string().required(),
  password: string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long'),
  cpassword: string()
    .required('Please confirm your new password')
    .oneOf([ref('newPassword')], 'Passwords do not match'),
})