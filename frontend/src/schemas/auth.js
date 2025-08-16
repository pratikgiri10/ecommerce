import * as z from "zod/v4";
import { createEmailSchema, createPasswordSchema, createStringSchema } from ".";
export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, {
        message: 'password is required'
    })
})
export const registerSchema = z.object(
    {
        name: z.string().min(),
        email: z.email(),
        password: createPasswordSchema(),
        confirmPassword: createStringSchema('Confirm Password')
    })
    .refine(({ password, confirmPassword }) => password == confirmPassword, {
        message: 'Passwords do not match'
    })
export const sendResetPasswordLinkSchema = z.object({
    email: createEmailSchema('Email')
})

export const resetPasswordSchema = z.object(
    {
        password: createPasswordSchema(),
        confirmPassword: createStringSchema()
    })
    .refine(({ password, confirmPassword }) => password == confirmPassword, {
        message: 'passwords do not match',
        path: ['confirm_password']
    })