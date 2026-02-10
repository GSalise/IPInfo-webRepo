import z from "zod";

export const FormSchema = z.object({
  email: z.email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const AuthResponseSchema = z.string();

export type FormData = z.infer<typeof FormSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
