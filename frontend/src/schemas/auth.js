import * as z from "zod/v4"; 
export const loginSchema = z.object({
    email: z.string().min(1, {
        message: 'email is required'
    }),
    password: z.string().min(1, {
        message: 'password is required'
    })
})