import { z } from "zod";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .regex(emailRegex, { message: "Invalid email address" }),

  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
});

export const logindefaultvalue={
    email:"",password:""
}
export type LoginFormValues = z.infer<typeof loginSchema>;
