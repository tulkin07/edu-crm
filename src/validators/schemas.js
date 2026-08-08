import { z } from 'zod';

export const validate = (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = {};
    result.error.errors.forEach((err) => {
      const path = err.path.join('.') || 'root';
      errors[path] = err.message;
    });
    const error = new Error('Validation error');
    error.statusCode = 400;
    error.errors = errors;
    throw error;
  }
  return result.data;
};

export const phoneSchema = z
  .string()
  .min(9, 'Phone must be at least 9 characters')
  .regex(/^\+?[0-9\s\-()]+$/, 'Invalid phone number format');

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive('Invalid ID'),
});

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const studentSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: phoneSchema,
  birthDate: z.string().min(1, 'Birth date is required'),
  gender: z.enum(['MALE', 'FEMALE']),
  directionId: z.coerce.number().int().positive('Direction is required'),
  level: z.enum(['BEGINNER', 'ELEMENTARY', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'ADVANCED']),
  status: z.enum(['ACTIVE', 'INACTIVE', 'GRADUATED']).optional(),
});

export const teacherSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: phoneSchema,
  directionId: z.coerce.number().int().positive('Direction is required'),
  experience: z.coerce.number().int().min(0, 'Experience must be 0 or more'),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const directionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const groupSchema = z.object({
  name: z.string().min(2, 'Group name must be at least 2 characters'),
  directionId: z.coerce.number().int().positive('Direction is required'),
  teacherId: z.coerce.number().int().positive('Teacher is required'),
  startDate: z.string().min(1, 'Start date is required'),
  lessonDays: z.array(z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])).min(1, 'At least one lesson day is required'),
  startTime: z.string().min(1, 'Start time is required'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'COMPLETED']).optional(),
});

export const addStudentToGroupSchema = z.object({
  studentId: z.coerce.number().int().positive('Student ID is required'),
});
