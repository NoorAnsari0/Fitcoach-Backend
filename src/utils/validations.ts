import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    name: z.string().min(1).optional()
})

export type SignupInput = z.infer<typeof signupSchema>;