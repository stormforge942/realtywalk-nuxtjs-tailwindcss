import { object, string, type InferType, ref, mixed, number } from 'yup'

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
    .oneOf([ref('password')], 'Passwords do not match'),
})

const today = new Date();
const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

export const ScheduleViewSchema = object({
  email: string().required('Email is required').email('Invalid email'),
  message: string().required('Message is required'),
  name: string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  phone_number: string().required('Phone number is required').matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'Invalid phone number'),
  property_id: number().required('Property ID is required').positive('Property ID must be positive'),
  scheduleDate: string().required('Schedule date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    .test('future-date', 'Schedule date must be greater than current date', (value) => {
      const selectedDate = new Date(value);
      return selectedDate >= today;
    }),
  scheduleDateTime: string().optional(),
  scheduleTime: string().required('Schedule time is required').matches(/^([1-9]|1\d|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
});

