import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required")
        .max(20, "Must be less than 20 characters")
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
          }),
    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(20, "Must be less than 20 characters"),
});

const userValidationSchema = z.object({
    name: userNameValidationSchema,
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(4, "Password must be at least 4 characters long"),
    role: z.enum(["user", "admin"]).optional().default("user"),
    isBlocked: z.boolean().optional().default(false),
});

export default userValidationSchema;
