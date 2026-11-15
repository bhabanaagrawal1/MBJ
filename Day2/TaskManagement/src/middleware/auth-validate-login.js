import {z} from "zod"

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const loginSchema = z.object({
    email: z.string().trim().regex(emailRegex,{
        message: "Enter a valid email address"
    }),
    password: z.string().regex(passwordRegex,{
        message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    })
})