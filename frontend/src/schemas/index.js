import { z } from 'zod';
export function createStringSchema(fieldName) {
  return z
    .string({ required_error: `${fieldName} is required` })
    .trim()
    .min(3, `${fieldName} must be at least 3 characters long.`);
}
export function createEmailSchema(fieldName) {
  return z
    .string({ required_error: `Please enter ${fieldName} address` })
    .email({
      message: 'Invalid email address. Please provide valid email address.',
    });
}
export function createPasswordSchema(fieldName) {
  const field = fieldName || ' Password';
  return createStringSchema(field)
    .min(8, `${field} must be at least 8 characters long`)
    .max(255, `${field} is too long`)
    .regex(/[A-Z]/, `${field} must contain at least one uppercase letter`)
    .regex(/[a-z]/, `${field} must contain at least one lowercase letter`)
    .regex(/[0-9]/, `${field} must contain at least one number`)
    .regex(/[\W_]/, `${field} must contain at least one special character`);
}