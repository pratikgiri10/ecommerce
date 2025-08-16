import { z } from 'zod';

export function createStringSchema(fieldName) {
  return z
    .string({ required_error: `${fieldName} is required` })
    .trim()
    .min(3, `${fieldName} must be at least 3 characters long.`);
}
export function createNumberSchema(fieldName) {
  return z
    .number().min(1, `${fieldName} must atleast be 1`)
    .refine((val) => val !== null, {
      message: `${fieldName} is required`
    })
    .refine((val) => !NaN(val), {
      message: `Invalid Number`
    })
}
export function createPercentageSchema() {
  return z
    .number()
    .refine((val) => val >= 0 && val <= 100, {
      message: `Percentage must be between 0 and 100`
    })
    .refine((val) => !isNaN(val), {
      message: `Invalid Number`
    })
}
export function createDropdownSchema(fieldName) {
  return z.union([
    z.string().trim().min(1, { message: `please select ${fieldName}` }),
    z.null()
  ])
    .refine((val) => val !== '', { message: `${fieldName} is required` })
}
export const createImageSchema =
  z.array(z.instanceof(File))
    .min(1, "Atleast 1 image is required")
    .max(5, "Maximum 5 images are allowed")
    .refine((files) => {
      return files.every((file) => 2 * 1024 * 1024)
    }, 'each file should be less than or equal to 2MB')
    .refine((files) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
      return files.every(file => allowedTypes.includes(file.type))
    }, "Only JPEG/PNG/WEBP are allowed")



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