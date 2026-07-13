import { z } from "zod";

export const signupSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
    name: z.string().min(1).optional()
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email or password"),
    password: z.string().min(1, "Invalid email or password"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;